/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';
    var csInterface = new CSInterface();

    function init() {
        themeManager.init();

        $("#btn_getInfo").click(function () {
          csInterface.evalScript('onClick_btn_getInfo()', function(result) {
            result = JSON.parse(result);
            var tagField = Object.keys(result).length - 1;
            for (var i = 1; i <= tagField; i++) {
              if (i === 1) {
                 document.getElementById("txt_clickTag1").value = result['clickTag' + i];
               } else {
                 if (clickNum < tagField && !document.getElementById("txt_clickTag" + i)) {
                   addField(result['clickTag' + i]);
                 }
               }
            }
            document.getElementById("txt_borderWidth").value = result.border.width;
            document.getElementById("txt_borderColor").value = result.border.color;
            document.getElementById("chk_loopToggle").checked = result.loop;
          });
        });

        $("#btn_initialize").click(function () {
          var bWidth = document.getElementById("txt_borderWidth").value;
          var bColor = document.getElementById("txt_borderColor").value;
          var loopTog = document.getElementById("chk_loopToggle").checked;
          var clickURL = {};
          var newClick;

          for (var i = 1; i <= clickNum; i++) {
            newClick = 'clickTag' + i;
            clickURL[newClick] = document.getElementById("txt_clickTag" + i).value;
            if (clickURL[newClick] === '') {
              return;
            }
          }
            clickURL.clickNum = clickNum;
            csInterface.evalScript('initializeDoc()');
            csInterface.evalScript('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
            csInterface.evalScript('onClick_chk_loopToggle("' + loopTog + '")');
            csInterface.evalScript('onClick_btn_static()');
            csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
            csInterface.evalScript('UI.timeline.setSelectedLayers(UTIL.layerCheck("actions"));');
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
          for (var i = 1; i <= clickNum; i++) {
            newClick = 'clickTag' + i;
            clickURL[newClick] = document.getElementById("txt_clickTag" + i).value;
            if (clickURL[newClick] === '') {
              return;
            }
          }
          clickURL.clickNum = clickNum;
          csInterface.evalScript('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
          //alert('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
        });

        $("#btn_static").click(function () {
          csInterface.evalScript('onClick_btn_static()');
        });

        $("#btn_publish").click(function () {
          var size = document.getElementById("txt_jpegQuality").value;
          csInterface.evalScript('onClick_btn_publish("' + size + '")', function(result) {
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
