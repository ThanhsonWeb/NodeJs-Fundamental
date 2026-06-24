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
const replaceTemplate = (temp, el) => {
	// b2 replace all the placeholders
	let output = temp.replace(/{%PRODUCTNAME%}/g, el.productName);
	output = output.replace(/{%IMAGE%}/g, el.image);
	output = output.replace(/{%PRICE%}/g, el.price);
	output = output.replace(/{%FROM%}/g, el.from);
	output = output.replace(/{%NUTRIENTS%}/g, el.nutrients);
	output = output.replace(/{%QUANTITY%}/g, el.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, el.description);
	output = output.replace(/{%ID%}/g, el.id);
	return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// b1. read files
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
	const pathName = req.url; // before ? mark
	// Overview page
	if (pathName === "/" || pathName === "/overview") {
		res.writeHead(200, { "Content-type": "text/html" });

		const cardsHtml = dataObject
			.map((el) => replaceTemplate(tempCard, el))
			.join("");
		// b4 replace placeholder of this file
		const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

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
