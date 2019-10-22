/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function user(id)
{
    var content = `<p style="text-align:center">
                    User Filter: <input id="userInput" type="text"/>
                </p> <div id="userTable"></div>`;

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
            newList[i].delete = "<img src='pics/delete.png' alt='delete icon' onclick='user.delete(" + newList[i].webUserId + ",this)'  />";
        }


        makeTable({
            dataList: newList,
            divId: "userTable",
            sortPic: "pics/sortIcon.png",
            sortProp: "webUserId",
            textFilter: document.getElementById("userInput"),
            reverse: true
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
}
