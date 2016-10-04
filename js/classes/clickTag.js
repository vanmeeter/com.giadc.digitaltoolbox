(function() {

  ClickTagClass = function() {}
  var p = ClickTagClass.prototype;

  p.giadcScriptInject = function(clickCheck) {
    var util = new UtilitiesClass;
    var clickCode = 'if (!this.loopNum) {\n\tvar script = document.createElement("script");\n\tscript.src = "//ssl.gannett-cdn.com/ads/giadc/scripts/giadc-basic-core.js";\n\tdocument.head.appendChild(script);\n}';
    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
    var actionText = fl.actionsPanel.getText();

    if (clickCheck > -1) {
      fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
      util.actionsSelect('if (!this.loopNum) {\n\tvar script = document.createElement("script")', 10);
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
      if (fl.getDocumentDOM().frameRate != 30) {
        fl.getDocumentDOM().frameRate = 30;
      };
  }

  p.createClickTag = function(clickURL, clickNum) {
      fl.getDocumentDOM().getTimeline().setSelectedLayers(1);
      fl.getDocumentDOM().getTimeline().addNewLayer('clickTag' + clickNum, 'normal', true);
      fl.getDocumentDOM().getTimeline().setSelectedLayers(1);

      fl.getDocumentDOM().addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, false, true);
      //converts to button
      fl.getDocumentDOM().selectAll();
      fl.getDocumentDOM().convertToSymbol('button', 'btn_clickTag' + clickNum, 'top left');
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
      fl.getDocumentDOM().getTimeline().layers[1].frames[0].elements[0].name = 'btn_clickTag' + clickNum;

      //add actions to clickTag
      fl.actionsPanel.setText('this.btn_clickTag' + clickNum + '.addEventListener("click", fl_ClickToGoToWebPage_8);\n\nfunction fl_ClickToGoToWebPage_8() {\n\twindow.openAndTrack("default","' + clickURL['clickTag' + clickNum] + '");\n}');
      fl.actionsPanel.setSelection(0,0);

      //lock and hide clickTag
      fl.getDocumentDOM().getTimeline().layers[1].visible = false;
      fl.getDocumentDOM().getTimeline().layers[1].locked = true;
  }


}());
