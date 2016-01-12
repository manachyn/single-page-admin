define([
    'jquery',
    'underscore',
    'backbone',
    'core/im',
    'jquery-ui/sortable'
], function($, _, Backbone, IM){

    'use strict';

    IM.Mixins.Sortable = {

        onRender: function() {
            var that = this,
            sortableOptions = {
                placeholder: 'ui-state-highlight',
                containment: 'parent',
                stop: function (event, ui) {
                    that.trigger('items:order:change');
                }
            };
            if (this instanceof IM.CompositeView) {
                var container = this.getItemViewContainer(this);
                container.sortable(sortableOptions);
            }
            else {
                this.$el.sortable(sortableOptions);
            }
        },

        onItemsOrderChange: function() {
            var view, otherView;
            this.collection.each(function(model, index) {
                view = this.children.findByModel(model);
                model.previousOrder = model.previousOrder || model.get('order');
                // Order changed
                if (view._index != view.$el.index()) {
                    view._index = view.$el.index();
                    otherView = this.children.findByIndex(view.$el.index());
                    model.set('order', otherView.model.previousOrder ? otherView.model.previousOrder : otherView.model.get('order'));
                }
            }, this);
            this.collection.save();
            this.collection.sort();
//            this.collection.each(function(model, index) {
//                console.log(model);
//            }, this);
        },

        changeSilently: function () {
            var options = {},
                changing = this._changing;
            this._changing = true;
            for (var attr in this._silent) this._pending[attr] = true;
            this._silent = {};
            if (changing) return this;

            while (!_.isEmpty(this._pending)) {
                this._pending = {};
                for (var attr in this.changed) {
                    if (this._pending[attr] || this._silent[attr]) continue;
                    delete this.changed[attr];
                }
                this._previousAttributes = _.clone(this.attributes);
            }
            this._changing = false;
            return this;
        },

        onClose: function() {
            //this.$el.dialog('destroy');
        },

        initialize: function() {
            this.on('items:order:change', this.onItemsOrderChange);
            this.on('render', this.onRender);
        }
    };

    return IM.Mixins.Sortable;
});


