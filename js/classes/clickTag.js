(function() {

    TAG =
    {

      giadcScriptInject: function(clickCheck) {

        var clickCode = 'if (!this.alreadyExecuted) {\n\tvar script = document.createElement("script");\n\tscript.src = "//ssl.gannett-cdn.com/ads/giadc/scripts/giadc-basic-core.js";\n\tdocument.head.appendChild(script);\n}';
        UI.timeline.setSelectedLayers(0);
        UI.timeline.setSelectedFrames(0, 0, true);
        var actionText = fl.actionsPanel.getText();
        if (clickCheck > -1) {
          UI.timeline.setSelectedFrames(0, 0, true);
          UTIL.actionsSelect('if (!this.alreadyExecuted) {\n\tvar script = document.createElement("script")', 10);
          if (fl.actionsPanel.hasSelection()) {
            fl.actionsPanel.setSelection(0,0);
          } else {
            fl.actionsPanel.setText(clickCode + '\n\n' + actionText);
          }
        } else {
          UI.timeline.addNewLayer('actions', 'normal', true);
          UI.timeline.setSelectedLayers(0);
          UI.timeline.setSelectedFrames(0, 0, true);
          fl.actionsPanel.setText(clickCode);
          fl.actionsPanel.setSelection(0,0);
          }
          if (UI.dom.frameRate != 30) {
            UI.dom.frameRate = 30;
          }
          fl.actionsPanel.setSelection(0,0);
        },

      createClickTag: function(url, tagNum) {

          if (UTIL.layerCheck('disclaimer') >= 0){
            UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer'));
          }else {
            if(UTIL.layerCheck('static') >= 0){
              UI.timeline.setSelectedLayers(UTIL.layerCheck('static'));
            }else {
              UI.timeline.setSelectedLayers(0);
            }
          }
          UI.timeline.addNewLayer('clickTag' + tagNum, 'normal', false);
          UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + tagNum));

          //create clicktag rectangle
          var recStyle = UI.dom.getCustomFill();
          var legacyStyle = UI.dom.getCustomFill('toolbar');
          recStyle.style = 'solid';
          recStyle.color = '#000000';
          UI.dom.setCustomFill(recStyle);
          UI.dom.addNewRectangle(
            {
              left:0,
              top:0,
              right:UI.dom.width,
              bottom:UI.dom.height
            },0, false, true);
            UI.dom.setCustomFill(legacyStyle);

          //converts to button
          UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + tagNum));
          UI.dom.convertToSymbol('button', 'btn_clickTag' + tagNum, 'top left');
          UI.dom.enterEditMode('inPlace');

          //make new frames in button
          UI.timeline.insertFrames(3);

          //new keyframe on hit frame
          UI.timeline.convertToKeyframes(3, 3);

          //delete all frames before hit
          UI.timeline.clearFrames(0, 3);

          //exit edit mode
          UI.dom.exitEditMode();

          //set instance name
          UI.timeline.layers[UTIL.layerCheck('clickTag' + tagNum)].frames[0].elements[0].name = 'btn_clickTag' + tagNum;

          //add actions to clickTag
          fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.btn_clickTag' + tagNum + '.addEventListener("click", fl_ClickToGoToWebPage_8);\n\n\tfunction fl_ClickToGoToWebPage_8() {\n\t\twindow.openAndTrack("default","' + url + '");\n\t}\n}');
          fl.actionsPanel.setSelection(0,0);

          //lock and hide clickTag
          UI.timeline.layers[UTIL.layerCheck('clickTag' + tagNum)].locked = true;
          UI.timeline.layers[UTIL.layerCheck('clickTag' + tagNum)].visible = false;
      }

    }

}());
