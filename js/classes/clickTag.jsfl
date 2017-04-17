(function() {
  var widgetIcon = 'file:///Library/Application Support/Adobe/CEP/extensions/com.giadc.digitalToolbox/icons/';

    TAG =
    {

      giadcScriptInject: function(clickCheck) {
        var clickCode = FLfile.read('file:///Library/Application Support/Adobe/CEP/extensions/com.giadc.digitalToolbox/animateCC_code/clickCode.txt');
        UI.timeline.setSelectedLayers(0);
        UI.timeline.setSelectedFrames(0, 0, true);
        var actionText = fl.actionsPanel.getText();
        if (clickCheck > -1) {
          UI.timeline.setSelectedFrames(0, 0, true);
          UTIL.actionsSelect('if (!this.alreadyExecuted) {\n\tvar script = document.createElement("script")', 10);
          if (fl.actionsPanel.hasSelection()){
            fl.actionsPanel.setSelection(0,0);
          }else {
            fl.actionsPanel.setText(clickCode + '\n\n' + actionText);
          }
        }else {
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
        if (UTIL.layerCheck('clickTag' + tagNum) === -1){
          if(UTIL.layerCheck('facebook1') >= 0 || UTIL.layerCheck('twitter1') >= 0 || UTIL.layerCheck('instagram1') >= 0){
            if(UTIL.layerCheck('facebook1') >= 0){
              if (UTIL.layerCheck('facebook1') > widgetLayer){
                widgetLayer = UTIL.layerCheck('facebook1');
              }
            }
            if(UTIL.layerCheck('twitter1') >= 0){
              if (UTIL.layerCheck('twitter1') > widgetLayer){
                widgetLayer = UTIL.layerCheck('twitter1');
              }
            }
            if(UTIL.layerCheck('instagram1') >= 0){
              if (UTIL.layerCheck('instagram1') > widgetLayer){
                widgetLayer = UTIL.layerCheck('instagram1');
              }
            }
            if(UTIL.layerCheck('button1') >= 0){
              if (UTIL.layerCheck('button1') > widgetLayer){
                widgetLayer = UTIL.layerCheck('button1');
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
        }
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
        }
        UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + tagNum));
        for (var k = 0; k < UI.timeline.frameCount; k++) {
          if (!UI.timeline.layers[UTIL.layerCheck('clickTag' + tagNum)].frames[k].isEmpty) {
            UI.timeline.setSelectedFrames(k, k);
            UI.timeline.layers[UTIL.layerCheck('clickTag' + tagNum)].frames[k].elements[0].name = 'btn_clickTag' + tagNum;
            break;
          }else if (k === UI.timeline.frameCount - 1){
            UI.dom.library.selectItem('btn_clickTag');
            UI.dom.library.addItemToDocument({x:UI.dom.width / 2, y:UI.dom.height / 2});
            //set instance name
            UI.timeline.layers[UTIL.layerCheck('clickTag' + tagNum)].frames[0].elements[0].name = 'btn_clickTag' + tagNum;
          }
        }
        //add actions to clickTag
        fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.btn_clickTag' + tagNum + '.addEventListener("click", fl_ClickToGoToWebPage);\n\n\tfunction fl_ClickToGoToWebPage() {\n\t\twindow.openAndTrack("default","' + url + '");\n\t}\n}');
        fl.actionsPanel.setSelection(0,0);
      },

      createWidget: function(url, widgetName, topClick) {
        var i = widgetName.slice(widgetName.search(/\d/), widgetName.search(/\d/) + 1);
        if (UTIL.layerCheck(widgetName) === -1) {
          if (UTIL.layerCheck('clickTag' + topClick) === -1){
            return;
          }
          UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + topClick));
          if (i > 1){
            UI.timeline.setSelectedLayers(UTIL.layerCheck(widgetName.slice(0, widgetName.search(/\d/)) + (i - 1)));
          }
          UI.timeline.addNewLayer(widgetName, 'normal', true);
          if (!UI.dom.library.itemExists('btn_' + widgetName.slice(0, widgetName.search(/\d/)))){
            if (widgetName.slice(0, 1) === 'f') {
              UI.dom.importFile(widgetIcon + 'FB-Logo.svg', false, false, false);
            }else if(widgetName.slice(0, 1) === 't') {
              UI.dom.importFile(widgetIcon + 'twitter-Logo.svg', false, false, false);
            }else if(widgetName.slice(0, 1) === 'i') {
              UI.dom.importFile(widgetIcon + 'Insta-Logo.svg', false, false, false);
            }
            UI.timeline.setSelectedLayers(0);
            if (widgetName === 'button' + i) {
              if (!UI.dom.library.itemExists('btn_' + widgetName)){
                alert('No button found in library.');
                UI.timeline.deleteLayer(UTIL.layerCheck(widgetName));
                return;
              }
            }else {
              fl.getDocumentDOM().convertToSymbol('button', 'btn_' + widgetName.slice(0, widgetName.search(/\d/)), 'center');
              UI.timeline.deleteLayer(0);
            }
          }
          UI.timeline.setSelectedLayers(UTIL.layerCheck(widgetName));
          UI.timeline.clearKeyframes();
          (widgetName === 'button' + i) ? UI.dom.library.selectItem('btn_' + widgetName) : UI.dom.library.selectItem('btn_' + widgetName.slice(0, widgetName.search(/\d/)));
          (widgetName === 'button' + i) ? UI.dom.library.addItemToDocument({x:UI.dom.width / 2, y:UI.dom.height / 2}) : UI.dom.library.addItemToDocument({x:16, y:UI.dom.height - 16});
        }
        UI.timeline.layers[UTIL.layerCheck(widgetName)].frames[0].elements[0].name = 'btn_' + widgetName;
        UI.timeline.setSelectedLayers(UTIL.layerCheck(widgetName));
        for (var k = 0; k < UI.timeline.frameCount; k++) {
          if (!UI.timeline.layers[UTIL.layerCheck(widgetName)].frames[k].isEmpty) {
            UI.timeline.setSelectedFrames(k, k);
            break;
          }
        }
        fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.btn_' + widgetName + '.addEventListener("click", fl_ClickToGoToWebPage);\n\n\tfunction fl_ClickToGoToWebPage() {\n\t\twindow.openAndTrack("default","' + url + '");\n\t}\n}');
        fl.actionsPanel.setSelection(0, 0);
        UI.timeline.layers[UTIL.layerCheck(widgetName)].locked = true;
      }
    }
}());
