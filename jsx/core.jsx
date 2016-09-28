/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//***********BORDER*************//
function onClick_btn_border(bWidth, bColor, loopTog) {
  //alert(loopTog);
  bWidth = parseInt(bWidth);
  var borderCheck = layerCheck('border');
  var actionsCheck = layerCheck('actions');

  //make border if it doesn't exist
  if (borderCheck > -1) {
    fl.getDocumentDOM().getTimeline().deleteLayer(borderCheck);
    createBorderGuide(actionsCheck + 1, bWidth, bColor);
    createBorder(actionsCheck, bWidth, bColor, loopTog);
  } else {
    createBorderGuide(actionsCheck + 1, bWidth, bColor);
    createBorder(actionsCheck, bWidth, bColor, loopTog);
  }
  fl.actionsPanel.setSelection(0,0);
}

function createBorderGuide(actionsCheck, bWidth, bColor) {
  var dom = fl.getDocumentDOM();
  var domTimeline = fl.getDocumentDOM().getTimeline();

  //select top layer and crate border layer
  domTimeline.setSelectedLayers(actionsCheck);
  domTimeline.addNewLayer('border', 'guide', true);
  domTimeline.setSelectedLayers(actionsCheck);

  //draw and style border rectangle
  dom.addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, true);
  dom.selectAll();
  //style
  var borderStroke = fl.getDocumentDOM().getCustomStroke();
  borderStroke.thickness = bWidth;
  borderStroke.color = bColor;
  dom.setCustomStroke(borderStroke);
  dom.selectNone();

  //reset to default
  borderStroke.thickness = 1;
  dom.setCustomStroke(borderStroke);

  //lock the border layer
  domTimeline.layers[actionsCheck].locked = true;
}

function createBorder(actionsCheck, bWidth, bColor, loopTog) {
  var domActions = fl.actionsPanel;
  var domTimeline = fl.getDocumentDOM().getTimeline();
  var borderColor = bColor;
  var borderWidth = bWidth + 'px';
  var htmlBorder = 'document.getElementById("canvas").style.border = "' + borderWidth + ' solid ' + borderColor + '";';

  domTimeline.setSelectedLayers(0);
  var actionText = domActions.getText();

  if (actionsCheck > -1) {
    domTimeline.setSelectedFrames(0, 0, true);
    actionsSelect('document.getElementById("canvas").style.border', 69);
    //if border code already exists overwrite it
    if (fl.actionsPanel.hasSelection()) {
      domActions.replaceSelectedText(htmlBorder);
      //if it doesn't exist write new code
    } else {
      domActions.setText(actionText + '\n\n' + htmlBorder);
    }
  } else {
    domTimeline.addNewLayer('actions', 'normal', true);
    domTimeline.setSelectedLayers(0);
    domTimeline.setSelectedFrames(0, 0, true);
    domActions.setText(htmlBorder);
  }
}

//**************CLICK TAG***************//
function onClick_btn_clickTag() {
  fl.trace(x);

  var tagCheck = layerCheck('clickTag');
  var clickCheck = layerCheck('actions');

  //deletes previous clickTags
  if (fl.getDocumentDOM().library.itemExists('btn_clickTag')) {
    fl.getDocumentDOM().library.deleteItem('btn_clickTag');
  }

  giadcScriptInject(clickCheck);
  if (tagCheck > -1) {
    fl.getDocumentDOM().getTimeline().deleteLayer(tagCheck);
    createClickTag();
  } else {
    createClickTag();
  }
  fl.actionsPanel.setSelection(0,0);
  fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
}

