define([
    'jquery',
    'underscore',
    'backbone',
    'core/im',
    'views/collectionview'
], function($, _, Backbone, IM, CollectionView){

    'use strict';

    IM.CompositeView = CollectionView.extend({
        // Constructor
        constructor: function(){
            CollectionView.prototype.constructor.apply(this, arguments);
        },

        render: function(){
            if (this.$itemViewContainer) {
                delete this.$itemViewContainer;
            }
            var template;
            if (this.options && ('template' in this.options) && (this.options['template'] !== undefined)){
                template = this.options['template'];
            } else {
                template = this['template'];
            }
            if (template) {
                template = _.isFunction(template) ? template.call() : template
                this.$el.html(template);
            }

            this._renderItems();

            this.trigger('render');

            return this;
        },

        getItemView: function(item){
            var itemView;

            if (this.options && ('itemView' in this.options) && (this.options['itemView'] !== undefined)){
                itemView = this.options['itemView'];
            } else {
                itemView = this['itemView'] || this.constructor;
            }

            if (!itemView) {
                throw new Error('An `itemView` must be specified');
            }

            return itemView;
        },

        getItemViewContainer: function(containerView){
            if ("$itemViewContainer" in containerView){
                return containerView.$itemViewContainer;
            }

            var container;
            var itemViewContainer;

            if (containerView.options && ('itemViewContainer' in containerView.options)
                && (containerView.options['itemViewContainer'] !== undefined)){
                itemViewContainer = containerView.options['itemViewContainer'];
            } else {
                itemViewContainer = containerView['itemViewContainer'];
            }

            if (itemViewContainer){
                var selector = _.isFunction(itemViewContainer) ? itemViewContainer.call(this) : itemViewContainer;
                container = containerView.$(selector);
                if (container.length <= 0) {
                    throw new Error('The specified `itemViewContainer` was not found: ' + containerView.itemViewContainer);
                }
            } else {
                container = containerView.$el;
            }

            containerView.$itemViewContainer = container;
            return container;
        },

        appendBuffer: function(compositeView, buffer) {
            var $container = this.getItemViewContainer(compositeView);
            $container.append(buffer);
        }
    });
    return IM.CompositeView;

});
