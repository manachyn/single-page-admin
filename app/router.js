define([
    'backbone'
], function(Backbone) {

    var serializeParams = function(options){
        // page:1+filter:test
        options = _.pick(options, 'page', 'filter');
        return (_.map(_.filter(_.pairs(options), function(pair){ return pair[1]; }), function(pair){ return pair.join(":"); })).join("+");
    };

//    var url = 'http://sb.com/reg/step1?param';
//    var qs = (function(a) {
//        if (a == "") return {};
//        var b = {};
//        for (var i = 0; i < a.length; ++i) {
//            var p=a[i].split('=', 2);
//            if (p[1]) p[1] = decodeURIComponent(p[1].replace(/\+/g, " "));
//            b[p[0]] = p[1];
//        }
//        return b;
//    })((url.split('?'))[1].split('&'));

    // Defining the application router, you can attach subrouters here.
    var Router = Backbone.Router.extend({
        routes: {
            //'pages': 'listPages',
            'pages(/)': 'listPages',
            'pages/edit(/*id)': 'editPage',
            'pages/:id': 'viewPage',
            '*actions': 'default'
        },
        execute: function(callback, args) {
            console.log(arguments);
            if (callback) callback.apply(this, args);
        },
        default: function(actions) {
            console.log('No route:', actions);
        },
        listPages: function(params) {
            require(['modules/pages/controllers/page'], function(PageController){
                console.log(serializeParams({page: 1, filter: 'test'}));
                PageController.indexAction(params);
            });
        },
        viewPage: function(model) {
            require(['modules/pages/controllers/page'], function(PageController){
                PageController.viewAction(model);
            });
        },
        editPage: function(model) {
            require(['modules/pages/controllers/page'], function(PageController){
                PageController.editAction(model);
            });
        },
        createPage: function() {
            require(['modules/pages/controllers/page'], function(PageController){
                PageController.createAction();
            });
        }
    });
    return Router;
});
