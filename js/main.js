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
                  $('#btn_widget').prop('disabled', false);
                  $('#btn_static').prop('disabled', false);
                  $('#btn_disclaimer').prop('disabled', false);
                  $('#btn_initialize').prop('disabled', true);
                }else {
                  $('#btn_border').prop('disabled', true);
                  $('#btn_clickTag').prop('disabled', true);
                  $('#btn_widget').prop('disabled', true);
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
          var widgetURL = {};
          clickURL = getTags(clickURL, 'clickTag');
          widgetURL = getTags(widgetURL, 'widget');
          if (clickURL === 0){
            return;
          }
          csInterface.evalScript('initializeDoc()');
          csInterface.evalScript('PUBLISH.setPublishSettings();');
          csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
          csInterface.evalScript('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
          csInterface.evalScript('onClick_btn_clickWidget(' + JSON.stringify(widgetURL) + ')');
          csInterface.evalScript('onClick_chk_loopToggle("' + loopTog + '")');
          csInterface.evalScript('onClick_btn_static()');
          csInterface.evalScript('UI.timeline.setSelectedLayers(UTIL.layerCheck("actions"));');
        });

        $('#chk_loopToggle').click(function () {
          var loopTog = $('#chk_loopToggle').prop('checked');
          csInterface.evalScript('onClick_chk_loopToggle("' + loopTog + '")');
        });

        $('#btn_clickTag').click(function () {
          var clickURL = {};
          clickURL = getTags(clickURL, 'clickTag');
          if (clickURL === 0){
            return;
          }
          csInterface.evalScript('onClick_btn_clickTag(' + JSON.stringify(clickURL) + ')');
        });

        $('#btn_widget').click(function () {
          var clickURL = {
            facebook1: 0,
            twitter1: 0,
            instagram1: 0,
            button1: 0
          };
          clickURL = getTags(clickURL, 'widget');
          if (clickURL === 0){
            return;
          }
          csInterface.evalScript('onClick_btn_clickWidget(' + JSON.stringify(clickURL) + ')');
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
              csInterface.evalScript('PUBLISH.setDefaultPub();');
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

        //create object that will be passed to clicktags/widgets
        function getTags(clickURL, type) {
          var newClick;
          var newWidget;
          var clickCount = 0;
          var faceCount = 0;
          var twitCount = 0;
          var instaCount = 0;
          var buttonCount = 0;

          for (var i = 1; i <= totalClickFields; i++) {
            if ($('#clickTag' + i).find('.text-input').val() != '') {
              if (type === 'clickTag'){
                clickCount++;
                if($('#clickTag' + i).find('h4').html() === 'ClickTag ' + clickCount){
                  newClick = 'clickTag' + $('#clickTag' + i).find('h4').html().slice(9, 10);
                  clickURL[newClick] = $('#txt_clickTag' + i).val();
                }else {
                  clickCount--;
                }
              }else if (type === 'widget') {
                if($('#clickTag' + i).find('h4').html() === 'facebook') {
                  faceCount++;
                  newWidget = 'facebook' + faceCount;
                }else if($('#clickTag' + i).find('h4').html() === 'twitter') {
                  twitCount++;
                  newWidget = 'twitter' + twitCount;
                }else if($('#clickTag' + i).find('h4').html() === 'instagram') {
                  instaCount++;
                  newWidget = 'instagram' + instaCount;
                }else if($('#clickTag' + i).find('h4').html() === 'button') {
                  buttonCount++;
                  newWidget = 'button' + buttonCount;
                }
                if (newWidget != undefined){
                  clickURL[newWidget] = $('#txt_clickTag' + i).val();
                }
              }
            }else {
              return 0;
            }
          }
          clickURL.clickNum = clickNum;
          clickURL.widgetNum = totalClickFields - clickNum;
          return (clickURL);
        }
      }
    init();
}());
