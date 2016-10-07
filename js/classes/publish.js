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
        return FLfile.getSize(docPath) + FLfile.getSize(spritePath);
      } else {
        return FLfile.getSize(docPath);
      }
    },

    setJPEG: function(size) {
      var jpegPath = UI.dom.pathURI.slice(0, UI.dom.pathURI.lastIndexOf('.')) + '.jpg';
      var q = 100;
      for (var i = UI.timeline.frameCount - 1; i > -1; i--) {
        if (UI.timeline.layers[UTIL.layerCheck('static')].frames[i].name === 'static') {
          UI.timeline.currentFrame = UI.timeline.layers[UTIL.layerCheck('static')].frames[i].startFrame;
          break;
        }
      }
      UI.dom.publish();
      UI.timeline.currentFrame = UI.timeline.frameCount - 1;
      while (FLfile.getSize(jpegPath) / 1000 > size && q > 0) {
        q--;
        pubProfile = pubProfile.replace ('<Quality>' + (q + 1) + '</Quality>', '<Quality>' + q + '</Quality>');
        pubProfile = pubProfile.replace ('name="JavaScript/HTML" otf="true" enabled="true">', 'name="JavaScript/HTML" otf="true" enabled="false">');
        UI.dom.importPublishProfileString(pubProfile);
        UI.dom.publish();
      }
      pubProfile = pubProfile.replace ('<Quality>' + q + '</Quality>', '<Quality>100</Quality>');
      pubProfile = pubProfile.replace ('name="JavaScript/HTML" otf="true" enabled="false">', 'name="JavaScript/HTML" otf="true" enabled="true">');
      UI.dom.importPublishProfileString(pubProfile);
    }
  }

}());
