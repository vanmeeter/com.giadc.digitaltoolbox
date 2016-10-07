(function() {

  LOOP =
  {
    loopToggle: function(loopTog) {
      UI.timeline.activateTool;
      var frameIndex = (UI.timeline.frameCount) - 1;
      var staticCheck = UTIL.layerCheck('static');
      var actionsCheck = UTIL.layerCheck('actions');
      if(loopTog === 'true') {
        if (actionsCheck === -1) {
          UI.timeline.setSelectedLayers(0);
          UI.timeline.addNewLayer('actions', 'normal', true);
          UI.timeline.setSelectedLayers(0);
        }
        if (staticCheck === -1) {
          UI.timeline.setSelectedLayers(0);
          UI.timeline.addNewLayer('static', 'normal', false);
          UI.timeline.setSelectedLayers(1);
          UI.timeline.convertToKeyframes(frameIndex, frameIndex);
          UI.timeline.setFrameProperty('name', 'static');
        }
        UI.timeline.setSelectedLayers(0);
        UI.timeline.setSelectedFrames(frameIndex, frameIndex, true);
        if (UI.timeline.getFrameProperty('name') != 'loop') {
          UI.timeline.convertToKeyframes();
          UI.timeline.setFrameProperty('name', 'loop');
          if (staticCheck > -1) {
            fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.alreadyExecuted=true;\n\tthis.loopNum = 1;\n} else {\n\tthis.loopNum++;\n\tif (this.loopNum === 3) {\n\t\tthis.gotoAndStop(\'static\');\n\t}\n}');
          } else {
            fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.alreadyExecuted=true;\n\tthis.loopNum = 1;\n} else {\n\tthis.loopNum++;\n\tif (this.loopNum === 3) {\n\t\tthis.stop(\'static\');\n\t}\n}');
          }
          fl.actionsPanel.setSelection(0,0);
        }
      } else {
        UI.timeline.setSelectedLayers(actionsCheck);
        UI.timeline.setSelectedFrames(frameIndex, frameIndex, true);
        UI.timeline.clearKeyframes();
      }
    }
  }
}());