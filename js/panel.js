var clickNum = 1;
var get = 0;
var cornerTog = 0;

(function() {
var switchCount = 1;
var csInterface = new CSInterface();
var rotate = document.getElementById("btn_reset");

var addField = function(url) {
  var url = (typeof url !== 'object') ? url : "";
  var clickFields = document.getElementById("click_fields").innerHTML;
  var currentTags = {};
  for (var i = 1; i <= clickNum; i++) {
    currentTags[i] = document.getElementById("txt_clickTag" + i).value;
  }
  clickNum++;
  document.getElementById("click_fields").innerHTML = clickFields + '<input id="txt_clickTag' + clickNum + '" class="topcoat-text-input" style="width:98%; margin-bottom:5px;" type="text" placeholder="Enter ClickTag" value="' + url + '" required>';
  for (var i = 1; i< clickNum; i++) {
    document.getElementById("txt_clickTag" + i).value = currentTags[i];
  }
}

var getInfo = function() {
  csInterface.evalScript('UI.timeline.layers[0].name', function(initCheck) {
    if (initCheck === 'actions') {
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
           if (tagField < clickNum) {
             var removeUpdate = clickNum - tagField;
             for(var i = 0; i < removeUpdate; i++){
              $("#btn_sub").click();
            }
           }
        }
        document.getElementById("txt_borderWidth").value = result.border.width;
        document.getElementById("txt_borderColor").value = result.border.color;
        document.getElementById("chk_loopToggle").checked = result.loop;
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

$("#btn_add").click(addField);

$("#btn_sub").click(function () {
  var clickFields = document.getElementById("click_fields").innerHTML;
  if (clickNum > 1) {
    $('#txt_clickTag' + clickNum).remove();
    clickNum--;
  }
});

$("#btn_disclaimer_tab").click(function () {
  var sizeDisplay = document.getElementById("sizeDisplay");
  localStorage["footer"] = sizeDisplay.innerHTML;
  location.href='disclaimer.html';
});

$("#toggleHover").click(function () {
  if (document.getElementById("chk_hoverToggle").checked === false) {
    document.getElementById("chk_clickToggle").checked = false;
  }else {
    document.getElementById("chk_clickToggle").checked = true;
  }
});

$("#btn_main_tab").click(function () {
  var sizeDisplay = document.getElementById("sizeDisplay");
  localStorage["footer"] = sizeDisplay.innerHTML;
  location.href='index.html';
});

$("#btn_roundCorner").click(function() {cornerTog = 1});
$("#btn_sharpCorner").click(function() {cornerTog = 0});

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
