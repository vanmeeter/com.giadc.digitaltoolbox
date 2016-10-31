var clickNum = 1;
var discNum = 0;
var get = 0;
var cornerTog = 0;
var editNum;
var expNum = 0;

(function() {
var switchCount = 1;
var csInterface = new CSInterface();
var rotate = document.getElementById("btn_reset");

var addField = function(url) {
  if(clickNum < 9) {
    var url = (typeof url !== 'object') ? url : "";
    var clickFields = document.getElementById("click_fields").innerHTML;
    var currentTags = {};
    for (var i = 1; i <= clickNum; i++) {
      currentTags[i] = document.getElementById("txt_clickTag" + i).value;
    }
    clickNum++;
    document.getElementById("click_fields").innerHTML = clickFields + '\n<div id="clickTag' + clickNum + '"><button class="ct_over">\n\t<h4>ClickTag ' + clickNum + '</h4>\n\t</br>\n\t<input id="txt_clickTag' + clickNum + '" class="text-input" type="text" placeholder="Enter ClickTag" value="' + url + '" required>\n</button>\n<div class="ct_under">\n\t<button id="btn_sub" class="icon-button" onclick="editNum = ' + clickNum + '">\n\t\t<div class="circle">\n\t\t\t<span>-</span>\n\t\t</div>\n\t</button>\n</div></div>';
    for (var i = 1; i< clickNum; i++) {
      document.getElementById("txt_clickTag" + i).value = currentTags[i];
    }
    $("#clickTag" + clickNum).find(".ct_over").css('border-right', '10px solid ' + '#' + Math.floor(Math.random()*16777215).toString(16));
  }
}

var addDisc = function(disc_txt) {
  if(discNum < 3) {
    var disc_txt = (typeof url !== 'object') ? disc_txt : "";
    var discFields = $("#disc_fields").html();
    var currentDiscs = {};
    for (var i = 1; i <= discNum; i++) {
      currentDiscs[i] = $("#txt_disclaimer" + i).value;
    }
    discNum++;
    $("#disc_fields").html(discFields + '\n<div id="disclaimer' + discNum + '">\n\t<div id="btn_sub_disc_div">\n\t<button id="btn_sub_disc" class="icon-button" onclick="editNum = ' + discNum + '"\n\t><div class="circle">\n\t<span>-</span>\n</div>\n</button>\n</div>\n<button class="disc_top" onclick="expNum = ' + discNum + '">\n\t<h4>Disclaimer' + discNum + '</h4>\n</button>\n<textarea id="txt_disclaimer' + discNum + '" class="disc_textarea" rows="10" cols="45" placeholder="Enter Disclaimer Text"></textarea>\n</div>');
    for (var i = 1; i< discNum; i++) {
      $("#disclaimer" + i).value = currentDiscs[i];
    }
  }
}


var getInfo = function() {
  csInterface.evalScript('UI.timeline.layers[0].name', function(initCheck) {
    if (initCheck === 'actions') {
      csInterface.evalScript('onClick_btn_getInfo()', function(result) {
        result = JSON.parse(result);
        var tagField = Object.keys(result).length - 7;
        if (document.getElementById("txt_clickTag1") != null) {
          for (var i = 1; i <= tagField; i++) {
            if (i === 1) {
               document.getElementById("txt_clickTag1").value = result['clickTag' + i];
             } else {
               if (clickNum < tagField && !document.getElementById("txt_clickTag" + i)) {
                 addField(result['clickTag' + i]);
               }
             }
             if (tagField < clickNum) {
               var removeUpdate = clickNum - tagField;
               for(var i = 0; i < removeUpdate; i++){
                $("#btn_sub").click();
              }
             }
          }
          document.getElementById("txt_borderWidth").value = result.border.width;
          document.getElementById("txt_borderColor").value = result.border.color;
          $('#btn_border').css('border', result.border.width + 'px solid ' + result.border.color);
          document.getElementById("chk_loopToggle").checked = result.loop;
          csInterface.evalScript('UTIL.layerCheck(' + "'disclaimer'" + ')', function(discCheck) {
            if(discCheck >= 0) {
              document.getElementById("txt_disclaimer1").innerHTML = result.disclaimerText;
              if (result.disclaimerHover === false) {
                document.getElementById("chk_clickToggle").checked = false;
                document.getElementById("chk_clickToggle").disabled = true;
              }
              document.getElementById("chk_hoverToggle").checked = result.disclaimerHover;
              document.getElementById("txt_discFontColor").value = result.disclaimerFontColor;
              document.getElementById("txt_discColor").value = result.disclaimerColor.slice(0, 7);
              if (parseInt('0x' + result.disclaimerColor.slice(7, 9)) / 2.555 >= 0) {
                document.getElementById("rng_opacity").value = parseInt('0x' + result.disclaimerColor.slice(7, 9)) / 2.555;
              }else {
                document.getElementById("rng_opacity").value = 100;
              }
              cornerTog = result.disclaimerCorner;
              if(cornerTog === 0) {
                $('#btn_sharpCorner').css('box-shadow', 'inset 0px -3px 0px #fb4f00');
                $('#btn_roundCorner').css('box-shadow', 'inset 0 2px rgba(115, 115, 115, .7)');
              }else {
                $('#btn_sharpCorner').css('box-shadow', 'inset 0 2px rgba(115, 115, 115, .7)');
                $('#btn_roundCorner').css('box-shadow', 'inset 0px -3px 0px #fb4f00');
              }
            }
          });
        }
      });
    }
  });
};

$("#inital").ready(function(){
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

$("#inital").unload(function(){
  csInterface.evalScript('fl.removeEventListener("documentChanged", switcher)');
});

$("#btn_border").click(function() {
  $("#border_flyout").animate({opacity:'toggle'});
  $("#btn_border").click(function(){
    var bWidth = document.getElementById("txt_borderWidth").value;
    var bColor = document.getElementById("txt_borderColor").value;
    csInterface.evalScript('onClick_btn_border("' + bWidth + '", "' + bColor + '")');
    $('#btn_border').css('border', bWidth + 'px solid ' + bColor);
  });
});

$("#btn_add").click(addField);

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

$("#toggleHover").click(function () {
  if (document.getElementById("chk_hoverToggle").checked === false) {
    document.getElementById("chk_clickToggle").checked = false;
    document.getElementById("chk_clickToggle").disabled = true;
  }else {
    document.getElementById("chk_clickToggle").disabled = false;
    document.getElementById("chk_clickToggle").checked = true;
  }
});

$("#btn_settings_disc").click(function(){
  $("#disc_settings").animate({ height: 'toggle' });
});

$(document).on('click', '.disc_top', function () {
  $("#txt_disclaimer" + expNum).animate({ height: 'toggle' });
});

$("#btn_roundCorner").click(function() {
  cornerTog = 1;
  $('#btn_sharpCorner').css('box-shadow', 'inset 0 2px rgba(115, 115, 115, .7)');
  $('#btn_roundCorner').css('box-shadow', 'inset 0px -3px 0px #fb4f00');
});
$("#btn_sharpCorner").click(function() {
  cornerTog = 0;
  $('#btn_sharpCorner').css('box-shadow', 'inset 0px -3px 0px #fb4f00');
  $('#btn_roundCorner').css('box-shadow', 'inset 0 2px rgba(115, 115, 115, .7)');
});

//reset bttn
rotate.addEventListener( 'mouseover', function () {

    this.className = 'over';
    this.cursor = 'pointer';

}, false );

rotate.addEventListener( 'mouseout', function () {

    var rotate = this;

    rotate.className = 'out';
    window.setTimeout( function () { rotate.className = '' }, 150 );

}, false );

$("#btn_reset").click(function() {
  location.href='index.html';
  localStorage["footer"] = 'Size of Document: ';
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
