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
    determineIfAutoExpansion();
    console.log("Billboard StartAd");
}

function determineIfAutoExpansion() {
    if (EB._adConfigDefined) {
        var isAutoExpansion = EB._adConfig.customJSVars.mdShouldAutoExpand;

        if (isAutoExpansion) {
            doAutoExpansionBehavior();
        }
    }
}

function doAutoExpansionBehavior() {
    console.log("expansion behavior")
}

function addEventListeners() {
    var closeButton = document.getElementById("close-button");
    var buttonExit = document.getElementById("button-exit");

    closeButton.addEventListener("click", collapse);
    buttonExit.addEventListener("click", clickthrough);
    window.addEventListener("message", handleMessageFromCustomScript);

    var cancelAutoCollapseOnUserInteraction = EB._isLocalMode ? false : EB._adConfig.customJSVars.mdCancelAutoCollapseOnUserInteraction;

    if (cancelAutoCollapseOnUserInteraction) {
        document.addEventListener("mousedown", cancelAutoCollapse);
        document.addEventListener("touchstart", cancelAutoCollapse);
    }
}

function handleMessageFromCustomScript(message) {
    try {
        var data = JSON.parse(message.data);

        if (data.type) {
            switch (data.type) {
                case "handleBeforeBillboardCollapse":
                    // add any code you'd like to run before the billboard expand animation completes
                    break;
                case "handleAfterBillboardExpand":
                    // add any code you'd like to run after the billboard expand animation completes
                    break;
            }
        }

    }
    catch (error) {
    }
}

function collapse(event) {
    var leaveBehindPanelName = EB._isLocalMode ? "leavebehind" : EB._adConfig.customJSVars.mdLeaveBehindPanelName;

    EB.expand({
        panelName: leaveBehindPanelName,
        actionType: EBG.ActionType.AUTO
    });

    var billboardPanelName = EB._isLocalMode ? "billboard" : EB._adConfig.customJSVars.mdBillboardPanelName;

    EB.collapse({
        panelName: billboardPanelName
    });
}

function clickthrough(event) {
    EB.clickthrough();
}

function cancelAutoCollapse(event) {
    document.removeEventListener("mousedown", cancelAutoCollapse);
    document.removeEventListener("touchstart", cancelAutoCollapse);

    EB._sendMessage("cancelAutoCollapse", {});
}

window.addEventListener("load", initEB);
