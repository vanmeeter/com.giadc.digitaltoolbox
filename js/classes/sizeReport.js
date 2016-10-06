(function() {

  SizeReportClass = function() {}
  var p = SizeReportClass.prototype;

  SZREP =
  {

    genSizeReport: function() {
      docPath = fl.getDocumentDOM().pathURI;
      spritePath = docPath.slice(0, docPath.lastIndexOf('.')) + '.png';
      docPath = docPath.slice(0, docPath.lastIndexOf('.')) + '.html';
      if (FLfile.exists(spritePath)) {
        return FLfile.getSize(docPath) + FLfile.getSize(spritePath);
      } else {
        return FLfile.getSize(docPath);
      }
    }
  }
}());
