define([
    'jquery',
    'underscore',
    'backbone',
    'modules/pages/models/page',
    'modules/pages/collections/pages',
    'text!modules/pages/templates/index.html',
    'modules/pages/views/list',
    'modules/pages/views/list_actions',
    'views/pagination',
], function($, _, Backbone, PageModel, PagesCollection, pagesIndexTemplate, PagesListView, PagesListActionsView, PaginationView){
    'use strict';
    var PagesIndexView = Backbone.View.extend({

        initialize: function(options) {
            this.pagesList = new PagesListView({collection: this.collection, sort: true});
            this.listenTo(this.pagesList, 'all', function(){
                this.trigger.apply(this, arguments);
            });
            this.pagesListActions = new PagesListActionsView();
            this.listenTo(this.pagesListActions, 'all', function(){
                this.trigger.apply(this, arguments);
            });
            this.pagesListPagination = new PaginationView({
                collection: this.collection,
                baseUrl: options.paginationBaseUrl
            });
        },

        render: function() {
            this.$el.html(pagesIndexTemplate);
            this.$el.append(this.pagesListActions.$el);
            this.$el.append(this.pagesList.$el);
            this.$el.append(this.pagesListPagination.$el);
            this.pagesListActions.render();
            this.pagesList.render();
            this.pagesListPagination.render();
            //this.pagesList.trigger('show');
//            this.$el.html(pagesIndexTemplate);
//            var pagesListView = new PagesListView({
//                collection: this.collection
//            });
//            this.children = pagesListView;
//            this.listenTo(pagesListView, 'all', function(){
//                this.trigger.apply(this, arguments);
//            });
//            this.$el.append(pagesListView.$el);
//            pagesListView.render();


            return this;
        },

        remove: function() {
            this.pagesListActions.remove();
            this.pagesList.remove();
            this.pagesListPagination.remove();
            Backbone.View.prototype.remove.apply(this, arguments);
            return this;
        }
    });

    return PagesIndexView;
});
