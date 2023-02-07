import express from 'express';

interface RequestStatistics {
    endpoint: string;
    count: number;
    lastRequestAt: string;
}

interface Stats {
    requestsCount: number;
    measuredFrom: string | null;
    endpoints: RequestStatistics[];
}

const stats: Stats = {
    requestsCount: 0,
    measuredFrom: null,
    endpoints: []
};

export const requestsCounter = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
    stats.requestsCount++;

    if (!stats.measuredFrom) {
        stats.measuredFrom = new Date().toISOString();
    }

    const endpoint = stats.endpoints.find(o => o.endpoint === request.url);
    if (!endpoint) {
        stats.endpoints.push({
            count: 1,
            lastRequestAt: new Date().toISOString(),
            endpoint: request.url
        });
    } else {
        endpoint.count++;
        endpoint.lastRequestAt = new Date().toISOString();
    }

    next();
};

export const statsEndpoint = (request: express.Request, response: express.Response): void => {
    response.status(200).json(stats);
};
