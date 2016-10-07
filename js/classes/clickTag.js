(function() {

    TAG =
    {

      giadcScriptInject: function(clickCheck) {

        var clickCode = 'if (!this.loopNum) {\n\tvar script = document.createElement("script");\n\tscript.src = "//ssl.gannett-cdn.com/ads/giadc/scripts/giadc-basic-core.js";\n\tdocument.head.appendChild(script);\n}';
        UI.timeline.setSelectedLayers(0);
        UI.timeline.setSelectedFrames(0, 0, true);
        var actionText = fl.actionsPanel.getText();
        if (clickCheck > -1) {
          UI.timeline.setSelectedFrames(0, 0, true);
          UTIL.actionsSelect('if (!this.loopNum) {\n\tvar script = document.createElement("script")', 10);
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
          UI.timeline.layers[UTIL.layerCheck('actions')].locked = true;
        },

      createClickTag: function(clickURL, clickNum) {
          var staticCheck = UTIL.layerCheck ('static');
          (staticCheck < 0) ? UI.timeline.setSelectedLayers(0) : UI.timeline.setSelectedLayers(UTIL.layerCheck('static'));
          UI.timeline.addNewLayer('clickTag' + clickNum, 'normal', false);
          UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + clickNum));
          UI.dom.addNewRectangle(
            {
              left:0,
              top:0,
              right:UI.dom.width,
              bottom:UI.dom.height
            },0, false, true);

          //converts to button
          UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + clickNum));
          UI.dom.convertToSymbol('button', 'btn_clickTag' + clickNum, 'top left');
          UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + clickNum));
          UI.dom.enterEditMode('inPlace');

          //make new frames in button
          for (var i = 0; i < 3; i++) {
          UI.timeline.insertFrames();
          }

          //select hit frame
          UI.timeline.currentFrame = 3;

          //new keyframe on hit frame
          UI.timeline.convertToKeyframes();

          //delete all frames before hit
          UI.timeline.currentFrame = 0;
          UI.dom.selectAll();
          UI.dom.deleteSelection();

          //exit edit mode
          UI.dom.exitEditMode();

          //set instance name
          UI.timeline.layers[UTIL.layerCheck('clickTag' + clickNum)].frames[0].elements.name = 'btn_clickTag' + clickNum;

          //add actions to clickTag
          fl.actionsPanel.setText('if (!this.loopNum) {\n\tthis.btn_clickTag' + clickNum + '.addEventListener("click", fl_ClickToGoToWebPage_8);\n\n\tfunction fl_ClickToGoToWebPage_8() {\n\t\twindow.openAndTrack("default","' + clickURL['clickTag' + clickNum] + '");\n\t}\n}');
          fl.actionsPanel.setSelection(0,0);

          //lock and hide clickTag
          UI.timeline.layers[UTIL.layerCheck('clickTag' + clickNum)].locked = true;
          UI.timeline.layers[UTIL.layerCheck('clickTag' + clickNum)].visible = false;
      }

    }

}());
