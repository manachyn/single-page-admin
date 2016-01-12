define([
    'jquery',
    'underscore',
    'backbone',
    'core/im',
    'modules/pages/module',
    'text!modules/pages/templates/edit.html',
    'backbone.syphon',
    'extensions/mixins/views/dialog'
], function($, _, Backbone, IM, PagesModule, PageEditTemplate){
    'use strict';
    PagesModule.Views.PageEdit = Backbone.View.extend({

        constructor: function() {
            Backbone.View.apply(this, arguments);
            // TODO move to base class
            this.listenTo(this, 'show', this.onShow);
            this.listenTo(this, 'close', this.onClose);
            this.listenTo(this, 'hide', this.onHide);
        },

        template: _.template(PageEditTemplate),

        events: {
            'click button.js-submit': 'submitClicked'
        },

        initialize: function(){
            this.on('form:data:invalid', this.onFormDataInvalid);
            this.title = "Edit " + this.model.get("title");
        },

        submitClicked: function(e){
            e.preventDefault();
//            var data1 = this.$('form').serializeArray();
//            var data2 = this.$('form').serialize();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);

//            var formData = {};
//            $('#addBook div').children('input').each(function(i, el) {
//                if ($(el).val() != '') {
//                    formData[el.id] = $(el).val();
//                }
//            });
//            this.collection.add( new app.Book( formData ) );
//            this.trigger("form:submit", 123);
        },

        onFormDataInvalid: function(errors){
            var $view = this.$el;

            var clearFormErrors = function(){
                var $form = $view.find('form');
                $form.find('.help-inline.error').each(function(){
                    $(this).remove();
                });
                $form.find('.control-group.error').each(function(){
                    $(this).removeClass("error");
                });
            };

            var markErrors = function(value, key){
                var $controlGroup = $view.find('#page-' + key).parent();
                var $errorEl = $("<span>", {class: 'help-inline error', text: value});
                $controlGroup.append($errorEl).addClass('error');
            };

            clearFormErrors();
            _.each(errors, markErrors);
        },


        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
//            var $title = $('<h1>', {text: this.title});
//            this.$el.prepend($title);
            //this.$el.html(this.template(this.model.attributes));
            return this;
        },

//        show: function() {
//            if (this.onShow) {
//                this.onShow();
//            }
//            this.$el.show();
//            return this;
//        },
//
//        hide: function() {
//            if (this.onHide) {
//                this.onHide();
//            }
//            this.$el.hide();
//            return this;
//        },

        close: function() {
            if (this.onClose) {
                this.onClose();
            }
            this.remove();
        }

    });

    IM.mixin(PagesModule.Views.PageEdit, IM.Mixins.Dialog);

    return PagesModule.Views.PageEdit;
});
