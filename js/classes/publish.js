(function() {

  var pubProfile = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/publishSettings.xml');

  PUBLISH =
  {
    setPublishSettings: function() {

      UI.dom.importPublishProfileString(pubProfile);
      UI.dom.frameRate = 30;
    },

    genSizeReport: function() {
      var docPath = UI.dom.pathURI.slice(0, UI.dom.pathURI.lastIndexOf('.')) + '.html';
      var spritePath = docPath.slice(0, (docPath.lastIndexOf('/'))) + '/images/' + UI.dom.name;
      spritePath = spritePath.slice(0, spritePath.lastIndexOf('.')) + '.png';
      if (!FLfile.exists(spritePath)) {
        spritePath = spritePath.slice(0, spritePath.lastIndexOf('.')) + '.jpg';
      }
      if (FLfile.exists(spritePath)) {
        return FLfile.getSize(docPath) + FLfile.getSize(spritePath)
      }else {
        return FLfile.getSize(docPath);
      }
    },

    publishDoc: function(size) {

      var jpegPath = UI.dom.pathURI.slice(0, UI.dom.pathURI.lastIndexOf('/'));
      jpegPath = jpegPath.slice(0, jpegPath.lastIndexOf('/') + 1);
      var pathFiles = FLfile.listFolder(jpegPath);
      var q = 100;
      //set jpeg name and path
      for (var i = UI.timeline.frameCount - 1; i > -1; i--) {
        if (UI.timeline.layers[UTIL.layerCheck('static')].frames[i].name === 'static') {
          UI.timeline.currentFrame = UI.timeline.layers[UTIL.layerCheck('static')].frames[i].startFrame;
          break;
        }
      }
      for (var i = 0; i < pathFiles.length; i++) {
        if(pathFiles[i].slice(pathFiles[i].lastIndexOf('_'), pathFiles[i].length) === '_SUB.html' || pathFiles[i].slice(pathFiles[i].lastIndexOf('_'), pathFiles[i].length) === '_COR.html') {
          var jpegName = pathFiles[i].slice(pathFiles[i].indexOf('-') + 1, pathFiles[i].lastIndexOf('_')) + '_' + UI.dom.name.slice(0, UI.dom.name.lastIndexOf('.')) + '.jpg';
          break;
        } else {
          var jpegName = UI.dom.name.slice(0, UI.dom.name.lastIndexOf('.')) + '.jpg';
        }
      }
      jpegPath += jpegName;
      //publish html doc and sprite sheet
      pubProfile = pubProfile.replace ('<jpeg>1</jpeg>', '<jpeg>0</jpeg>');
      UI.dom.importPublishProfileString(pubProfile);
      UI.dom.publish();
      //publish jpeg
      pubProfile = pubProfile.replace ('<jpeg>0</jpeg>', '<jpeg>1</jpeg>');
      pubProfile = pubProfile.replace ('<jpegFileName>DONT_CHANGE</jpegFileName>', '<jpegFileName>../' + jpegName + '</jpegFileName>');
      pubProfile = pubProfile.replace ('name="JavaScript/HTML" otf="true" enabled="true">', 'name="JavaScript/HTML" otf="true" enabled="false">');
      UI.dom.importPublishProfileString(pubProfile);
      UI.timeline.layers[UTIL.layerCheck('actions')].visible = false;
      UI.dom.publish();
      //get jpeg size under requested size and re-publish
      while (FLfile.getSize(jpegPath) / 1000 > size && q > 0) {
        q--;
        pubProfile = pubProfile.replace ('<Quality>' + (q + 1) + '</Quality>', '<Quality>' + q + '</Quality>');
        UI.dom.importPublishProfileString(pubProfile);
        UI.dom.publish();
      }
      //set everything back to default
      UI.timeline.currentFrame = UI.timeline.frameCount - 1;
      UI.timeline.layers[UTIL.layerCheck('actions')].visible = true;
      pubProfile = pubProfile.replace ('<Quality>' + q + '</Quality>', '<Quality>100</Quality>');
      pubProfile = pubProfile.replace ('name="JavaScript/HTML" otf="true" enabled="false">', 'name="JavaScript/HTML" otf="true" enabled="true">');
      pubProfile = pubProfile.replace ('<jpegFileName>../' + jpegName + '</jpegFileName>', '<jpegFileName>DONT_CHANGE</jpegFileName>');
      UI.dom.importPublishProfileString(pubProfile);
    }
  }

}());
