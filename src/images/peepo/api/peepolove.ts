import { Image, Canvas, CanvasRenderingContext2D, loadImage } from 'canvas';
import { PeepoImageBase, readTemplate } from './peepo-base';

const peepoBody = readTemplate('body.png');
const peepoHands = readTemplate('hands.png');
const topOffset = -115;

export class PeepoLove extends PeepoImageBase {
    constructor(avatarFrames: string[]) {
        super(avatarFrames, 512, 397);
    }

    protected async renderConcreteFrame(profilePictureFrame: Image, canvas: Canvas, context: CanvasRenderingContext2D): Promise<void> {
        context.drawImage(await loadImage(peepoBody), 0, topOffset);
        context.drawImage(profilePictureFrame, 5, canvas.height - profilePictureFrame.height - 15);
        context.drawImage(await loadImage(peepoHands), 0, topOffset);
    }
}
