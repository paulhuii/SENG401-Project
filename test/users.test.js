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
    expect(response.body.count).toBeGreaterThanOrEqual(10);
  });
  test('Search for users', async () => {
    // Add a search query as per your API's implementation
    const searchQuery = 'John Doe';
    const response = await request(app)
      .get(`/api/search?query=${searchQuery}`)
      .set('Authorization', `Bearer ${recruiterToken}`);
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.users)).toBeTruthy();
    expect(response.body.users).toHaveLength(1); // Assuming the search returns one result
  });

  test('Upload profile photo', async () => {
    const response = await request(app)
      .post('/api/profile/photo')
      .set('Authorization', `Bearer ${jobseekerToken}`)
      .attach('profilePhoto', 'path/to/photo.jpg'); // Update the path to an actual image file
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Photo uploaded successfully');
    expect(response.body.user).toHaveProperty('profilePhoto');
  });

  test('Get list of recruiters', async () => {
    const response = await request(app)
      .get('/api/getRecruiterList')
      .set('Authorization', `Bearer ${recruiterToken}`);
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.recruiters)).toBeTruthy();
  });

  test('Get list of applicants', async () => {
    const response = await request(app)
      .get('/api/getApplicantList')
      .set('Authorization', `Bearer ${recruiterToken}`);
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.applicants)).toBeTruthy();
  });

  test('Get applied jobs for a job seeker', async () => {
    const response = await request(app)
      .get('/api/getAppliedJobs')
      .set('Authorization', `Bearer ${jobseekerToken}`);
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.jobs)).toBeTruthy();
  });
  afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
    await closeServer();
  });
});
