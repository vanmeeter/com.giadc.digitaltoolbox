(function() {
  var replayIcon = fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/icons/replay_arrow.svg';

  LOOP =
  {
    loopToggle: function(loopTog) {
//*************LOOP***************//
      UI.timeline.activateTool;
      var frameIndex = (UI.timeline.frameCount) - 1;
      var staticCheck = UTIL.layerCheck('static');
      var actionsCheck = UTIL.layerCheck('actions');

      if(loopTog === 'true') {
        if (actionsCheck < 0) {
          UI.timeline.setSelectedLayers(0);
          UI.timeline.addNewLayer('actions', 'normal', true);
          UI.timeline.setSelectedLayers(0);
        }
        UI.timeline.setSelectedLayers(0);
        UI.timeline.setSelectedFrames(frameIndex, frameIndex, true);
        UI.timeline.clearKeyframes();

        if (UI.timeline.getFrameProperty('name') != 'loop') {
          UI.timeline.convertToKeyframes();
          UI.timeline.setFrameProperty('name', 'loop');
          fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.alreadyExecuted=true;\n\tthis.loopNum = 1;\n} else {\n\tthis.loopNum++;\n\tif (this.loopNum === 3) {\n\t\tthis.gotoAndStop(\'static\');\n\t}\n}');
          fl.actionsPanel.setSelection(0,0);
        }
      } else {
//*************REPLAY***************//
        if (actionsCheck < 0) {
          UI.timeline.setSelectedLayers(0);
          UI.timeline.addNewLayer('actions', 'normal', true);
          UI.timeline.setSelectedLayers(0);
        }
        UI.timeline.setSelectedLayers(0);
        UI.timeline.setSelectedFrames(frameIndex, frameIndex, true);
        UI.timeline.clearKeyframes();

        if (UI.timeline.getFrameProperty('name') != 'replay') {
          UI.dom.importFile(replayIcon, false, false, false);
          UI.timeline.setSelectedLayers(0);
          fl.getDocumentDOM().convertToSymbol('movie clip', 'replayArrow_inside', 'center');
          fl.getDocumentDOM().convertToSymbol('button', 'replay_bttn', 'center');
          UI.dom.enterEditMode('inPlace');
          UI.timeline.insertFrames();
          UI.timeline.convertToKeyframes();
          UI.timeline.setSelectedFrames(1, 1);
          UI.dom.convertToSymbol('movie clip', 'replayArrow', 'center');
          UI.dom.enterEditMode('inPlace');
          UI.timeline.convertToKeyframes();
          UI.timeline.setSelectedFrames(0, 0);
          UI.timeline.insertFrames(18);
          UI.timeline.createMotionTween();
          UI.timeline.setSelectedFrames(0, 0);
          UI.timeline.setFrameProperty('motionTweenRotate', 'clockwise');
          UI.timeline.layers[0].frames[0].setCustomEase('all', [ {x:0,y:0}, {x:0.8297,y:0}, {x:0.3123,y:1}, {x:1,y:1} ]);
          UI.timeline.layers[0].frames[0].hasCustomEase = true;
          UI.timeline.addNewLayer('actions', 'normal', true);
          UI.timeline.setSelectedLayers(0);
          UI.timeline.convertToKeyframes(19, 19);
          fl.actionsPanel.setText('this.stop();');
          UI.dom.exitEditMode();
          UI.timeline.convertToKeyframes(3, 3);
          UI.timeline.clearFrames(3, 3);
          var recStyle = UI.dom.getCustomFill();
          recStyle.style = 'solid';
          recStyle.color = '#000000';
          UI.dom.setCustomFill(recStyle);

          UI.dom.addNewRectangle(
            {
              left:-4.0,
              top:-2,
              right:305.9,
              bottom:341.9
            }, 0, false, true);
          UI.dom.exitEditMode();
          UI.timeline.deleteLayer(0);

          UI.timeline.setSelectedLayers(UTIL.layerCheck('actions'));
          UI.timeline.clearKeyframes(frameIndex, frameIndex);
          UI.timeline.convertToKeyframes(frameIndex, frameIndex);
          UI.timeline.setFrameProperty('name', 'replay');
          fl.actionsPanel.setText('this.stop();\n\nif (!this.alreadyExecuted) {\n\tthis.replay.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_replay.bind(this));\n}\n\nfunction fl_ClickToGoToAndPlayFromFrame_replay() {\n\tthis.alreadyExecuted=true;\n\tthis.gotoAndPlay(0);\n}');
          fl.actionsPanel.setSelection(0,0);
          UI.dom.library.selectItem('replay_bttn');
          UI.dom.library.addItemToDocument({x:UI.dom.width - 14, y:14});
          UI.dom.scaleSelection(0.06, 0.06, 'center');
          UI.timeline.layers[0].frames[frameIndex].elements[0].name = 'replay';
        }
      }
    }
  }
}());
