/*global TestApp, Backbone*/

TestApp.Collections = TestApp.Collections || {};

(function () {
    'use strict';

    TestApp.Collections.Blog = Backbone.Collection.extend({

        model: TestApp.Models.Blog

    });

})();
