import express from 'express';

interface Stats {
    totalRequestCount: number;
    todayRequests: { count: number, date: string },
    chartRequestsCount: number;
    measuredFrom: string | null;
}

const stats: Stats = {
    totalRequestCount: 0,
    todayRequests: {
        count: 0,
        date: ''
    },
    chartRequestsCount: 0,
    measuredFrom: null
};

export const requestsCounter = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
    if (!stats.measuredFrom) {
        stats.measuredFrom = new Date().toISOString();
    }

    stats.totalRequestCount++;

    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    if (stats.todayRequests.date !== today) {
        stats.todayRequests.date = today;
        stats.todayRequests.count = 0;
    }
    stats.todayRequests.count++;

    if (request.url.includes('/chart')) {
        stats.chartRequestsCount++;
    }

    next();
};

export const statsEndpoint = (request: express.Request, response: express.Response): void => {
    response.status(200).json(stats);
};
