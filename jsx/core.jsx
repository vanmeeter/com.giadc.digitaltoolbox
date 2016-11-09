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
	data.clickNum = 0;
	data.widgetNum = 0;
	//get clickTags
	for (var j = 1; j < 10; j++){
		if (UTIL.layerCheck('clickTag' + j) > -1) {
			data.clickNum++;
			data[UI.timeline.layers[UTIL.layerCheck('clickTag' + j)].name] = INFO.getClickTag(j);
		}
	}
	//get widgets
	for (var j = 1; j < 10; j++){
		if (UTIL.layerCheck('facebook_icon' + j) > -1) {
			data.widgetNum++;
			data['facebook_icon' + j] = INFO.getWidgets('facebook_icon' + j);
		}
		if (UTIL.layerCheck('twitter_icon' + j) > -1) {
			data.widgetNum++;
			data['twitter_icon' + j] = INFO.getWidgets('twitter_icon' + j);
		}
		if (UTIL.layerCheck('instagram_icon' + j) > -1){
			data.widgetNum++;
			data['instagram_icon' + j] = INFO.getWidgets('instagram_icon' + j);
		}
		if (UTIL.layerCheck('button' + j) > -1) {
			data.widgetNum++;
			data['button' + j] = INFO.getWidgets('button' + j);
		}
	}
	data.border = INFO.getBorder();
	data.loop = INFO.getLoop();
	data.disclaimer = INFO.getDisclaimer();
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
		//deletes previous clickTags & widgets
		for (var i = 1; i < 10; i++) {
			if (UTIL.layerCheck('clickTag' + i) > -1) {
				UI.timeline.deleteLayer(UTIL.layerCheck('clickTag' + i));
			}
			if (UI.dom.library.itemExists('btn_clickTag')) {
				UI.dom.library.deleteItem('btn_clickTag');
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

function onClick_btn_clickWidget(clickURL) {
	if (UTIL.layerCheck('actions') > -1) {
		JSON.decode(clickURL);
		var totalFrames = UI.timeline.frameCount;

		for (var i = 1; i < 10; i++) {
			if (UTIL.layerCheck('facebook_icon' + i) > -1) {
				UI.timeline.deleteLayer(UTIL.layerCheck('facebook_icon' + i));
			}
			if (UI.dom.library.itemExists('btn_facebook')) {
				UI.dom.library.deleteItem('btn_facebook');
			}
			if (UTIL.layerCheck('twitter_icon' + i) > -1) {
				UI.timeline.deleteLayer(UTIL.layerCheck('twitter_icon' + i));
			}
			if (UI.dom.library.itemExists('btn_twitter')) {
				UI.dom.library.deleteItem('btn_twitter');
			}
			if (UTIL.layerCheck('instagram_icon' + i) > -1) {
				UI.timeline.deleteLayer(UTIL.layerCheck('instagram_icon' + i));
			}
			if (UI.dom.library.itemExists('btn_instagram')) {
				UI.dom.library.deleteItem('btn_instagram');
			}
			if (UTIL.layerCheck('button' + i) > -1) {
				UI.timeline.deleteLayer(UTIL.layerCheck('button' + i));
			}
			if (UI.dom.library.itemExists('btn_button')) {
				UI.dom.library.deleteItem('btn_button');
			}
		}
		//widget creation
		for (var i = 1; i <= clickURL.widgetNum; i++){
			if (clickURL['facebook_icon' + i]){
				TAG.createWidget(UTIL.validateUrl(clickURL['facebook_icon' + i]), 'facebook', i, clickURL.clickNum);
			}
			if (clickURL['twitter_icon' + i]){
				TAG.createWidget(UTIL.validateUrl(clickURL['twitter_icon' + i]), 'twitter', i, clickURL.clickNum);
			}
			if (clickURL['instagram_icon' + i]){
				TAG.createWidget(UTIL.validateUrl(clickURL['instagram_icon' + i]), 'instagram', i, clickURL.clickNum);
			}
			if (clickURL['button_icon' + i]){
				TAG.createWidget(UTIL.validateUrl(clickURL['button_icon' + i]), 'button', i, clickURL.clickNum);
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
