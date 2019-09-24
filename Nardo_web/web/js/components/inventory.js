/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function inventory(id) 
{
    var content =`<div id="inventoryTable"> </div>`;
     
    document.getElementById(id).innerHTML = content;
    
    ajax("webAPIs/inventoryAPI.jsp", callBack, "listHere");

    function callBack(httpRequest) {
        console.log(httpRequest.responseText);  // list as text
        var list = JSON.parse(httpRequest.responseText);
        console.log(list);  // list as an array of objects
        var dataList = Object.values(list);
        console.log(dataList[1]);
        // parameters: list to sort, initial sort property, id where HTML table should be placed.
        makeTable(dataList[1], "inventoryTable");
    }
}
