import express from 'express';
import { userSignup, userSignin, userUpdate } from '../Actions/UserActions.js';

const userRouter = express.Router();

userRouter.post('/signup', userSignup);

userRouter.post('/signin', userSignin);

userRouter.post('/update/:id', userUpdate);

export default userRouter;
