(function() {

  BORDER =
  {
  //*************************CREATE BORDER*************************//

  createBorder: function (actionsCheck, tagCheck, bWidth, bColor) {
      //select top layer and crate border layer and keep border layer below clicktag
      if (tagCheck === -1) {
        (actionsCheck === -1) ? UI.timeline.setSelectedLayers(actionsCheck + 1) : UI.timeline.setSelectedLayers(actionsCheck);
        (actionsCheck === -1) ? UI.timeline.addNewLayer('border', 'normal', true) : UI.timeline.addNewLayer('border', 'normal', false);
      } else {
        UI.timeline.setSelectedLayers(parseInt(UI.timeline.findLayerIndex('clickTag1')));
        UI.timeline.addNewLayer('border', 'normal', false);
      }
      UI.timeline.setSelectedLayers(parseInt(UI.timeline.findLayerIndex('border')));
      //draw and style border rectangle
      fl.getDocumentDOM().addNewRectangle({left:bWidth / 2,top:bWidth / 2,right:fl.getDocumentDOM().width - bWidth / 2,bottom:fl.getDocumentDOM().height - bWidth / 2},0, true, false);
      UI.timeline.setSelectedLayers(parseInt(UI.timeline.findLayerIndex('border')));
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
      UI.timeline.layers[parseInt(UI.timeline.findLayerIndex('border'))].locked = true;
    }
  }

//*******************CREATE HTML BORDER*********************//

  /*p.createBorder = function(actionsCheck, bWidth, bColor) {

    alert(bWidth);
    var htmlBorder = "getElementsByTagName(\'BODY\').innerHTML = \'<div style=\"position:absolute; top:" + bWidth + "; left:" + bWidth + "; width:" + (fl.getDocumentDOM().width - bWidth * 2) + "px; height:" + (fl.getDocumentDOM().height - bWidth * 2) + "px; border:" + bWidth + "px solid " + bColor + ";\"></div>;\';";

    UI.timeline.setSelectedLayers(0);
    var actionText = fl.actionsPanel.getText();

    if (actionsCheck > -1) {
      UI.timeline.setSelectedFrames(0, 0, true);
      UTIL.actionsSelect('document.getElementById("canvas").style.border', 69);
      //if border code already exists overwrite it
      if (fl.actionsPanel.hasSelection()) {
        fl.actionsPanel.replaceSelectedText(htmlBorder);
        //if it doesn't exist write new code
      } else {
        fl.actionsPanel.setText(actionText + '\n\n' + htmlBorder);
      }
    } else {
      UI.timeline.addNewLayer('actions', 'normal', true);
      UI.timeline.setSelectedLayers(0);
      UI.timeline.setSelectedFrames(0, 0, true);
      fl.actionsPanel.setText(htmlBorder);
    }
  };*/

}());

/*
getElementsByTagName('BODY').innerHTML = '<div style="position:absolute; top:1; left:1; width:298px; height:248px border:1px solid #000000"></div>;';

'document.getElementById("canvas").innerHTML = <div style="position:absolute; top:0; left:0; width:100%; height:' + bWidth + 'px; background-color:' + bColor + ';"></div><div style="position:absolute; top:0; right:0; width:' + bWidth + 'px; height:100%; background-color:' + bColor + ';"></div><div style="position:absolute; bottom:0; left:0; width:100%; height:' + bWidth + 'px; background-color:' + bColor + ';"></div><div style="position:absolute; top:0; left:0; width:' + bWidth + 'px; height:100%; background-color:' + bColor + ';"></div>;';
d = '<div style="position:absolute; top:bWidth; left:bWidth; width:'fl.getDocumentDOM().width - bWidth'px; height:'fl.getDocumentDOM().width - bWidth'px"></div>',
r = '<div style="position:absolute; top:0; right:0; width:' + n + "px; height:100%; background-color: " + e + ';"></div>',
a = '<div style="position:absolute; bottom:0; left:0; width:100%; height:' + n + "px; background-color: " + e + ';"></div>',
c = '<div style="position:absolute; top:0; left:0; width:' + n + "px; height:100%; background-color: " + e + ';"></div>';*/
