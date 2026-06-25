module.exports = (tempCard, el) => {
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
