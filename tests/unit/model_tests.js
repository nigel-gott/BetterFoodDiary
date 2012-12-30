
describe("Models", function() {
    describe("Nutrients", function() {
        var nutrients;

        beforeEach(function() {
            nutrients = new bfd.Nutrients();
            nutrients.add(new bfd.Nutrient({name: 'fat', value:10}));
            nutrients.add(new bfd.Nutrient({name: 'fibre', value:20}));
            nutrients.add(new bfd.Nutrient({name: 'protein', value:100}));
        });

        it("can find a nutrient using its name", function() {
            expect(nutrients.has('fat').get('value')).toBe(10);
        });

        it("returns false if it has no such nutrient", function() {
            expect(nutrients.has('carbs')).toBe(false);
        });

        it("can add a nutrient it does not currently contain", function() {
            expect(nutrients.has('sugar')).toBe(false);
            nutrients.add(new bfd.Nutrient({name: 'sugar', value:30}));
            expect(nutrients.has('sugar').get('value')).toBe(30);
        });

        it("changing a nutrient which was added will not update itself", function() {
            var nutrient = new bfd.Nutrient({name: 'sugar', value:30});
            expect(nutrients.has('sugar')).toBe(false);
            nutrients.add(nutrient);
            expect(nutrients.has('sugar').get('value')).toBe(30);
            nutrient.set('value', 40);
            expect(nutrients.has('sugar').get('value')).toBe(30);
        });

        it("can add to a nutrient it already contains", function() {
            expect(nutrients.has('fat').get('value')).toBe(10);
            nutrients.add(new bfd.Nutrient({name: 'fat', value:40}));
            expect(nutrients.has('fat').get('value')).toBe(50);
        });
    });


});
