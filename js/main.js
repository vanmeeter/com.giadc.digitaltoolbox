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
          csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
        });

        $("#btn_clickTag").click(function () {
          var clickURL = document.getElementById("txt_clickTag").value;
          var httpCheck = clickURL.slice(0, 7);
          if (httpCheck != 'http://') {
            clickURL = 'http://' + clickURL;
          }
          if (clickURL === 'http://') {
            return;
          } else{
            csInterface.evalScript('onClick_btn_clickTag("' + clickURL + '")');
          }
        });
        $("#btn_publish").click(function () {
          csInterface.evalScript('publishDOC()', function(result) {
            var sizeDisplay = document.getElementById("sizeDisplay");
            sizeDisplay.innerHTML = result/1000 + "kb"
          });
        });
    }

    init();
}());


//csInterface.evalScript('test()', function(result) {
//      alert(result);
//    });
