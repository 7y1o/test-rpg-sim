import TRSRenderObject from './render_object';

export default class TRSProjectionObject extends TRSRenderObject {
    protected _translate: [number, number];
    protected _scale: number;
    protected object: TRSRenderObject;

    /** Construct */
    public constructor(name: string, object: TRSRenderObject) {
        super(name);
        this._translate = [0, 0];
        this._scale = 1;
        this.object = object;
    }

    /** Paint event */
    public onPaint(ctx: CanvasRenderingContext2D, dt: number) {
        ctx.translate(...this._translate);
        ctx.scale(this._scale, this._scale);
        this.object.onPaint(ctx, dt);
        ctx.resetTransform();
    }

    /** Get x translation value */
    public get x(): number {
        return this._translate[0];
    }

    /** Get y translation value */
    public get y(): number {
        return this._translate[1];
    }

    /** Get scale value */
    public get scale(): number {
        return this._scale;
    }

    /** Update x translation */
    public set x(value: number) {
        this._translate[0] = value;
    }

    /** Update y translation */
    public set y(value: number) {
        this._translate[1] = value;
    }

    /** Update scale */
    public set scale(value: number) {
        this._scale = value;
    }
}