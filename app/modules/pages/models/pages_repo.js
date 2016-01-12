define([
    'underscore',
    'backbone',
    'modules/pages/module',
    'modules/pages/models/page',
    'modules/pages/collections/pages'
], function(_, Backbone, PagesModule){
    'use strict';
    PagesModule.Models.PagesRepo = {
        getById: function(id) {
            var model = new PagesModule.Models.Page({id: id});
            var defer = $.Deferred();
            //setTimeout(function(){
                model.fetch({
                    success: function(model, response, options) {
                        defer.resolve(model);
                    },
                    error: function(model, response, options) {
                        defer.resolve(undefined);
                    }
                });
            //}, 1000);
            return defer.promise();
        },

        getAll: function(options) {
            var collection = new PagesModule.Collections.Pages([], {parameters: options.parameters});
            delete options.parameters;
            var defer = $.Deferred();
            defer.then(options.success, options.error);
            var response = collection.fetch(_.omit(options, 'success', 'error'));
            response.done(function(){
                defer.resolveWith(response, [collection]);
            });
            response.fail(function(){
                defer.rejectWith(response, arguments);
            });
            return defer.promise();
        }

    };

    return PagesModule.Models.PagesRepo;
});
