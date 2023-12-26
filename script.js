function onScanSuccess(decodedText, decodedResult) {
	console.log(`Scan result: ${decodedText}`, decodedResult);
	document.getElementById(
		"scanResultText"
	).textContent = `PassID,UserID: ${decodedText}`;
	html5QrcodeScanner.clear();
	document.getElementById("refreshButton").style.display = "block";
}

function refreshScanner() {
	document.getElementById("refreshButton").style.display = "none";
	renderQrScanner();
}

let html5QrcodeScanner;
function renderQrScanner() {
	html5QrcodeScanner = new Html5QrcodeScanner("reader", {
		fps: 10,
		qrbox: 250,
	});
	html5QrcodeScanner.render(onScanSuccess);
}
renderQrScanner();
