var userCRUD = {};

userCRUD.insert = function () {
    console.log("insertSave was called");
    
    var ddList = document.getElementById("rolePickList");
    // create a user object from the values that the user has typed into the page.
    var userInputObj = {
        "webUserId": "",
        "userEmail": document.getElementById("userEmail").value,
        "userPassword": document.getElementById("userPassword").value,
        "userPassword2": document.getElementById("userPassword2").value,
        "birthday": document.getElementById("birthday").value,
        "membershipFee": document.getElementById("membershipFee").value,
        "userRoleId": ddList.options[ddList.selectedIndex].value,
        "userRoleType": "",
        "errorMsg": ""
    };

    console.log(userInputObj);
    // build the url for the ajax call. Remember to escape the user input object or else 
    // you'll get a security error from the server. JSON.stringify converts the javaScript
    // object into JSON format (the reverse operation of what gson does on the server side).
    var myData = escape(JSON.stringify(userInputObj));
    var url = "webAPIs/insertUserAPI.jsp?jsonData=" + myData;
    ajax(url, insertReqGood, "recordError");
    function insertReqGood(httpRequest) {
        // Running this function does not mean insert success. It just means that the Web API
        // call (to insert the record) was successful.
        console.log("insertReqGood was called here is httpRequest.");
        console.log(httpRequest);
        // the server prints out a JSON string of an object that holds field level error 
        // messages. The error message object (conveniently) has its fiels named exactly 
        // the same as the input data was named. 
        var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);
        document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
        document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
        document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
        document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
        document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
        document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;
        if (jsonObj.errorMsg.length === 0) { // success
            jsonObj.errorMsg = "Record successfully inserted !!!";
        }
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }
};