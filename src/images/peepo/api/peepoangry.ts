import { Image, Canvas, CanvasRenderingContext2D, loadImage } from "canvas";
import { PeepoImageBase, readTemplate } from "./peepo-base";

const peepoAngryImage = readTemplate('peepoangry.png');

export class PeepoAngry extends PeepoImageBase {
    constructor(avatarFrames: string[]) {
        super(avatarFrames, 250, 105);
    }

    protected async renderConcreteFrame(profilePictureFrame: Image, canvas: Canvas, context: CanvasRenderingContext2D): Promise<void> {
        context.drawImage(profilePictureFrame, 20, 10);
        context.drawImage(await loadImage(peepoAngryImage), 115, -5);
    }
}
