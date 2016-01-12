define([
    'underscore',
    'backbone',
    'localStorage',
    'modules/pages/module',
    'modules/pages/models/page',
    'backbone.paginator'
], function(_, Backbone, Store, PagesModule){
    'use strict';
    PagesModule.Collections.Pages = Backbone.PageableCollection.extend({
        url: '/services/pages',

        model: PagesModule.Models.Page,

        state: {
            pageSize: 2,
            sortKey: 'order'
        },

        initialize: function(models, options){
            options || (options = {});
            var parameters = options.parameters || {page: 1};
            this.state.currentPage = parameters.page;
        },


        //localStorage: new Store('pages'),

        nextOrder: function() {
            if (!this.length) {
                return 1;
            }
            return this.last().get('order') + 1;
        },

        getChanged: function() {
            var models = [],
                changedAttributes = {};
            for (var i = 0; i < this.models.length; i++) {
                if (this.models[i].hasChanged()) {
                    _.extend(changedAttributes, this.models[i].changedAttributes());
                    models.push(this.models[i]);
                }
            }
            return models.length ? {models: models, attributes: changedAttributes} : null;
        },

//        save: function(attributes, options) {
//            // do similar things as Model.save
//        },

        save: function() {
            var changed = [],
                changedAttributes;
            this.each(function(model) {
                if (model.hasChanged()) {
                    changedAttributes = model.changedAttributes();
                    changedAttributes[model.idAttribute] = model.id;
                    changed.push(changedAttributes);
                }
            }, this);
            if (changed.length)
                Backbone.sync('update', this, {attrs: changed});
        },

        updateAll: function() {
//            var collection = this;
//            options = {
//                success: function(model, resp, xhr) {
//                    collection.reset(model);
//                }
//            };
//            return Backbone.sync('update', this, options);
        },

//        comparator: function(model) {
//            return model.get('order');
//        }

    });

    return PagesModule.Collections.Pages;
});
