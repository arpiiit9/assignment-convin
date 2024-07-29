import express from 'express';
import { createUser, getUserDetails, renderLoginPage,renderSignupPage } from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js'; // Import JWT authentication middleware


const router = express.Router();

// Route to create a new user (no authentication needed here)
router.get('/login', renderLoginPage);
router.get('/users', renderSignupPage);
router.post('/users', createUser);

// Route to get user details (requires JWT authentication)
router.get('/users/:id', authenticateJWT, getUserDetails);

export default router;


/*  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTcyY2FkYTg1ZDhjZWU0ODY4NTQ5ZCIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjIyMzE5ODEsImV4cCI6MTcyMjIzNTU4MX0.fDsnnH7mrEAHP-Cp8B0dWK1WdY6UiyVLpXFD90ISvWs"
} */