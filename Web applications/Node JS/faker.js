var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties
console.log(randomName, randomEmail);
console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
faker.locale = "ge";
