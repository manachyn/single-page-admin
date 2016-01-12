define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'core/im'
], function($, _, Backbone, Router, IM){

    var initialize = function(){
        Router.initialize();
    };

    // Provide a global location to place configuration settings and module creation.
    var app = {
        // The root path to run the application.
        root: "/",
        initialize: initialize
    };

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    //Configure LayoutManager with Backbone Boilerplate defaults.
//    LayoutManager.configure({
//        // Allow LayoutManager to augment Backbone.View.prototype.
//        manage: true,
//        prefix: "app/templates/",
//        fetch: function(path) {
//            // Concatenate the file extension.
//            path = path + ".html";
//            // If cached, use the compiled template.
//            if (JST[path]) {
//                return JST[path];
//            }
//            // Put fetch into `async-mode`.
//            var done = this.async();
//            // Seek out the template asynchronously.
//            $.get(app.root + path, function(contents) {
//                done(JST[path] = _.template(contents));
//            });
//        }
//    });


    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(app, {
        // Create a custom object with a nested Views object.
        module: function(additionalProps) {
            return _.extend({Views: {}, Models: {}, Collections: {}, Controllers: {}}, additionalProps);
        },
        // Helper for using layouts.
        useLayout: function(name, options) {
            // Enable variable arity by allowing the first argument to be the options object and omitting the name argument.
            if (_.isObject(name)) {
                options = name;
            }
            // Ensure options is an object.
            options = options || {};
            // If a name property was specified use that as the template.
            if (_.isString(name)) {
                options.template = name;
            }
            // Create a new Layout with options.
            var layout = new Backbone.Layout(_.extend({
                el: "#main"
            }, options));
            // Cache the refererence.
            return this.layout = layout;
        },

        addRegions: function(regionDefinitions) {
            var regions = {};

            _.each(regionDefinitions, function(definition, name) {
                var region = this.addRegion(name, definition);
                regions[name] = region;
            }, this);

            return regions;
        },

        addRegion: function(name, definition) {
            var region;

            var isObject = _.isObject(definition);
            var isString = _.isString(definition);
            var hasSelector = !!definition.selector;

            if (isString || (isObject && hasSelector)) {
                region = IM.Region.buildRegion(definition, IM.Region);
            } else if (_.isFunction(definition)) {
                region = IM.Region.buildRegion(definition, IM.Region);
            } else {
                region = definition;
            }

            //this.triggerMethod('before:add:region', name, region);

            this[name] = region;

            //this.triggerMethod('add:region', name, region);
            return region;
        }

    }, Backbone.Events);



//    return {
//        initialize: initialize
//    };
});
