import express from 'express';

import {
  FetchProduct,
  ProductDeatils,
  seedProduct,
  ProductSearch,
  ProductCategory,
} from '../Actions/product.js';

export const ProductRouter = express.Router();

ProductRouter.get('/', FetchProduct);
ProductRouter.get('/seed', seedProduct);

ProductRouter.get('/details/:id', ProductDeatils);

ProductRouter.get('/search', ProductSearch);

ProductRouter.get('/categories', ProductCategory);
