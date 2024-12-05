function checkIsEmpty(id, divId, errorMessage) {
    var objId = document.getElementById(id);
    var objDivId = document.getElementById(divId);
    if (objId.type == "radio") {
        var objIdRadio = document.getElementsByName("Gender");
        for (let index = 0; index < objIdRadio.length; index++) {
            if (!objIdRadio.checked) {
                objDivId.innerText = errorMessage;
                break;
            }
            else {
                objDivId.innerText = "";
                console.log("Gender :: ", objIdRadio.value);
            }
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

function validEmail(id, divId, errorMessage) {
    var objId = document.getElementById(id);
    var objDivId = document.getElementById(divId);

    var arrValid = ['@gmail.com', '@yahoo.com', '@hotmail.com'];

    for (var i = 0; i < arrValid.length; i++) {
        if (objId.value.includes(arrValid[i])) {
            objDivId.innerText = "";
            console.log("Email :: ", objId.value);
            break;
        }
        else {
            objDivId.innerText = errorMessage;
        }
    }
}
