/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//***********BORDER*************//
function onClick_btn_border(bWidth, bColor, loopTog) {
  //alert(loopTog);
  //fl.runScript('file:////jsx/test.js');
  //alert(fl.getDocumentDOM().pathURI);
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
  var tagCheck = layerCheck('clickTag');
  //select top layer and crate border layer and keep border layer below clicktag
  if (tagCheck === -1) {
    fl.getDocumentDOM().getTimeline().setSelectedLayers(actionsCheck);
    fl.getDocumentDOM().getTimeline().addNewLayer('border', 'guide', true);
    fl.getDocumentDOM().getTimeline().setSelectedLayers(actionsCheck);
  } else {
    fl.getDocumentDOM().getTimeline().setSelectedLayers(tagCheck + 1);
    fl.getDocumentDOM().getTimeline().addNewLayer('border', 'guide', true);
    fl.getDocumentDOM().getTimeline().setSelectedLayers(tagCheck + 1);
  }
  //draw and style border rectangle
  fl.getDocumentDOM().addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, true);
  fl.getDocumentDOM().selectAll();
  //style
  var borderStroke = fl.getDocumentDOM().getCustomStroke();
  borderStroke.thickness = bWidth;
  borderStroke.color = bColor;
  borderStroke.joinType = 'miter';
  fl.getDocumentDOM().setCustomStroke(borderStroke);
  fl.getDocumentDOM().selectNone();

  //reset to default
  borderStroke.thickness = 1;
  fl.getDocumentDOM().setCustomStroke(borderStroke);

  //lock the border layer
  fl.getDocumentDOM().getTimeline().layers[actionsCheck].locked = true;
}

function createBorder(actionsCheck, bWidth, bColor, loopTog) {

  var borderColor = bColor;
  var borderWidth = bWidth + 'px';
  var htmlBorder = 'document.getElementById("canvas").style.border = "' + borderWidth + ' solid ' + borderColor + '";';

  fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
  var actionText = fl.actionsPanel.getText();

  if (actionsCheck > -1) {
    fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
    actionsSelect('document.getElementById("canvas").style.border', 69);
    //if border code already exists overwrite it
    if (fl.actionsPanel.hasSelection()) {
      fl.actionsPanel.replaceSelectedText(htmlBorder);
      //if it doesn't exist write new code
    } else {
      fl.actionsPanel.setText(actionText + '\n\n' + htmlBorder);
    }
  } else {
    fl.getDocumentDOM().getTimeline().addNewLayer('actions', 'normal', true);
    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
    fl.actionsPanel.setText(htmlBorder);
  }
}

//**************CLICK TAG***************//
function onClick_btn_clickTag() {

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
  fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
  fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
  var actionText = fl.actionsPanel.getText();

  if (clickCheck > -1) {
    fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
    actionsSelect('if (!this.loopNum) {\n\tvar script = document.createElement("script")', 10);
    if (fl.actionsPanel.hasSelection()) {
      fl.actionsPanel.setSelection(0,0);
    } else {
      fl.actionsPanel.setText(clickCode + '\n\n' + actionText);
    }
  } else {
    fl.getDocumentDOM().getTimeline().addNewLayer('actions', 'normal', true);
    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
    fl.actionsPanel.setText(clickCode);
    fl.actionsPanel.setSelection(0,0);
    }
}

function createClickTag() {
    fl.getDocumentDOM().getTimeline().setSelectedLayers(1);
    fl.getDocumentDOM().getTimeline().addNewLayer('clickTag', 'normal', true);
    fl.getDocumentDOM().getTimeline().setSelectedLayers(1);

    fl.getDocumentDOM().addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, false, true);
    //converts to button
    fl.getDocumentDOM().selectAll();
    fl.getDocumentDOM().convertToSymbol('button', 'btn_clickTag', 'top left');
    fl.getDocumentDOM().selectAll();
    fl.getDocumentDOM().enterEditMode('inPlace');

    //make new frames in button
    fl.getDocumentDOM().getTimeline().insertFrames();
    fl.getDocumentDOM().getTimeline().insertFrames();
    fl.getDocumentDOM().getTimeline().insertFrames();

    //select hit frame
    fl.getDocumentDOM().getTimeline().currentFrame = 3;

    //new keyframe on hit frame
    fl.getDocumentDOM().getTimeline().convertToKeyframes();

    //delete all frames before hit
    fl.getDocumentDOM().getTimeline().currentFrame = 0;
    fl.getDocumentDOM().selectAll();
    fl.getDocumentDOM().deleteSelection();

    //exit edit mode
    fl.getDocumentDOM().exitEditMode();

    //set instance name
    fl.getDocumentDOM().getTimeline().layers[1].frames[0].elements[0].name = "btn_clickTag";

    //add actions to clickTag
    fl.actionsPanel.setText('this.btn_clickTag.addEventListener("click", fl_ClickToGoToWebPage_8);\n\nfunction fl_ClickToGoToWebPage_8() {\n\twindow.openAndTrack("default","default URL");\n}');
    fl.actionsPanel.setSelection(0,0);

    //lock and hide clickTag
    fl.getDocumentDOM().getTimeline().layers[1].visible = false;
    fl.getDocumentDOM().getTimeline().layers[1].locked = true;
    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
}

//*****************LOOP******************//

function createLoop(loopTog) {

  var frameIndex = (fl.getDocumentDOM().getTimeline().frameCount) - 1;
  if(loopTog === 'true') {
    fl.getDocumentDOM().getTimeline().setSelectedFrames(frameIndex, frameIndex, true);
    //alert(fl.getDocumentDOM().getTimeline().frameCount);
    fl.getDocumentDOM().getTimeline().clearKeyframes();
    fl.getDocumentDOM().getTimeline().convertToKeyframes();
    fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.alreadyExecuted=true;\n\tthis.loopNum = 1;\n} else {\n\tthis.loopNum++;\n\tif (this.loopNum === 3) {\n\t\tthis.stop();\n\t}\n}');
    fl.actionsPanel.setSelection(0,0);
  } else {
    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    fl.getDocumentDOM().getTimeline().setSelectedFrames(frameIndex, frameIndex, true);
    fl.getDocumentDOM().getTimeline().clearKeyframes();
  }
}

//**********Universal Functions**********//

function layerCheck(layerName) {

  var layerAmt = fl.getDocumentDOM().getTimeline().layerCount;

  for (var i = 0; i < layerAmt; i++) {
    if (fl.getDocumentDOM().getTimeline().layers[i].name === layerName) {
      return i;
    }
  }
  return -1;
}

function actionsSelect(subFind, actionLength) {

  fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
  fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
  var actionStart = fl.actionsPanel.getText().indexOf(subFind);
  fl.actionsPanel.setSelection(actionStart, actionLength);
}
