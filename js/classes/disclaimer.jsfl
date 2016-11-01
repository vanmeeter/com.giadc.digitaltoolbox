(function() {

    DISCLAIMER =
  {
    draw: function(disclaimer, discNum) {
      UI.timeline.setSelectedLayers(Math.abs(UTIL.layerCheck('border')));
      UI.timeline.addNewLayer('disclaimer' + discNum, 'normal', false);

      //create temp text box to get dynamic height of disclaimer
      UI.dom.addNewText(
        {
          left:12,
          top:0,
          right:UI.dom.width - 16,
          bottom:5
        }, disclaimer['disc_text' + discNum]);
      UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].setTextAttr('face', 'Gf-OpenSans');
      UI.timeline.layers[UTIL.layerCheck('disclaimer'+ discNum)].frames[0].elements[0].setTextAttr('size', 10);
      UI.timeline.layers[UTIL.layerCheck('disclaimer'+ discNum)].frames[0].elements[0].setTextAttr('alignment', 'left');
      UI.timeline.layers[UTIL.layerCheck('disclaimer'+ discNum)].frames[0].elements[0].setTextAttr("lineSpacing", 0);
      disclaimer.height = UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].height + 13;
      UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer' + discNum));
      UI.dom.deleteSelection();
      //make main disclaimer box
      var recStyle = UI.dom.getCustomFill();
      var legacyStyle = UI.dom.getCustomFill('toolbar');
      recStyle.style = 'solid';
      recStyle.color = disclaimer.color;
      UI.dom.setCustomFill(recStyle);

      if (disclaimer.hover === true) {
        UI.dom.addNewPrimitiveRectangle(
          {
            left:6,
            top:UI.dom.height - disclaimer.height,
            right:UI.dom.width - 6,
            bottom:UI.dom.height + 5
          },0, false, true);
          UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer' + discNum));
          UI.dom.setRectangleObjectProperty('topLeftRadius', disclaimer.corner * 8);
          UI.dom.breakApart();
          //make display tab
          UI.dom.addNewPrimitiveRectangle(
            {
              left:UI.dom.width - 69,
              top:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].top - 18,
              right:UI.dom.width - 6,
              bottom:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].top + 20
            },0, false, true);
          UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer' + discNum));
          UI.dom.setRectangleObjectProperty('topLeftRadius', disclaimer.corner * 8);
          UI.dom.breakApart();
          UI.dom.selectNone();
        }else {
          UI.dom.addNewPrimitiveRectangle(
            {
              left:6,
              top:(UI.dom.height / 2) - (disclaimer.height / 2) - 18,
              right:UI.dom.width - 6,
              bottom:(UI.dom.height / 2) + (disclaimer.height / 2) + 4
            },0, false, true);
            UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer' + discNum));
            UI.dom.setRectangleObjectProperty('topLeftRadius', disclaimer.corner * 8);
            UI.dom.breakApart();
            //make display tab
            UI.dom.addNewPrimitiveRectangle(
              {
                left:UI.dom.width - 69,
                top:UI.dom.height - 18,
                right:UI.dom.width - 6,
                bottom:UI.dom.height + 17
              },0, false, true);
            UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer' + discNum));
            UI.dom.setRectangleObjectProperty('topLeftRadius', disclaimer.corner * 8);
        }
        //reset to previous settings
        UI.dom.selectNone();
        UI.dom.setCustomFill(legacyStyle);
    },

    addText: function(disclaimer, discNum) {
    //  UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer'));
      if (disclaimer.hover === true){
        UI.dom.addNewText(
          {
            left:UI.dom.width - 69,
            top:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].top,
            right:UI.dom.width - 6,
            bottom:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].top + 14,
          }, 'DISCLAIMER');

          UI.dom.addNewText(
            {
              left:12,
              top:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].top + 25,
              right:UI.dom.width - 14,
              bottom:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].top + 30
            }, disclaimer['disc_text' + discNum]);

            textDisp = UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[1];
            textMain = UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[2];
            textDisp.setTextAttr('fillColor', disclaimer.fontColor);
            textMain.setTextAttr('fillColor', disclaimer.fontColor);
            textDisp.setTextAttr('face', 'Gf-OpenSans');
            textMain.setTextAttr('face', 'Gf-OpenSans');
            textDisp.setTextAttr('size', 9);
            textMain.setTextAttr('size', 10);
            textDisp.setTextAttr('alignment', 'center');
            textMain.setTextAttr('alignment', 'left');
            textMain.setTextAttr("lineSpacing", 0);
        }else {
          UI.dom.addNewText(
            {
              left:UI.dom.width - 69,
              top:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[1].top,
              right:UI.dom.width - 6,
              bottom:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[1].top + 14
            }, 'DISCLAIMER');

            UI.dom.addNewText(
              {
                left:12,
                top:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].top + 24,
                right:UI.dom.width - 14,
                bottom:UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].top + 6 + disclaimer.height
              }, disclaimer['disc_text' + discNum]);

              textDisp = UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[2];
              textMain = UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[3];
              textDisp.setTextAttr('fillColor', disclaimer.fontColor);
              textMain.setTextAttr('fillColor', disclaimer.fontColor);
              textDisp.setTextAttr('face', 'Gf-OpenSans');
              textMain.setTextAttr('face', 'Gf-OpenSans');
              textDisp.setTextAttr('size', 9);
              textMain.setTextAttr('size', 10);
              textDisp.setTextAttr('alignment', 'center');
              textMain.setTextAttr('alignment', 'left');
              textMain.setTextAttr("lineSpacing", 0);
        }
    },

    animate: function(disclaimer, discNum) {
      var animCode = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/animateCC_code/disclaimer.txt');
      animCode = animCode.replace(/disclaimer_content/g, 'disclaimer_content' + discNum);
      animCode = animCode.replace(/disclaimer_display/g, 'disclaimer_display' + discNum);
      animCode = animCode.replace(/disclaimer_close/g, 'disclaimer_close' + discNum);
      UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer' + discNum));
      //hover
      if (disclaimer.hover === true) {
        UI.dom.convertToSymbol('movie clip', 'disclaimer_content' + discNum, 'top left');
        UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].name = 'disclaimer_content' + discNum;
        UI.dom.convertToSymbol('movie clip', 'disclaimer_inner' + discNum, 'top left');
        UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].name = 'disclaimer_inner' + discNum;
        UI.dom.convertToSymbol('movie clip', 'disclaimer' + discNum, 'top left');
        UI.dom.enterEditMode('inPlace');
        UI.dom.enterEditMode('inPlace');
        UI.timeline.insertFrames(21);
        UI.timeline.addNewLayer('actions', 'normal', true);
        animcode = animCode.slice(0, animCode.lastIndexOf('//'));
        fl.actionsPanel.setText(animCode.slice(0, animCode.lastIndexOf('//')));
        fl.actionsPanel.setSelection(0, 0);
        UI.timeline.setSelectedLayers(1);
        UI.timeline.convertToKeyframes(21, 21);
        UI.timeline.setSelectedFrames(0, 0);
        UI.timeline.createMotionTween();
        UI.dom.moveSelectionBy({x:0, y:disclaimer.height});
        UI.timeline.layers[1].frames[0].setCustomEase('all', [ {x:0,y:0}, {x:0.8297,y:0}, {x:0.3123,y:1}, {x:1,y:1} ]);
        UI.timeline.layers[1].frames[0].hasCustomEase = true;
      //click
      } else {
        UI.dom.convertToSymbol('movie clip', 'disclaimer' + discNum, 'top left');
        UI.dom.enterEditMode('inPlace');
        UI.timeline.insertFrames(21);
        UI.dom.setSelectionRect(
          {
            left:UI.dom.width - 69,
            top:UI.dom.height - 18,
            right:UI.dom.width - 6,
            bottom:UI.dom.height
          }, true, true);
        UI.dom.convertToSymbol('button', 'disclaimer_display' + discNum, 'top left');
        UI.dom.distributeToLayers();

        UI.timeline.setSelectedLayers(0);
        UI.dom.convertToSymbol('movie clip', 'disclaimer_content' + discNum, 'top left');
        UI.timeline.layers[0].frames[0].elements[0].name = 'disclaimer_content' + discNum;
        UI.timeline.layers[1].frames[0].elements[0].name = 'disclaimer_display' + discNum;
        //set code
        UI.timeline.setSelectedLayers(0);
        UI.timeline.addNewLayer('actions', 'normal', true);
        fl.actionsPanel.setText(animCode.slice(animCode.lastIndexOf('//'), animCode.length - 1));
        fl.actionsPanel.setSelection(0, 0);
        //opacity content
        UI.timeline.setSelectedLayers(1);
        UI.timeline.convertToKeyframes(21, 21);
        UI.timeline.setSelectedLayers(2);
        UI.timeline.convertToKeyframes(21, 21);
        UI.timeline.setSelectedFrames(21, 21);
        UI.dom.setInstanceAlpha(0);
        //opacity display
        UI.timeline.setSelectedFrames(0, 0);
        UI.timeline.createMotionTween();
        UI.timeline.setSelectedLayers(1);
        UI.timeline.setSelectedFrames(0, 0);
        UI.timeline.createMotionTween();
        UI.dom.setInstanceAlpha(0);
        //add close
        UI.timeline.addNewLayer('close' + discNum, 'normal', true);
        UI.timeline.convertToKeyframes(21, 21);
        UI.timeline.setSelectedFrames(21, 21);
        //draw x
        var legacyLine = UI.dom.getCustomStroke('toolbar');
        UI.dom.addNewLine(
          {
            x:UI.dom.width - 16,
            y:(UI.dom.height / 2) - (disclaimer.height / 2) - 15
          },
          {
            x:UI.dom.width - 16,
            y:(UI.dom.height / 2) - (disclaimer.height / 2) - 2
          });
        UI.timeline.setSelectedFrames(21, 21);
        UI.dom.rotateSelection(90);
        UI.dom.addNewLine(
          {
            x:UI.dom.width - 16,
            y:(UI.dom.height / 2) - (disclaimer.height / 2) - 15
          },
          {
            x:UI.dom.width - 16,
            y:(UI.dom.height / 2) - (disclaimer.height / 2) - 2
          });
        UI.timeline.setSelectedFrames(21, 21);
        UI.dom.rotateSelection(45);
        UI.dom.setStrokeSize(1);
        UI.dom.setStrokeCapType('none')
        UI.dom.setStrokeColor(disclaimer.fontColor);
        //convert x to button
        UI.dom.convertToSymbol('button', 'disclaimer_close' + discNum, 'top left');
        UI.timeline.layers[1].frames[21].elements[0].name = 'disclaimer_close' + discNum;
        UI.dom.enterEditMode('inPlace');
        UI.timeline.convertToKeyframes(3, 3);
        UI.timeline.setSelectedFrames(3, 3);
        UI.dom.addNewRectangle(
          {
            left:UI.dom.width - 24,
            top:(UI.dom.height / 2) - (disclaimer.height / 2) - 15,
            right:UI.dom.width - 9,
            bottom:(UI.dom.height / 2) - (disclaimer.height / 2) - 2
          }, 0, false, true);
        UI.dom.exitEditMode();
        UI.dom.setCustomStroke(legacyLine);
      }
      //exit edit mode
     UI.dom.exitEditMode();
     UI.dom.exitEditMode();
      UI.timeline.layers[UTIL.layerCheck('disclaimer' + discNum)].frames[0].elements[0].name = 'disclaimer' + discNum;
      if (disclaimer.clickthrough === true) {
          if (UTIL.layerCheck('clickTag' + disclaimer['clickTag' + discNum]) === -1) {
            disclaimer['clickTag' + discNum] = 1;
          }
            UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + disclaimer['clickTag' + discNum]));
            for (var j = 0; j < UI.timeline.frameCount; j++) {
              if (!UI.timeline.layers[UTIL.layerCheck('clickTag' + disclaimer['clickTag' + discNum])].frames[j].isEmpty) {
                UI.timeline.setSelectedFrames(j, j);
                var clickCode = fl.actionsPanel.getText();
              }
            }
        clickCode = '//clickTag' + disclaimer['clickTag' + discNum] + '\n' + clickCode.replace(/btn_clickTag\d/, 'disclaimer' + discNum);
        UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer' + discNum));
        fl.actionsPanel.setText(clickCode);
        fl.actionsPanel.setSelection(0, 0);
      }
    }
  }

}());
