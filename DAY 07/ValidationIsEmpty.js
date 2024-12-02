function checkIsEmpty(id, divId, errorMessage) {
    var objId = document.getElementById(id);
    var objDivId = document.getElementById(divId);
    if (objId.type == "radio") {
        if (!objId.checked) {
            objDivId.innerText = errorMessage;
        }
        else {
            objDivId.innerText = "";
        }
    }
    else {
        if (objId.value == "") {
            objDivId.innerText = errorMessage;
        } else {
            objDivId.innerText = "";
            console.log("Data :: ", objId.value);
        }
    }
}
