define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/loading.html',
    'spin.jquery'
], function($, _, Backbone, LoadingTemplate){

    var loadingView = Backbone.View.extend({

        template: _.template(LoadingTemplate),

        initialize: function(options){
            var options = options || {};
            this.title = options.title || '';
            this.message = options.message || '';
            this.listenTo(this, 'show', this.onShow);
        },

        serializeData: function(){
            var data = {
                title: this.title,
                message: this.message
            };
            return data;
        },

        render: function(){
            this.$el.html(this.template(this.serializeData()));
//            var opts = {
////                lines: 13, // The number of lines to draw
////                length: 20, // The length of each line
////                width: 10, // The line thickness
////                radius: 15, // The radius of the inner circle
////                corners: 1, // Corner roundness (0..1)
////                rotate: 0, // The rotation offset
////                direction: 1, // 1: clockwise, -1: counterclockwise
////                color: "#000", // #rgb or #rrggbb
////                speed: 1, // Rounds per second
////                trail: 60, // Afterglow percentage
////                shadow: false, // Whether to render a shadow
////                hwaccel: false, // Whether to use hardware acceleration
////                className: "spinner", // The CSS class to assign to the spinner
////                zIndex: 2e9, // The z-index (defaults to 2000000000)
////                top: "30px", // Top position relative to parent in px
////                left: "auto" // Left position relative to parent in px
//            };
//            $("#loading-spinner").spin(opts);
            return this;
        },

        onShow: function() {
            this.$el.spin();
        }

    });
    return loadingView;

});

