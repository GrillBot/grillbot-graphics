import { onRequest } from './src/chart/controller';
import express from 'express';
import { loggerMiddleware } from './src/logging';
import actuator from 'express-actuator';

const app = express();
app.use(loggerMiddleware);
app.use(actuator({}));
app.use(express.json())
app.post('/chart', onRequest);

app.listen(3000, () => console.log('App started on port 3000'));
