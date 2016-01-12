// Require.js allows us to configure shortcut alias
require.config({
    //urlArgs: "bust=" + (new Date()).getTime(),
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
//    shim: {
//        underscore: {
//            exports: '_'
//        },
//        backbone: {
//            deps: [
//                'underscore',
//                'jquery'
//            ],
//            exports: 'Backbone'
//        },
//        backboneLocalstorage: {
//            deps: ['backbone'],
//            exports: 'Store'
//        }
//    },
    paths: {
        jquery: 'libs/jquery/dist/jquery.min',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        localStorage: 'libs/backbone.localStorage/backbone.localStorage',
        text: 'libs/requirejs-text/text',
        layoutmanager: 'libs/layoutmanager/backbone.layoutmanager',
        spin: 'libs/spin.js/spin',
        'spin.jquery': 'libs/spin.js/jquery.spin',
        'backbone.syphon': 'libs/backbone.syphon/lib/amd/backbone.syphon.min',
        'backbone.babysitter': 'libs/backbone.babysitter/lib/backbone.babysitter.min',
        'jquery-ui': 'libs/jquery-ui/ui',
        'backbone.paginator': 'libs/backbone.paginator/lib/backbone.paginator'
    }
});
