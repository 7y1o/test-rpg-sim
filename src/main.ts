import TRSRenderer from './engine/renderer';
import TRSRenderCollection from './engine/render_collection';
import TRSImageObject from './engine/render_objects/image';
import TRSUIHBox from './engine/ui/ui_h_box';
import TRSUIRoundedRect from './engine/ui/ui_rounded_rect';
import TRSUIVBox from './engine/ui/ui_v_box';
import './style.css'

// Get app block
const app = document.querySelector<HTMLDivElement>('#app')!;

// Main canvas
const canvas = document.createElement('canvas');
app.appendChild(canvas);

// Run game
const renderer = new TRSRenderer(canvas);

// Rects
const rect1 = new TRSUIRoundedRect('rect 1', 0, 0, 64, 64, '#ff0000', 'white');
const rect2 = new TRSUIRoundedRect('rect 2', 0, 0, 64, 64, '#00ff00', 'white');
const rect3 = new TRSUIRoundedRect('rect 3', 0, 0, 64, 64, '#0000ff', 'white');

rect1.round = 4;
rect2.round = 8;
rect3.round = 16;

// Hor box
const hbox = new TRSUIHBox('hbox', 16, 16, 64, 64, 'black', 'white');
hbox.gap = 16;
hbox.addChild(rect1);
hbox.addChild(rect2);
hbox.addChild(rect3);

// Ver box
const vbox = new TRSUIVBox('vbox', 16, 16, 32, 32, 'black', 'white');
vbox.gap = 16;
vbox.addChild(hbox);
vbox.addChild(hbox);
vbox.addChild(hbox);

// Image
const img = new TRSImageObject('test img', 'https://picsum.photos/800/600', {
  width: 800,
  height: 600,
  x: 16,
  y: 256
});

// Start renderer
renderer.scene(new TRSRenderCollection(
  'main scene',
  vbox,
  img
));
renderer.start();
