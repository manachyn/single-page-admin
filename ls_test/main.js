require.config({
    paths: {
        jquery: '/app/libs/jquery/dist/jquery.min',
        underscore: '/app/libs/underscore/underscore',
        backbone: '/app/libs/backbone/backbone',
        localstorage: '/app/libs/backbone.localStorage/backbone.localStorage'
    }
});

define("SomeCollection", ["localstorage"], function() {
    var SomeCollection = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("SomeCollection") // Unique name within your app.
    });

    return SomeCollection;
});

require(["SomeCollection"], function(SomeCollection) {
    // ready to use SomeCollection
});