/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';
    var csInterface = new CSInterface();
    function init() {
        themeManager.init();

        var x = setInterval(isInitialized, 60);
        var y = setInterval(isSaved, 60);
        function isInitialized() {
          csInterface.evalScript('fl.getDocumentDOM()', function(open) {
            if (open != 'null') {
              csInterface.evalScript('UTIL.layerCheck("actions")', function(result) {
                if (result > -1) {
                  $('#btn_border').prop('disabled', false);
                  $('#btn_clickTag').prop('disabled', false);
                  $('#btn_static').prop('disabled', false);
                  $('#btn_disclaimer').prop('disabled', false);
                  $('#btn_initialize').prop('disabled', true);
                } else {
                  $('#btn_border').prop('disabled', true);
                  $('#btn_clickTag').prop('disabled', true);
                  $('#btn_static').prop('disabled', true);
                  $('#btn_disclaimer').prop('disabled', true);
                  $('#btn_publish').prop('disabled', true);
                  $('#btn_publishJpg').prop('disabled', true);
                  $('#txt_jpegQuality').prop('disabled', true);
                  $('#btn_initialize').prop('disabled', false);
                }
              });
            }
          });
        }

        function isSaved() {
          csInterface.evalScript('typeof UI.dom.pathURI', function(result) {
            if (result != 'undefined' && $('#btn_initialize').prop('disabled')) {
              $('#btn_publish').prop('disabled', false);
              $('#btn_publishJpg').prop('disabled', false);
              $('#txt_jpegQuality').prop('disabled', false);
            }else {
              $('#btn_publish').prop('disabled', true);
              $('#btn_publishJpg').prop('disabled', true);
              $('#txt_jpegQuality').prop('disabled', true);
            }
          });
        }

        $('#btn_initialize').click(function () {
          var bWidth = $('#txt_borderWidth').val();
          var bColor = $('#txt_borderColor').val();
          var loopTog = $('#chk_loopToggle').prop('checked');
          var clickURL = {};
          var newClick;

          for (var i = 1; i <= clickNum; i++) {
            newClick = 'clickTag' + i;
            clickURL[newClick] = $('#txt_clickTag' + i).val();
            if (clickURL[newClick] === '') {
              return;
            }
          }
            clickURL.clickNum = clickNum;
            csInterface.evalScript('initializeDoc()');
            csInterface.evalScript('PUBLISH.setPublishSettings();')
            csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
            csInterface.evalScript('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
            csInterface.evalScript('onClick_chk_loopToggle("' + loopTog + '")');
            csInterface.evalScript('onClick_btn_static()');
            csInterface.evalScript('UI.timeline.setSelectedLayers(UTIL.layerCheck("actions"));');
        });

        $('#chk_loopToggle').click(function () {
          var loopTog = $('#chk_loopToggle').prop('checked')
          csInterface.evalScript('onClick_chk_loopToggle("' + loopTog + '")');
        });

        $('#btn_clickTag').click(function () {
          var clickURL = {};
          var newClick;
          for (var i = 1; i <= clickNum; i++) {
            newClick = 'clickTag' + i;
            clickURL[newClick] = $('#txt_clickTag' + i).val();
            if (clickURL[newClick] === '') {
              return;
            }
          }
          clickURL.clickNum = clickNum;
          csInterface.evalScript('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
        });

        $('#btn_static').click(function () {
          csInterface.evalScript('onClick_btn_static()');
        });

        $('#btn_publish').click(function () {
          csInterface.evalScript('onClick_btn_publish()', function(result) {
            $('#sizeDisplay').html('Size of Document: ' + result/1000 + 'kb');
          });
        });

        $('#btn_publishJpg').click(function () {
          var q = 100;
          var jpgFileSize;
          var size = $('#txt_jpegQuality').val();
          var dot = '..';
          csInterface.evalScript('onClick_btn_publishJpg()');
          csInterface.evalScript('PUBLISH.publishJpg("' + q + '")');
          csInterface.evalScript('UI.dom.publish();');
          csInterface.evalScript('fl.trace("Please wait for JPG to export.")');

          var exportJPG = function() {
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
            setTimeout(exportJPG, 1);
          };
          setTimeout(getSize, 1);
        });

        $('#btn_disclaimer').click(function () {
          var disclaimer =
          {
            corner: cornerTog,
            hover: $('#chk_hoverToggle').prop('checked'),
            clickthrough: $('#chk_clickToggle').prop('checked'),
            color: $('#txt_discColor').val() + parseInt($('#rng_opacity').val() * 2.555).toString(16),
            fontColor: $('#txt_discFontColor').val() + 'ff',
            length: discNum
          };

          for (var i = 1; i <= discNum; i++) {
            disclaimer['disc_text' + i] = $('#txt_disclaimer' + i).val();
            disclaimer['clickTag' + i] = $('#disclaimer' + i).find('#txt_clickDisc').val();
          }
          csInterface.evalScript('onClick_btn_disclaimer(' + JSON.stringify(disclaimer) + ')');
        });
    }
    init();
}());
