define([
    'jquery',
    'underscore',
    'backbone',
    'modules/pages/module',
    'text!modules/pages/templates/view.html'
], function($, _, Backbone, PagesModule, PageViewTemplate){
    'use strict';
    PagesModule.Views.PageView = Backbone.View.extend({

        template: _.template(PageViewTemplate),

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });
    return PagesModule.Views.PageView;
});
