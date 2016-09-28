/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();

    function init() {
        themeManager.init();

        $("#btn_border").click(function () {
          var bWidth = document.getElementById("txt_borderWidth").value;
          var bColor = document.getElementById("txt_borderColor").value;
          var loopTog = document.getElementById("chk_loopToggle").checked;
          csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '", "' + loopTog + '")');
        });
        $("#btn_clickTag").click(function () {
            csInterface.evalScript('onClick_btn_clickTag()');
        });
    }

    init();

}());

function onClick_btn_border(bWidth, bColor, loopTog) {
  //alert(loopTog);
  bWidth = parseInt(bWidth);
  var borderCheck = layerCheck('border');
  var actionsCheck = layerCheck('actions');

  //make border if it doesn't exist
  if (borderCheck > -1) {
    fl.getDocumentDOM().getTimeline().deleteLayer(borderCheck);
    createBorderGuide(actionsCheck + 1, bWidth, bColor);
    createBorder(actionsCheck, bWidth, bColor, loopTog);
  } else {
    createBorderGuide(actionsCheck + 1, bWidth, bColor);
    createBorder(actionsCheck, bWidth, bColor, loopTog);
  }
  createLoop(loopTog);
  fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
}
