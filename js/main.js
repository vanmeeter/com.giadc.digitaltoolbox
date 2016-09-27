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
          csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
        });
        $("#btn_clickTag").click(function () {
            csInterface.evalScript('onClick_btn_clickTag()');
        });
    }

    init();

}());

//onClick_btn_border("  ")
