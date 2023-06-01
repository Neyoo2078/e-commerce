import express from 'express';
import {
  makeOrder,
  getOrder,
  updateOrder,
  FetchOrder,
} from '../Actions/OrderAction.js';
import { UserAuth } from '../MiddleWares/Auth.js';

export const OrderRouter = express.Router();

OrderRouter.post('/order', UserAuth, makeOrder);

OrderRouter.get('/getorder/:id', getOrder);

OrderRouter.post('/updateorder/:id', updateOrder);

OrderRouter.get('/allorders/:id', UserAuth, FetchOrder);
