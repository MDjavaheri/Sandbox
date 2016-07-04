//Models
window.Sefer = Backbone.Model.extend({
	urlRoot: "../api/wines",
	defaults:{
		"id":null,
		"name":"",
		"author":"",
		"topic":"",
		"year": "",
		"description":"",
		"picture":""
		
	}
});
window.Bookshelf = Backbone.Collection.extend({
	model: Sefer,
	url: "../api/sefarim"
});
// Views
Window.SeferListView = Backbone.View.extend({
	tagName: 'ul',
	initialize: function() {
		this.model.bind("reset", this.render, this);
		var self = this;
		this.model.bind("add", function(wine) {
			$(self.el).append(new SeferListItemView({model:sefer}).render().el);
		})
	},
	render: function(eventName) {
		_.each(this.model.models, function(sefer){
			$(this.el).append(new SeferListItemView({mode:sefer}).render().el);
		}, this);
		return this;	
	}
});

window.SeferListItemView = Backbone.View.extend({
	tagName:"li",
	template: _.template($('#tpl-sefer-list-item').html()),
	initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
	render: function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
});

window.SeferView = Backbone.View.extend({
	template: _.template($('#tpl-sefer-details').html()),
	
    initialize:function () {
        this.model.bind("change", this.render, this);
    },

	render: function(eventName){
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
})

//Router
var AppRouter = Backbone.Router.extend({
	routes:{
		"":"list",
		"sefarim/:id":"seferDetails"
	},
	list:function (){
		this.seferList = new Bookshelf(),
		this.seferListView = new SeferListView({model:this.seferList});
		this.seferList.fetch();
		$("#sidebar").html(this.seferListView.render().el);
	},
	wineDetails: function(id) {
		this.sefer = this.seferList.get(id);
		this.seferView = new SeferView({model: this.sefer});
		$("#content").html(this.seferView.render().el);
	}
});

var app = new AppRouter();
Backbone.history.start();