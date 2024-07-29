import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { expect } from 'chai';
import app from '../app.js'; // Your Express app

// Test suite for authentication routes
describe('Authentication Routes', () => {
  before(async () => {
    // Connect to MongoDB before tests
    await mongoose.connect('mongodb://localhost:27017/expenses_test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Clean up and disconnect after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '1234567890',
        password: 'password123'
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('message', 'User created successfully');
    expect(response.body).to.have.property('token');
  });

  it('should authenticate user and return token', async () => {
    // Create a new user first
    await request(app)
      .post('/signup')
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        mobile: '0987654321',
        password: 'password123'
      });

    const response = await request(app)
      .post('/login') // Assuming you have a login route for this
      .send({
        email: 'jane.doe@example.com',
        password: 'password123'
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('should return user details with valid token', async () => {
    const signupResponse = await request(app)
      .post('/signup')
      .send({
        name: 'Alice Smith',
        email: 'alice.smith@example.com',
        mobile: '555-1234',
        password: 'password123'
      });

    const token = signupResponse.body.token;

    const userResponse = await request(app)
      .get('/users/1') // Use a valid user ID here
      .set('Authorization', `Bearer ${token}`);

    expect(userResponse.status).to.equal(200);
    expect(userResponse.body).to.have.property('name', 'Alice Smith');
  });
});
