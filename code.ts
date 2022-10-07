// This plugin will open a window to prompt the user to enter a URL of notes, and it will then create that many notes on the screen.

// This file holds the main code for the plugins. It has access to the *document*. You can access browser APIs in the <script> tag inside "ui.html" which has a full browser environment (see documentation).

// This shows the HTML page in "ui.html".

// Calls to "parent.postMessage" from within the HTML page will trigger this callback. The callback will be passed the "pluginMessage" property of the posted message.

// You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'

figma.showUI(__html__);

figma.loadFontAsync({ family: "Inter", style: "Medium" });

// figma.viewport.zoom = 600;

figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from your HTML page is to use an object with a "type" property like this.

  if (msg.type === "create-shapes") {
    const nodes: SceneNode[] = [];

    let counter = 0;
    let row = 0;

    for (let i = 0; i < msg.notes.length; i++) {
      const frameNode = figma.createFrame();
      //   frameNode.name = "Thumbnail";
      frameNode.resize(960, 1000);

      frameNode.fills = [{ type: "SOLID", color: { r: 0, g: 1, b: 1 } }];
      figma.currentPage.appendChild(frameNode);
      nodes.push(frameNode);

      frameNode.setPluginData("comment", msg.notes[i]?.comment);
      frameNode.setPluginData("title", msg.notes[i]?.title);
      frameNode.setPluginData(
        "link",
        `https://app.heymarvin.com/annotation_tool/event/${msg.notes[i]?.key}`
      );

      frameNode.clipsContent = false;
      //   frameNode.layoutMode = "VERTICAL";
      frameNode.horizontalPadding = 10;
      frameNode.verticalPadding = 10;
      //   frameNode.layoutGrids;
      //   frameNode.absoluteTransform;

      if (counter == 6) {
        counter = 0;
        row = row + 1;
      } else {
        frameNode.x = counter * (frameNode.width + 400);
        frameNode.y = row * (frameNode.height + 400);
        counter = counter + 1;
      }

      const textNode1 = figma.createText();
      textNode1.characters = frameNode.getPluginData("title");
      textNode1.x = (frameNode.width - textNode1.width - 500) / 2;
      textNode1.y = (frameNode.height - textNode1.height - 900) / 2;
      textNode1.resize(900, 1000);
      //   textNode1.textAlignHorizontal = "";
      textNode1.textAutoResize = "HEIGHT";
      textNode1.fontSize = 20;
      frameNode.appendChild(textNode1);
      if (textNode1.characters.length < 40) {
        textNode1.fontSize = 40;
      }

      const textNode2 = figma.createText();
      textNode2.characters = frameNode.getPluginData("comment");
      textNode2.resize(900, 200);
      textNode2.x = (frameNode.width - textNode2.width) / 2;
      textNode2.y = (frameNode.height - textNode2.height) / 2;
      textNode2.textAlignHorizontal = "CENTER";
      textNode2.textAutoResize = "HEIGHT";
      frameNode.appendChild(textNode2);
      if (textNode2.characters.length < 200) {
        textNode2.fontSize = 40;
      }

      //   const textNode3 = figma.createLinkPreviewAsync(
      //     `https://app.heymarvin.com/annotation_tool/event/${msg.notes[i].key}`
      //   );

      const textNode3 = figma.createText();
      textNode3.characters = frameNode.getPluginData("link");
      textNode3.resize(900, 200);
      textNode3.x = (frameNode.width - textNode3.width) / 2;
      textNode3.y = (frameNode.height - textNode3.height + 900) / 2;
      textNode3.textAlignHorizontal = "CENTER";
      textNode3.textAutoResize = "HEIGHT";
      frameNode.appendChild(textNode3);
      textNode3.hyperlink;
      textNode3.textDecoration = "UNDERLINE";
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

//   const shape = figma.createShapeWithText();

//   shape.shapeType = "SQUARE";
//   shape.x = i * (shape.width + 200);
//   shape.fills = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];
//   figma.currentPage.appendChild(shape);
//   nodes.push(shape);
//   shape.setPluginData("comment", JSON.stringify(msg.notes[i].comment));
//   shape.setPluginData("title", JSON.stringify(msg.notes[i].title));
//   var textNode = figma.createText();
//   textNode.characters = shape.getPluginData("title");

//   //   shape.name = shape.getPluginData("notes");

//   //   shape.setPluginData("notes", msg.notes[i].wav.name);
//   shape.text.characters = shape.getPluginData("comment");
//   //   shape.text.getRangeTextDecoration(1, 3);
