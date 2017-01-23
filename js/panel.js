var clickNum = 1;
var discNum = 0;
var get = 0;
var cornerTog = 0;
var editNum;
var expNum = 0;
var totalClickFields = 1;

(function() {
var switchCount = 1;
var csInterface = new CSInterface();
var rotate = $('#btn_reset');

//misc functions
var addField = function(url) {
  if(totalClickFields < 9) {
    var url = (typeof url !== 'object') ? url : '';
    var clickFields = $('#click_fields').html();
    var currentTags = {};
    clickNum++;
    totalClickFields++;
    for (var i = 1; i <= totalClickFields; i++) {
      currentTags[i] = $('#txt_clickTag' + i).val();
    }
    $('#click_fields').html(clickFields + '\n<div id="clickTag' + totalClickFields + '"><button class="ct_over">\n\t<h4>ClickTag ' + clickNum + '</h4>\n\t</br>\n\t<input id="txt_clickTag' + totalClickFields + '" class="text-input" type="text" placeholder="Enter ClickTag" value="' + url + '" required>\n</button>\n<div class="ct_under">\n\t<button id="btn_sub" class="icon-button" onclick="editNum = ' + totalClickFields + '">\n\t\t<div class="circle">\n\t\t\t<span>-</span>\n\t\t</div>\n\t</button>\n<button id="btn_ct" class="icon-button" onclick="editNum = ' + totalClickFields + '">\n\t<span>CT</span>\n</button>\n<button id="btn_ss" class="icon-button" onclick="editNum = ' + totalClickFields + '"><span>SS</span>\n</button>\n<div class="ss_flyout">\n<div id="point"></div>\n<div id="ss_flyout_fields">\n<select class="ss_select">\n\t<option value="facebook">Facebook</option>\n<option value="twitter">Twitter</option>\n<option value="instagram">instagram</option>\n<option value="button">Button</option>\n</select>\n</div>\n</div>\n</div>\n</div>');
    for (var i = 1; i< totalClickFields; i++) {
      $('#txt_clickTag' + i).val(currentTags[i]);
    }
    $('#clickTag' + totalClickFields).find('.ct_over').css('border-right', '10px solid ' + '#' + Math.floor(Math.random()*16777215).toString(16));
    $('#clickTag1').find('#btn_ct').prop('disabled', true);
    $('#clickTag1').find('#btn_ss').prop('disabled', true);
  }
}

var addDisc = function(disc_txt, disc_click) {
  if(discNum < 3) {
    disc_txt = (typeof disc_txt !== 'object') ? disc_txt : '';
    disc_click = (disc_click !== undefined) ? disc_click : '1';
    var discFields = $('#disc_fields').html();
    var currentDiscs = {};
    for (var i = 1; i <= discNum; i++) {
      currentDiscs['text' + i] = $('#txt_disclaimer' + i).val();
      currentDiscs['clickTag' + i] = $('#disclaimer' + i).find('#txt_clickDisc').val();
    }
    discNum++;
    $('#disc_fields').html(discFields + '\n<div id="disclaimer' + discNum + '">\n\t<div id="btn_sub_disc_div">\n\t<button id="btn_sub_disc" class="icon-button" onclick="editNum = ' + discNum + '"\n\t><div class="circle">\n\t<span>-</span>\n</div>\n</button>\n</div>\n<input id="txt_clickDisc" class="text-input" type="text" placeholder="" value="' + disc_click + '">\n<button class="disc_top" onclick="expNum = ' + discNum + '">\n\t<h4>Disclaimer' + discNum + '</h4>\n</button>\n<textarea id="txt_disclaimer' + discNum + '" class="disc_textarea" rows="10" cols="45" placeholder="Enter Disclaimer Text">' + disc_txt + '</textarea>\n</div>');
    for (var i = 1; i< discNum; i++) {
      $('#txt_disclaimer' + i).val(currentDiscs['text' + i]);
      $('#disclaimer' + i).find('#txt_clickDisc').val(currentDiscs['clickTag' + i]);
    }
  }
}

var getInfo = function() {
  csInterface.evalScript('UI.timeline.layers[0].name', function(initCheck) {
    if (initCheck === 'actions') {
      csInterface.evalScript('onClick_btn_getInfo()', function(result) {
        result = JSON.parse(result);
        if ($('#txt_clickTag1') != null) {
          for (var i = totalClickFields; i > 0; i--){
            if (i === 1) {
              $('#txt_clickTag1').val('');
            }else {
              $('#btn_sub').click();
            }
          }
          $('#clickTag1').find('h4').html('ClickTag 1');
          clickNum = 1;
          totalClickFields = 1;
          for (var i = 1; i <= result.clickNum; i++) {
            if (i === 1) {
               $('#txt_clickTag1').val(result['clickTag' + i]);
             } else {
                addField(result['clickTag' + i]);
               }
          }
          for (var i = 1; i <= result.widgetNum; i++) {
            if (result['facebook' + i]) {
              addField(result['facebook' + i]);
              $('#clickTag' + totalClickFields).find('#btn_ss').find('span').css({'color': '#1381ff', 'text-shadow': '0px 0px 3px #4a9cfb'});
              $('#clickTag' + totalClickFields).find('#btn_ct').find('span').css({'color': '#544859', 'text-shadow': 'none'});
              $('#clickTag' + totalClickFields).find('h4').html('facebook');
            }
            if (result['twitter' + i]) {
              addField(result['twitter' + i]);
              $('#clickTag' + totalClickFields).find('#btn_ss').find('span').css({'color': '#1381ff', 'text-shadow': '0px 0px 3px #4a9cfb'});
              $('#clickTag' + totalClickFields).find('#btn_ct').find('span').css({'color': '#544859', 'text-shadow': 'none'});
              $('#clickTag' + totalClickFields).find('h4').html('twitter');
            }
            if (result['instagram' + i]) {
              addField(result['instagram' + i]);
              $('#clickTag' + totalClickFields).find('#btn_ss').find('span').css({'color': '#1381ff', 'text-shadow': '0px 0px 3px #4a9cfb'});
              $('#clickTag' + totalClickFields).find('#btn_ct').find('span').css({'color': '#544859', 'text-shadow': 'none'});
              $('#clickTag' + totalClickFields).find('h4').html('instagram');
            }
            if (result['button' + i]) {
              addField(result['button' + i]);
              $('#clickTag' + totalClickFields).find('#btn_ss').find('span').css({'color': '#1381ff', 'text-shadow': '0px 0px 3px #4a9cfb'});
              $('#clickTag' + totalClickFields).find('#btn_ct').find('span').css({'color': '#544859', 'text-shadow': 'none'});
              $('#clickTag' + totalClickFields).find('h4').html('button');
            }
          }
          clickNum = totalClickFields - result.widgetNum;
          $('#txt_borderWidth').val(result.border.width);
          $('#txt_borderColor').val(result.border.color);
          $('#btn_border').css('border', result.border.width + 'px solid ' + result.border.color);
          $('#chk_loopToggle').prop('checked', result.loop);
          for (var i = discNum; i > 0; i--){
            $('#disclaimer' + i).find('#btn_sub_disc').click();
          }
          if(result.disclaimer != 0) {
            discNum = 0;
            for (var i = 1; i < 4; i++){
              if (result.disclaimer['text' + i]){
                addDisc(result.disclaimer['text' + i], result.disclaimer['clickTag' + i]);
              }
            }
            if(result.disclaimer.clickToggle === false || result.disclaimer.hover === false) {
              $('#chk_clickToggle').click();
            }
            $('#chk_hoverToggle').prop('checked', result.disclaimer.hover);
            $('#txt_discFontColor').val(result.disclaimer.fontColor);
            $('#txt_discColor').val(result.disclaimer.bgcolor.slice(0, 7));
            if (parseInt('0x' + result.disclaimer.bgcolor.slice(7, 9)) / 2.555 >= 0) {
              $('#rng_opacity').val(parseInt('0x' + result.disclaimer.bgcolor.slice(7, 9)) / 2.555);
              $('#opLab').html('Opacity: ' + Math.floor(parseInt('0x' + result.disclaimer.bgcolor.slice(7, 9)) / 2.555) + '%');
            }else {
              $('#rng_opacity').val(100);
              $('#opLab').html('Opacity: 100%');
            }
            cornerTog = result.disclaimer.corner;
            if(cornerTog === 0) {
              $('#btn_sharpCorner').css('box-shadow', 'inset 0px -3px 0px #fb4f00');
              $('#btn_roundCorner').css('box-shadow', 'inset 0 2px rgba(115, 115, 115, .7)');
            }else {
              $('#btn_sharpCorner').css('box-shadow', 'inset 0 2px rgba(115, 115, 115, .7)');
              $('#btn_roundCorner').css('box-shadow', 'inset 0px -3px 0px #fb4f00');
            }
          }
        }
      });
    }
  });
  csInterface.evalScript('PUBLISH.genSizeReport();', function(result) {
    $('#sizeDisplay').html('Size of Document: ' + result/1000 + 'kb');
  });
};

//initial load
$('#inital').ready(function(){
  var autoTimer = setInterval(function() {
    csInterface.evalScript('fl.getDocumentDOM()', function(open) {
      if (open != 'null') {
        csInterface.evalScript('onSwitch()', function(testSwitch) {
          if (testSwitch != switchCount){
            get = 0;
            switchCount = testSwitch;
          }
        });
        if (get === 0) {
          getInfo();
          get = 1;
        }
      }else {
        get = 0;
      }
  });
  }, 60);
});

$('#inital').unload(function(){
  csInterface.evalScript('fl.removeEventListener("documentChanged", switcher)');
});

//border

var createBorder = function(){
  var bWidth = $('#txt_borderWidth').val();
  var bColor = $('#txt_borderColor').val();
  csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
  $('#btn_border').css('border', bWidth + 'px solid ' + bColor);
  $('#btn_border').unbind('click', createBorder);
};

$('#btn_border').click(function() {
  $('#border_flyout').animate({opacity:'toggle'});
  $('#btn_border').bind('click', createBorder);
});

//clickTag/widgets
$('#btn_add').click(addField);

$(document).on('click', '.ct_over', function () {
  if ($(".ct_over").css('right') === undefined){
    $(".ct_over").css('right', '0px');
  }
  if ($(":focus").css('right') != '100px') {
    $(":focus").animate({ right: '100px' }, 50);
  }else {
    $(":focus").animate({ right: '-=100px' }, 50);
    if ($('#clickTag' + editNum).find('.ss_flyout').css('opacity') != 0) {
      $('#clickTag' + editNum).find('.ss_flyout').animate({opacity: 'hide'});
    }
  }
});

$(document).on('click', '#btn_sub', function () {
  var j = editNum;
  var k = editNum;
  if (totalClickFields > 1) {
    if ($('#clickTag' + editNum).find('h4').html().slice(0, 8) === 'ClickTag') {
      clickNum--;
    }
    $('#clickTag' + editNum).remove();
    for (var i = 1; i <= totalClickFields; i++){
      if (i > editNum) {
        if ($('#clickTag' + i).find('h4').html().slice(0, 8) === 'ClickTag') {
          $('#clickTag' + i).find('h4').html('ClickTag ' + j);
          j = parseInt($('#clickTag' + i).find('h4').html().slice(9, 10)) + 1;
        }
        $('#txt_clickTag' + i).attr('id', 'txt_clickTag' + k);
        $('#clickTag' + i).find('#btn_sub').attr('onclick', 'editNum = ' + k);
        $('#clickTag' + i).find('#btn_ct').attr('onclick', 'editNum = ' + k);
        $('#clickTag' + i).find('#btn_ss').attr('onclick', 'editNum = ' + k);
        $('#clickTag' + i).attr('id', 'clickTag' + k);
        k++;
      }
    }
    totalClickFields--;
  }
  $('#clickTag1').find('#btn_ct').prop('disabled', true);
  $('#clickTag1').find('#btn_ss').prop('disabled', true);
});

$(document).on('click', '#btn_ct', function () {
  var j = 1;
  $('#clickTag' + editNum).find('#btn_ct').find('span').css({'color': '#1381ff', 'text-shadow': '0px 0px 3px #4a9cfb'});
  $('#clickTag' + editNum).find('#btn_ss').find('span').css({'color': '#544859', 'text-shadow': 'none'});
  $('#clickTag' + editNum).find('.ss_flyout').animate({opacity: 'hide'});
  if ($('#clickTag' + editNum).find('h4').html().slice(0, 8) != 'ClickTag') {
    $('#clickTag' + editNum).find('h4').html('ClickTag ' + editNum);
    for (var i = 1; i <= totalClickFields; i++){
      if ($('#clickTag' + i).find('h4').html().slice(0, 8) === 'ClickTag'){
        $('#clickTag' + i).find('h4').html('ClickTag ' + j);
      }else {
        j--;
      }
      j++;
    }
    clickNum++;
  }
});

$(document).on('click', '#btn_ss', function () {
  var j = 1;
  $('#clickTag' + editNum).find('#btn_ss').find('span').css({'color': '#1381ff', 'text-shadow': '0px 0px 3px #4a9cfb'});
  $('#clickTag' + editNum).find('#btn_ct').find('span').css({'color': '#544859', 'text-shadow': 'none'});
  $('#clickTag' + editNum).find('.ss_flyout').css({'top': (event.pageY + 18)});
  $('#clickTag' + editNum).find('.ss_flyout').animate({opacity: 'toggle'});
  if ($('#clickTag' + editNum).find('h4').html().slice(0, 8) === 'ClickTag'){
    $('#clickTag' + editNum).find('h4').html($('#clickTag' + editNum).find('.ss_select').val());
    for (var i = 1; i <= totalClickFields; i++){
      if ($('#clickTag' + (i)).find('h4').html().slice(0, 8) === 'ClickTag'){
        $('#clickTag' + i).find('h4').html('ClickTag ' + j);
      }else {
        j--;
      }
      j++;
    }
    clickNum--;
  }
});

$(document).on('click', '.ss_select', function () {
  $('#clickTag' + editNum).find('h4').html($('#clickTag' + editNum).find('.ss_select').val());
});

//disclaimer
$('#btn_add_disc').click(addDisc);

$(document).on('click', '#btn_sub_disc', function () {
  if (discNum > 0) {
    $('#disclaimer' + editNum).remove();
    if (editNum < discNum) {
      for (var i = editNum + 1; i <= discNum; i++) {
        $('#disclaimer' + i).find('h4').html('disclaimer ' + (i - 1));
        $('#txt_disclaimer' + i).attr('id', 'txt_disclaimer' + (i - 1));
        $('#disclaimer' + i).find('#btn_sub_disc').attr('onclick', 'editNum = ' + (i - 1));
        $('#disclaimer' + i).find('.disc_top').attr('onclick', 'expNum = ' + (i - 1));
        $('#disclaimer' + i).attr('id', 'disclaimer' + (i - 1));
      }
    }
    discNum--;
  }
});

//disclaimer settings
$('#toggleHover').click(function () {
  if (!$('#chk_hoverToggle').prop('checked')) {
    $('#chk_clickToggle').prop('checked', false);
    $('#chk_clickToggle').prop('disabled', true);
    for (var i = 1; i <= discNum; i++){
      $('#disclaimer' + i).find('#txt_clickDisc').prop('disabled', true);
    }
  }else {
    $('#chk_clickToggle').prop('disabled', false);
    $('#chk_clickToggle').prop('checked', true);
    for (var i = 1; i <= discNum; i++){
      $('#disclaimer' + i).find('#txt_clickDisc').prop('disabled', false);
    }
  }
});

$('#chk_clickToggle').click(function(){
  if ($('#chk_clickToggle').prop('checked')) {
    for (var i = 1; i <= discNum; i++){
      $('#disclaimer' + i).find('#txt_clickDisc').prop('disabled', false);
    }
  }else {
    for (var i = 1; i <= discNum; i++){
      $('#disclaimer' + i).find('#txt_clickDisc').prop('disabled', true);
    }
  }
});

$('#btn_settings_disc').click(function() {
  $('#disc_settings').animate({ height: 'toggle' });
});

$(document).on('click', '.disc_top', function () {
  $('#txt_disclaimer' + expNum).animate({ height: 'toggle' });
});

$('#btn_roundCorner').click(function() {
  cornerTog = 1;
  $('#btn_sharpCorner').css('box-shadow', 'inset 0 2px rgba(115, 115, 115, .7)');
  $('#btn_roundCorner').css('box-shadow', 'inset 0px -3px 0px #fb4f00');
});
$('#btn_sharpCorner').click(function() {
  cornerTog = 0;
  $('#btn_sharpCorner').css('box-shadow', 'inset 0px -3px 0px #fb4f00');
  $('#btn_roundCorner').css('box-shadow', 'inset 0 2px rgba(115, 115, 115, .7)');
});

$(document).on('change', '#rng_opacity', function () {
  $('#opLab').html('Opacity: ' + $('#rng_opacity').val() + '%');
});

//reset bttn
$('#btn_reset').click(function() {
  location.href='index.html';
});

}());
