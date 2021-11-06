export default class TRSKeyboard {
    private activeKeys: string[];
    private mappings: { [key: string]: (dt: number) => void };

    /** Create keyboard */
    public constructor() {
        this.activeKeys = [];
        this.mappings = {};

        // Setup events
        window.addEventListener('keydown', (e: KeyboardEvent) => !this.activeKeys.includes(e.key.toLowerCase()) ? this.activeKeys.push(e.key.toLowerCase()) : null);
        window.addEventListener('keyup', (e: KeyboardEvent) => this.activeKeys = this.activeKeys.filter((k) => k.toLowerCase() !== e.key.toLowerCase()));
    }

    /** Add key to mapping */
    public addMapKey(key: string, action: (dt: number) => void): void {
        this.mappings[key] = action;
    }

    /** Update */
    public update(dt: number): void {
        for (const key of this.activeKeys) {
            if (this.mappings[key]) this.mappings[key](dt);
        }
    }
}