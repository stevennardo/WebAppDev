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
        }

        console.log(newList);

        makeTable({
            dataList: newList,
            divId: "userTable",
            sortPic: "pics/sortIcon.png",
            sortProp: "webUserId",
            textFilter: document.getElementById("userInput"),
            reverse: true
        });
    }
}
