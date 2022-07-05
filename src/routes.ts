import { Express } from 'express';

export const attachPublicRoutes = (app: Express): void => {
  app.get('/health-public', (_req, res) => {
    res.status(200).send('Everything is bho in public!');
  });
};

export const attachPrivateRoutes = (app: Express): void => {
  app.get('/health-private', (_req, res) => {
    res.status(200).send('Everything is bho in private!');
  });
};
