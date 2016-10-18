(function() {

    DISCLAIMER =
  {
    draw: function(disclaimer) {
      UI.timeline.setSelectedLayers(Math.abs(UTIL.layerCheck('border')));
      UI.timeline.addNewLayer('disclaimer', 'normal', false);
      
      //create temp text box to get dynamic height of disclaimer
      UI.dom.addNewText(
        {
          left:12,
          top:0,
          right:UI.dom.width - 16,
          bottom:5
        }, disclaimer.text);
      UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].setTextAttr('face', 'Gf-OpenSans');
      UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].setTextAttr('size', 10);
      UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].setTextAttr('alignment', 'left');
      UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].setTextAttr("lineSpacing", 0);
      disclaimer.height = UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].height + 13;
      UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer'));
      UI.dom.deleteSelection();
      //make main disclaimer box
      var recStyle = UI.dom.getCustomFill();
      var legacyStyle = UI.dom.getCustomFill('toolbar');
      recStyle.style = 'solid';
      recStyle.color = disclaimer.color;
      UI.dom.setCustomFill(recStyle);
      UI.dom.addNewPrimitiveRectangle(
        {
          left:6,
          top:UI.dom.height - disclaimer.height,
          right:UI.dom.width - 6,
          bottom:UI.dom.height + 5
        },0, false, true);
        UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer'));
        UI.dom.setRectangleObjectProperty('topLeftRadius', disclaimer.corner * 8);
        UI.dom.breakApart();
        //make display tab
        UI.dom.addNewPrimitiveRectangle(
          {
            left:UI.dom.width - 69,
            top:UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].top - 18,
            right:UI.dom.width - 6,
            bottom:UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].top + 20
          },0, false, true);
        UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer'));
        UI.dom.setRectangleObjectProperty('topLeftRadius', disclaimer.corner * 8);
        UI.dom.breakApart();
        UI.dom.selectNone();
        //reset to previous settings
        UI.dom.setCustomFill(legacyStyle);
    },

    addText: function(disclaimer) {
      UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer'));

      UI.dom.addNewText(
        {
          left:UI.dom.width - 69,
          top:UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].top,
          right:UI.dom.width - 6,
          bottom:UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].top + 14,
        }, 'DISCLAIMER');
        //alert(UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].top);

        UI.dom.addNewText(
          {
            left:12,
            top:UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].top + 25,
            right:UI.dom.width - 16,
            bottom:UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].top + 30
          }, disclaimer.text);

          textDisp = UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[1];
          textMain = UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[2];
          textDisp.setTextAttr('fillColor', disclaimer.fontColor);
          textMain.setTextAttr('fillColor', disclaimer.fontColor);
          textDisp.setTextAttr('face', 'HelveticaNeue');
          textMain.setTextAttr('face', 'HelveticaNeue');
          textDisp.setTextAttr('size', 9);
          textMain.setTextAttr('size', 10);
          textDisp.setTextAttr('alignment', 'center');
          textMain.setTextAttr('alignment', 'left');
          textMain.setTextAttr("lineSpacing", 0);
    },

    animate: function(disclaimer) {
      var animCode = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/animateCC_code/disclaimer.txt');
      UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer'));
      UI.dom.convertToSymbol('movie clip', 'disclaimer_content', 'top left');
      UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].name = 'disclaimer_content';
      UI.dom.convertToSymbol('movie clip', 'disclaimer', 'top left');
      UI.dom.enterEditMode('inPlace');
      UI.timeline.insertFrames(21);
      UI.timeline.addNewLayer('actions', 'normal', true);
      fl.actionsPanel.setText(animCode);
      fl.actionsPanel.setSelection(0, 0);
      UI.timeline.setSelectedLayers(1);
      UI.timeline.convertToKeyframes(21, 21);
      UI.timeline.setSelectedFrames(0, 0);
      UI.timeline.createMotionTween();
      UI.dom.moveSelectionBy({x:0, y:disclaimer.height});
      UI.timeline.layers[1].frames[0].setCustomEase('all', [ {x:0,y:0}, {x:0.8297,y:0}, {x:0.3123,y:1}, {x:1,y:1} ]);
      UI.timeline.layers[1].frames[0].hasCustomEase = true;
      //exit edit mode
      UI.dom.exitEditMode();
      UI.timeline.layers[UTIL.layerCheck('disclaimer')].frames[0].elements[0].name = 'disclaimer';
      if (disclaimer.clickthrough === true) {
        for (var i = 0; i < 10; i++) {
          if (UTIL.layerCheck('clickTag' + i) > -1) {
            UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + i));
            for (var j = 0; j < UI.timeline.frameCount; j++) {
              if (!UI.timeline.layers[UTIL.layerCheck('clickTag' + i)].frames[j].isEmpty) {
                UI.timeline.setSelectedFrames(j, j);
                var clickCode = fl.actionsPanel.getText();
              }
            }
          }
        }
        clickCode = clickCode.replace(/btn_clickTag\d/, 'disclaimer');
        UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer'));
        fl.actionsPanel.setText(clickCode);
        fl.actionsPanel.setSelection(0, 0);
      }
    }
  }

}());
