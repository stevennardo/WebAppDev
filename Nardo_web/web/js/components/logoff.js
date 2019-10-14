function logoff(id)
{
    var content = `
    <table id="loginTable" style="text-align: center">
        <tr>
            <th>
                Log Off
            </th>
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


    ajax("webAPIs/logoffAPI.jsp", success, "logonErr");

    function success(obj) {
        document.getElementById("loginInfo").innerHTML = "Logged off Succesfully";
    }

}