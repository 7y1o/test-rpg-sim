import TRSRenderObject from "../render_object";

export default class TRSImageObject extends TRSRenderObject {
    protected img: HTMLImageElement;
    protected ready: boolean;
    protected _width: number;
    protected _height: number;
    protected _x: number;
    protected _y: number;

    /** Construct image object */
    public constructor(name: string, url: string, { width, height, x, y }: { width?: number, height?: number, x?: number, y?: number }) {
        super(name);
        this.ready = false;

        this._width = width ?? 100;
        this._height = height ?? 100;
        this._x = x ?? 16;
        this._y = y ?? 16;

        this.img = new Image();
        this.img.src = url;
        this.img.onload = () => this.ready = true;
    }

    /** Paint event */
    public onPaint(ctx: CanvasRenderingContext2D) {
        if (this.ready) {
            ctx.drawImage(this.img, this._x, this._y, this._width, this._height);
            return;
        }

        ctx.fillStyle = 'gray';
        ctx.fillRect(this._x, this._y, this._width, this._height);
        ctx.fillStyle = 'white';
        ctx.font = '16 sans-serif';
        ctx.fillText('loading...', this._x + ((this._width / 2) - (ctx.measureText('loading...').width / 2)), this._y + (this._height / 2) - 8, this._width);
    }
}