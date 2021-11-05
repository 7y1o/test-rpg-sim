import TRSRenderer from './engine/renderer';
import './style.css'

// Get app block
const app = document.querySelector<HTMLDivElement>('#app')!;

// Main canvas
const canvas = document.createElement('canvas');
app.appendChild(canvas);

// Game engine renderer
const renderer = new TRSRenderer(canvas);
renderer.tick(0);
