/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//***********BORDER*************//
function onClick_btn_border(bWidth, bColor) {
  bWidth = parseInt(bWidth);
  var borderCheck = layerCheck('border');
  var actionsCheck = layerCheck('actions');
  //alert(bWidth + ' : ' + typeof(bWidth));
  //make border if it doesn't exist
  if (borderCheck > -1) {
    fl.getDocumentDOM().getTimeline().deleteLayer(borderCheck);
    createBorderGuide(actionsCheck + 1, bWidth, bColor);
    createBorder(actionsCheck, bWidth, bColor);
  } else {
    createBorderGuide(actionsCheck + 1, bWidth, bColor);
    createBorder(actionsCheck, bWidth, bColor);
  }
}

function createBorderGuide(ac, bWidth, bColor) {

  //select top layer and crate border layer
  fl.getDocumentDOM().getTimeline().setSelectedLayers(ac);
  fl.getDocumentDOM().getTimeline().addNewLayer('border', 'guide', true);
  fl.getDocumentDOM().getTimeline().setSelectedLayers(ac);

  //draw and style border rectangle
  fl.getDocumentDOM().addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, true);
  fl.getDocumentDOM().selectAll();
  //style
  var borderStroke = fl.getDocumentDOM().getCustomStroke();
  //alert(bWidth + ' : ' + typeof(bwidth));
  borderStroke.thickness = bWidth;
  borderStroke.color = bColor;
  fl.getDocumentDOM().setCustomStroke(borderStroke);
  fl.getDocumentDOM().selectNone();

  //reset to default
  borderStroke.thickness = 1;
  fl.getDocumentDOM().setCustomStroke(borderStroke);

  //lock the border layer
  fl.getDocumentDOM().getTimeline().layers[ac].locked = true;
}

function createBorder(ac, bWidth, bColor) {

  var borderColor = bColor;
  var borderWidth = bWidth + 'px';
  fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
  var actionText = fl.actionsPanel.getText();

  if (ac > -1) {
    actionsSelect('document.getElementById("canvas").style.border', 69);
    if (fl.actionsPanel.hasSelection()) {
      fl.actionsPanel.replaceSelectedText('document.getElementById("canvas").style.border = "' + borderWidth + ' solid ' + borderColor + '";');
      fl.actionsPanel.setSelection(0,0);
    } else {
      fl.actionsPanel.setText(actionText + '\n\ndocument.getElementById("canvas").style.border = "' + borderWidth + ' solid ' + borderColor + '";');
      fl.actionsPanel.setSelection(0,0);
    }
  } else {
    fl.getDocumentDOM().getTimeline().addNewLayer('actions', 'normal', true);
    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    fl.actionsPanel.setText('document.getElementById("canvas").style.border = "' + borderWidth + ' solid ' + borderColor + '";');
    fl.actionsPanel.setSelection(0,0);
  }
}

//**************CLICK TAG***************//
function onClick_btn_clickTag() {
  var tagCheck = layerCheck('clickTag');
  var clickCheck = layerCheck('actions');
  giadcScriptInject(clickCheck);
  if (tagCheck > -1) {
    fl.getDocumentDOM().getTimeline().deleteLayer(tagCheck);
    createClickTag();
  } else {
    createClickTag();
  }
}

function giadcScriptInject(cc) {
  fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
  var actionText = fl.actionsPanel.getText();

  if (cc > -1) {
    actionsSelect('if (!this.loopNum) {\n\tvar script = document.createElement("script")', 10);
    if (fl.actionsPanel.hasSelection()) {
      fl.actionsPanel.setSelection(0,0);
      return;
    } else {
      fl.actionsPanel.setText('if (!this.loopNum) {\n\tvar script = document.createElement("script");\n\tscript.src = "//ssl.gannett-cdn.com/ads/giadc/scripts/giadc-basic-core.js";\n\tdocument.head.appendChild(script);\n}\n\n' + actionText);
      fl.actionsPanel.setSelection(0,0);
    }
  } else {
    fl.getDocumentDOM().getTimeline().addNewLayer('actions', 'normal', true);
    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    fl.actionsPanel.setText('if (!this.loopNum) {\n\tvar script = document.createElement("script");\n\tscript.src = "//ssl.gannett-cdn.com/ads/giadc/scripts/giadc-basic-core.js";\n\tdocument.head.appendChild(script);\n}');
    fl.actionsPanel.setSelection(0,0);
    }
}

function createClickTag() {
  fl.getDocumentDOM().getTimeline().setSelectedLayers(1);
  fl.getDocumentDOM().getTimeline().addNewLayer('clickTag', 'normal', true);
  fl.getDocumentDOM().getTimeline().setSelectedLayers(1);

  fl.getDocumentDOM().addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, false, true);

  //TODO convert to button

  fl.actionsPanel.setText('this.btn_clickTag.addEventListener("click", fl_ClickToGoToWebPage_8);\n\nfunction fl_ClickToGoToWebPage_8() {\n\twindow.openAndTrack("default","default URL");\n}');
  fl.actionsPanel.setSelection(0,0);
  fl.getDocumentDOM().getTimeline().layers[1].visible = false;
  fl.getDocumentDOM().getTimeline().layers[1].locked = true;
  fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
}

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
  var actionStart = fl.actionsPanel.getText().indexOf(subFind);
  fl.actionsPanel.setSelection(actionStart, actionLength);
}
