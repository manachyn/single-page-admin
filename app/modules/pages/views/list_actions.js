define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/pages/templates/list_actions.html'
], function($, _, Backbone, listActionsTemplate) {
    'use strict';
    var ListActionsView = Backbone.View.extend({

        template: _.template(listActionsTemplate),

        events: {
            'click .js-create': 'createPage'
        },

        // Event handlers
        createPage: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('page:create');
        },

        render: function(){
            this.$el.html(this.template());
            return this;
        }

    });

    return ListActionsView;
});

