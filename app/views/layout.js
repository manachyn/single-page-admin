var BaseView = Backbone.View.extend({
    // Override this property to specify the path to the template.
    template: "",

    // Override this method to provide the right data to your template.
    serialize: function() {
        return {};
    },

    // Overrideable fetch method to get the template contents, pass a callback to
    // get the contents.
    fetch: function(done) {
        // Using jQuery, execute a GET request to asynchronously load the template
        // from the filesystem.
        $.get(this.template, function(contents) {
            // Trigger the callback with the compiled template function.
            done(_.template(contents));
        });
    },

    // This method now looks for the above `template` and `serialize` properties
    // in order to render.
    render: function() {
        // Fetch the template.
        this.fetch(function(template) {
            // Render the markup.
            var markup = template(this.serialize());

            // Put the content into this Views element.
            this.$el.html(markup);
        });

        // Allow chaining.
        return this;
    }
});

var BaseView = Backbone.View.extend({

    // Other code here...

    renderNested: function( view, selector ) {
        var $element = ( selector instanceof $ ) ? selector : this.$( selector );
        view.setElement( $element ).render();
    }
});

var NestedView = Backbone.View.extend({
    render: function() {
        this.$el.html( "<strong>I'm nested!</strong>" );
        return this;
    }
});

var CustomView = BaseView.extend({

    initialize: function() {
        this.nestedView = new NestedView();
    }

    render: function() {
        this.$el.html( this.template() );
        this.renderNested( this.nestedView, '.selector' );
        return this;
    }
});
