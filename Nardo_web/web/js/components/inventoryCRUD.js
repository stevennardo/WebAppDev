var inventoryCRUD = {};

inventoryCRUD.insert = function () {
    console.log("insertSave was called");
    // create a user object from the values that the user has typed into the page.
    /*"itemCategory": "extra2",
     "imgUrl": "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/409323/item/goods_15_409323.jpg",
     "description": "extra2",
     "color": "",
     "discount": "$10.00",
     "webUserId": "19",*/
    var userInputObj = {
        "itemId": "",
        "itemCategory": document.getElementById("itemCategory").value,
        "imgUrl": document.getElementById("imgUrl").value,
        "description": document.getElementById("description").value,
        "color": document.getElementById("color").value,
        "discount": document.getElementById("discount").value,
        "webUserId": document.getElementById("webUserId").value,
        "errorMsg": ""
    };

    console.log(userInputObj);
    // build the url for the ajax call. Remember to escape the user input object or else 
    // you'll get a security error from the server. JSON.stringify converts the javaScript
    // object into JSON format (the reverse operation of what gson does on the server side).
    var myData = escape(JSON.stringify(userInputObj));
    var url = "webAPIs/insertInventoryAPI.jsp?jsonData=" + myData;
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
        document.getElementById("discountError").innerHTML = jsonObj.discount;
        document.getElementById("itemCategoryError").innerHTML = jsonObj.itemCategory;
        document.getElementById("imgUrlError").innerHTML = jsonObj.imgUrl;
        document.getElementById("descriptionError").innerHTML = jsonObj.description;
        document.getElementById("colorError").innerHTML = jsonObj.color;
        document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;
        if (jsonObj.errorMsg.length === 0) { // success
            jsonObj.errorMsg = "Record successfully inserted !!!";
        }
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }
};