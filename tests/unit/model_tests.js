
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
    });


});
