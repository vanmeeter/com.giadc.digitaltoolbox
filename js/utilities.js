(function() {

  UtilitiesClass = function() {}
  var p = UtilitiesClass.prototype;

  p.layerCheck = function(layerName) {

    var layerAmt = fl.getDocumentDOM().getTimeline().layerCount;

    for (var i = 0; i < layerAmt; i++) {
      if (fl.getDocumentDOM().getTimeline().layers[i].name === layerName) {
        return i;
      }
    }
    return -1;
  }

  p.actionsSelect = function(subFind, actionLength) {

    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
    var actionStart = fl.actionsPanel.getText().indexOf(subFind);
    fl.actionsPanel.setSelection(actionStart, actionLength);
  }

}());
