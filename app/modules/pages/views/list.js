define([
    'jquery',
    'underscore',
    'backbone',
    'core/im',
    'views/compositeview',
    'text!modules/pages/templates/list.html',
    'modules/pages/views/item',
    'extensions/mixins/views/sortable'
], function($, _, Backbone, IM, CompositeView, pagesListTemplate, PageItemView) {

    'use strict';

    var PagesListView = CompositeView.extend({

        tagName: 'table',

        template: _.template(pagesListTemplate),

        itemView: PageItemView,

        itemViewContainer: 'tbody',

        initialize: function(){
            this.listenTo(this, 'show', this.onShow);
        }

    });

    IM.mixin(PagesListView, IM.Mixins.Sortable);

    return PagesListView;
});

