import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
	getFirestore,
	doc,
	collection,
	getDoc,
	getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyDOaa608aTROn9KRUzlzcBv2WHxeNs3JYg",
	authDomain: "e-bus-pass-2567a.firebaseapp.com",
	projectId: "e-bus-pass-2567a",
	storageBucket: "e-bus-pass-2567a.appspot.com",
	messagingSenderId: "222064828412",
	appId: "1:222064828412:web:5b1bbafd8937c9d862dc79",
	measurementId: "G-C95WMXXFX7",
};
const firebaseApp = initializeApp(firebaseConfig);
// TODO: Implement auth for conductor
const auth = getAuth();
const db = getFirestore();

const getUserData = async (userID, passID) => {
	const userDocRef = doc(db, "users", userID);
	const userSnapshot = await getDoc(userDocRef);

	const busPassesColRef = doc(userDocRef, "busPasses", passID);
	const passSnapshot = await getDoc(busPassesColRef);
	return {
		user: userSnapshot.data(),
		pass: passSnapshot.data(),
	};
};

const resultCont = document.getElementById("scanResult");
const heading = document.getElementById("heading");
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const route = document.getElementById("route");
const validity = document.getElementById("validity");
const profile = document.getElementById("profile");

function renderPass(data) {
	const { user, pass } = data;
	const dateTo = new Date(pass.dateTo);
	profile.src = user.photoUrl;
	heading.textContent = "Valid Pass ✔";
	name.textContent = user.username;
	phone.textContent = user.phone;
	route.textContent = pass.placeFrom + " - " + pass.placeTo;
	validity.textContent = dateTo.toLocaleDateString();

	if (dateTo < new Date("2024-01-29")) {
		resultCont.classList.add("error");
		heading.textContent = "Expired Pass, Please Renew !";
		return;
	}
}

async function onScanSuccess(decodedText, decodedResult) {
	const [passID, userID] = decodedText.split(",");
	if (!passID || !userID) {
		resultCont.classList.add("error");
		heading.textContent = "Invalid QR !";
	} else {
		const data = await getUserData(
			"H13JaGEBI6a3EUQ87s0bzUfxVOS2",
			"Yxb2lcc6f4M42iv9DaUi"
		);
		renderPass(data);
	}
	resultCont.classList.remove("hidden");
	html5QrcodeScanner.clear();
}

document
	.getElementById("refreshButton")
	.addEventListener("click", refreshScanner);

function refreshScanner() {
	resultCont.classList.remove("error");
	resultCont.classList.add("hidden");
	resetFields();
	renderQrScanner();
}

function resetFields() {
	profile.src = "";
	heading.textContent = "";
	name.textContent = "";
	phone.textContent = "";
	route.textContent = "";
	validity.textContent = "";
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
