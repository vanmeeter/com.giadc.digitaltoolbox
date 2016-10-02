(function() {

  LoopClass = function() {}
  var p = LoopClass.prototype

  p.loop = function(loopTog) {
    var frameIndex = (fl.getDocumentDOM().getTimeline().frameCount) - 1;
    if(loopTog === true) {
      fl.getDocumentDOM().getTimeline().setSelectedFrames(frameIndex, frameIndex, true);
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
}());
