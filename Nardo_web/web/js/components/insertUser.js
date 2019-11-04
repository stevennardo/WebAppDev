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
        
}