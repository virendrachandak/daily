KISSY.add(function(S, Component) {
  var DOM = S.DOM;

  /**
   * @class Button
   */
  var Button = Component.Controller.extend({

    /**
     * @public
     */
    show: function() {},

    /**
     * @protected
     */
    handleClickInternal: function() {},

    /**
     * @private
     */
    _doClick: function() {}

  }, {
    ATTRS: {

      /**
       * @type String
       */
      content: {}

    }
  });

  // -------- private
  function onHover() {}

}, {
  requires: ['Component']
});
