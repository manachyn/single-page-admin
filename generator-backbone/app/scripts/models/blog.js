/*global TestApp, Backbone*/

TestApp.Models = TestApp.Models || {};

(function () {
    'use strict';

    TestApp.Models.Blog = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
