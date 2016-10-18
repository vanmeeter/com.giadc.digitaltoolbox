/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';
    var csInterface = new CSInterface();
    localStorage["footer"] = 'Size of Document: ';
    function init() {
        themeManager.init();
        var x = setInterval(isInitialized, 60);
        function isInitialized() {
          csInterface.evalScript('fl.getDocumentDOM()', function(open) {
            //alert(open);
            if (open != 'null') {
            csInterface.evalScript('UTIL.layerCheck("actions")', function(result) {
              if (result > -1) {
                document.getElementById("btn_getInfo").disabled = false;
                document.getElementById("btn_border").disabled = false;
                document.getElementById("btn_clickTag").disabled = false;
                document.getElementById("btn_static").disabled = false;
                document.getElementById("btn_disclaimer_tab").disabled = false;
                document.getElementById("btn_initialize").disabled = true;
                var y = setInterval(isSaved, 60);
              } else {
                document.getElementById("btn_getInfo").disabled = true;
                document.getElementById("btn_border").disabled = true;
                document.getElementById("btn_clickTag").disabled = true;
                document.getElementById("btn_static").disabled = true;
                document.getElementById("btn_publish").disabled = true;
                document.getElementById("btn_publishJpg").disabled = true;
                document.getElementById("btn_disclaimer_tab").disabled = true;
                document.getElementById("btn_initialize").disabled = false;
                clearInterval(y);
              }
              });
            }
            });
        }

        function isSaved() {
          csInterface.evalScript('typeof UI.dom.pathURI', function(result) {
            if (result != 'undefined') {
              document.getElementById("btn_publish").disabled = false;
              document.getElementById("btn_publishJpg").disabled = false;
            } else {
              document.getElementById("btn_publish").disabled = true;
              document.getElementById("btn_publishJpg").disabled = true;
            }
          });
        }

        /*$("#btn_getInfo").click(function () {
          csInterface.evalScript('onClick_btn_getInfo()', function(result) {
            result = JSON.parse(result);
            var tagField = Object.keys(result).length - 2;
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
        });*/

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
            csInterface.evalScript('PUBLISH.setPublishSettings();')
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
        });

        $("#btn_static").click(function () {
          csInterface.evalScript('onClick_btn_static()');
        });

        $("#btn_publish").click(function () {
          csInterface.evalScript('onClick_btn_publish()', function(result) {
            var sizeDisplay = document.getElementById("sizeDisplay");
            sizeDisplay.innerHTML = 'Size of Document: ' + result/1000 + "kb"
            localStorage["footer"] = sizeDisplay.innerHTML;
          });
        });

        $("#btn_publishJpg").click(function () {
          var q = 100;
          var jpgFileSize;
          var size = document.getElementById("txt_jpegQuality").value;
          var dot = '..';
          csInterface.evalScript('onClick_btn_publishJpg()');
          csInterface.evalScript('PUBLISH.publishJpg("' + q + '")');
          csInterface.evalScript('UI.dom.publish();');
          csInterface.evalScript('fl.trace("Please wait for JPG to export.")');

          var run = function() {
            if (jpgFileSize > size && q > 0) {
              q--;
              csInterface.evalScript('PUBLISH.publishJpg("' + q + '")');
              csInterface.evalScript('UI.dom.publish();');
              csInterface.evalScript('fl.trace("Please wait for JPG to export' + dot + '")');
              dot += '.';
              setTimeout(getSize, 1);
            }else {
              csInterface.evalScript('fl.trace("JPG export complete!");');
              csInterface.evalScript('PUBLISH.showHideLayers(true);');
            }
          };
          var getSize = function() {
            csInterface.evalScript('PUBLISH.getFileSize()', function(result) {
              jpgFileSize = result / 1000;
            });
            setTimeout(run, 1);
          };
          setTimeout(getSize, 1);
        });

        $("#btn_disclaimer").click(function () {
          var disclaimer =
          {
            corner: cornerTog,
            hover: document.getElementById("chk_hoverToggle").checked,
            clickthrough: document.getElementById("chk_clickToggle").checked,
            color: document.getElementById("txt_discColor").value + parseInt(document.getElementById("rng_opacity").value * 2.555).toString(16),
            //opacity: document.getElementById("rng_opacity").value,
            fontColor: document.getElementById("txt_discFontColor").value + 'ff',
            text: document.getElementById("txt_disclaimer1").value
          };
          csInterface.evalScript('onClick_btn_disclaimer(' + JSON.stringify(disclaimer) + ')');
        });
    }

    init();
}());
