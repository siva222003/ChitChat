import express from "express";
import authRoutes from './auth.routes'
const router = express.Router()

router.use('/api/auth',authRoutes);
// router.use('/api/user', require('./userRoutes'));


export {router}