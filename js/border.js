(function() {

  BorderClass = function() {}
  var p = BorderClass.prototype;


//*******************CREATE HTML BORDER*********************//

  p.createBorderGuide = function (actionsCheck, tagCheck, bWidth, bColor) {
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
    fl.getDocumentDOM().addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, true, false);
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

//*******************CREATE HTML BORDER*********************//

  p.createBorder = function(actionsCheck, bWidth, bColor) {

    var util = new UtilitiesClass;
    var borderColor = bColor;
    var borderWidth = bWidth + 'px';
    var htmlBorder = 'document.getElementById("canvas").style.border = "' + borderWidth + ' solid ' + borderColor + '";';

    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    var actionText = fl.actionsPanel.getText();

    if (actionsCheck > -1) {
      fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
      util.actionsSelect('document.getElementById("canvas").style.border', 69);
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

}());
