/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//********PATH FOR WHEN IT"S PUBLISHED********//
//var JS_PATH = 'file:///Library/Application Support/Adobe/CEP/extensions/com.giadc.digitalToolbox/js/classes'

//**************INCLUDE CODE FOR EXTERNAL JS****************//
var JS_PATH = fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/js/classes';
var files = FLfile.listFolder(JS_PATH)
for (var i = 0; i < files.length; i++) {
	eval(FLfile.read(JS_PATH+ '/' + files[i]));
}

//***********PUBLISH SETTINGS************//
function initializeDoc() {
	var setPub = new PublishClass;
	setPub.setPublishSettings();
}

//***********BORDER*************//
function onClick_btn_border(bWidth, bColor) {
	var x = new PublishClass;
	x.setPublishSettings();
  bWidth = parseInt(bWidth);
  var util = new UtilitiesClass;
  var foo = new BorderClass;
  var borderCheck = util.layerCheck('border');
  var actionsCheck = util.layerCheck('actions');
  var tagCheck = util.layerCheck('clickTag');

  //make border if it doesn't exist
  if (borderCheck > -1) {
    fl.getDocumentDOM().getTimeline().deleteLayer(borderCheck);
    foo.createBorderGuide(actionsCheck + 1, tagCheck, bWidth, bColor);
    foo.createBorder(actionsCheck, bWidth, bColor);
  } else {
    foo.createBorderGuide(actionsCheck + 1, tagCheck, bWidth, bColor);
    foo.createBorder(actionsCheck, bWidth, bColor);
  }
  fl.actionsPanel.setSelection(0,0);
}

//**************CLICK TAG***************//
function onClick_btn_clickTag() {

  var foo = new ClickTagClass;
  var util = new UtilitiesClass;
  var tagCheck = util.layerCheck('clickTag');
  var clickCheck = util.layerCheck('actions');

  //deletes previous clickTags
  if (fl.getDocumentDOM().library.itemExists('btn_clickTag')) {
    fl.getDocumentDOM().library.deleteItem('btn_clickTag');
  }

  foo.giadcScriptInject(clickCheck);
  if (tagCheck > -1) {
    fl.getDocumentDOM().getTimeline().deleteLayer(tagCheck);
    foo.createClickTag();
  } else {
    foo.createClickTag();
  }
  fl.actionsPanel.setSelection(0,0);
  fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
}

//*****************LOOP******************//

function createLoop(loopTog) {

  var frameIndex = (fl.getDocumentDOM().getTimeline().frameCount) - 1;
  if(loopTog === 'true') {
    fl.getDocumentDOM().getTimeline().setSelectedFrames(frameIndex, frameIndex, true);
    //alert(fl.getDocumentDOM().getTimeline().frameCount);
    fl.getDocumentDOM().getTimeline().clearKeyframes();
    fl.getDocumentDOM().getTimeline().convertToKeyframes();
    fl.actionsPanel.setText('if (!this.alreadyExecuted) {\n\tthis.alreadyExecuted=true;\n\tthis.loopNum = 1;\n} else {\n\tthis.loopNum++;\n\tif (this.loopNum === 3) {\n\t\tthis.stop();\n\t}\n}');
    fl.actionsPanel.setSelection(0,0);
  } else {
    fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
    fl.getDocumentDOM().getTimeline().setSelectedFrames(frameIndex, frameIndex, true);
    fl.getDocumentDOM().getTimeline().clearKeyframes();
  }
}
