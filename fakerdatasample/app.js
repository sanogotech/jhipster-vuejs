var faker = require("faker");

// Initializing our variables with a different random data each time it is run
var randomName = faker.name.findName(); // Generates a random name
var randomEmail = faker.internet.email(); // Generates a random email
var randomProduct = faker.commerce.productName(); // Generates a random product name
var randomCompany = faker.company.companyName(); // Will give back a random company name
var randomCard = faker.helpers.createCard(); // It's output is a random contact card containing many properties

// Iteration
// This code runs twenty times
// It produces each time different data
for (i = 0; i < 20; i++) {
	console.log(randomName); // Outputs a random name
	console.log(randomEmail); // Outputs a random email
	console.log(randomProduct); // Outputs the random product name generated
	console.log(randomCompany); // Produces a random company name
	console.log(randomCard); // Gives back a random card
	console.log(faker.date.past()); // Generates a random past date
}