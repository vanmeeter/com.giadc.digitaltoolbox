// ------------------------------------------------------------------------------------------------------------------------
//
//  █████  ██████ █████  █████  ██████ █████
//  ██  ██ ██  ██ ██  ██ ██  ██ ██     ██  ██
//  ██  ██ ██  ██ ██  ██ ██  ██ ██     ██  ██
//  ██ ███ ██  ██ ██ ██  ██  ██ ██████ ██ ██
//  ██  ██ ██  ██ ██  ██ ██  ██ ██     ██  ██
//  ██  ██ ██  ██ ██   █ ██  ██ ██     ██   █
//  ██████ ██████ ██   █ █████  ██████ ██   █
//
// ------------------------------------------------------------------------------------------------------------------------
// BORDER
/**
 * Border
 * @overview	border creation or digitalToolbox
 *
 * @author		Jacob VanMeeter
 */

(function() {

// ----------------------------------------------------------------------------------------------------
// class

  BORDER =
  {

    createBorder: function (bWidth, bColor) {

      (UTIL.layerCheck('static') >= 0) ? UI.timeline.setSelectedLayers(UTIL.layerCheck('static')) : UI.timeline.setSelectedLayers(0);

      UI.timeline.addNewLayer('border', 'normal', false);
      UI.timeline.setSelectedLayers(UTIL.layerCheck('border'));

      //draw and style border rectangle
      var borderStroke = UI.dom.getCustomStroke();
      var legacyStroke = UI.dom.getCustomStroke('toolbar');

      borderStroke.style = 'solid';
      borderStroke.thickness = bWidth;
      borderStroke.color = bColor;
      borderStroke.joinType = 'miter';
      UI.dom.setCustomStroke(borderStroke);

      UI.dom.addNewRectangle(
        {
          left:bWidth / 2,
          top:bWidth / 2,
          right:UI.dom.width - bWidth / 2,
          bottom:UI.dom.height - bWidth / 2
        },0, true, false);

      //reset to default
      UI.dom.setCustomStroke(legacyStroke);
    }
  }

}());
