const request = require('supertest');
const mongoose = require('mongoose');
const { app, closeServer } = require('../server');
require('dotenv').config({ path: './.env.test' });

describe('Jobs API endpoint testing', () => {
  let recruiterToken = '';
  let jobseekerToken = '';
  let createdJobId = ''; // Variable to hold a job ID created during testing

  beforeAll(async () => {
    // Login as a recruiter to obtain a token
    const recruiterLoginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'JamesHall@email.com',
        password: 'Recruiter8!',
      });
    recruiterToken = recruiterLoginResponse.body.token;

    // Login as a jobseeker to obtain a token
    const jobseekerLoginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'EthanMoore@email.com',
        password: 'Jobseeker10!',
      });
    jobseekerToken = jobseekerLoginResponse.body.token;
  }, 30000);

  test('Create job posting as a recruiter', async () => {
    const response = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        title: 'Test Job',
        jobType: 'Full-time',
        location: 'Test Location',
        salary: '$50,000 - $60,000',
        contact: 'test.contact@example.com',
        description: 'Test job description.',
        postedBy: mongoose.Types.ObjectId().toString(), 
      });
    
    // The expected statusCode and response body might need adjustment based on actual API implementation
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Job created successfully');
  });

  test('List jobs as a recruiter', async () => {
    const response = await request(app)
      .get('/api/jobs/list')
      .set('Authorization', `Bearer ${recruiterToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.jobs)).toBeTruthy();
    expect(response.body.jobs.length).toBeGreaterThanOrEqual(1);
  });

  test('Get job count', async () => {
    const response = await request(app).get('/api/jobs/count');

    expect(response.statusCode).toBe(200);
    expect(typeof response.body.count).toBe('number');
  });

  test('Access job list without token verification', async () => {
    const response = await request(app).get('/api/jobs/getList');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.jobs)).toBeTruthy();
    expect(response.body.jobs.length).toBeGreaterThanOrEqual(1);
  });
  // Test for updating a job posting
  test('Update job posting as a recruiter', async () => {
    const response = await request(app)
      .put(`/api/jobs/${createdJobId}`)
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        title: 'Updated Test Job',
        // include other job fields as needed
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Job updated successfully');
  });

  // Test for getting detailed information about a single job posting
  test('Get detailed info about a single job', async () => {
    const response = await request(app)
      .get(`/api/jobs/${createdJobId}`)
      .set('Authorization', `Bearer ${jobseekerToken}`); // assuming this endpoint requires authentication

    expect(response.statusCode).toBe(200);
    expect(response.body.job).toHaveProperty('_id', createdJobId);
  });

  // Test for applying to a job as a jobseeker
  test('Apply to a job as a jobseeker', async () => {
    const response = await request(app)
      .post(`/api/jobs/apply/${createdJobId}`)
      .set('Authorization', `Bearer ${jobseekerToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Applied to job successfully');
  });
 
  test('Delete job posting as a recruiter', async () => {
    const jobId = '5f760dad3e3f8b3d2f22b8f4'; // Use an actual job ID from your seeded data

    const response = await request(app)
      .delete(`/api/jobs/deleteJob/${jobId}`)
      .set('Authorization', `Bearer ${recruiterToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Job deleted successfully');
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await closeServer();
  });
});
