/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//To stringify through JSON, use encode from JSON xjsfl library

//********PATH FOR WHEN IT"S PUBLISHED********//
//var JS_PATH = 'file:///Library/Application Support/Adobe/CEP/extensions/com.giadc.digitalToolbox/js/classes'

//**************INCLUDE CODE FOR EXTERNAL JS****************//
var JS_PATH = fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/js/classes';
var files = FLfile.listFolder(JS_PATH);
for (var i = 0; i < files.length; i++) {
	eval(FLfile.read(JS_PATH + '/' + files[i]));
}

//******************DOC SWITCH****************//
var switchCount = 1;
var switcher = fl.addEventListener("documentChanged", function(){switchCount++});

function onSwitch() {
	return switchCount;
}

//***********DOCUMENT INITIALIZE************//
function initializeDoc() {
	var frameIndex = UI.timeline.frameCount;
	if (UTIL.layerCheck('actions') > -1) {
		UI.timeline.deleteLayer(UTIL.layerCheck('actions'));
	}
	UI.timeline.setSelectedLayers(0);
	UI.timeline.addNewLayer('actions', 'normal', true);
	TAG.giadcScriptInject(UTIL.layerCheck('actions'));

	UI.timeline.layers[UTIL.layerCheck('actions')].locked = true;
	if (frameIndex < 30){
		UI.timeline.insertFrames((90 - frameIndex), true);
	}
}

//************GET INFO FROM CREATED AD***************//
function onClick_btn_getInfo() {
	var data = {};
	var totalFrames = UI.timeline.frameCount;

	for (var j = 1; j < 10; j++){
		if (UTIL.layerCheck('clickTag' + j) > -1) {
			for (var k = 0; k < totalFrames; k++) {
				if (!UI.timeline.layers[UTIL.layerCheck('clickTag' + j)].frames[k].isEmpty) {
					UI.timeline.currentFrame = k;
					break;
				}
			}
			UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag' + j));
			var selectStop = fl.actionsPanel.getText().lastIndexOf('");');
			selectStop -= 173;
			fl.actionsPanel.setSelection(173, selectStop);
			var existingURL = fl.actionsPanel.getSelectedText()
			data[UI.timeline.layers[UTIL.layerCheck('clickTag' + j)].name] = existingURL;
		}
	}
	if (UI.timeline.layers[UTIL.layerCheck('border')]) {
		UI.timeline.layers[UTIL.layerCheck('border')].locked = false;
		UI.timeline.setSelectedLayers(UTIL.layerCheck('border'));

		data.border =
		{
			width: UI.dom.getCustomStroke().thickness,
			color: UI.dom.getCustomStroke().color
		};

		UI.timeline.layers[UTIL.layerCheck('border')].locked = true;
	}

	totalFrames = UI.timeline.layers[UTIL.layerCheck('actions')].frameCount;
	fl.actionsPanel.setSelection(0,0);
	UI.timeline.setSelectedLayers(0);
	if(UI.timeline.layers[UTIL.layerCheck('actions')].frames[totalFrames - 1].name === 'replay') {
		data.loop = false;
	}else {
		data.loop = true;
	}
	if (UTIL.layerCheck('disclaimer') >= 0){
		if(UI.dom.library.itemExists('disclaimer_close')){
			UI.dom.library.editItem('disclaimer_content');
			data.disclaimerText = UI.timeline.layers[0].frames[0].elements[1].getTextString();
			if (UI.timeline.layers[0].frames[0].elements[0].vertices.length > 4){
				data.disclaimerCorner = 1;
			}else {
				data.disclaimerCorner = 0;
			}
			data.disclaimerHover = false;
		}else {
			UI.dom.library.editItem('disclaimer_content');
			data.disclaimerText = UI.timeline.layers[0].frames[0].elements[2].getTextString();
			if (UI.timeline.layers[0].frames[0].elements[0].vertices.length > 6){
				data.disclaimerCorner = 1;
			}else {
				data.disclaimerCorner = 0;
			}
			data.disclaimerHover = true;
		}
		data.disclaimerFontColor = UI.timeline.layers[0].frames[0].elements[1].getTextAttr("fillColor");
		data.disclaimerColor = UI.dom.getCustomFill().color;
		UI.dom.exitEditMode();
	}else {
		data.disclaimerCorner = 0;
		data.disclaimerHover = true;
		data.disclaimerFontColor = '#ffffff';
		data.disclaimerColor = '#00000041';
		data.disclaimerText = '';
	}
	return (JSON.encode(data));
}

