import TRSRenderCollection from "./render_objects/render_collection";

export default class TRSRenderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private _scene: TRSRenderCollection | null;
    private _ui: TRSRenderCollection | null;
    private _running: boolean;
    private tickFns: ((dt: number) => void)[]

    /** Init renderer */
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this._scene = null;
        this._ui = null;
        this._running = false;
        this.tickFns = [];

        // Adjust size
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        // Setup autoadjust
        window.addEventListener('resize', () => {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
        });
    }

    /** Get or set scene */
    public scene(scene?: TRSRenderCollection): TRSRenderCollection | null {
        return scene ? 
            this._scene = scene : 
            this._scene;
    }

    /** Get or set ui scene */
    public ui(ui?: TRSRenderCollection): TRSRenderCollection | null {
        return ui ? 
            this._ui = ui : 
            this._ui;
    }

    /** Set or get running state */
    public running(state?: boolean): boolean {
        return typeof state === 'boolean' ? 
            this._running = state : 
            this._running;
    }

    /** Render step */
    public tick(dt: number): void {
        if (!this._scene && !this._ui) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this._scene) this._scene.onPaint(this.ctx, dt);
        if (this._ui) this._ui.onPaint(this.ctx, dt);
    }

    /** Start loop */
    public start(): void {
        let lastTime = Date.now();
        let currentTime = lastTime;
        console.log('running');
        

        this.running(true);
        const timeToTick = () => {
            for (const tickFn of this.tickFns) {
                tickFn(currentTime - lastTime);
            }

            this.tick(currentTime - lastTime);
            lastTime = currentTime;
            currentTime = Date.now();

            // Check is game running
            if (this._running) requestAnimationFrame(() => timeToTick());
        };

        // Calling first tick
        timeToTick();
    }

    /** Stop loop */
    public stop() {
        this.running(false);
    }

    /** Add tick function */
    public addTickStep(fn: (dt: number) => void): void {
        this.tickFns.push(fn);
    }
}