const request = require('supertest');
const mongoose = require('mongoose');
const { app, closeServer } = require('../server/server');
require('dotenv').config({ path: './.env.test' });

describe('Authenticated API endpoint testing', () => {
  let recruiterToken = '';
  let jobseekerToken = '';

  beforeAll(async () => {
    // Login as recruiter
    const recruiterLoginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'EmilyJohnson@email.com',
        password: 'Recruiter1!'
      });
    recruiterToken = recruiterLoginResponse.body.token;

    // Login as jobseeker
    const jobseekerLoginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'EvelynTurner@email.com',
        password: 'Jobseeker1!',
      });
    jobseekerToken = jobseekerLoginResponse.body.token;
  }, 30000);

  test('GET /api/profile/info with authentication (recruiter)', async () => {
    const response = await request(app)
      .get('/api/profile/info')
      .set('Authorization', `Bearer ${recruiterToken}`);

    expect(response.statusCode).toBe(200);
  });

  test('Invalid login attempt', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'wrongemail@example.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Invalid');
  });

  test('Accessing /api/profile/info without authentication should fail', async () => {
    const response = await request(app).get('/api/profile/info');
    expect(response.statusCode).toBe(401);
  });

  test('Updating recruiter profile with authentication', async () => {
    const updateResponse = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({ description: 'Updated description' });
  
    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.user).toHaveProperty('description', 'Updated description');
  });

  test('Invalid login attempt for a seeded recruiter with wrong password', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'EmilyJohnson@email.com',
        password: 'WrongPassword!',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Invalid');
  });

  test('Get recruiter count (assuming it doesn\'t require authentication)', async () => {
    const response = await request(app).get('/api/recruiterCount');
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.count).toBe('number');
    expect(response.body.count).toBeGreaterThanOrEqual(10); // Based on seeded data
  });

  afterAll(async () => {
    await mongoose.connection.close();
    closeServer();
  });
});
