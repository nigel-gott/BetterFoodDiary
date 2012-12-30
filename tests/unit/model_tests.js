
describe("Models", function() {
    describe("Nutrients", function() {
        var nutrients;

        function create_nutrients(names, values){
            var nutrients = new bfd.Nutrients();
            var i;
            for(i = 0; i < names.length; i++){
                nutrients.add(create_nutrient(names[i],values[i]));
            }

            return nutrients;
        }

        function create_nutrient(name, value){
            return new bfd.Nutrient({'name': name, 'value': value});
        }

        beforeEach(function() {
            nutrients = create_nutrients(['fat', 'fibre', 'protein'], [10,20,100]);
        });

        it("can find a nutrient using its name", function() {
            expect(nutrients.get_value('fat')).toBe(10);
            expect(nutrients.get_value('protein')).toBe(100);
        });

        it("returns false if it get_value no such nutrient", function() {
            expect(nutrients.get_value('carbs')).toBe(false);
        });

        it("can add a nutrient it does not currently contain", function() {
            expect(nutrients.get_value('sugar')).toBe(false);
            nutrients.add(create_nutrient('sugar', 30));
            expect(nutrients.get_value('sugar')).toBe(30);
        });

        it("changing a nutrient which was added will not update itself", function() {
            var nutrient = create_nutrient('sugar',30); 
            expect(nutrients.get_value('sugar')).toBe(false);
            nutrients.add(nutrient);
            expect(nutrients.get_value('sugar')).toBe(30);
            nutrient.set('value', 40);
            expect(nutrients.get_value('sugar')).toBe(30);
        });

        it("can add to a nutrient it already contains", function() {
            expect(nutrients.get_value('fat')).toBe(10);
            nutrients.add(create_nutrient('fat', 40));
            expect(nutrients.get_value('fat')).toBe(50);
        });

        it("can add together two Nutrients", function() {
            var other_nutrients = create_nutrients(['fat','salt'],[5,30]);
            other_nutrients.add_nutrients(nutrients);
            expect(other_nutrients.get_value('fat')).toBe(15);
            expect(other_nutrients.get_value('salt')).toBe(30);
            expect(other_nutrients.get_value('fibre')).toBe(20);
        });
    });


});
