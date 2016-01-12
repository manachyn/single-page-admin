define([
    'jquery',
    'underscore',
    'backbone',
    'modules/pages/collections/pages',
    'text!modules/pages/templates/list.html'
], function($, _, Backbone, PagesCollection, pagesListTemplate) {

    var PagesListView = Backbone.View.extend({
        el: $('#pages-list'),
        events: {
            'click .js-view': 'viewPage',
            'click .js-delete': 'deletePage'
        },
        render: function() {
            var compiledTemplate = _.template(pagesListTemplate, {pages: this.collection.models});
            this.$el.append(compiledTemplate);
        },

        // Event handlers
        viewPage: function(e) {
            e.preventDefault();
            e.stopPropagation();
        },

        deletePage: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('page:delete', this.model);
        }
    });

    return PagesListView;
});

