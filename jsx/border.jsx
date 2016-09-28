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
  createLoop(loopTog);
  fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
}

function createBorderGuide(ac) {
  var borderStroke = fl.getDocumentDOM().getCustomStroke();

  //select top layer and crate border layer
  fl.getDocumentDOM().getTimeline().setSelectedLayers(ac);
  fl.getDocumentDOM().getTimeline().addNewLayer('border', 'guide', true);
  fl.getDocumentDOM().getTimeline().setSelectedLayers(ac);

  //draw and style border rectangle
  fl.getDocumentDOM().addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, true);
  fl.getDocumentDOM().selectAll();
  borderStroke.thickness = 2;
  //borderStroke.color = '#000000'; chose to leave this up to the designer, border color will be made based on what is selected
  fl.getDocumentDOM().setCustomStroke(borderStroke);
  fl.getDocumentDOM().selectNone();
  //reset to default
  borderStroke.thickness = 1;
  fl.getDocumentDOM().setCustomStroke(borderStroke);
  //lock the border layer
  fl.getDocumentDOM().getTimeline().layers[ac].locked = true;
}

function createBorder(ac) {
  //TODO get text fields to work

  var borderColor = '#000000';
  var borderWidth = '1px';
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
