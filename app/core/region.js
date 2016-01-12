define([
    'jquery',
    'underscore',
    'backbone',
    'core/im'
], function($, _, Backbone, IM){
    var Region = IM.Region = function(options) {

        this.options = options || {};

        if (this.options && (this.options['el'] !== undefined)) {
            this.el = this.options['el'];
        } else {
            throw new Error('An "el" must be specified for a region.');
        }

        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }
    };

    // Static methods
    _.extend(Region, {
        buildRegion: function(regionConfig, defaultRegionClass) {
            var regionIsString = _.isString(regionConfig);
            var regionIsClass = _.isFunction(regionConfig);

            if (!regionIsClass && !regionIsString) {
                throw new Error('Region must be specified as a Region class or a selector string');
            }

            var selector, RegionClass;

            if (regionIsString) {
                selector = regionConfig;
            }

            if (regionIsClass) {
                RegionClass = regionConfig;
            }
            else {
                RegionClass = defaultRegionClass;
            }

            if (regionIsString || regionIsClass) {
                regionConfig = {};
            }

            regionConfig.el = selector;

            var region = new RegionClass(regionConfig);

            return region;
        }
    });

    _.extend(Region.prototype, {

        show: function(view, options){
            this._ensureElement();

            var showOptions = options || {};
            var isDifferentView = view !== this.currentView;

            if (isDifferentView) {
                this.empty();
                view.render();
                this.el.innerHTML = '';
                this.el.appendChild(view.el);
                this.currentView = view;
                view.trigger('show');
                return this;
            }

            return this;
        },

        _ensureElement: function(){
            if (!_.isObject(this.el)) {
                this.$el = Backbone.$(this.el);
                this.el = this.$el[0];
            }

            if (!this.$el || this.$el.length === 0) {
                throw new Error('An "el" ' + this.$el.selector + ' must exist in DOM');
            }
        },

        empty: function() {
            var view = this.currentView;
            if (!view) { return; }

            //this.triggerMethod('before:empty', view);
            view.remove();

//            this.triggerMethod('empty', view);

            delete this.currentView;
        }

//        _ensureElement: function() {
//            if (!this.el) {
//                var attrs = _.extend({}, _.result(this, 'attributes'));
//                if (this.id) attrs.id = _.result(this, 'id');
//                if (this.className) attrs['class'] = _.result(this, 'className');
//                var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
//                this.setElement($el, false);
//            } else {
//                this.setElement(_.result(this, 'el'), false);
//            }
//        }
    });

    return Region;
});



