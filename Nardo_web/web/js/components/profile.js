
function profile(id)
{
    var content = `
    <table id="loginTable" style="text-align: center">
        <tr>
            <th>
                Profile
            </th>
        </tr>
        
        <tr>
            <td>
                <div id=loginInfo>
                    No Users are Logged In
                </div>
            </td>
        </tr>
    </table>
    `;
    document.getElementById(id).innerHTML = content;


    ajax("webAPIs/getProfileAPI.jsp", success, "logonErr");

    function success(obj) {
        var user = JSON.parse(obj.responseText);
        console.log(user);

        if (user === null)
        {
            document.getElementById("loginInfo").innerHTML = "Invalid Credentials";
        } else
        {
            var msg = "Found Web User " + user.webUserList[0].webUserId;
            msg += "<br/> &nbsp; Birthday: " + user.webUserList[0].birthday;
            msg += "<br/> &nbsp; Membership Fee: " + user.webUserList[0].membershipFee;
            msg += "<br/> &nbsp; User Role: " + user.webUserList[0].userRoleId + " " + user.webUserList[0].userRoleType;
            msg += "<br/> <img src ='" + user.webUserList[0].image + "'>";
            document.getElementById("loginInfo").innerHTML = msg;
        }
    }

}

