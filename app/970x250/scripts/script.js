function initEB() {
	if (EB.isInitialized()) {
		startAd();
	}
	else {
		EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
	}
}

function startAd() {
	console.log("Root StartAd")
}

window.addEventListener("load", initEB);
