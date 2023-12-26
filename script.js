function onScanSuccess(decodedText, decodedResult) {
	console.log(`Scan result: ${decodedText}`, decodedResult);
	html5QrcodeScanner.clear();

	document.getElementById("refreshButton").style.display = "block";
}

function refreshScanner() {
	location.reload(true);
}

var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
	fps: 10,
	qrbox: 250,
});

html5QrcodeScanner.render(onScanSuccess);
