import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { expect } from 'chai';
import Expense from '../models/Expense.js'; // Adjust the path to your Expense model
import app from '../app.js'; // Your Express app

// Test suite for expense routes
describe('Expense Routes', () => {
  before(async () => {
    // Connect to MongoDB before tests
    await mongoose.connect('mongodb://localhost:27017/expenses_test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Clean up and disconnect after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should create an expense with equal split', async () => {
    const response = await request(app)
      .post('/expenses/equal')
      .send({
        description: 'Dinner',
        totalAmount: 60,
        friends: [
          { name: 'Alice' },
          { name: 'Bob' }
        ]
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('description', 'Dinner');
    expect(response.body.friends[0]).to.have.property('amountOwed', 30);
    expect(response.body.friends[1]).to.have.property('amountOwed', 30);
  });

  it('should create an expense with exact amounts', async () => {
    const response = await request(app)
      .post('/expenses/exact')
      .send({
        description: 'Lunch',
        totalAmount: 50,
        friends: [
          { name: 'Charlie' },
          { name: 'David' }
        ],
        amounts: [20, 30]
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('description', 'Lunch');
    expect(response.body.friends[0]).to.have.property('amountOwed', 20);
    expect(response.body.friends[1]).to.have.property('amountOwed', 30);
  });

  it('should create an expense with percentage splits', async () => {
    const response = await request(app)
      .post('/expenses/percentage')
      .send({
        description: 'Movie',
        totalAmount: 100,
        friends: [
          { name: 'Eve' },
          { name: 'Frank' }
        ],
        percentages: [40, 60]
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('description', 'Movie');
    expect(response.body.friends[0]).to.have.property('amountOwed', 40);
    expect(response.body.friends[1]).to.have.property('amountOwed', 60);
  });

  it('should return error for invalid percentage total', async () => {
    const response = await request(app)
      .post('/expenses/percentage')
      .send({
        description: 'Concert',
        totalAmount: 200,
        friends: [
          { name: 'George' },
          { name: 'Hannah' }
        ],
        percentages: [70, 40]
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error', 'Percentages must add up to 100%');
  });
});
