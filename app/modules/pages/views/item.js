define([
    'jquery',
    'underscore',
    'backbone',
    'modules/pages/module',
    'text!modules/pages/templates/item.html'
], function($, _, Backbone, PagesModule, PageItemTemplate) {
    'use strict';
    PagesModule.Views.PageItem = Backbone.View.extend({

        tagName: 'tr',

        template: _.template(PageItemTemplate),

        events: {
            'click .js-edit': 'editPage',
            'click .js-view': 'viewPage',
            'click .js-delete': 'deletePage'
        },

//        initialize: function () {
//            this.listenTo(this.model, 'change', this.onChange());
//        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        },

        remove: function(){
            var self = this;
            this.$el.fadeOut(function(){
                Backbone.View.prototype.remove.call(self);
            });
        },

//        onChange: function(){
//            console.log('Changeeeeeee222');
//        },

        // Event handlers
        editPage: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('page:edit', this.model);
        },

        viewPage: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('page:view', this.model);
        },

        deletePage: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('page:delete', this.model);
        }
    });

    return PagesModule.Views.PageItem;
});

