(function() {
  INFO =
  {
    getClickTag: function(j) {
      var totalFrames = UI.timeline.frameCount;
      for (var k = 0; k < totalFrames; k++) {
        if (!UI.timeline.layers[UTIL.layerCheck('clickTag' + j)].frames[k].isEmpty) {
          UI.timeline.currentFrame = k;
          break;
        }
      }
      UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + j));
      var selectEnd = fl.actionsPanel.getText().lastIndexOf('");');
      var selectStart = fl.actionsPanel.getText().indexOf('http');
      selectEnd -= selectStart;
      fl.actionsPanel.setSelection(selectStart, selectEnd);
      return fl.actionsPanel.getSelectedText();
    },

    getWidgets: function(layerName) {
      var totalFrames = UI.timeline.frameCount;
      for (var k = 0; k < totalFrames; k++) {
        if (!UI.timeline.layers[UTIL.layerCheck(layerName)].frames[k].isEmpty) {
          UI.timeline.currentFrame = k;
          break;
        }
      }
      UI.timeline.setSelectedLayers(UTIL.layerCheck(layerName));
      var selectEnd = fl.actionsPanel.getText().lastIndexOf('");');
      var selectStart = fl.actionsPanel.getText().indexOf('http');
      selectEnd -= selectStart;
      fl.actionsPanel.setSelection(selectStart, selectEnd);
      return fl.actionsPanel.getSelectedText();
    },

    getBorder: function() {
      if (UI.timeline.layers[UTIL.layerCheck('border')]) {
    		UI.timeline.layers[UTIL.layerCheck('border')].locked = false;
    		UI.timeline.setSelectedLayers(UTIL.layerCheck('border'));
        var border =
    		{
    			width: UI.dom.getCustomStroke().thickness,
    			color: UI.dom.getCustomStroke().color
    		};
        UI.timeline.layers[UTIL.layerCheck('border')].locked = true;
        return border;
      }
    },

    getLoop: function() {
      var totalFrames = UI.timeline.layers[UTIL.layerCheck('actions')].frameCount;
      fl.actionsPanel.setSelection(0,0);
      UI.timeline.setSelectedLayers(0);
      if(UI.timeline.layers[UTIL.layerCheck('actions')].frames[totalFrames - 1].name === 'replay') {
        return false;
      }else {
        return true;
      }
    },

    getDisclaimer: function() {
      var totalFrames = UI.timeline.frameCount;
      if (UTIL.layerCheck('disclaimer1') >= 0){
    		var disclaimer = {};
    		if(UI.dom.library.itemExists('disclaimer_close1')){
    			for (var i = 1; i < 4; i++) {
    				if(UI.dom.library.itemExists('disclaimer_content' + i)){
    					UI.dom.library.editItem('disclaimer_content' + i);
              if(UI.timeline.layers[0].frames[0].elements[1] != '[object Bitmap]' && UI.timeline.layers[0].frames[0].elements[1] != undefined){
    					  disclaimer['text' + i] = UI.timeline.layers[0].frames[0].elements[1].getTextString();
              }
    				}else {
    					disclaimer['text' + i] = '';
    				}
    			}
    			if (UI.timeline.layers[0].frames[0].elements[0].vertices.length > 4){
    				disclaimer.corner = 1;
    			}else {
    				disclaimer.corner = 0;
    			}
    			disclaimer.hover = false;
    		}else {
    			for (var i = 1; i < 4; i++) {
    				if(UI.dom.library.itemExists('disclaimer_content' + i)){
    					UI.dom.library.editItem('disclaimer_content' + i);
              if(UI.timeline.layers[0].frames[0].elements[2] != '[object Bitmap]' && UI.timeline.layers[0].frames[0].elements[2] != undefined){
    					  disclaimer['text' + i] = UI.timeline.layers[0].frames[0].elements[2].getTextString();
              }
    				}else {
    					disclaimer['text' + i] = '';
    				}
    			}
    			if (UI.timeline.layers[0].frames[0].elements[0].vertices.length > 6){
    				disclaimer.corner = 1;
    			}else {
    				disclaimer.corner = 0;
    			}
    			disclaimer.hover = true;
    		}
        if (UI.timeline.layers[0].frames[0].elements[1] != '[object Bitmap]' && UI.timeline.layers[0].frames[0].elements[1] != undefined){
    		  disclaimer.fontColor = UI.timeline.layers[0].frames[0].elements[1].getTextAttr("fillColor");
        }else {
          disclaimer.fontColor = '#ffffff';
        }
    		disclaimer.bgcolor = UI.dom.getCustomFill().color;
    		UI.dom.exitEditMode();
    		if(disclaimer.hover === true) {
    			UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer1'));
    			UI.timeline.setSelectedFrames(0, 0);
    			if (fl.actionsPanel.getText() != '') {
    				for (var i = 1; i < 4; i++){
    					if(UTIL.layerCheck('disclaimer' + i) > -1){
    						for (var k = 0; k < totalFrames; k++) {
    							if (!UI.timeline.layers[UTIL.layerCheck('disclaimer' + i)].frames[k].isEmpty) {
    								UI.timeline.currentFrame = k;
    								break;
    							}
    						}
    							UI.timeline.setSelectedLayers(UTIL.layerCheck('disclaimer' + i));
    							disclaimer['clickTag' + i] = fl.actionsPanel.getText().slice(10, 11);
    					}
    				}
    				disclaimer.clickToggle = true;
    			}else {
    				disclaimer.clickToggle = false;
    			}
    		}else {
    			disclaimer.clickToggle = false;
    		}
        return disclaimer;
    	}else {
    		return 0;
    	}
    }
  }

}());
