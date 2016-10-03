/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//********PATH FOR WHEN IT"S PUBLISHED********//
//var JS_PATH = 'file:///Library/Application Support/Adobe/CEP/extensions/com.giadc.digitalToolbox/js/classes'

//**************INCLUDE CODE FOR EXTERNAL JS****************//
var JS_PATH = fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/js/classes';
var files = FLfile.listFolder(JS_PATH)
for (var i = 0; i < files.length; i++) {
	eval(FLfile.read(JS_PATH + '/' + files[i]));
}

//***********DOCUMENT INITIALIZE************//
function initializeDoc() {
	var setPub = new PublishClass;
	var frameIndex = fl.getDocumentDOM().getTimeline().frameCount;

	if (frameIndex < 30){
		fl.getDocumentDOM().getTimeline().insertFrames((90 - frameIndex), true)
	}

	setPub.setPublishSettings();
}

//***********BORDER*************//
function onClick_btn_border(bWidth, bColor) {
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
function onClick_btn_clickTag(clickURL) {
	alert(clickURL);
  var foo = new ClickTagClass;
  var util = new UtilitiesClass;
  var tagCheck = util.layerCheck('clickTag');
  var clickCheck = util.layerCheck('actions');
	var tags = util.parseObj(clickURL);

  foo.giadcScriptInject(clickCheck);

  if (tagCheck > -1) {
    fl.getDocumentDOM().getTimeline().deleteLayer(tagCheck);
		for (var i = 1; i <= clickURL.clickNum; i++) {
			//deletes previous clickTags
			if (fl.getDocumentDOM().library.itemExists('btn_clickTag' + i)) {
				fl.getDocumentDOM().library.deleteItem('btn_clickTag' + i);
			}
    	foo.createClickTag(clickURL, i);
		}
  } else {
		for (var i = 1; i <= clickURL.clickNum; i++) {
    	foo.createClickTag(clickURL, i);
		}
  }
  fl.actionsPanel.setSelection(0,0);
  fl.getDocumentDOM().getTimeline().setSelectedFrames(0, 0, true);
}

//****************LOOP SETTINGS******************//
function onClick_chk_loopToggle(loopTog) {
	var setLoop = new LoopClass;
	setLoop.loop(loopTog);
}

//****************PUBLISH AD********************//
function onClick_btn_publish() {
	foo = new SizeReportClass;
	var util = new UtilitiesClass;
	var tagCheck = util.layerCheck('clickTag');
  var clickCheck = util.layerCheck('actions');

	if (tagCheck > -1 && clickCheck > -1) {
		if (fl.getDocumentDOM().pathURI === undefined){
			alert('Ad must be saved first.');
			return 0
		} else {
			fl.getDocumentDOM().publish();
			var sizeReport = foo.genSizeReport();
			return sizeReport;;
		}
	} else {
		alert('Ad must be initialized first.');
		return 0;
	}
}
