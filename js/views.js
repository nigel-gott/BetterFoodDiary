var bfd = bfd || {};

bfd.NutrientView = Backbone.View.extend({
    events: {
        'mouseenter': 'toggle_efficiency',
        'mouseleave': 'toggle_efficiency'
    },
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
