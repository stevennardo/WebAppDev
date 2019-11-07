var inventoryCRUD = {};

(function () {
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

    inventoryCRUD.delete = function (itemId, icon) {
        if (confirm("Do you really want to delete item " + itemId + "? ")) {
            console.log("icon that was passed into JS function is printed on next line");
            console.log(icon);

            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).
            /* users.delete(), so that it calls the Delete Web API - but only if the user 
             * confirms they really want to delete. If there is an error (e.g., can't delete 
             * record because of some error like cannot delete this user because some "other" 
             * record points to it), write a message to the page. Test to be sure that the delete 
             * function does NOT delete a row from the HTML table unless the delete API call successfully deleted a record.*/

            ajax2({
                url: "webAPIs/deleteInventoryAPI.jsp?deleteId=" + itemId,
                successFn: success,
                errorId: itemId
            });
            //

            function success(obj)
            {
                if (obj.dbError !== null) {
                    alert("Database Error Encountered: item could not be deleted due to associative record.");
                    return;
                } else
                {
                    console.log("deleted");
                    var dataRow = icon.parentNode.parentNode;
                    var rowIndex = dataRow.rowIndex - 1; // adjust for column header row?
                    var dataTable = dataRow.parentNode;
                    dataTable.deleteRow(rowIndex);
                }


            }
        }
    };
    
    function dbDataToUI(obj) {

        var jsonObj = obj.dataTableList[0];
        //console.log(jsonObj[0]);

        document.getElementById("discount").value = jsonObj.discount;
        document.getElementById("itemCategory").value = jsonObj.itemCategory;
        document.getElementById("imgUrl").value = jsonObj.imgUrl;
        document.getElementById("description").value = jsonObj.description;
        document.getElementById("color").value = jsonObj.color;
        document.getElementById("webUserId").value = jsonObj.webUserId;
    }

    function createInsertUpdateArea(isUpdate, targetId) {

        // set variables as if it will be insert...
        var itemIdRowStyle = ' style="display:none" '; // hide row with webUserId
        var saveFn = "inventory.insertSave()";

        // change variables for update
        if (isUpdate) {
            itemIdRowStyle = ""; // don't hide row with webUserId 
            saveFn = "inventory.updateSave()";
        }

        var html = `
            <div id="content">
                <table>
                    <tr ${itemIdRowStyle}>
                        <td>Web User Id</td>
                        <td><input type="text"  id="webUserId" /></td>
                        <td id="webUserIdError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Item Category</td>
                        <td><input type="text"  id="itemCategory" /></td>
                        <td id="itemCategoryError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Image URL</td>
                        <td><input type="text"  id="imgUrl" /></td>
                        <td id="imgUrlError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" id="description" /></td>
                        <td id="descriptionError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Color</td>
                        <td><input type="text" id="color" /></td>
                        <td id="colorError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Discount</td>
                        <td><input type="text" id="discount" /></td>
                        <td id="discountError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Web User ID</td>
                        <td><input type="text" id="webUserId" /></td>
                        <td id="webUserIdError" class="error"></td>
                    </tr>
                    <tr>
                        <!-- see js/insertInventory.js to see the insertInventory function (make sure index.html references the js file) -->
                        <td><button onclick="${saveFn}">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
        `;

        document.getElementById(targetId).innerHTML = html;
    }//create UI

    inventoryCRUD.updateUI = function (itemId, targetId) {
        createInsertUpdateArea(true, targetId); // first param is isUpdate (boolean)
        
        console.log("ajax to populate");
        ajax2({
            url: "webAPIs/getInventoryByIdAPI.jsp?id=" + itemId,
            successFn: proceed,
            errorId: "ajaxError"
        });
        function proceed(obj) { // obj is what got JSON.parsed from Web API's output
            console.log(obj);
            dbDataToUI(obj);
        }
    };

    inventoryCRUD.updateSave = function () {

        console.log("inventory.updateSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUserDataFromUI();

        ajax2({
            url: "webAPIs/updateInventoryAPI.jsp?jsonData=" + myData,
            successFn: processInsert,
            errorId: "recordError"
        });

        function processInsert(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
            }

            writeErrorObjToUI(jsonObj);
        }

    };//update save

}());