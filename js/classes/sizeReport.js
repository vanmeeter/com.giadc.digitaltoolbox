(function() {

  SizeReportClass = function() {}
  var p = SizeReportClass.prototype;

  p.genSizeReport = function() {
    docPath = fl.getDocumentDOM().pathURI;
    docPath = docPath.slice(0, docPath.lastIndexOf('.')) + '.html';
    return FLfile.getSize(docPath);
  }
}());
