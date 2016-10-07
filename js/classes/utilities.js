(function() {

    UTIL =
    {

      layerCheck: function(layerName) {

          if (UI.timeline.layers[parseInt(UI.timeline.findLayerIndex(layerName))]) {
            return parseInt(UI.timeline.findLayerIndex(layerName));
          }
        return -1;
      },

      actionsSelect: function(subFind, actionLength) {

        UI.timeline.setSelectedLayers(UTIL.layerCheck('actions'));
        UI.timeline.setSelectedFrames(0, 0, true);
        var actionStart = fl.actionsPanel.getText().indexOf(subFind);
        fl.actionsPanel.setSelection(actionStart, actionLength);
      },

      //************PARSER FOR OBJECTS**************//
      parseObj: function(o) {
        var str = "";
          for (prop in o) {
            str += prop + " [" + typeof o[prop] + "]: " + o[prop] + ".\n";
          }
      },

      validateUrl: function(url) {
        var urlregex = new RegExp("^(https?:\/\/)?(^(https?:\/\/)[0-9A-Za-z]+\.+[a-z]{2,5})");
        return urlregex.test(url);
      }
    }
  
}());
