(function() {

  var pubProfile = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/animateCC_code/publishSettings.xml');
  var jpegPath;

  PUBLISH =
  {
    setPublishSettings: function() {

      UI.dom.importPublishProfileString(pubProfile);
      UI.dom.frameRate = 30;
    },

    genSizeReport: function() {
      if (UI.dom.pathURI){
        if(fl.fileExists(UI.dom.pathURI.replace(/.fla/, '.html'))){
          var images;
          var imagesSize = 0;
          var docPath = UI.dom.pathURI.replace(/.fla/, '.html');
          var spritePath = docPath.replace(/\d{1,3}x\d{1,3}\.html/, 'images');
          images = FLfile.listFolder(spritePath);
          for (var i = 0; i < images.length; i++) {
            var imgFile = images[i].slice(images[i].lastIndexOf('.'), images[i].length);
            if (imgFile === '.jpg' || imgFile === '.jpeg' || imgFile === '.png') {
              imagesSize += FLfile.getSize(spritePath + '/' + images[i]);
            }
          }
          return FLfile.getSize(docPath) + imagesSize;
        }else {
          return 0;
        }
      }else {
        return 0;
      }
    },

    publishDoc: function() {
      pubProfile = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/animateCC_code/publishSettings_html.xml');
      if (FLfile.exists(UI.dom.pathURI.slice(0, UI.dom.pathURI.lastIndexOf('/')) + '/images')){
        if (!confirm('Publish Spritesheet?')){
          pubProfile = pubProfile.replace('<Property name="exportImages">true</Property>', '<Property name="exportImages">false</Property>');
        }else {
          FLfile.remove(UI.dom.pathURI.slice(0, UI.dom.pathURI.lastIndexOf('/')) + '/images');
        }
      }
      UI.dom.importPublishProfileString(pubProfile);
      UI.dom.publish();
    },

    jpgProfile: function() {
      pubProfile = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/animateCC_code/publishSettings_jpg.xml');
      jpegPath = UI.dom.pathURI.slice(0, UI.dom.pathURI.lastIndexOf('/'));
      jpegPath = jpegPath.slice(0, jpegPath.lastIndexOf('/') + 1);
      var pathFiles = FLfile.listFolder(jpegPath);

      //set jpeg name and path
      for (var i = UI.timeline.frameCount - 1; i > -1; i--) {
        if (UI.timeline.layers[UTIL.layerCheck('static')].frames[i].name === 'static') {
          UI.timeline.currentFrame = UI.timeline.layers[UTIL.layerCheck('static')].frames[i].startFrame;
          break;
        }
      }
      for (var i = 0; i < pathFiles.length; i++) {
        var fileName = pathFiles[i].slice(pathFiles[i].lastIndexOf('_'), pathFiles[i].length);
        if(fileName === '_SUB.html' || fileName === '_COR.html') {
          var jpegName = pathFiles[i].slice(pathFiles[i].indexOf('-') + 1, pathFiles[i].lastIndexOf('_')) + '_' + UI.dom.name.slice(0, UI.dom.name.lastIndexOf('.')) + '.jpg';
          break;
        } else {
          var jpegName = UI.dom.name.slice(0, UI.dom.name.lastIndexOf('.')) + '.jpg';
        }
      }
      if (jpegName.slice(0, 2) === 'AT' || jpegName.slice(0, 4) === 'SPEC') {
        jpegName = jpegName.slice(jpegName.lastIndexOf('_') - 6, jpegName.length);
      }
      jpegPath += jpegName;
      pubProfile = pubProfile.replace(/<jpegFileName><\/jpegFileName>/, '<jpegFileName>../' + jpegName + '</jpegFileName>');
      UI.dom.importPublishProfileString(pubProfile);
    },

    publishJpg: function(q) {
      pubProfile = pubProfile.replace (/<Quality>\d{1,3}<\/Quality>/, '<Quality>' + q + '</Quality>');
      UI.dom.importPublishProfileString(pubProfile);
    },

    getFileSize: function(){
      return FLfile.getSize(jpegPath);
    },

    setDefaultPub: function(){
      pubProfile = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/animateCC_code/publishSettings.xml');
      alert('Publish finished.');
      UI.dom.importPublishProfileString(pubProfile);
    },

    showHideLayers: function(state){
      UI.timeline.layers[UTIL.layerCheck('actions')].visible = state;
      for(var i = 1; i < 4; i++){
        if (UTIL.layerCheck('disclaimer' + i) >= 0) {
          UI.timeline.layers[UTIL.layerCheck('disclaimer' + i)].visible = state;
        }
      }
    }
  }
}());
