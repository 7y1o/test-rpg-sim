import TRSRenderCollection from "./render_collection";

export default class TRSRenderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private _scene: TRSRenderCollection | null;
    private _running: boolean;

    /** Init renderer */
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this._scene = null;
        this._running = false;

        // Adjust size
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        // Setup autoadjust
        this.canvas.addEventListener('resize', () => {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
        });
    }

    /** Get or set scene */
    public scene(scene?: TRSRenderCollection): TRSRenderCollection | null {
        if (scene) {
            this._scene = scene;
            return null;
        }

        return this._scene;
    }

    /** Set or get running state */
    public running(state?: boolean): boolean | null {
        return typeof state === 'boolean' ? 
            this._running = state : 
            this._running;
    }

    /** Render step */
    public tick(dt: number): void {
        if (!this._scene) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._scene!.onPaint(this.ctx, dt);
    }

    /** Start loop */
    public start(): void {
        let lastTime = Date.now();
        let currentTime = lastTime;

        this.running(true);
        while (this._running) {
            this.tick(currentTime - lastTime);
            lastTime = currentTime;
            currentTime = Date.now();
        }
    }

    /** Stop loop */
    public stop() {
        this.running(false);
    }
}