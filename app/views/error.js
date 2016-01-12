define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/error.html',
], function($, _, Backbone, ErrorTemplate){

    var errorView = Backbone.View.extend({

        template: _.template(ErrorTemplate),

        initialize: function(options){
            var options = options || {};
            this.message = options.message || '';
        },

        serializeData: function(){
            var data = {
                message: this.message
            };
            return data;
        },

        render: function(){
            this.$el.html(this.template(this.serializeData()));
            return this;
        }

    });
    return errorView;

});

