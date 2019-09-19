/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function makeTable(dataList, divId) {

// Add data as th or td (based on eleType) to row of HTML table.
    function addToRow(eleType, row, data, alignment) {
        var ele = document.createElement(eleType);
        ele.innerHTML = data;
        ele.style.textAlign = alignment;
        row.appendChild(ele);
    }

    function unCamelCase(str) {
        return str
                // insert a space between lower & upper
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                // space before last upper in a sequence followed by lower
                .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
                // uppercase the first character
                .replace(/^./, function (str) {
                    return str.toUpperCase();
                });
    }

    function formatData(tr, data) {

        function formatCurrency(num) {
            num = Number(num);
            return num.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
        }

        var td = document.createElement("td");
        td.innerHTML = data;
        tr.appendChild(td);

        if (data.length === 0) {
            return; // no value coming in - do nothing
        } else if (!isNaN(data)) { // if numeric, format and right align
            td.innerHTML = formatCurrency(data);
            td.style.textAlign = "right";
            return;
        } else if (data.includes(".jpg") || data.includes(".png")) {
            td.innerHTML = "<img src='" + data + "'>";
        }
    }

// Create a new HTML table (DOM object) 
    var myTable = document.createElement("table");
    var myHeadings = Object.keys(dataList[0]);
    console.log(myHeadings);
// NEW PART. Add a row that will hold column headings.
    var myHeaderRow = document.createElement("tr");
    for (var x in myHeadings)
    {
        var heading = unCamelCase(myHeadings[x]);
        console.log(heading);
        addToRow("th", myHeaderRow, heading, "left");
    }
//    addToRow("th", myHeaderRow, "Web User Id", "left");
//    addToRow("th", myHeaderRow, "User Email", "left");
//    addToRow("th", myHeaderRow, "Image", "center");
//addToRow("th", myHeaderRow, "Price", "right");

    myTable.appendChild(myHeaderRow);

// Add one row (to HTML table) per element (object) in the array.
// Each object property shall become a cell in the row. 
    for (var i in dataList) {
        var tableRow = document.createElement("tr");
        myTable.appendChild(tableRow);
        var obj = dataList[i];

        for (var prop in obj)
        {
            //addToRow("td", tableRow, obj[prop], "left");
            formatData(tableRow, obj[prop]);
        }
    }


    //return myTable;
    document.getElementById(divId).appendChild(myTable);
}