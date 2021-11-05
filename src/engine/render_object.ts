export default class TRSRenderObject {
    private readonly name: string;
    private isVisible: boolean;

    /** Create new render object */
    public constructor(name: string) {
        this.name = name;
        this.isVisible = true;
    }

    /** Construct event */
    public onConstruct(): void {}

    /** Paint event */
    public onPaint(ctx: CanvasRenderingContext2D, dt: number): void {}

    /** Destruct event */
    public onDestruct(): void {}

    /** Match name check */
    public matchName(name: string): boolean {
        return this.name === name;
    }

    /** Set or get visibility */
    public visiblity(state?: boolean): boolean | null {
        return typeof state === 'boolean' ? 
            this.isVisible = state : 
            this.isVisible;
    }
}