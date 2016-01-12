define([
    'underscore',
    'backbone',
    'modules/pages/module',
    'localStorage'
], function(_, Backbone, PagesModule){
    'use strict';
    PagesModule.Models.Page = Backbone.Model.extend({
        //localStorage: new Backbone.LocalStorage('pages'),
        //urlRoot: '/services/pages',
        defaults: {
            title: '',
            url: '',
            order: 0
        },

        validate: function(attrs, options) {
            var errors = {}
            if (!attrs.title) {
                errors.title = "can't be blank";
            }
            if (!attrs.url) {
                errors.url = "can't be blank";
            }
            else{
                if (attrs.title.length < 2) {
                    errors.title = "is too short";
                }
            }
            if( ! _.isEmpty(errors)){
                return errors;
            }
        }
    });

    return PagesModule.Models.Page;
});
