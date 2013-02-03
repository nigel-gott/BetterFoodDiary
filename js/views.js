var bfd = bfd || {};

bfd.StatsView = Backbone.View.extend({
    tagName: 'td',
    events: {
        'click #stats_button' : 'toggle_efficiency'
    },
    initialize: function(){
        var first_meal_header = $('.meal_header').first();

        var stats_button = $('<a/>', {id : 'stats_button'} );
        var stats_image = $('<img/>', {
            src: chrome.extension.getURL('images/stats_icon.png')
        });

        stats_button.append(stats_image);
        this.$el.append(stats_button);
        first_meal_header.append(this.$el);

    },
    nutrient_views: [],
    toggle_efficiency: function(){
        var views = this.options.nutrient_views;
        var i;
        for(i = 0; i < views.length; i++){
            views[i].toggle_efficiency();
        }
    }
});

bfd.NutrientView = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.model, "change", this.render);
    },
    toggle_efficiency: function(){
        this.model.toggle_efficiency();
    },
    render: function(){
        var new_value;
        if(this.model.get('displaying_efficiency')){
            var efficiency = this.model.get_calorie_efficiency();
            if(efficiency){
                new_value = Math.round(efficiency*10)/10;
            } else {
                new_value = 'N/A';
            }
        } else {
            new_value = this.model.get('value');
        }
        this.$el.html(new_value);
    }
});
