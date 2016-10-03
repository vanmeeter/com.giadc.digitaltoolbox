/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();

    function init() {
        themeManager.init();
        var clickNum = 1;

        $("#btn_initialize").click(function () {
          var bWidth = document.getElementById("txt_borderWidth").value;
          var bColor = document.getElementById("txt_borderColor").value;
          var loopTog = document.getElementById("chk_loopToggle").checked;
          var clickURL = {};
          var newClick;
          var httpCheck;

          for (var i = 1; i <= clickNum; i++) {
            newClick = 'clickTag' + i;
            clickURL[newClick] = document.getElementById("txt_clickTag" + i).value;
            httpCheck = clickURL[newClick].slice(0, 7);
            if (httpCheck != 'http://') {
              clickURL[newClick] = 'http://' + clickURL[newClick];
            }
            if (clickURL[newClick] === 'http://') {
              return;
            }
          }
            clickURL.clickNum = clickNum;
            csInterface.evalScript('initializeDoc()');
            csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
            csInterface.evalScript('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
            csInterface.evalScript('onClick_chk_loopToggle("' + loopTog + '")');
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
          var clickURL = {};
          var newClick;
          var httpCheck;
          for (var i = 1; i <= clickNum; i++) {
            newClick = 'clickTag' + i;
            clickURL[newClick] = document.getElementById("txt_clickTag" + i).value;
            httpCheck = clickURL[newClick].slice(0, 7);
            if (httpCheck != 'http://') {
              clickURL[newClick] = 'http://' + clickURL[newClick];
            }
            if (clickURL[newClick] === 'http://') {
              return;
            }
          }
          clickURL.clickNum = clickNum;
          csInterface.evalScript('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
          //alert('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
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
