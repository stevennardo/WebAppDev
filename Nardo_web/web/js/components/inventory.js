/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function inventory(id)
{
    var content = `<p style="text-align:center">
                    Inventory Filter: <input id= "inventoryInput" type="text"/>
                </p> <div id="inventoryTable"> </div>`;

    document.getElementById(id).innerHTML = content;

    ajax("webAPIs/inventoryAPI.jsp", callBack, "listHere");

    function callBack(httpRequest) {
        console.log(httpRequest.responseText);  // list as text
        var list = JSON.parse(httpRequest.responseText);
        console.log(list);  // list as an array of objects

        var dataList = list.dataTableList;
        var newList = []; // empty array
        for (var i = 0; i < dataList.length; i++) {

            newList[i] = {}; // empty object added to new array

            newList[i].itemId = dataList[i].itemId;
            newList[i].itemCategory = dataList[i].itemCategory;
            newList[i].imgUrl = dataList[i].imgUrl;
            newList[i].description = dataList[i].description;
            newList[i].color = dataList[i].color;
            newList[i].discount = dataList[i].discount;
            newList[i].delete = "<img src='pics/delete.png' onclick='inventory.delete(" + newList[i].webUserId + ",this)' />";
        }

        console.log(newList);

        makeTable({
            dataList: newList,
            divId: "inventoryTable",
            sortPic: "pics/sortIcon.png",
            sortProp: "itemId",
            textFilter: "document.getElementById(\"inventoryInput\")",
            reverse: true
        });

    }
    
    inventory.delete = function (itemId, icon) {
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
}
