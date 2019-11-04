/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function user(id)
{
    var content = `<div style="text-align:center">
                        <h2 style="display: inline-block">Users</h2><img style="display: inline-block" id="insertImg" width="15" src="pics/insert.png">
                   </div>
                   <p style="text-align:center">    
                    User Filter: <input id="userInput" type="text"/>
                   </p> 
                   <div id="userTable"></div>`;

    document.getElementById(id).innerHTML = content;

    ajax("webAPIs/listUsersAPI.jsp", callBack, "listHere");

    function callBack(httpRequest) {
        console.log(httpRequest.responseText);  // list as text
        var list = JSON.parse(httpRequest.responseText);
        console.log(list);  // list as an array of objects
        var dataList = Object.values(list);

        dataList = dataList[1];
        var newList = []; // empty array
        for (var i = 0; i < dataList.length; i++) {

            newList[i] = {}; // empty object added to new array

            newList[i].webUserId = dataList[i].webUserId;
            newList[i].image = dataList[i].image;
            newList[i].userEmail = dataList[i].userEmail;
            newList[i].userPassword = dataList[i].userPassword;
            newList[i].birthday = dataList[i].birthday;
            newList[i].membershipFee = dataList[i].membershipFee;
            newList[i].userRoleType = dataList[i].userRoleType;
            newList[i].delete = CRUD_icons.delete + "' alt='delete icon' style='width:15px; text-align: center' onclick='user.delete(" + newList[i].webUserId + ",this)";
        }

        document.getElementById("insertImg").onclick = function () { // you cant pass input params directly into an event handler
            window.location.hash = "#/insertUser";
        };

        makeTable({
            dataList: newList,
            divId: "userTable",
            sortPic: "pics/sortIcon.png",
            sortProp: "webUserId",
            textFilter: document.getElementById("userInput"),
            reverse: true
        });
        
        console.log("ajax2");
        
        ajax2({
            url: "webAPIs/getRolesAPI.jsp",
            successFn: user.setRolePickList,
            errorId: "userRoleIdError"
        });

    }

    user.delete = function (userId, icon) {
        if (confirm("Do you really want to delete user " + userId + "? ")) {
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
                url: "webAPIs/deleteUserAPI.jsp?deleteId=" + userId,
                successFn: success,
                errorId: userId
            });

            function success(obj)
            {
                if (obj.dbError !== null) {
                    alert("Database Error Encountered: user could not be deleted due to associative record.");
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

    user.setRolePickList = function (jsonObj) {
        
        console.log(jsonObj);

        if (jsonObj.dbError.length > 0) {
            document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
            return;
        }

        /*  copy/pasting the first entry from the output of my get role API
         {
         "dbError": "",
         "roleList": [
         {
         "userRoleId": "1",
         "userRoleType": "Admin",
         "errorMsg": ""
         }, ...
         */

        user.makePickList({
            id: "rolePickList",
            list: jsonObj.roleList,
            valueProp: "userRoleType",
            keyProp: "userRoleId"
        });

    }; // setRolePickList

    user.makePickList = function (params) {

        if (!params.id || !params.list || !params.list[0] || !params.valueProp || !params.keyProp) {
            alert("Utils.makePickList function requires a parameter object with all of these properties \n" +
                    "id: id of existing select tag to be populated,\n" +
                    "list: array of objects that hold the key/value pairs from which to populate the select tag,\n" +
                    "valueProp: name of property (in array of objects) with the values to show in the pick list,\n" +
                    "keyProp: name of property that holds keys (value of select tag after user clicks an option).\n");
        }

        // get reference to select tag that should already exist in the DOM
        var selectList = document.getElementById(params.id);

        for (var i in params.list) { // i iterates through all the elements in array list

            // new Option(): first parameter is displayed option, second is option value. 
            var myOption = new Option(params.list[i][params.valueProp], params.list[i][params.keyProp]);

            // add option into the select list
            selectList.appendChild(myOption);
        }
    };
}
