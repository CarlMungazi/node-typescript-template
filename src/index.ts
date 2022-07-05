/* eslint-disable import/extensions */
import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import { addRespondToResponse } from 'middleware/response';
import { handleError } from 'middleware/errors';
import { RouteNotFoundError } from 'errors';

import { attachPublicRoutes, attachPrivateRoutes } from './routes';

const initializeExpress = (): void => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(addRespondToResponse);

  attachPublicRoutes(app);
  attachPrivateRoutes(app);

  app.use((req, _res, next) => {
    console.log(req.originalUrl);
    next(new RouteNotFoundError(req.originalUrl));
  });
  app.use(handleError);

  app.listen(process.env.PORT || 3000);
};

const initializeApp = (): void => {
  initializeExpress();
};

initializeApp();
