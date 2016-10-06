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
          if (fl.getDocumentDOM().frameRate != 30) {
            fl.getDocumentDOM().frameRate = 30;
          }
        },

      createClickTag: function(clickURL, clickNum) {
          var staticCheck = UTIL.layerCheck ('static');
          (staticCheck === -1) ? UI.timeline.setSelectedLayers(0) : UI.timeline.setSelectedLayers(1);
          UI.timeline.addNewLayer('clickTag' + clickNum, 'normal', false);
          UI.timeline.setSelectedLayers(parseInt(UI.timeline.findLayerIndex('clickTag' + clickNum)));
          fl.getDocumentDOM().addNewRectangle({left:0,top:0,right:fl.getDocumentDOM().width,bottom:fl.getDocumentDOM().height},0, false, true);
          //converts to button
          UI.timeline.setSelectedLayers(parseInt(UI.timeline.findLayerIndex('clickTag' + clickNum)));
          fl.getDocumentDOM().convertToSymbol('button', 'btn_clickTag' + clickNum, 'top left');
          UI.timeline.setSelectedLayers(parseInt(UI.timeline.findLayerIndex('clickTag' + clickNum)));
          fl.getDocumentDOM().enterEditMode('inPlace');

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
          fl.getDocumentDOM().selectAll();
          fl.getDocumentDOM().deleteSelection();

          //exit edit mode
          fl.getDocumentDOM().exitEditMode();

          //set instance name
          (staticCheck === -1) ? UI.timeline.layers[1].frames[0].elements.name = 'btn_clickTag' + clickNum : UI.timeline.layers[2].frames[0].elements.name = 'btn_clickTag' + clickNum;

          //add actions to clickTag
          fl.actionsPanel.setText('if (!this.loopNum) {\n\tthis.btn_clickTag' + clickNum + '.addEventListener("click", fl_ClickToGoToWebPage_8);\n\n\tfunction fl_ClickToGoToWebPage_8() {\n\t\twindow.openAndTrack("default","' + clickURL['clickTag' + clickNum] + '");\n\t}\n}');
          fl.actionsPanel.setSelection(0,0);

          //lock and hide clickTag
          UI.timeline.layers[UI.timeline.findLayerIndex('clickTag' + clickNum)].locked = true;
          UI.timeline.layers[UI.timeline.findLayerIndex('clickTag' + clickNum)].visible = false;
      }

    }

}());
