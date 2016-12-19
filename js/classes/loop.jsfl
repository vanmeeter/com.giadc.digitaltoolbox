(function() {
  var replayIcon = fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/icons/replay_arrow.svg';
  var loopCode = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/animateCC_code/loopCode.txt');

  LOOP =
  {
    loopToggle: function(loopTog) {
//*************LOOP***************//

      var frameIndex = (UI.timeline.frameCount) - 1;

      if(loopTog === 'true') {

        UI.timeline.setSelectedLayers(UTIL.layerCheck('actions'));
        UI.timeline.setSelectedFrames(frameIndex, frameIndex, true);
        UI.timeline.clearKeyframes();

        UI.timeline.convertToKeyframes();
        UI.timeline.setFrameProperty('name', 'loop');
        fl.actionsPanel.setText(loopCode.slice(12, loopCode.indexOf('//replay code')));
        fl.actionsPanel.setSelection(0,0);

//*************REPLAY***************//
      } else {

        UI.timeline.setSelectedLayers(UTIL.layerCheck('actions'));
        UI.timeline.setSelectedFrames(frameIndex, frameIndex, true);
        UI.timeline.clearKeyframes();
        //import replay svg
        UI.dom.importFile(replayIcon, false, false, false);
        UI.timeline.setSelectedLayers(0);
        //create symbols
        fl.getDocumentDOM().convertToSymbol('movie clip', 'replayArrow_inside', 'center');
        fl.getDocumentDOM().convertToSymbol('button', 'replay_bttn', 'center');
        UI.dom.enterEditMode('inPlace');
        UI.timeline.insertFrames();
        UI.timeline.convertToKeyframes();
        UI.timeline.setSelectedFrames(1, 1);
        UI.dom.convertToSymbol('movie clip', 'replayArrow', 'center');
        //animate icon
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
        //set hit box
        UI.timeline.convertToKeyframes(3, 3);
        UI.timeline.clearFrames(3, 3);
        var recStyle = UI.dom.getCustomFill();
        var legacyStyle = UI.dom.getCustomFill('toolbar');
        recStyle.style = 'solid';
        recStyle.color = '#000000';
        UI.dom.setCustomFill(recStyle);
        UI.dom.addNewRectangle(
          {
            left:8,
            top:6,
            right:37,
            bottom:37.5
          }, 0, false, true);
        UI.dom.setCustomFill(legacyStyle);
        UI.dom.exitEditMode();
        UI.timeline.deleteLayer(0);
        //place replay button on actions layer
        UI.timeline.setSelectedLayers(UTIL.layerCheck('actions'));
        UI.timeline.clearKeyframes(frameIndex, frameIndex);
        UI.timeline.convertToKeyframes(frameIndex, frameIndex);
        UI.timeline.setFrameProperty('name', 'replay');
        fl.actionsPanel.setText(loopCode.slice(loopCode.indexOf('//replay code') + 14, loopCode.length - 1));
        fl.actionsPanel.setSelection(0,0);
        UI.dom.library.selectItem('replay_bttn');
        UI.dom.library.addItemToDocument({x:UI.dom.width - 16, y:16});
        UI.dom.scaleSelection(0.8, 0.8, 'center');
        UI.timeline.layers[0].frames[frameIndex].elements[0].name = 'replay';
      }
    }
  }
}());
