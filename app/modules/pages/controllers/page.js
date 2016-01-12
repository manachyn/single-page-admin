define([
    'app',
    'modules/pages/module'
], function(App, PagesModule){
    'use strict';
    var privateFunction = function() {
        console.log('Private method');
    };

    var collectionCache;

    PagesModule.Controllers.Page = {
        indexAction: function(parameters) {
            require([
                'modules/pages/views/index',
                'views/loading',
                'modules/pages/models/pages_repo'
            ], function(IndexView, LoadingView) {
                var loadingView;
                var cb = function(collection) {
                    collectionCache = collection;
                    if (loadingView)
                        App.loadingRegion.empty();

                    var indexView = new IndexView({
                        collection: collection,
                        paginationBaseUrl: '/pages/'
                    });

                    indexView.on('itemview:page:delete', function(childView, model) {
                        collection.remove(model);
                        model.destroy();
                    });

                    indexView.on('itemview:page:view', function(childView, model) {
                        App.trigger('page:view', model);
                    });

                    indexView.on('itemview:page:edit', function(childView, model) {
                        App.trigger('page:edit', model);
                    });

                    indexView.on('page:create', function() {
                        App.trigger('page:create');
//                        require(['modules/pages/views/edit'], function(EditView){
//                            // Create new model
//                            var model = new PagesModule.Models.Page();
//                            var editView = new EditView({
//                                model: model
//                            });
//                            editView.on('form:submit', function(data) {
//                                if (collection.length > 0) {
//                                    var highestId = collection.max(function(c){ return c.id; }).get('id');
//                                    data.id = highestId + 1;
//                                }
//                                else {
//                                    data.id = 1;
//                                }
//                                if (model.save(data)) {
//                                    collection.add(model);
//                                    this.close();
//                                    //App.trigger('page:view', model.get('id'));
//                                }
//                                else {
//                                    view.trigger('form:data:invalid', model.validationError);
//                                }
//                            });
//                            App.dialogRegion.show(editView);
//                        });
                    });

                    App.mainRegion.show(indexView);
                };

                if (collectionCache != undefined) {
                    cb(collectionCache);
                }
                else {
                    // Show loading view
                    loadingView = new LoadingView();
                    App.loadingRegion.show(loadingView);

                    // Load collection
                    var fetchingCollection = PagesModule.Models.PagesRepo.getAll({parameters: parameters});
                    $.when(fetchingCollection).done(cb).fail(function(){
                        alert('Error');
                    });
                }
            });
        },
        editAction: function(model) {
            require([
                'modules/pages/views/edit',
                'views/loading',
                'views/error',
                'modules/pages/models/page',
                'modules/pages/models/pages_repo'
            ], function(EditView, LoadingView, ErrorView){
                // Handler
                var cb = function(model) {
                    var view;
                    if(model !== undefined) {
                        view = new EditView({
                            model: model
                        });

                        view.on('form:submit', function(data) {
                            if(model.save(data/*, {patch: true}*/)){
                                this.close();
                                //App.trigger('page:view', model.get('id'));
                            }
                            else{
                                view.trigger('form:data:invalid', model.validationError);
                            }
                        });
                    }
                    else{
                        view = new ErrorView({message: 'This page doesn\'t exist'});
                        App.mainRegion.show(view);
                    }

//                    if (loadingView != undefined) {
//                        loadingView.remove();
//                    }
                    App.dialogRegion.show(view);
                }

                // If we get model as object
                if (_.isObject(model)) {
                    cb(model);
                }
                // If we get model id
                else {
//                    // Show loading view
//                    var loadingView = new LoadingView();
//                    App.mainRegion.show(loadingView);

                    // Load model
                    var fetchingModel = PagesModule.Models.PagesRepo.getById(model);
                    $.when(fetchingModel).done(cb);
                }
            });
        },
        createAction: function() {
            require([
                'modules/pages/views/edit',
                'views/loading',
                'modules/pages/models/page',
                'modules/pages/models/pages_repo'
            ], function(EditView, LoadingView){
                var loadingView;
                var cb = function(collection) {
                    collectionCache = collection;
                    if (loadingView)
                        App.loadingRegion.empty();

                    // Create new model
                    var model = new PagesModule.Models.Page({}, {collection: collection});
                    var editView = new EditView({
                        model: model
                    });
                    editView.on('form:submit', function(data) {
//                        if (collection.length > 0) {
//                            var highestId = collection.max(function(c){ return c.id; }).get('id');
//                            data.id = highestId + 1;
//                        }
//                        else {
//                            data.id = 1;
//                        }
//                        if (model.save(data)) {
//                            collection.add(model);
//                            this.close();
//                            window.history.back();
//                            //App.trigger('page:view', model.get('id'));
//                        }
//                        else {
//                            //view.trigger('form:data:invalid', model.validationError);
//                        }
                        var that = this;
                        model.save(data, {
                            success: function(model, response, options) {
                                collection.add(model);
                                that.close();
                                //window.history.back();
                                //alert('Success: ' + response.message);
                            },
                            error: function(model, response, options) {
                                alert('Error: ' + response.message);
                            }
                        });
                    });
                    App.dialogRegion.show(editView);
                };

                if (collectionCache != undefined) {
                    cb(collectionCache);
                }
                else {
                    // Show loading view
                    loadingView = new LoadingView();
                    App.loadingRegion.show(loadingView);

                    // Load collection
                    var fetchingCollection = PagesModule.Models.PagesRepo.getAll();
                    $.when(fetchingCollection).done(cb);
                }

//                if (id) {
//                    // Show loading view
//                    var loadingView = new LoadingView();
//                    loadingView.setElement('#loading');
//                    loadingView.render();
//                    // Load model
//                    var fetchingModel = PagesModule.Models.PagesRepo.getById(id);
//                    $.when(fetchingModel).done(function(model){
//                        var view;
//                        if(model !== undefined){
//                            view = new EditView({
//                                model: model
//                            });
//
//                            view.on('form:submit', function(data) {
//                                if(model.save(data)){
//                                    //App.trigger('page:view', model.get('id'));
//                                }
//                                else{
//                                    view.trigger('form:data:invalid', model.validationError);
//                                }
//                            });
//                        }
//                        else{
//                            view = new ErrorView({message: 'This page doesn\'t exist'});
//                            App.mainRegion.show(view);
//                        }
//
//                        if (loadingView != undefined) {
//                            loadingView.remove();
//                        }
//                        App.dialogRegion.show(view);
//                    });
//                }
////                else {
////                    // Create new model
////                    var model = new PagesModule.Models.Page();
////                }
////
////
////                view.on('form:submit', function(data) {
////                    if(model.save(data)){
////                        //App.trigger('page:view', model.get('id'));
////                    }
////                    else{
////                        view.trigger('form:data:invalid', model.validationError);
////                    }
////                });
////                if (loadingView != undefined) {
////                    loadingView.remove();
////                }
////                App.dialogRegion.show(view);
////                //view.trigger('show');
            });
        },
        viewAction: function(model) {
            require([
                'modules/pages/views/view',
                'views/error',
                'modules/pages/models/page'
            ], function(View, ErrorView){
                var cb = function(model) {
                    var view;
                    if (model !== undefined) {
                        view = new View({model: model});
                    }
                    else {
                        view = new ErrorView({message: 'This page doesn\'t exist'});
                    }
                    App.mainRegion.show(view);
                }
                if (_.isObject(model)) {
                    cb(model);
                }
                else {
                    var fetchingModel = PagesModule.Models.PagesRepo.getById(model);
                    $.when(fetchingModel).done(cb);
                }
            });
        }
    }

    return PagesModule.Controllers.Page;
});
