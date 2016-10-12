(function() {

    DISCLAIMER =
  {
    draw: function(disclaimer) {
      UI.timeline.setSelectedLayers(0);
      UI.timeline.addNewLayer('disclaimer', 'normal', true);

      var recStyle = UI.dom.getCustomFill();
      var legacyStyle = UI.dom.getCustomFill('toolbar');
      recStyle.style = 'solid';
      recStyle.color = disclaimer.color;
      UI.dom.setCustomFill(recStyle);
      UI.dom.addNewRectangle(
        {
          left:6,
          top:23,
          right:UI.dom.width - 6,
          bottom:UI.dom.height
        },0, false, true);
        UI.dom.addNewRectangle(
          {
            left:UI.dom.width - 73,
            top:8,
            right:UI.dom.width - 6,
            bottom:23
          },0, false, true);
        UI.dom.setCustomFill(legacyStyle);
    },

    addText: function(disclaimer) {
      //TODO: center text for disclaimer
      UI.timeline.setSelectedLayers(0);
      UI.dom.addNewText(
        {
          left:UI.dom.width - 70,
          top:10,
          right:UI.dom.width - 8,
          bottom:15
        }, 'DISCLAIMER');

        UI.dom.addNewText(
          {
            left:12,
            top:12,
            right:UI.dom.width - 16,
            bottom:UI.dom.height
          }, disclaimer.text);

          textDisp = UI.timeline.layers[0].frames[0].elements[1];
          textMain = UI.timeline.layers[0].frames[0].elements[2];
          textDisp.setTextAttr('fillColor', disclaimer.fontColor);
          textMain.setTextAttr('fillColor', disclaimer.fontColor);
          textDisp.setTextAttr('face', 'Gf-OpenSans');
          textMain.setTextAttr('face', 'Gf-OpenSans');
          textDisp.setTextAttr('size', 9);
          textMain.setTextAttr('size', 10);
          textDisp.setTextAttr('alignment', 'center');
          textMain.setTextAttr('alignment', 'left');
    }
  }

}());
