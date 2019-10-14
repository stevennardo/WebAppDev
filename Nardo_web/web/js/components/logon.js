
function logon(id)
{
    var content = `
    <table id="loginTable" style="text-align: center">
        <tr>
            <th>
                Login
            </th>
        </tr>
        <tr>
            <td>
                Email: <input type="text" id="getUser"/>
            </td>
        </tr>
        <tr>
            <td>
                Password: <input type="password" id="getPass"/>
            </td>
        </tr>    
        <tr>
            <td>
                <input type="button" value="Submit" onclick="logon.go()"/>
            </td>
        </tr>
        <tr>
            <td>
                <div id=loginInfo>
                </div>
            </td>
        </tr>
    </table>
    `;
    document.getElementById(id).innerHTML = content;

    logon.go = function ()
    {
        var email = escape(document.getElementById("getUser").value);
        
        var password = escape(document.getElementById("getPass").value);

        // the JS escape function cleans input so it can be used as a URL paramenter
        var myUrl = "webAPIs/logonAPI.jsp?email=" + email + "&pass=" + password; //webAPIs/logonAPI.jsp?email=user1@email.com&pass=p
        console.log("logon.js ready to invoke logon API with this url: " + myUrl);

        ajax(myUrl, success, "logonErr");

        function success(obj) {
            var user = JSON.parse(obj.responseText);
            console.log(user);

            if (user === null)
            {
                document.getElementById("loginInfo").innerHTML = "Invalid Credentials";
            } else
            {
                var msg = "Found Web User " + user.webUserId;
                msg += "<br/> &nbsp; Birthday: " + user.birthday;
                msg += "<br/> &nbsp; Membership Fee: " + user.membershipFee;
                msg += "<br/> &nbsp; User Role: " + user.userRoleId + " " + user.userRoleType;
                msg += "<br/> <img src ='" + user.image + "'>";
                document.getElementById("loginInfo").innerHTML = msg;
            }
        }
    };
}