function giadcScriptInject(clickCheck) {
  var clickCode = 'if (!this.loopNum) {\n\tvar script = document.createElement("script");\n\tscript.src = "//ssl.gannett-cdn.com/ads/giadc/scripts/giadc-basic-core.js";\n\tdocument.head.appendChild(script);\n}';
  var domTimeline = fl.getDocumentDOM().getTimeline();
  var domActions = fl.actionsPanel;
  domTimeline.setSelectedLayers(0);
  domTimeline.setSelectedFrames(0, 0, true);
  var actionText = domActions.getText();

  if (clickCheck > -1) {
    domTimeline.setSelectedFrames(0, 0, true);
    actionsSelect('if (!this.loopNum) {\n\tvar script = document.createElement("script")', 10);
    if (domActions.hasSelection()) {
      return;
    } else {
      domActions.setText(clickCode + '\n\n' + actionText);
    }
  } else {
    domTimeline.addNewLayer('actions', 'normal', true);
    domTimeline.setSelectedLayers(0);
    domTimeline.setSelectedFrames(0, 0, true);
    domActions.setText(clickCode);
    domActions.setSelection(0,0);
    }
}

function createClickTag() {
  var domTimeline = fl.getDocumentDOM().getTimeline();
  var dom = fl.getDocumentDOM();
  var domActions = fl.actionsPanel;
  domTimeline.setSelectedLayers(1);
  domTimeline.addNewLayer('clickTag', 'normal', true);
  domTimeline.setSelectedLayers(1);

  fl.getDocumentDOM().addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, false, true);
  //converts to button
  dom.selectAll();
  dom.convertToSymbol('button', 'btn_clickTag', 'top left');
  dom.selectAll();
  dom.enterEditMode('inPlace');

  //make new frames in button
  for (var i = 0; i < 3; i++) {
    domTimeline.insertFrames();
  }

  //select hit frame
  domTimeline.currentFrame = 3;

  //new keyframe on hit frame
  domTimeline.convertToKeyframes();

  //delete all frames before hit
  domTimeline.currentFrame = 0;
  dom.selectAll();
  dom.deleteSelection();

  //exit edit mode
  dom.exitEditMode();

  //set instance name
  domTimeline.layers[1].frames[0].elements[0].name = "btn_clickTag";

  //add actions to clickTag
  domActions.setText('this.btn_clickTag.addEventListener("click", fl_ClickToGoToWebPage_8);\n\nfunction fl_ClickToGoToWebPage_8() {\n\twindow.openAndTrack("default","default URL");\n}');
  domActions.setSelection(0,0);

  //lock and hide clickTag
  domTimeline.layers[1].visible = false;
  domTimeline.layers[1].locked = true;
}

//*****************LOOP******************//

function createLoop(loopTog) {
  var domTimeline = fl.getDocumentDOM().getTimeline();
  var domActions = fl.actionsPanel;
  var frameIndex = (domTimeline.frameCount) - 1;
  if(loopTog === 'true') {
    domTimeline.setSelectedFrames(frameIndex, frameIndex, true);
    //alert(fl.getDocumentDOM().getTimeline().frameCount);
    domTimeline.clearKeyframes();
    domTimeline.convertToKeyframes();
    domActions.setText('if (!this.alreadyExecuted) {\n\tthis.alreadyExecuted=true;\n\tthis.loopNum = 1;\n} else {\n\tthis.loopNum++;\n\tif (this.loopNum === 3) {\n\t\tthis.stop();\n\t}\n}');
    domActions.setSelection(0,0);
  } else {
    domTimeline.setSelectedLayers(0);
    domTimeline.setSelectedFrames(frameIndex, frameIndex, true);
    domTimeline.clearKeyframes();
  }
}

//**********Universal Functions**********//

function layerCheck(layerName) {
  var domTimeline = fl.getDocumentDOM().getTimeline();
  var layerAmt = fl.getDocumentDOM().getTimeline().layerCount;

  for (var i = 0; i < layerAmt; i++) {
    if (domTimeline.layers[i].name === layerName) {
      return i;
    }
  }
  return -1;
}

function actionsSelect(subFind, actionLength) {
  var domTimeline = fl.getDocumentDOM().getTimeline();
  var domActions = fl.actionsPanel;

  domTimeline.setSelectedLayers(0);
  domTimeline.setSelectedFrames(0, 0, true);
  var actionStart = domActions.getText().indexOf(subFind);
  domActions.setSelection(actionStart, actionLength);
}
