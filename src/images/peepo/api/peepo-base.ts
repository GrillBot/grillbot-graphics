import { Canvas, CanvasRenderingContext2D, createCanvas, Image, loadImage } from "canvas";
import * as path from 'path';
import * as fs from 'fs';

const templatePath = path.join(__dirname, '../templates');
export const readTemplate = (filename: string) => fs.readFileSync(path.join(templatePath, filename));

export abstract class PeepoImageBase {
    constructor(
        private avatarFrames: string[],
        private width: number,
        private height: number
    ) { }

    async render(): Promise<Buffer[]> {
        const operations = this.avatarFrames
            .map(o => Buffer.from(o, 'base64'))
            .map(o => this.renderFrame(o));

        return await Promise.all(operations);
    }

    private async renderFrame(frameBuffer: Buffer): Promise<Buffer> {
        const profilePictureFrame = await loadImage(frameBuffer);
        const canvas = createCanvas(this.width, this.height);
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        await this.renderConcreteFrame(profilePictureFrame, canvas, context);

        return canvas.toBuffer();
    }

    protected abstract renderConcreteFrame(profilePictureFrame: Image, canvas: Canvas, context: CanvasRenderingContext2D): Promise<void>;
}
