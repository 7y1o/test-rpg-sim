import TRSUIBase from "./ui_base";

export default class TRSUIRect extends TRSUIBase {

    /** Paint event */
    public onPaint(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.fg;
        ctx.fillRect(this._x, this._y, this._width, this._height);
    }
}