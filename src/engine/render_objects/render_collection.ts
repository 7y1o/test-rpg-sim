import TRSRenderObject from "./render_object";

export default class TRSRenderCollection extends TRSRenderObject {
    private objects: TRSRenderObject[];

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
            if (obj.visiblity()) {
                obj.onPaint(ctx, dt);
            }
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

    /** Add object */
    public add(object: TRSRenderObject): void {
        this.objects.push(object);
        object.onConstruct();
    }

    /** Remove object by name */
    public removeByName(name: string): void {
        this.objects = this.objects.filter((i) => !i.matchName(name));
    }
}