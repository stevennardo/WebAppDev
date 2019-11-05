function insertUser(id) {

var content = `
    <div id="content">
            <div id="insertArea">
                <table>
                    <tr>
                        <td>Email Address</td>
                        <td><input type="text"  id="userEmail" /></td>
                        <td id="userEmailError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password"  id="userPassword" /></td>
                        <td id="userPasswordError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Retype Your Password</td>
                        <td><input type="password" id="userPassword2" /></td>
                        <td id="userPassword2Error" class="error"></td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td><input type="text" id="birthday" /></td>
                        <td id="birthdayError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Membership Fee</td>
                        <td><input type="text" id="membershipFee" /></td>
                        <td id="membershipFeeError" class="error"></td>
                    </tr>
                    <tr>
                        <td>User Role</td>
                        <td>
                        <select id="rolePickList">
                        <!-- JS code will make ajax call to get all the roles 
                        then populate this select tag's options with those roles -->
                        </select>
                         </td>
                        <td id="userRoleIdError" class="error"></td>
                    </tr>
                    <tr>
                        <!-- see js/insertUser.js to see the insertUser function (make sure index.html references the js file) -->
                        <td><button onclick="userCRUD.insert()">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>

    `;
        document.getElementById(id).innerHTML = content;
          
        console.log("Get Roles API Call");
        
        ajax2({
            url: "webAPIs/getRolesAPI.jsp",
            successFn: insertUser.setRolePickList,
            errorId: "userRoleIdError"
        });
        
        insertUser.setRolePickList = function (jsonObj) {

            console.log("setRolePickList was called, see next line for object holding list of roles");
            //console.log(jsonObj);
            console.log(jsonObj.userRoleList);

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

            insertUser.makePickList({
                id: "rolePickList",
                list: jsonObj.userRoleList,
                valueProp: "userRoleType",
                keyProp: "userRoleId"
            });

        }; // setRolePickList

    insertUser.makePickList= function (params) {

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