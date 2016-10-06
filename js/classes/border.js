(function() {

  BorderClass = function() {}
  var p = BorderClass.prototype;


//*************************CREATE BORDER*************************//

p.createBorder = function (actionsCheck, tagCheck, bWidth, bColor) {
    //select top layer and crate border layer and keep border layer below clicktag
    if (tagCheck === -1) {
      (actionsCheck === -1) ? fl.getDocumentDOM().getTimeline().setSelectedLayers(actionsCheck + 1) : fl.getDocumentDOM().getTimeline().setSelectedLayers(actionsCheck);
      (actionsCheck === -1) ? fl.getDocumentDOM().getTimeline().addNewLayer('border', 'normal', true) : fl.getDocumentDOM().getTimeline().addNewLayer('border', 'normal', false);
      (actionsCheck === -1) ? fl.getDocumentDOM().getTimeline().setSelectedLayers(actionsCheck + 1) : fl.getDocumentDOM().getTimeline().setSelectedLayers(actionsCheck)
    } else {
      fl.getDocumentDOM().getTimeline().setSelectedLayers(tagCheck);
      fl.getDocumentDOM().getTimeline().addNewLayer('border', 'normal', false);
      fl.getDocumentDOM().getTimeline().setSelectedLayers(tagCheck + 1);
    }
    //draw and style border rectangle
    fl.getDocumentDOM().addNewRectangle({left:bWidth / 2,top:bWidth / 2,right:fl.getDocumentDOM().width - bWidth / 2,bottom:fl.getDocumentDOM().height - bWidth / 2},0, true, false);
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
    (tagCheck === -1) ? fl.getDocumentDOM().getTimeline().layers[actionsCheck + 1].locked = true : fl.getDocumentDOM().getTimeline().layers[tagCheck + 1].locked = true;
  };

//*******************CREATE HTML BORDER*********************//

  /*p.createBorder = function(actionsCheck, bWidth, bColor) {

    alert(bWidth);
    var htmlBorder = "getElementsByTagName(\'BODY\').innerHTML = \'<div style=\"position:absolute; top:" + bWidth + "; left:" + bWidth + "; width:" + (fl.getDocumentDOM().width - bWidth * 2) + "px; height:" + (fl.getDocumentDOM().height - bWidth * 2) + "px; border:" + bWidth + "px solid " + bColor + ";\"></div>;\';";

    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    var actionText = fl.actionsPanel.getText();

    if (actionsCheck > -1) {
      fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
      UTIL.actionsSelect('document.getElementById("canvas").style.border', 69);
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
  };*/

}());

/*
getElementsByTagName('BODY').innerHTML = '<div style="position:absolute; top:1; left:1; width:298px; height:248px border:1px solid #000000"></div>;';

'document.getElementById("canvas").innerHTML = <div style="position:absolute; top:0; left:0; width:100%; height:' + bWidth + 'px; background-color:' + bColor + ';"></div><div style="position:absolute; top:0; right:0; width:' + bWidth + 'px; height:100%; background-color:' + bColor + ';"></div><div style="position:absolute; bottom:0; left:0; width:100%; height:' + bWidth + 'px; background-color:' + bColor + ';"></div><div style="position:absolute; top:0; left:0; width:' + bWidth + 'px; height:100%; background-color:' + bColor + ';"></div>;';
d = '<div style="position:absolute; top:bWidth; left:bWidth; width:'fl.getDocumentDOM().width - bWidth'px; height:'fl.getDocumentDOM().width - bWidth'px"></div>',
r = '<div style="position:absolute; top:0; right:0; width:' + n + "px; height:100%; background-color: " + e + ';"></div>',
a = '<div style="position:absolute; bottom:0; left:0; width:100%; height:' + n + "px; background-color: " + e + ';"></div>',
c = '<div style="position:absolute; top:0; left:0; width:' + n + "px; height:100%; background-color: " + e + ';"></div>';*/
