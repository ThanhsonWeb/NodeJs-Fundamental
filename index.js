const fs = require("fs");
// new module
const http = require("http");
const url = require("url");
// ----------------------------------File-----------------

// blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `what is avocado ? ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
// 	if (error) console.log("ERROR !");

// 	console.log(data1);
// 	fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
// 		console.log(data2);
// 		fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
// 			console.log(data3);

// 			fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
// 				console.log("your file has been written ^^");
// 			});
// 		});
// 	});
// });
// console.log("Will read file");

// --------------------------------Server---------------------
// b1 readFileSync
const replaceTemplate = (tempCard, el) => {
	// b2: Replace all placeholders in the template-card  with actual product data
	let output = tempCard.replace(/{%PRODUCTNAME%}/g, el.productName);
	output = output.replaceAll("{%IMAGE%}", el.image);
	output = output.replaceAll("{%PRICE%}", el.price);
	output = output.replaceAll("{%FROM%}", el.from);
	output = output.replaceAll("{%NUTRIENTS%}", el.nutrients);
	output = output.replaceAll("{%QUANTITY%}", el.quantity);
	output = output.replaceAll("{%DESCRIPTION%}", el.description);
	output = output.replaceAll("{%ID%}", el.id);
	return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// b1: Read templates files synchronously
const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	"utf-8",
);
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	"utf-8",
);
const tempProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	"utf-8",
);

const dataObject = JSON.parse(data);

// server function (run each time user request)
const server = http.createServer((req, res) => {
	const pathName = req.url; 
	// Overview page
	if (pathName === "/" || pathName === "/overview") {
		res.writeHead(200, { "Content-type": "text/html" });

		const cardsContent = dataObject
			// b3:mapping dataObject 
			.map((el) => replaceTemplate(tempCard, el))
			.join("");
		// b4 replace placeholder in tempOverview
		const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsContent);

		res.end(output);

		// Product page
	} else if (pathName === "/product") {
		res.end("this is the product");

		// API
	} else if (pathName === "/api") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(data); // send back data to browser

		// Not Found page
	} else {
		res.writeHead(404, {
			"Content-type": "text/html",
			"my-own-header": "hello world",
		});
		res.end("<h1>Page not found</h1>");
	}
});

server.listen(8000, "127.0.0.1", () => {
	console.log("Listen to requests on port 8000");
});
