/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();

    function init() {
        themeManager.init();

        $("#btn_initialize").click(function () {
          var bWidth = document.getElementById("txt_borderWidth").value;
          var bColor = document.getElementById("txt_borderColor").value;
          var loopTog = document.getElementById("chk_loopToggle").checked;
          var clickURL = document.getElementById("txt_clickTag").value;
          var httpCheck = clickURL.slice(0, 7);

          if (httpCheck != 'http://') {
            clickURL = 'http://' + clickURL;
          }
          if (clickURL === 'http://') {
            return;
          } else{
            csInterface.evalScript('initializeDoc()');
            csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
            csInterface.evalScript('onClick_btn_clickTag("' + clickURL + '")');
            csInterface.evalScript('onClick_chk_loopToggle("' + loopTog + '")');
          }
        });
        $("#chk_loopToggle").click(function () {
          var loopTog = document.getElementById("chk_loopToggle").checked;
          csInterface.evalScript('onClick_chk_loopToggle("' + loopTog + '")');
        });
        $("#btn_border").click(function () {
          var bWidth = document.getElementById("txt_borderWidth").value;
          var bColor = document.getElementById("txt_borderColor").value;
          var loopTog = document.getElementById("chk_loopToggle").checked;
          csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
        });
        $("#btn_clickTag").click(function () {
          var clickURL = document.getElementById("txt_clickTag" + 1).value;
          var httpCheck = clickURL.newClick.slice(0, 7);
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
          csInterface.evalScript('onClick_btn_publish()', function(result) {
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
