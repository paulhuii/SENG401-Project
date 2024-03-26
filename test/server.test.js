const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
require('dotenv').config({ path: '../.env.test' });

describe('Authenticated API endpoint testing', () => {
  let token = ''; // Token will be set after login

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/api/login') // Adjust this according to your actual login endpoint
      .send({
        email: 'EmilyJohnson@email.com', // Use a test user's email
        password: 'Recruiter1!' // Use the test user's password
      });
    token = loginResponse.body.token; // Adjust according to how your login response structure is
  }, 30000); // Timeout set here for the entire beforeAll

  test('GET /api/profile/info with authentication', async () => {
    const response = await request(app)
      .get('/api/profile/info')
      .set('Authorization', `Bearer ${token}`); // Using the token obtained from login

    expect(response.statusCode).toBe(200);
    // Further assertions can be made here based on the expected response body
  });

  test('Invalid login attempt', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'wrongemail@example.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(401); // Assuming 401 Unauthorized status for invalid credentials
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Invalid'); // Assuming the response contains a message indicating invalid credentials
  });

  test('Accessing /api/profile/info without authentication should fail', async () => {
    const response = await request(app).get('/api/profile/info');

    expect(response.statusCode).toBe(401); // Assuming 401 Unauthorized status for unauthenticated requests
    // Optionally check for a specific response message, if your API provides one
  });

  test('Updating user profile with authentication', async () => {
    // Assuming token is already set by previous tests
    const updateResponse = await request(app)
      .put('/api/profile') // Ensure this matches your actual endpoint
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Emily Johnson Updated',
        // Add other fields as necessary
      });
  
    expect(updateResponse.statusCode).toBe(200);
    // Corrected assertion to check within the user object
    expect(updateResponse.body.user).toHaveProperty('name', 'Emily Johnson Updated');
  });
  

  afterAll(async () => {
    await mongoose.connection.close();
    // If your app starts an HTTP server, make sure to close it as well
  });
});
