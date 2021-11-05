import TRSRenderObject from "../render_object";

export default class TRSUIBase extends TRSRenderObject {
    protected _width: number;
    protected _height: number;
    protected _bg: string;
    protected _fg: string;
    protected _x: number;
    protected _y: number;

    /** Create base ui element */
    public constructor(name: string, x: number, y: number, w: number, h: number, bg: string, fg: string) {
        super(name);
        this._x = x;
        this._y = y;
        this._width = w;
        this._height = h;
        this._bg = bg;
        this._fg = fg;
    }

    /** Paint event */
    public onPaint(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this._bg;
        ctx.fillRect(this._x, this._y, this._width, this._height);
        
        const text = 'Hello, World!';
        ctx.fillStyle = this._fg;
        ctx.font = '16px sans-serif';
        ctx.fillText(
            text,
            16 + ((this._width - 32) / 2) - (ctx.measureText(text).width / 2),
            16 + ((this._width - 32) / 2) - 8,
            this._width - 32
        );
    }

    /** Size setter */
    public set size({ w, h }: {w?: number, h?: number}) {
        this._width = w ?? this._width;
        this._height = h ?? this._height;
    }
    
    /** Colors setter */
    public set colors({ fg, bg }: {fg?: string, bg?: string}) {
        this._fg = fg ?? this._fg;
        this._bg = bg ?? this._bg;
    }

    /** Get width */
    public get width(): number {
        return this._width;
    }

    /** Get height */
    public get height(): number {
        return this._height;
    }

    /** Get x position */
    public get x(): number {
        return this._x;
    }

    /** Get y position */
    public get y(): number {
        return this._y;
    }

    /** Get foreground color */
    public get fg(): string {
        return this._fg;
    }

    /** Get background color */
    public get bg(): string {
        return this._bg;
    }
}