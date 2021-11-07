import TRSRenderObject from './render_object';

export default class TRSTileObject extends TRSRenderObject {
    protected tileMap: { img: HTMLImageElement, ready: boolean }[][];
    protected tileSize: number;
    protected _x: number;
    protected _y: number;

    /** Construct tile */
    public constructor(name: string, width: number, height: number, size: number, x: number, y: number) {
        super(name);
        this.tileMap = Array.from(new Array(width)).map(() => {
            return Array.from(new Array(height)).map(() => {
                return {
                    img: document.createElement('img'),
                    ready: false
                };
            });
        });
        this.tileSize = size;
        this._x = x;
        this._y = y;
    }

    /** Render tiles */
    public onPaint(ctx: CanvasRenderingContext2D) {
        for (let x = 0; x < this.tileMap.length; x++) {
            for (let y = 0; y < this.tileMap[x].length; y++) {
                if (!this.tileMap[x][y].ready) {
                    ctx.fillStyle = 'gray';
                    ctx.fillRect(
                        this._x + (x * this.tileSize),
                        this._y + (y * this.tileSize),
                        this.tileSize,
                        this.tileSize
                    );
                    continue;
                }

                ctx.drawImage(
                    this.tileMap[x][y].img,
                    this._x + (this.tileSize * x),
                    this._y + (this.tileSize * y),
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }

    /** Set tile image */
    public setTile(src: string, x: number, y: number): void {
        if (x > this.tileMap.length || y > this.tileMap[0].length) {
            throw new Error('Out of bounds');
        }

        this.tileMap[x][y].img.src = src;
        this.tileMap[x][y].img.onload = () => {
            this.tileMap[x][y].ready = true;
        };
    }
}
