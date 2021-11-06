import TRSUIBase from "./ui_base";

export default class TRSUIVBox extends TRSUIBase {
    protected _gap: number;
    protected _children: TRSUIBase[];

    public constructor(name: string, x: number, y: number, w: number, h: number, fg: string, bg: string) {
        super(name, x, y, w, h, bg, fg);
        this._gap = 4;
        this._children = [];
    }

    /** Gap getter */
    public get gap(): number {
        return this._gap;
    }

    /** Gap setter */
    public set gap(size: number) {
        this._gap = size;
    }

    /** Add new child */
    public addChild(child: TRSUIBase): void {
        this._children.push(child);
    }

    /** Remove child */
    public removeChild(name: string): void {
        this._children = this._children.filter((c) => !c.matchName(name));
    }

    /** Paint event */
    public onPaint(ctx: CanvasRenderingContext2D): void {
        let lastBottomPos = this._y;
        let current = 0;
        for (const child of this._children) {
            if (!child.visiblity()) continue;

            child.position = { x: this._x, y: lastBottomPos + (current > 0 ? this._gap : 0) };
            child.onPaint(ctx);
            
            lastBottomPos = child.y + child.height;
            current++;
        }
    }
}