function calculate(amount, percent){
	return (amount * percent) / 100;
}

window.onload = function(){
	
	var baseCost = parseFloat(prompt("How much is the bill?"));
	// console.log("Base Cost: $" + baseCost);
	
	var tax = parseFloat(prompt("How much were you taxed? (%)")) / 100;
	taxAmount = calculate(baseCost, tax);
	// console.log("Restaurant Tax: " + tax * 100 + "%");
	
	var total = parseFloat(baseCost + (tax * 100));
	// console.log("Total: $" + total);
	
	var tip = parseFloat(prompt("What percentage do you want to tip? (e.g. 20%)"));
	
	var tipAmount = calculate(total, tip);
	// console.log("Tip: $" + tipAmount);
	
	if (tipAmount < total * 0.15) {
	alert("You really should tip at least 15%\n" + "15% tip of $" + total.toFixed(2) + " is $" + (total.toFixed(2) * 0.15) + "\nMust have been bad service.");
	}

	var grandTotal = total + tip;
	// console.log("Grand Total: $" + grandTotal);

	alert("Bill after tax: $" + total.toFixed(2) + "\nServer's tip: $" + tipAmount.toFixed(2) + "\nYou are spending: $" + grandTotal.toFixed(2) );
};