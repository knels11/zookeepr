const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewAnimal,
    calidateAnimal,
} = require("../lib/animals");
const { animals } = require('../data/animals.json');
const { hasUncaughtExceptionCaptureCallback } = require('process');

test('creates an animal object', () => {
    const animal = createNewAnimal(
        {  name: 'Darlene', id: 'jhgdja3ng2' },
        animals
    );
    expect(animal.name).toBe('Darlene');
    expect(animal.id).toBe('jhgdja3ng2');
});