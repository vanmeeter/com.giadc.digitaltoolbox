(function() {

    UTIL =
    {

      layerCheck: function(layerName) {

        var layerAmt = fl.getDocumentDOM().getTimeline().layerCount;

        for (var i = 0; i < layerAmt; i++) {
          if (fl.getDocumentDOM().getTimeline().layers[i].name === layerName) {
            return i;
          }
        }
        return -1;
      },

      actionsSelect: function(subFind, actionLength) {

        fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
        fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
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
