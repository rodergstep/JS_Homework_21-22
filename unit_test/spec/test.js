var app = require('../test_pow_func/script.js');

describe("Тестування зведення в ступінь", function() {

    it("Перевірка на нульовий ступінь 5 у 0", function() {
        var res = app.pow(5, 0);
        expect(res).toBe(1);
    });

    it("Перевірка на від'ємний ступінь 6 у -3", function() {
        var res = app.pow(6, -3);
        expect(res).toBe(0.004629629629629629);
    });

    it("Перевірка 5 у 3 ступені", function() {
        var res = app.pow(5, 3);
        expect(res).toEqual(125);
    });

});
