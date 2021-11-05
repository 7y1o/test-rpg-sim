import TRSRenderObject from "./render_object";

export default class TRSRenderCollection extends TRSRenderObject {
    private readonly objects: TRSRenderObject[];

    /** Construct */
    public constructor(name: string, ...objects: TRSRenderObject[]) {
        super(name);
        this.objects = [...objects];
    }

    /** Construct event */
    public onConstruct(): void {
        for (const obj of this.objects) {
            obj.onConstruct();
        }
    }

    /** Paint event */
    public onPaint(ctx: CanvasRenderingContext2D, dt: number): void {
        for (const obj of this.objects) {
            obj.onPaint(ctx, dt);
        }
    }

    /** Destruct event */
    public onDestruct(): void {
        for (const obj of this.objects) {
            obj.onDestruct();
        }
    }

    /** Get render object by name */
    public getByName(name: string): TRSRenderObject | null {
        for (const obj of this.objects) {
            if (obj.matchName(name)) return obj;
        }
        return null;
    }
}