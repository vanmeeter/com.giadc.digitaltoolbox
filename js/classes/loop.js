(function() {

  LoopClass = function() {}
  var p = LoopClass.prototype;

  p.loop = function(loopTog) {
    var frameIndex = (fl.getDocumentDOM().getTimeline().frameCount) - 1;
    var staticCheck = UTIL.layerCheck('static');
    var actionsCheck = UTIL.layerCheck('actions');
    if(loopTog === 'true') {
      if (actionsCheck === -1) {
        fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
        fl.getDocumentDOM().getTimeline().addNewLayer('actions', 'normal', true);
        fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
      }
      if (staticCheck === -1) {
        fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
        fl.getDocumentDOM().getTimeline().addNewLayer('static', 'normal', false);
        fl.getDocumentDOM().getTimeline().setSelectedLayers(1);
        fl.getDocumentDOM().getTimeline().convertToKeyframes(frameIndex, frameIndex);
        fl.getDocumentDOM().getTimeline().setFrameProperty('name', 'static');
      }
      fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
      fl.getDocumentDOM().getTimeline().setSelectedFrames(frameIndex, frameIndex, true);
      if (fl.getDocumentDOM().getTimeline().getFrameProperty('name') != 'loop') {
        fl.getDocumentDOM().getTimeline().convertToKeyframes();
        fl.getDocumentDOM().getTimeline().setFrameProperty('name', 'loop');
        if (staticCheck > -1) {
          fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.alreadyExecuted=true;\n\tthis.loopNum = 1;\n} else {\n\tthis.loopNum++;\n\tif (this.loopNum === 3) {\n\t\tthis.gotoAndStop(\'static\');\n\t}\n}');
        } else {
          fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.alreadyExecuted=true;\n\tthis.loopNum = 1;\n} else {\n\tthis.loopNum++;\n\tif (this.loopNum === 3) {\n\t\tthis.stop(\'static\');\n\t}\n}');
        }
        fl.actionsPanel.setSelection(0,0);
      }
    } else {
      fl.getDocumentDOM().getTimeline().setSelectedLayers(actionsCheck);
      fl.getDocumentDOM().getTimeline().setSelectedFrames(frameIndex, frameIndex, true);
      fl.getDocumentDOM().getTimeline().clearKeyframes();
    }
  }
}());
