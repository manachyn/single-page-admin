define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.babysitter'
], function($, _, Backbone){

    'use strict';

    var collectionView = Backbone.View.extend({
        // Constructor
        constructor: function(options){
            this.children = new Backbone.ChildViewContainer();
            this.options = _.extend({}, _.result(this, 'options'), _.isFunction(options) ? options.call(this) : options);
            Backbone.View.prototype.constructor.apply(this, arguments);
            this.sort = this.options.sort != undefined ? true : this.options.sort;
            if (this.collection){
                this.listenTo(this.collection, 'add', this.onAddCollectionItem);
                this.listenTo(this.collection, 'remove', this.onRemoveCollectionItem);
                this.listenTo(this.collection, 'change', this.onChangeCollectionItem);
                this.listenTo(this.collection, 'reset', this.render);
                if (this.sort) {
                    this.listenTo(this.collection, 'sort', this.onSortCollection);
                }
            }
            this.buffer = document.createDocumentFragment();
        },

        // Collection events handlers
        onAddCollectionItem: function(model, collection, options) {
            console.log('onAddCollectionItem');
            var ItemView = this.getItemView(model);
            var index = this.collection.indexOf(model);
            this.addItemView(model, ItemView, index);
        },

        onRemoveCollectionItem: function(model) {
            console.log('onRemoveCollectionItem');
            var view = this.children.findByModel(model);
            this.removeItemView(view);
        },

        onChangeCollectionItem: function(model) {
            console.log('onChangeCollectionItem');
            var view = this.children.findByModel(model);
            if (view) {
                view.render();
            }
        },

        onSortCollection: function() {
            console.log('onSortCollection');
            this.sortItemsViews();
        },

        addItemView: function(item, ItemView, index){

            var itemViewOptions = {};
            var options = _.extend({model: item}, itemViewOptions);
            var view = new ItemView(options);

            this.addItemViewEventForwarding(view);

            // increment indices of views after this one
            this._updateIndices(view, true, index);

            this.children.add(view);

            view.render();

            if (this.isBuffering) {
                this.buffer.appendChild(view.el);
            }
            else {
                this.$el.append(view.el);
            }

            return view;
        },

        _updateIndices: function(view, increment, index) {
            if (!this.sort) {
                return;
            }

            if (increment) {
                // assign the index to the view
                view._index = index;

                // increment the index of views after this one
                this.children.each(function (laterView) {
                    if (laterView._index >= view._index) {
                        laterView._index++;
                    }
                });
            }
            else {
                // decrement the index of views after this one
                this.children.each(function (laterView) {
                    if (laterView._index >= view._index) {
                        laterView._index--;
                    }
                });
            }
        },

        removeItemView: function(view) {
            if (view) {
                view.remove();
                this.children.remove(view);
            }
        },

        removeItems: function() {
            this.children.each(this.removeItemView, this);
        },

        sortItemsViews: function() {
            var orderChanged = this.collection.find(function(item, index){
                var view = this.children.findByModel(item);
                return view && view._index !== index;
            }, this);

            if (orderChanged) {
                console.log('orderChangeddddddddd');
                this.render();
            }
        },

        render: function(){
            this._renderItems();
            this.trigger('render');
            return this;
        },

        _renderItems: function(){
//            this.startBuffering();
//
//            this.closeEmptyView();
//            this.closeChildren();

            // Enable buffering for batch adding
            this.isBuffering = true;

            if (!this._isEmpty(this.collection)) {
                this.showCollection();
            } else {
                //this.showEmptyView();
            }

//            this.endBuffering();
            this.isBuffering = false;
            if (this.buffer) {
                this.appendBuffer(this, this.buffer);
            }
        },

        showCollection: function(){
            this.removeItems();
            var ItemView;
            this.collection.each(function(item, index){
                ItemView = this.getItemView(item);
                this.addItemView(item, ItemView, index);
            }, this);
        },

        appendBuffer: function(collectionView, buffer) {
            collectionView.$el.append(buffer);
            this.buffer = document.createDocumentFragment();
        },

        getItemView: function(item){
            var itemView;

            if (this.options && ('itemView' in this.options) && (this.options['itemView'] !== undefined)){
                itemView = this.options['itemView'];
            } else {
                itemView = this['itemView'];
            }

            if (!itemView) {
                throw new Error('An `itemView` must be specified');
            }

            return itemView;
        },



        addItemViewEventForwarding: function(view){

            var prefix = 'itemview';

            this.listenTo(view, 'all', function(){
                var args = Array.prototype.slice.call(arguments);
                var rootEvent = args[0];
                args[0] = prefix + ":" + rootEvent;
                args.splice(1, 0, view);
                this.trigger.apply(this, args);
            }, this);
        },

        remove: function() {
            this.children.each(this.removeItemView, this);
            Backbone.View.prototype.remove.apply(this, arguments);
            return this;
        },

        _isEmpty: function(collection){
            // check if we're empty now
            return !this.collection || this.collection.length === 0;
        }
    });
    return collectionView;

});
