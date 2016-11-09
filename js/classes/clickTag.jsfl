(function() {
  var widgetIcon = fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/icons/';

    TAG =
    {

      giadcScriptInject: function(clickCheck) {
        var clickCode = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/animateCC_code/clickCode.txt');
        UI.timeline.setSelectedLayers(0);
        UI.timeline.setSelectedFrames(0, 0, true);
        var actionText = fl.actionsPanel.getText();
        if (clickCheck > -1) {
          UI.timeline.setSelectedFrames(0, 0, true);
          UTIL.actionsSelect('if (!this.alreadyExecuted) {\n\tvar script = document.createElement("script")', 10);
          if (fl.actionsPanel.hasSelection()){
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
        var widgetLayer = 0;
        if(UTIL.layerCheck('facebook_icon1') >= 0 || UTIL.layerCheck('twitter_icon1') >= 0 || UTIL.layerCheck('instagram_icon1') >= 0){
          if(UTIL.layerCheck('facebook_icon1') >= 0){
            if (UTIL.layerCheck('facebook_icon1') > widgetLayer){
              widgetLayer = UTIL.layerCheck('facebook_icon1');
            }
          }
          if(UTIL.layerCheck('twitter_icon1') >= 0){
            if (UTIL.layerCheck('twitter_icon1') > widgetLayer){
              widgetLayer = UTIL.layerCheck('twitter_icon1');
            }
          }
          if(UTIL.layerCheck('instagram_icon1') >= 0){
            if (UTIL.layerCheck('instagram_icon1') > widgetLayer){
              widgetLayer = UTIL.layerCheck('instagram_icon1');
            }
          }
          UI.timeline.setSelectedLayers(widgetLayer);
        }else if (UTIL.layerCheck('disclaimer1') >= 0){
          UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer1'));
        }else {
          if(UTIL.layerCheck('border') >= 0){
            UI.timeline.setSelectedLayers(UTIL.layerCheck('border'));
          }else {
            UI.timeline.setSelectedLayers(0);
          }
        }
        UI.timeline.addNewLayer('clickTag' + tagNum, 'normal', false);
        UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + tagNum));

        if (!UI.dom.library.itemExists('btn_clickTag')){
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
          UI.dom.convertToSymbol('button', 'btn_clickTag', 'top left');
          UI.dom.enterEditMode('inPlace');

          //make new frames in button
          UI.timeline.insertFrames(3);

          //new keyframe on hit frame
          UI.timeline.convertToKeyframes(3, 3);

          //delete all frames before hit
          UI.timeline.clearFrames(0, 3);

          //exit edit mode
          UI.dom.exitEditMode();
        }else{
          UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + tagNum));
          UI.dom.library.selectItem('btn_clickTag');
          UI.dom.library.addItemToDocument({x:UI.dom.width / 2, y:UI.dom.height / 2});
        }
        //set instance name
        UI.timeline.layers[UTIL.layerCheck('clickTag' + tagNum)].frames[0].elements[0].name = 'btn_clickTag' + tagNum;

        //add actions to clickTag
        fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.btn_clickTag' + tagNum + '.addEventListener("click", fl_ClickToGoToWebPage_8);\n\n\tfunction fl_ClickToGoToWebPage_8() {\n\t\twindow.openAndTrack("default","' + url + '");\n\t}\n}');
        fl.actionsPanel.setSelection(0,0);

        //lock and hide clickTag
        UI.timeline.layers[UTIL.layerCheck('clickTag' + tagNum)].locked = true;
        UI.timeline.layers[UTIL.layerCheck('clickTag' + tagNum)].visible = false;
      },

      createWidget: function(url, widgetName, i, topClick) {
        UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + topClick));
        if (i > 1){
          UI.timeline.setSelectedLayers(UTIL.layerCheck(widgetName + '_icon' + (i - 1)));
        }
        UI.timeline.addNewLayer(widgetName + '_icon' + i, 'normal', true);
        if (widgetName.slice(0, 1) === 'f') {
          UI.dom.importFile(widgetIcon + 'FB-Logo.svg', false, false, false);
        }else if(widgetName.slice(0, 1) === 't') {
          UI.dom.importFile(widgetIcon + 'twitter-Logo.svg', false, false, false);
        }else if(widgetName.slice(0, 1) === 'i') {
          UI.dom.importFile(widgetIcon + 'Insta-Logo.svg', false, false, false);
        }
        UI.timeline.setSelectedLayers(0);
        if (!UI.dom.library.itemExists('btn_' + widgetName)){
          fl.getDocumentDOM().convertToSymbol('button', 'btn_' + widgetName, 'center');
        }
        UI.timeline.deleteLayer(0);
        UI.timeline.setSelectedLayers(UTIL.layerCheck(widgetName + '_icon' + i));
        UI.timeline.clearKeyframes();
        UI.dom.library.selectItem('btn_' + widgetName);
        UI.dom.library.addItemToDocument({x:16, y:UI.dom.height - 16});
        UI.timeline.layers[UTIL.layerCheck(widgetName + '_icon' + i)].frames[0].elements[0].name = 'btn_' + widgetName + i;
        fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.btn_' + widgetName + i + '.addEventListener("click", fl_ClickToGoToWebPage_8);\n\n\tfunction fl_ClickToGoToWebPage_8() {\n\t\twindow.openAndTrack("default","' + url + '");\n\t}\n}');
        fl.actionsPanel.setSelection(0, 0);
        UI.timeline.layers[UTIL.layerCheck(widgetName + '_icon' + i)].locked = true;
      }

    }

}());