# Are.na Figma Plugin

Figma plugin that imports the first 50 blocks from any public Are.na channel into your Figma.

## Files

`ui.html`: This file handles the UI of the plugin and the logic of pulling data from an Are.na channel and passing it down to Figma

`code.ts`: This file handles the Figma API and rendering onto a Figma page. It compiles itself into `code.js`

## Limitations

- A lot of the images stored on Are.na can't be requested from within Figma due to CORS errors, so those blocks are currently skipped
- Using an image in Figma requires encoding the image into a buffer which takes time so the plugin can be slow sometimes
- The plugin can only fetch data from public channels because there's no user authentication yet


