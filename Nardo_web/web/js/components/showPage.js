function showPage(id)
{
    var content = `
    
    <table class="slideShow">
        <tr>
            <td>
                <p class="picContainer" id="slide1Id"></p>
            </td>
            <td>
                <p class="picContainer" id="slide2Id"></p>
            </td>
        </tr>
    </table>`;

    document.getElementById(id).innerHTML = content;

    "use strict";

    //USERS LIST
    ajax("webAPIs/listUsersAPI.jsp", success, "listHere");

    function success(obj) {
        var list = JSON.parse(obj.responseText);
        console.log(list.webUserList);
        
        var ss = slideShowCreator({
            showID: "slide1Id", // id in which to render slideshow,
            list: list.webUserList, // array of objects with image and caption
            picProp: "image",
            captionPropName: "userEmail"
        });
    }

//dataTableList
    ajax("webAPIs/inventoryAPI.jsp", success2, "listHere");

    function success2(obj) {
        var list2 = JSON.parse(obj.responseText);
        console.log(list2.dataTableList);

        var ss2 = slideShowCreator({
            showID: "slide2Id", // id in which to render slideshow,
            list: list2.dataTableList, // array of objects with image and caption
            picProp: "imgUrl",
            captionPropName: "description"
        });
    }
}