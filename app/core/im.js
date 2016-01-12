define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var IM = {

        Mixins: {},

        mixin1: function(from) {
            console.log('Miixxxxxxxxxx');
            _.extend(this.prototype, from);

            // Your attributes and methods in your mixin will override the methods you define in the class itself
            //_.extend(App.Views.Menu.prototype, App.Mixins.Navigation);


            // Alternative syntax
            // This will let you write methods and attributes in your class that will override the mixin's default behavior.
//            App.Views.Menu = Backbone.View.extend(
//                _.extend({}, App.Mixins.Navigation, {
//
//                    // (Methods and attributes here)
//
//            }));
        },

        mixin: function(toClass) {
            //https://github.com/onsi/cocktail
            //var mixins = _.chain(arguments).toArray().rest().flatten().value();
            var mixins = Array.prototype.slice.call(arguments, 1);
            var obj = toClass.prototype || toClass;

            var collisions = {};

            _(mixins).each(function(mixin) {
                _(mixin).each(function(value, key) {
                    if (_.isFunction(value)) {
                        // If the mixer already has that exact function reference
                        // Note: this would occur on an accidental mixin of the same base
                        if (obj[key] === value) return;

                        if (obj[key]) {
                            // Avoid accessing built-in properties like constructor (#39)
                            collisions[key] = collisions.hasOwnProperty(key) ? collisions[key] : [obj[key]];
                            collisions[key].push(value);
                        }
                        obj[key] = value;
                    } else if (_.isArray(value)) {
                        obj[key] = _.union(value, obj[key] || []);
                    } else if (_.isObject(value)) {
                        obj[key] = _.extend({}, value, obj[key] || {});
                    } else if (!(key in obj)) {
                        obj[key] = value;
                    }
                });
            });

            _(collisions).each(function(propertyValues, propertyName) {
                obj[propertyName] = function() {
                    var that = this,
                        args = arguments,
                        returnValue;

                    _(propertyValues).each(function(value) {
                        var returnedValue = _.isFunction(value) ? value.apply(that, args) : value;
                        returnValue = (typeof returnedValue === 'undefined' ? returnValue : returnedValue);
                    });

                    return returnValue;
                };
            });

            return toClass;
        },


        // TODO Add mixing only specified methods
        mixinInto: function (target, source, methodNames){

            // ignore the actual args list and build from arguments so we can
            // be sure to get all of the method names
            var args = Array.prototype.slice.apply(arguments);
            target = args.shift();
            source = args.shift();
            methodNames = args;

            var method;
            var length = methodNames.length;
            for(var i = 0; i < length; i++){
                method = methodNames[i];

                // bind the function from the source and assign the
                // bound function to the target
                target[method] = _.bind(source[method], source);
            }

        },

        mixinInto2: function (target, source, methodNames){

            // ignore the actual args list and build from arguments so we can
            // be sure to get all of the method names
            var args = Array.prototype.slice.apply(arguments);
            target = args.shift();
            source = args.shift();
            methodNames = args;

            var method;
            var length = methodNames.length;
            for(var i = 0; i < length; i++){
                method = methodNames[i];

                // build a function with a closure around the source
                // and forward the method call to the source, passing
                // along the method parameters and setting the context
                target[method] = function(){
                    var args = Array.prototype.slice(arguments);
                    source[method].apply(source, args);
                }

            }
        },



        viewMixin: function(from) {
            var to = this.prototype;

            // we add those methods which exists on `from` but not on `to` to the latter
            _.defaults(to, from);
            // … and we do the same for events
            _.defaults(to.events, from.events);

            // we then extend `to`'s `initialize`
            this.extendMethod(to, from, "initialize");
            // … and its `render`
            this.extendMethod(to, from, "render");
        },

        // Helper method to extend an already existing method
        extendMethod: function(to, from, methodName) {

            // if the method is defined on from ...
            if (!_.isUndefined(from[methodName])) {
                var old = to[methodName];

                // ... we create a new function on to
                to[methodName] = function() {

                    // wherein we first call the method which exists on `to`
                    var oldReturn = old.apply(this, arguments);

                    // and then call the method on `from`
                    from[methodName].apply(this, arguments);

                    // and then return the expected result,
                    // i.e. what the method on `to` returns
                    return oldReturn;

                };
            }

        }
    };

    Backbone.View.mixin = IM.mixin;

    return IM;
});


