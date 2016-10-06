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
	var frameIndex = UI.timeline.frameCount;

	if (frameIndex < 30){
		UI.timeline.insertFrames((90 - frameIndex), true);
	}

	setPub.setPublishSettings();
}

//************GET INFO FROM CREATED AD***************//
function onClick_btn_getInfo() {
	var data = {};
	var totalLayers = UI.timeline.layerCount;
	var totalFrames = UI.timeline.frameCount;
	for (var i = 0; i < totalLayers; i++) {
		for (var j = 1; j < 10; j++){
			if (UI.timeline.layers[i].name === 'clickTag' + j) {
				for (var k = 0; k < totalFrames; k++) {
					if (!UI.timeline.layers[i].frames[k].isEmpty) {
						UI.timeline.currentFrame = k;
						break;
					}
				}
				UI.timeline.setSelectedLayers(i);
				var selectStop = fl.actionsPanel.getText().lastIndexOf('");');
				selectStop -= 165;
				fl.actionsPanel.setSelection(165, selectStop);
				var existingURL = fl.actionsPanel.getSelectedText()
				data[UI.timeline.layers[i].name] = existingURL;
			}
		}
		if (UI.timeline.layers[i].name === 'border') {
			UI.timeline.setSelectedLayers(i);
			UI.timeline.layers[i].locked = false;
			fl.getDocumentDOM().selectAll();
			data.border = {width: fl.getDocumentDOM().getCustomStroke().thickness, color: fl.getDocumentDOM().getCustomStroke().color};
			UI.timeline.layers[i].locked = true;
		}
	}
	fl.getDocumentDOM().selectNone();
	fl.actionsPanel.setSelection(0,0);
	UI.timeline.setSelectedLayers(0);
	return (JSON.encode(data));
}

//***********BORDER*************//
function onClick_btn_border(bWidth, bColor, clickNum) {
  bWidth = parseInt(bWidth);
  var borderCheck = UTIL.layerCheck('border');
  var actionsCheck = UTIL.layerCheck('actions');
  var tagCheck = UTIL.layerCheck('clickTag1');

  //make border if it doesn't exist
  if (borderCheck > -1) {
    UI.timeline.deleteLayer(borderCheck);
    BORDER.createBorder(actionsCheck, tagCheck, bWidth, bColor);
    //foo.createBorder(actionsCheck, bWidth, bColor);
  } else {
    BORDER.createBorder(actionsCheck, tagCheck, bWidth, bColor);
    //foo.createBorder(actionsCheck, bWidth, bColor);
  }
  //fl.actionsPanel.setSelection(0,0);
	UI.timeline.setSelectedLayers(0);
}

//**************CLICK TAG***************//
function onClick_btn_clickTag(clickURL) {
  //var foo = new ClickTagClass;
  var clickCheck = UTIL.layerCheck('actions');
	var tags = UTIL.parseObj(clickURL);
	var totalLayers = UI.timeline.layerCount;
	var totalFrames = UI.timeline.frameCount;
	var libItems = fl.getDocumentDOM().library.items;
	var libSize = libItems.length;
	var oldTag;
	TAG.giadcScriptInject(clickCheck);

  //deletes previous clickTags
	for (var i = 0; i < totalLayers; i++) {
		oldTag = UI.timeline.layers[i].name;
		oldTag = oldTag.slice(0, 8);
		if (oldTag === 'clickTag') {
			UI.timeline.deleteLayer(i);
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
		TAG.createClickTag(clickURL, i);
		clickEnd = Math.round(clickEnd * (i - 1));
		if (clickEnd != 0) {
			UI.timeline.clearFrames(clickStart, clickEnd);
		}
		clickStart = Math.round(clickEnd + (totalFrames / clickURL.clickNum));
		clickEnd = totalFrames;
		if (clickStart != totalFrames) {
			UI.timeline.clearFrames(clickStart, clickEnd);
		}
	}
	UI.timeline.setSelectedLayers(0);
}


//****************LOOP SETTINGS******************//
function onClick_chk_loopToggle(loopTog) {
	LOOP.loopToggle(loopTog);
}

//****************STATIC SET*****************//
function onClick_btn_static() {
	//fl.trace(fl.getDocumentDOM().exportPublishProfileString());
	var currF = UI.timeline.currentFrame;
	var staticCheck = UTIL.layerCheck('static');
	if (staticCheck === -1) {
		UI.timeline.setSelectedLayers(0);
		UI.timeline.addNewLayer('static', 'normal', false);
		UI.timeline.setSelectedLayers(1);
	} else {
		for (var i = 0; i < UI.timeline.frameCount; i++) {
			if (UI.timeline.layers[staticCheck].frames[i].name === 'static') {
				UI.timeline.setSelectedLayers(staticCheck);
				UI.timeline.setSelectedFrames(i, i);
				UI.timeline.clearKeyframes();
				break;
			}
		}
	}
	UI.timeline.convertToKeyframes(currF, currF);
	UI.timeline.setFrameProperty('name', 'static');
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
