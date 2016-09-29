(function() {

  var refreshDoc = function() {
    var setPub = new PublishClass;
    setPub.setPublishSettings();
  };

  //var test = function(){alert('toodles')};
  fl.addEventListener("documentNew", refreshDoc);
  fl.addEventListener("documentOpened", refreshDoc);

}());
