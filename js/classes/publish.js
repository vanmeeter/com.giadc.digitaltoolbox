(function() {

  var pubProfile = FLfile.read(fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/publishSettings.xml');

  PUBLISH =
  {
    setPublishSettings: function() {

      fl.getDocumentDOM().importPublishProfileString(pubProfile);
      fl.getDocumentDOM().frameRate = 30;
    },

    genSizeReport: function() {
      var docPath = fl.getDocumentDOM().pathURI.slice(0, fl.getDocumentDOM().pathURI.lastIndexOf('.')) + '.html';
      var spritePath = docPath.slice(0, (docPath.lastIndexOf('/'))) + '/images/' + fl.getDocumentDOM().name;
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
      var jpegPath = fl.getDocumentDOM().pathURI.slice(0, fl.getDocumentDOM().pathURI.lastIndexOf('.')) + '.jpg';
      var q = 100;
      fl.getDocumentDOM().publish();
      while (FLfile.getSize(jpegPath) / 1000 > size && q > 0) {
        q--;
        pubProfile = pubProfile.replace ('<Quality>' + (q + 1) + '</Quality>', '<Quality>' + q + '</Quality>');
        pubProfile = pubProfile.replace ('name="JavaScript/HTML" otf="true" enabled="true">', 'name="JavaScript/HTML" otf="true" enabled="false">');
        fl.getDocumentDOM().importPublishProfileString(pubProfile);
        fl.getDocumentDOM().publish();
      }
      pubProfile = pubProfile.replace ('<Quality>' + q + '</Quality>', '<Quality>100</Quality>');
      pubProfile = pubProfile.replace ('name="JavaScript/HTML" otf="true" enabled="false">', 'name="JavaScript/HTML" otf="true" enabled="true">');
      fl.getDocumentDOM().importPublishProfileString(pubProfile);
    }
  }

}());
