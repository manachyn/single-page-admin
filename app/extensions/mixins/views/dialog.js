define([
    'jquery',
    'underscore',
    'backbone',
    'core/im',
    'jquery-ui/dialog'
], function($, _, Backbone, IM){

    IM.Mixins.Dialog = {
        onShow: function() {
            var that = this;
            this.$el.dialog({
                modal: true,
                title: that.title || '',
                width: 'auto',
                close: function() {
                    that.close();
//                    form[0].reset();
//                    allFields.removeClass( "ui-state-error" );
                }
            });
        },
        onClose: function(){
            this.$el.dialog('destroy');
        }
    };

    return IM.Mixins.Dialog;
});


