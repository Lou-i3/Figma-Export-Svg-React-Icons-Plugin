// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 300, title: "Export Svg React Icons" });

figma.on("selectionchange", async () => {
  let svgTxt
  try {
    if (figma.currentPage.selection[0]) {
      svgTxt = await figma.currentPage.selection[0].exportAsync({
        format: "SVG_STRING",
        svgOutlineText: false
      });

      const svgReact = svgTxt
        .replaceAll("stroke-linecap", "strokeLinecap")
        .replaceAll("stroke-linejoin", "strokeLinejoin")
        .replaceAll("stroke-width", "strokeWidth")
        .replaceAll("fill-rule", "fillRule")
        .replaceAll("clip-rule", "clipRule")
        .replace(/width="([0-9]+)"/g, '')
        .replace(/height="([0-9]+)"/g, '')
        .replaceAll(/stroke="([^"]+)"/g, '')
        .replace(/fill="([^"]+)"/g, 'className="outlined"')
        .replaceAll(/fill="([^"]+)"/g, '')

      // console.log("Selection changed !", svgReact)

      figma.ui.postMessage(svgReact)
    } else {
      figma.ui.postMessage("Please select an icon.")
    }


  } catch (err) {
    console.log("An error ocurred while converting: ", err)
    figma.ui.postMessage("An error ocurred while converting.")

  }

})



