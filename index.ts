import { errorHandler } from './src/common/error';
import express from 'express';
import { loggerMiddleware } from './src/logging';
import actuator from 'express-actuator';
import * as chart from './src/chart';
import * as common from './src/common';

const app = express();
app.use(express.json())
app.use(loggerMiddleware);
app.use(actuator({}));
app.use(common.requestsCounter);

app.post('/chart', common.validate(chart.validators), (request, response, next) => new common.RequestProcessing(request, response, next).execute(chart.onRequest));
app.get('/stats', common.statsEndpoint);
app.use(errorHandler);

app.listen(3000, () => console.log('App started on port 3000'));
