/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//To stringify through JSON, use encode from JSON xjsfl library

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
		fl.getDocumentDOM().getTimeline().insertFrames((90 - frameIndex), true);
	}

	setPub.setPublishSettings();
}

//************GET INFO FROM CREATED AD***************//
function onClick_btn_getInfo() {
	var data = {};
	var totalLayers = fl.getDocumentDOM().getTimeline().layerCount;
	var totalFrames = fl.getDocumentDOM().getTimeline().frameCount;
	for (var i = 0; i < totalLayers; i++) {
		for (var j = 1; j < 10; j++){
			if (fl.getDocumentDOM().getTimeline().layers[i].name === 'clickTag' + j) {
				for (var k = 0; k < totalFrames; k++) {
					if (!fl.getDocumentDOM().getTimeline().layers[i].frames[k].isEmpty) {
						fl.getDocumentDOM().getTimeline().currentFrame = k;
						break;
					}
				}
				fl.getDocumentDOM().getTimeline().setSelectedLayers(i);
				var selectStop = fl.actionsPanel.getText().lastIndexOf('");');
				selectStop -= 141;
				fl.actionsPanel.setSelection(141, selectStop);
				var existingURL = fl.actionsPanel.getSelectedText()
				data[fl.getDocumentDOM().getTimeline().layers[i].name] = existingURL;
			}
		}
		if (fl.getDocumentDOM().getTimeline().layers[i].name === 'border') {
			fl.getDocumentDOM().getTimeline().setSelectedLayers(i);
			fl.getDocumentDOM().getTimeline().layers[i].locked = false;
			fl.getDocumentDOM().selectAll();
			data.border = {width: fl.getDocumentDOM().getCustomStroke().thickness, color: fl.getDocumentDOM().getCustomStroke().color};
			fl.getDocumentDOM().getTimeline().layers[i].locked = true;
		}
	}
	fl.getDocumentDOM().selectNone();
	fl.actionsPanel.setSelection(0,0);
	fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
	return (JSON.encode(data));
}

//***********BORDER*************//
function onClick_btn_border(bWidth, bColor, clickNum) {
  bWidth = parseInt(bWidth);
  var foo = new BorderClass;
  var borderCheck = UTIL.layerCheck('border');
  var actionsCheck = UTIL.layerCheck('actions');
  var tagCheck = UTIL.layerCheck('clickTag1');

  //make border if it doesn't exist
  if (borderCheck > -1) {
    fl.getDocumentDOM().getTimeline().deleteLayer(borderCheck);
    foo.createBorder(actionsCheck, tagCheck, bWidth, bColor);
    //foo.createBorder(actionsCheck, bWidth, bColor);
  } else {
    foo.createBorder(actionsCheck, tagCheck, bWidth, bColor);
    //foo.createBorder(actionsCheck, bWidth, bColor);
  }
  //fl.actionsPanel.setSelection(0,0);
	fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
}

//**************CLICK TAG***************//
function onClick_btn_clickTag(clickURL) {
  var foo = new ClickTagClass;
  var clickCheck = UTIL.layerCheck('actions');
	var tags = UTIL.parseObj(clickURL);
	var totalLayers = fl.getDocumentDOM().getTimeline().layerCount;
	var totalFrames = fl.getDocumentDOM().getTimeline().frameCount;
	var libItems = fl.getDocumentDOM().library.items;
	var libSize = libItems.length;
	var oldTag;
	foo.giadcScriptInject(clickCheck);

  //deletes previous clickTags
	for (var i = 0; i < totalLayers; i++) {
		oldTag = fl.getDocumentDOM().getTimeline().layers[i].name;
		oldTag = oldTag.slice(0, 8);
		if (oldTag === 'clickTag') {
			fl.getDocumentDOM().getTimeline().deleteLayer(i);
			totalLayers--;
			i--;
		}
	}
	for (var i = 0; i < 10; i++) {
		if (fl.getDocumentDOM().library.itemExists('btn_clickTag' + i)) {
			fl.getDocumentDOM().library.deleteItem('btn_clickTag' + i);
		}
	}

	//clickTag creation
	for (var i = 1; i <= clickURL.clickNum; i++) {
		var clickStart = 0;
		var clickEnd = totalFrames / clickURL.clickNum;
		if(!UTIL.validateUrl(clickURL['clickTag' + i])) {
			clickURL['clickTag' + i] = 'http://' + clickURL['clickTag' + i];
		}
		foo.createClickTag(clickURL, i);
		clickEnd = Math.round(clickEnd * (i - 1));
		if (clickEnd != 0) {
			fl.getDocumentDOM().getTimeline().clearFrames(clickStart, clickEnd);
		}
		clickStart = Math.round(clickEnd + (totalFrames / clickURL.clickNum));
		clickEnd = totalFrames;
		if (clickStart != totalFrames) {
			fl.getDocumentDOM().getTimeline().clearFrames(clickStart, clickEnd);
		}
	}
	fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
}


//****************LOOP SETTINGS******************//
function onClick_chk_loopToggle(loopTog) {
	var setLoop = new LoopClass;
	setLoop.loop(loopTog);
}

//****************STATIC SET*****************//
function onClick_btn_static() {
	//fl.trace(fl.getDocumentDOM().exportPublishProfileString());
	var currF = fl.getDocumentDOM().getTimeline().currentFrame;
	var staticCheck = UTIL.layerCheck('static');
	if (staticCheck === -1) {
		fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
		fl.getDocumentDOM().getTimeline().addNewLayer('static', 'normal', false);
		fl.getDocumentDOM().getTimeline().setSelectedLayers(1);
	} else {
		for (var i = 0; i < fl.getDocumentDOM().getTimeline().frameCount; i++) {
			if (fl.getDocumentDOM().getTimeline().layers[staticCheck].frames[i].name === 'static') {
				fl.getDocumentDOM().getTimeline().setSelectedLayers(staticCheck);
				fl.getDocumentDOM().getTimeline().setSelectedFrames(i, i);
				fl.getDocumentDOM().getTimeline().clearKeyframes();
				break;
			}
		}
	}
	fl.getDocumentDOM().getTimeline().convertToKeyframes(currF, currF);
	fl.getDocumentDOM().getTimeline().setFrameProperty('name', 'static');
}

//****************PUBLISH AD********************//
function onClick_btn_publish() {
	var tagCheck = UTIL.layerCheck('clickTag1');
  var clickCheck = UTIL.layerCheck('actions');

	if (tagCheck > -1 && clickCheck > -1) {
		if (fl.getDocumentDOM().pathURI === undefined){
			alert('Document must be saved.');
			return 0;
		} else {
			fl.getDocumentDOM().publish();
			var sizeReport = SZREP.genSizeReport();
			return sizeReport;
		}
	} else {
		alert('Document must be initialized.');
		return 0;
	}
}
