figma.showUI(__html__)
figma.ui.resize(325, 450);

figma.ui.onmessage = async (msg) => {

  if (msg.type == 'req') {
    const { contents } = msg.payload;

    contents.forEach(async (block, i) => {
      if (block.image && block.image.hash) {
        const frame = figma.createFrame()
        frame.name = block.title ? block.title : block.content;
        frame.resize(500, 600);
        const xPos = i % 10;
        const yPos = Math.floor((i / 10) % 10) - 1;
        frame.x = xPos * 550;
        frame.y = yPos * 650;

        const rect = figma.createRectangle()
        rect.name = 'Image'
        rect.resize(400, 400);
        rect.x = 50;
        rect.y = 50;
        const newImage = figma.createImage(block.image.hash);
        rect.fills = [{type: 'IMAGE', scaleMode: 'FIT', imageHash: newImage.hash}];
        frame.appendChild(rect);
        
        if(block.source && block.source.url) {
          const text = figma.createText()
          text.x = 50
          text.y = 475
          text.resize(400, 100);
          frame.appendChild(text);

          await figma.loadFontAsync(text.fontName as FontName)
          text.characters = block.source.url;
          text.setRangeHyperlink(0, text.characters.length, { type: 'URL', value: block.source.url});
          if (text.characters.length > 200) {
            text.fontSize = 14;
          } else if (text.characters.length > 120) {
            text.fontSize = 16;
          } else {
            text.fontSize = 20;
          }
        }

        frame.expanded = false;
        figma.currentPage.appendChild(frame);

      } else if (!block.image) {
        const frame = figma.createFrame()
        frame.name = block.title ? block.title : block.content;
        frame.resize(500, 600);
        const xPos = i % 10;
        const yPos = Math.floor((i / 10) % 10) - 1;
        frame.x = xPos * 550;
        frame.y = yPos * 650;

        const text = figma.createText()
        text.x = 50
        text.y = 50
        text.resize(400, 400);
        frame.appendChild(text);

        await figma.loadFontAsync(text.fontName as FontName)
        text.characters = block.content;
        text.fontSize = 32;

        frame.expanded = false;
        figma.currentPage.appendChild(frame);

      }
    })
  }

  figma.closePlugin();
}
