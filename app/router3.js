define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var AppRouter = Backbone.Router.extend({
        routes: {
            'pages': 'showPages',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){
        var appRouter = new AppRouter;

        appRouter.on('route:showPages', function(){
            require(['modules/pages/controllers/page'], function(PageController){
                PageController.indexAction();
            });
        });

        appRouter.on('route:defaultAction', function(actions){
            console.log('No route:', actions);
        });

        // Trigger the initial route and enable HTML5 History API support, set the
        // root folder to '/' by default. Change in app.js.
        //Backbone.history.start({ pushState: true, root: App.root });
        Backbone.history.start({pushState: true});

        // All navigation that is relative should be passed through the navigate method, to be processed by the router.
        // If the link has a `data-bypass` attribute, bypass the delegation completely.
        $(document).on('click', 'a[href]:not([data-bypass])', function(e) {
            // Get the absolute anchor href.
            var href = { prop: $(this).prop('href'), attr: $(this).attr('href') };
            // Get the absolute root.
            //var root = location.protocol + '//' + location.host + app.root;
            var root = location.protocol + '//' + location.host + '/';
            // Ensure the root is part of the anchor href, meaning it's relative.
            if (href.prop.slice(0, root.length) === root) {
                // Stop the default event to ensure the link will not cause a page refresh.
                e.preventDefault();
                // `Backbone.history.navigate` is sufficient for all Routers and will trigger the correct events.
                // The Router's internal `navigate` method calls this anyways. The fragment is sliced from the root.
                Backbone.history.navigate(href.attr, true);
            }
        });

    };

    return {
        initialize: initialize
    };

});
