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

  createBorder: function (actionsCheck, tagCheck, bWidth, bColor) {
      //select top layer and crate border layer and keep border layer below clicktag
      if (tagCheck < 0) {
        (actionsCheck > -1) ? UI.timeline.setSelectedLayers(actionsCheck) : UI.timeline.setSelectedLayers(actionsCheck + 1);
        (actionsCheck > -1) ? UI.timeline.addNewLayer('border', 'normal', false) : UI.timeline.addNewLayer('border', 'normal', true);
      } else {
        UI.timeline.setSelectedLayers(UTIL.layerCheck('clickTag1'));
        UI.timeline.addNewLayer('border', 'normal', false);
      }
      UI.timeline.setSelectedLayers(UTIL.layerCheck('border'));

      //draw and style border rectangle
      var borderStroke = UI.dom.getCustomStroke();
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
        
      UI.timeline.layers[UTIL.layerCheck('border')].locked = true;
      //reset to default
      borderStroke.thickness = 1;
      UI.dom.setCustomStroke(borderStroke);
    }
  }

}());
