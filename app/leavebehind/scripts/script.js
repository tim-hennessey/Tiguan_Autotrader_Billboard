function initEB() {
    if (EB.isInitialized()) {
        startAd();
    }
    else {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    }
}

function startAd() {
    addEventListeners();
}

function addEventListeners() {
    var expandButton = document.getElementById("expand-button");
    expandButton.addEventListener("click", expand);
}

function expand(event) {
    var billboardPanelName = EB._isLocalMode ? "billboard" : EB._adConfig.customJSVars.mdBillboardPanelName;

    EB.expand({
        panelName: billboardPanelName
    });

    var leaveBehindPanelName = EB._isLocalMode ? "leavebehind" : EB._adConfig.customJSVars.mdLeaveBehindPanelName;

    EB.collapse({
        panelName: leaveBehindPanelName
    });
}

window.addEventListener("load", initEB);
