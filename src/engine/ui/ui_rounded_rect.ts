import TRSUIBase from "./ui_base";

export default class TRSUIRoundedRect extends TRSUIBase {
    protected _round: number = 4;
    
    /** Get round size */
    public get round(): number {
        return this._round;
    }

    /** Set round size */
    public set round(size: number) {        
        this._round = size > Math.min(this._width, this._height) ? Math.min(this._width, this._height) / 2 : size;
    }

    /** Paint event */
    public onPaint(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this._bg;

        // Create rect
        ctx.beginPath();
        ctx.moveTo(this._x, this._y + this._round);
        ctx.lineTo(this._x + this._round, this._y);
        ctx.lineTo(this._x + this._width - this._round, this._y);
        ctx.lineTo(this._x + this._width, this._y + this._round);
        ctx.lineTo(this._x + this._width, this._y + this._height - this._round);
        ctx.lineTo(this._x + this._width - this._round, this._y + this._height);
        ctx.lineTo(this._x + this._round, this._y + this._height);
        ctx.lineTo(this._x, this._y + this._height - this._round);
        ctx.closePath();

        // Create rounded shapes
        const generateArc = (x: number, y: number, from: number): void => {
            ctx.arc(x, y, this._round, from + (Math.PI / 180), from + 90 + (Math.PI / 180));
        };
        generateArc(this._x + this._round, this._y + this._round, 270);
        generateArc(this._x + this._width - this._round, this._y + this._round, 0);
        generateArc(this._x + this._width - this._round, this._y + this._height - this._round, 90);
        generateArc(this._x + this._round, this._y + this._height - this._round, 180);
        ctx.fill();
    }
}