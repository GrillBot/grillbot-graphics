import express from 'express';
import { createCanvas, loadImage, Image } from 'canvas';
import * as path from 'path';
import * as fs from 'fs'
import { RequestData } from './request';

const basePath = path.join(__dirname, 'templates');
const background = fs.readFileSync(path.join(basePath, 'xDaysBackground.png'));
const head = fs.readFileSync(path.join(basePath, 'xDaysHead.png'));
const pliers = fs.readFileSync(path.join(basePath, 'xDaysPliers.png'));
const size = { width: 1907, height: 963 };

const cache: { background: any, head: any, pliers: any } = {
    background: null,
    head: null,
    pliers: null
}

export const onRequest = async (request: express.Request, response: express.Response) => {
    const body: RequestData = request.body;
    const canvas = createCanvas(size.width, size.height);
    const context = canvas.getContext('2d');
    const profilePictureBuffer = Buffer.from(body.profilePicture, 'base64');

    context.font = `${fontSize(body.days)} Open Sans`;
    context.globalCompositeOperation = 'source-over';
    context.antialias = 'subpixel';
    context.imageSmoothingEnabled = true;

    if (!cache.background) { cache.background = await loadImage(background); }
    if (!cache.head) { cache.head = await loadImage(head); }
    if (!cache.pliers) { cache.pliers = await loadImage(pliers); }

    context.drawImage(cache.background, 0, 0, size.width, size.height);
    context.fillText(body.days.toString(), numberPosition(body.days, 'x'), numberPosition(body.days, 'y'));
    context.drawImage(cache.head, 0, 0, size.width, size.height);
    context.drawImage(await loadImage(profilePictureBuffer), 560, 266, 230, 200);
    context.drawImage(cache.pliers, 0, 0, size.width, size.height);

    const image = canvas.toBuffer();
    response.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length
    }).end(image);
}

const fontSize = (value: number) => {
    if (value < 10) { return '100px'; }
    else if (value >= 10 && value < 100) { return '70px'; }
    else { return '50px'; }
}

const numberPosition = (value: number, coordinate: 'x' | 'y'): number => {
    if (value < 10) { return coordinate == 'x' ? 1060 : 280; }
    else if (value >= 10 && value < 100) { return coordinate == 'x' ? 1053 : 270; }
    else { return coordinate == 'x' ? 1048 : 250; }
}
