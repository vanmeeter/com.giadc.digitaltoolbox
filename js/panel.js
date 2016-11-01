var clickNum = 1;
var discNum = 0;
var get = 0;
var cornerTog = 0;
var editNum;
var expNum = 0;

(function() {
var switchCount = 1;
var csInterface = new CSInterface();
var rotate = $('#btn_reset');

var addField = function(url) {
  if(clickNum < 9) {
    var url = (typeof url !== 'object') ? url : '';
    var clickFields = $('#click_fields').html();
    var currentTags = {};
    for (var i = 1; i <= clickNum; i++) {
      currentTags[i] = $('#txt_clickTag' + i).val();
    }
    clickNum++;
    $('#click_fields').html(clickFields + '\n<div id="clickTag' + clickNum + '"><button class="ct_over">\n\t<h4>ClickTag ' + clickNum + '</h4>\n\t</br>\n\t<input id="txt_clickTag' + clickNum + '" class="text-input" type="text" placeholder="Enter ClickTag" value="' + url + '" required>\n</button>\n<div class="ct_under">\n\t<button id="btn_sub" class="icon-button" onclick="editNum = ' + clickNum + '">\n\t\t<div class="circle">\n\t\t\t<span>-</span>\n\t\t</div>\n\t</button>\n</div></div>');
    for (var i = 1; i< clickNum; i++) {
      $('#txt_clickTag' + i).val(currentTags[i]);
    }
    $('#clickTag' + clickNum).find('.ct_over').css('border-right', '10px solid ' + '#' + Math.floor(Math.random()*16777215).toString(16));
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
        var tagField = Object.keys(result).length - 3;
        if ($('#txt_clickTag1') != null) {
          for (var i = clickNum; i > 0; i--){
            if (i === 1) {
              $('#txt_clickTag1').val('');
            }else {
              $('#btn_sub').click();
            }
          }
          clickNum = 1;
          for (var i = 1; i <= tagField; i++) {
            if (i === 1) {
               $('#txt_clickTag1').val(result['clickTag' + i]);
             } else {
                 addField(result['clickTag' + i]);
               }
          }
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
};

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

$('#btn_border').click(function() {
  $('#border_flyout').animate({opacity:'toggle'});
  $('#btn_border').click(function(){
    var bWidth = $('#txt_borderWidth').val();
    var bColor = $('#txt_borderColor').val();
    csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
    $('#btn_border').css('border', bWidth + 'px solid ' + bColor);
  });
});

$('#btn_add').click(addField);

$(document).on('click', '#btn_sub', function () {
  if (clickNum > 1) {
    $('#clickTag' + editNum).remove();
    if (editNum < clickNum) {
      for (var i = editNum + 1; i <= clickNum; i++) {
        $('#clickTag' + i).find('h4').html('ClickTag ' + (i - 1));
        $('#txt_clickTag' + i).attr('id', 'txt_clickTag' + (i - 1));
        $('#clickTag' + i).find('#btn_sub').attr('onclick', 'editNum = ' + (i - 1));
        $('#clickTag' + i).attr('id', 'clickTag' + (i - 1));
      }
    }
    clickNum--;
  }
});

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

$('#btn_settings_disc').click(function(){
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

/*$(document).on('click', '.ct_over', function () {
  if ($(".ct_over").css('right') === undefined){
    $(".ct_over").css('right') = '0px';
  }
  if ($(":focus").css('right') != '40px') {
    $(":focus").animate({ right: '40px' });
  }else{
    $(":focus").animate({ right: '-=40px' });
  }
});*/
