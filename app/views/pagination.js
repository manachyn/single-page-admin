define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/paginator.html',
], function($, _, Backbone, PaginationTemplate){

    'use strict';

    var paginationView = Backbone.View.extend({

        events: {
            'click a.servernext': 'nextResultPage',
            'click a.serverprevious': 'previousResultPage',
            'click a.orderUpdate': 'updateSortBy',
            'click a.serverlast': 'gotoLast',
            'click a.page': 'gotoPage',
            'click a.serverfirst': 'gotoFirst',
            'click a.serverpage': 'gotoPage',
            'click .serverhowmany a': 'changeCount'

        },

        tagName: 'aside',

        template: _.template(PaginationTemplate),

        initialize: function (options) {
            this.baseUrl = options.baseUrl;
            this.collection.on('reset', this.render, this);
            this.collection.on('change', this.render, this);
            //this.$el.appendTo('#pagination');

        },

        serializeData: function(){
            var data = this.collection.state,
                url = this.baseUrl;
                //criterion = this.paginatedCollection.parameters.get("criterion");
            if(url){
//                if(criterion){
//                    url += "criterion:" + criterion + "+";
//                }
                url += "page:";
            }
            data.baseUrl = url;

            return data;
        },

        render: function () {
//            var html = this.template(this.collection.info());
//            this.$el.html(html);
            console.log(this.serializeData());
            this.$el.html(this.template(this.serializeData()));
            return this;
        },

        updateSortBy: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var currentSort = $('#sortByField').val();
            this.collection.setSorting(currentSort, -1, {full: false});
            this.collection.sort();
        },

        nextResultPage: function (e) {
            e.preventDefault();
            this.collection.getNextPage();
        },

        previousResultPage: function (e) {
            e.preventDefault();
            this.collection.getPreviousPage();
        },

        gotoFirst: function (e) {
            e.preventDefault();
            this.collection.getFirstPage();
        },

        gotoLast: function (e) {
            e.preventDefault();
            this.collection.getLastPage();
        },

        gotoPage: function (e) {
            e.preventDefault();
            var page = $(e.target).text();
            this.collection.getPage(page);
        },

        changeCount: function (e) {
            e.preventDefault();
            var per = $(e.target).text();
            this.collection.howManyPer(per);
        }

    });

    return paginationView;

});
