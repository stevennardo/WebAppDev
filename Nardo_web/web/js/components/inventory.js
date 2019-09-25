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
        var dataList = Object.values(list);
        console.log(dataList[1]);

        /*"itemId": "1",
         "itemCategory": "patteredShirt",
         "imgUrl": "https://cdn.shopify.com/s/files/1/1832/4455/products/1153_S17_IconShirt_MendocinoBlue_FR.jpg",
         "description": "Blue patterned button down",
         "color": "Blue",
         "discount": "$5.00",
         "webUserId": "1",
         "errorMsg": ""*/

        dataList = dataList[1];
        var newList = []; // empty array
        for (var i = 0; i < dataList.length; i++) {

            newList[i] = {}; // empty object added to new array

            newList[i].itemId = dataList[i].itemId;
            newList[i].itemCategory = dataList[i].itemCategory;
            newList[i].imgUrl = dataList[i].imgUrl;
            newList[i].description = dataList[i].description;
            newList[i].color = dataList[i].color;
            newList[i].discount = dataList[i].discount;
        }

        console.log(newList);
        makeTable(newList, "inventoryTable", "pics/sortIcon.png", "itemId", document.getElementById("inventoryInput"));
    }
}