//***********BORDER*************//
function onClick_btn_border(bWidth, bColor) {
	if (UTIL.layerCheck('actions') > -1) {
	  bWidth = parseInt(bWidth);

	  //make border if it doesn't exist
	  if (UTIL.layerCheck('border') > -1) {
	    UI.timeline.deleteLayer(UTIL.layerCheck('border'));
	    BORDER.createBorder(bWidth, bColor);
	  }else {
	    BORDER.createBorder(bWidth, bColor);
	  }
		UI.timeline.layers[UTIL.layerCheck('border')].locked = true;
	}
}

//**************CLICK TAG***************//
function onClick_btn_clickTag(clickURL) {
	if (UTIL.layerCheck('actions') > -1) {
		JSON.decode(clickURL);
		var totalFrames = UI.timeline.frameCount;

	  //deletes previous clickTags
		for (var i = 1; i < 10; i++) {
			if (UTIL.layerCheck('clickTag' + i) > -1) {
				UI.timeline.deleteLayer(UTIL.layerCheck('clickTag' + i));
			}
		}
		for (var i = 0; i < 10; i++) {
			if (UI.dom.library.itemExists('btn_clickTag' + i)) {
				UI.dom.library.deleteItem('btn_clickTag' + i);
			}
		}
		//clickTag creation
		for (var i = 1; i <= clickURL.clickNum; i++) {
			var clickStart = 0;
			var clickEnd = totalFrames / clickURL.clickNum;

			TAG.createClickTag(UTIL.validateUrl(clickURL['clickTag' + i]), i);
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
}

//****************LOOP SETTINGS******************//
function onClick_chk_loopToggle(loopTog) {
	if (UTIL.layerCheck('actions') > -1) {
		initializeDoc();
		UI.timeline.layers[UTIL.layerCheck('actions')].locked = false;
		UI.dom.library.deleteItem('replay_bttn');
		UI.dom.library.deleteItem('replayArrow');
		UI.dom.library.deleteItem('replayArrow_inside');

		LOOP.loopToggle(loopTog);
		UI.timeline.layers[UTIL.layerCheck('actions')].locked = true;
	}
}

//****************STATIC SET*****************//
function onClick_btn_static() {
	if (UTIL.layerCheck('actions') > -1) {
		var currF = UI.timeline.currentFrame;
		if (UTIL.layerCheck('static') > -1) {
			UI.timeline.deleteLayer(UTIL.layerCheck('static'));
		}
		UI.timeline.setSelectedLayers(UTIL.layerCheck('actions'));
		UI.timeline.addNewLayer('static', 'normal', false);
		UI.timeline.setSelectedLayers(UTIL.layerCheck('static'));

		UI.timeline.convertToKeyframes(currF, currF);
		UI.timeline.setFrameProperty('name', 'static');
		UI.timeline.layers[UTIL.layerCheck('static')].locked = true;
	}
}

//****************PUBLISH AD********************//
function onClick_btn_publish() {
	if (UTIL.layerCheck('actions') > -1) {
			PUBLISH.publishDoc();
			return PUBLISH.genSizeReport();
	}
	return 0;
}

//****************PUBLISH JPG********************//
//TODO different pub files for each type of publishing
function onClick_btn_publishJpg() {
		PUBLISH.jpgProfile();
		PUBLISH.showHideLayers(false);
}


//******************DISCLAIMER TOOL****************//
function onClick_btn_disclaimer(disclaimer) {
	JSON.decode(disclaimer);
	var discNum = disclaimer.length;
	var totalFrames = UI.timeline.frameCount;
	for (var i = 1; i < 4; i++){
		if (UTIL.layerCheck('disclaimer' + i) > -1) {
			UI.timeline.deleteLayer(UTIL.layerCheck('disclaimer' + i));
		}
		if (UI.dom.library.itemExists('disclaimer' + i)) {
			UI.dom.library.deleteItem('disclaimer' + i);
			UI.dom.library.deleteItem('disclaimer_inner' + i);
			UI.dom.library.deleteItem('disclaimer_content' + i);
			UI.dom.library.deleteItem('disclaimer_display' + i);
			UI.dom.library.deleteItem('disclaimer_close' + i);
		}
	}
	for (var i = 1; i <= discNum; i++){
		var discStart = 0;
		var discEnd = totalFrames / discNum;

		DISCLAIMER.draw(disclaimer, i);
		DISCLAIMER.addText(disclaimer, i);
		DISCLAIMER.animate(disclaimer, i);

		discEnd = Math.round(discEnd * (i - 1));
		if (discEnd != 0) {
			UI.timeline.clearFrames(discStart, discEnd);
		}
		discStart = Math.round(discEnd + (totalFrames / discNum));
		discEnd = totalFrames;
		if (discStart != totalFrames) {
			UI.timeline.clearFrames(discStart, discEnd);
		}
		UI.timeline.layers[UTIL.layerCheck('disclaimer' + i)].locked = true;
	}
}
