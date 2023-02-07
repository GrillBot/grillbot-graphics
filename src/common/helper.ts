import express from 'express';

export class ResponseHelper {
    static writePngResponse(response: express.Response, data: Buffer): void {
        this.writeResponse(response, data, 200, 'image/png');
    }

    static writeResponse(response: express.Response, data: Buffer, statusCode: number, contentType: string): void {
        response.writeHead(statusCode, {
            'Content-Type': contentType,
            'Content-Length': data.length
        }).end(data);
    }
}

export class FormatHelper {
    static formatNumber(value: number): string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
