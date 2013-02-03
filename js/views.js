var bfd = bfd || {};

bfd.StatsView = Backbone.View.extend({
    tagName: 'td',
    events: {
        'click #stats_button' : 'toggle_stats_view'
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
    toggle_stats_view: function(){
    }
});
