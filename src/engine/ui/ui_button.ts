import TRSUIBase from './ui_base';

export default class TRSUIButton extends TRSUIBase {
    protected bgObject: TRSUIBase;
    protected text: string;
    protected action: () => void;

    /** Make button */
    public constructor(name: string, x: number, y: number, w: number, h: number, bg: TRSUIBase, text: string, action?: () => void) {
        super(name, x, y, w, h, '#000', '#fff');
        this.bgObject = bg;
        this.text = text;
        this.action = action ?? (() => {});
        window.addEventListener('click', (e) => {
            if (e.offsetX > x && e.offsetX < x + w && e.offsetY > y && e.offsetX < y + h) {
                this.action();
            }
        });
    }

    /** Set action */
    public setAction(action: () => void): void {
        this.action = action;
    }

    /** Paint event */
    public onPaint(ctx: CanvasRenderingContext2D) {
        // TODO
    }
}