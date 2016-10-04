var clickNum = 1;

$("#btn_add").click(function () {
  var clickFields = document.getElementById("click_fields").innerHTML;
  var currentTags = {};
  for (var i = 1; i <= clickNum; i++) {
    currentTags[i] = document.getElementById("txt_clickTag" + i).value;
  }
  clickNum++;
  document.getElementById("click_fields").innerHTML = clickFields + '<input id="txt_clickTag' + clickNum + '" class="topcoat-text-input" style="width:98%; margin-bottom:5px;" type="text" placeholder="Enter ClickTag" required>';
  for (var i = 1; i< clickNum; i++) {
    document.getElementById("txt_clickTag" + i).value = currentTags[i];
  }
});

$("#btn_sub").click(function () {
  var clickFields = document.getElementById("click_fields").innerHTML;
  if (clickNum > 1) {
    $('#txt_clickTag' + clickNum).remove();
    clickNum--;
  }
});
