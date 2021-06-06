// // This plugin will open a window to prompt the user to enter a number, and
// // it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// // This file holds the main code for the plugins. It has access to the *document*.
// // You can access browser APIs in the <script> tag inside "ui.html" which has a
// // full browser environment (see documentation).
// // This shows the HTML page in "ui.html".
// figma.showUI(__html__);
// // Calls to "parent.postMessage" from within the HTML page will trigger this
// // callback. The callback will be passed the "pluginMessage" property of the
// // posted message.
// figma.ui.onmessage = msg => {
//   // One way of distinguishing between different types of messages sent from
//   // your HTML page is to use an object with a "type" property like this.
//   if (msg.type === 'create-rectangles') {
//     const nodes: SceneNode[] = [];
//     for (let i = 0; i < msg.count; i++) {
//       const rect = figma.createRectangle();
//       rect.x = i * 150;
//       rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
//       figma.currentPage.appendChild(rect);
//       nodes.push(rect);
//     }
//     figma.currentPage.selection = nodes;
//     figma.viewport.scrollAndZoomIntoView(nodes);
//   }
//   // Make sure to close the plugin when you're done. Otherwise the plugin will
//   // keep running, which shows the cancel button at the bottom of the screen.
//   figma.closePlugin();
// };
figma.showUI(__html__);
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.type == 'req') {
        const { contents } = msg.payload;
        contents.forEach((block, i) => __awaiter(this, void 0, void 0, function* () {
            if (block.image && block.image.hash) {
                const frame = figma.createFrame();
                frame.name = block.title ? block.title : block.content;
                frame.resize(500, 600);
                frame.x = i * 550;
                const rect = figma.createRectangle();
                rect.resize(400, 400);
                rect.x = 50;
                rect.y = 50;
                const newImage = figma.createImage(block.image.hash);
                rect.fills = [{ type: 'IMAGE', scaleMode: 'FIT', imageHash: newImage.hash }];
                frame.appendChild(rect);
                figma.currentPage.appendChild(frame);
            }
            else if (!block.image) {
                const frame = figma.createFrame();
                frame.name = block.title ? block.title : block.content;
                frame.resize(500, 600);
                frame.x = i * 550;
                const text = figma.createText();
                text.x = 50;
                text.y = 50;
                text.resize(400, 400);
                frame.appendChild(text);
                yield figma.loadFontAsync(text.fontName);
                text.characters = block.content;
                text.fontSize = 32;
            }
        }));
    }
});
