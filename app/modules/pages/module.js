// Pages module
define([
    // Application.
    "app",
    // Plug-ins
    //'plugins/backbone-localstorage'
],
    // Map dependencies from above array.
    function(App) {
        'use strict';
        // Create a new module.

        App.Pages = App.module();

//        // Default Model.
//        pages.Model = Backbone.Model.extend({
//            // Save all of the items under the `"foo"` namespace.
//            localStorage: new Store('foo-backbone')
//        });
//
//        // Default Collection.
//        pages.Collection = Backbone.Collection.extend({
//            model: Foo.Model
//        });
//
//        // Default View.
//        pages.Views.Layout = Backbone.Layout.extend({
//            template: "foo"
//        });

        // Return the module for AMD compliance.
        return App.Pages;
    });

