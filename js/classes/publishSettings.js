(function() {

  PublishClass = function() {}
  var p = PublishClass.prototype;
  var pubProfile = fl.configURI + '../../../CEP/extensions/com.giadc.digitalToolbox/publishSettings.xml'

  p.setPublishSettings = function() {
    fl.getDocumentDOM().importPublishProfile(pubProfile);
    fl.getDocumentDOM().frameRate = 30;
    //alert('test');
    }
}());
