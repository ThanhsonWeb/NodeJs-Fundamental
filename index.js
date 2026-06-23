// file system
// 1 . read and write with "fs"

const fs = require("fs");
// blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `what is avocado ? ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// non-blocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
	if (error) console.log("ERROR !");

	console.log(data1);
	fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
		console.log(data2);
		fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
			console.log(data3);

			fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
				console.log("your file has been written ^^");
			});
		});
	});
});
console.log("Will read file");
