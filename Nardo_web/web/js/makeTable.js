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
    
    function formatHeading(tr, str)
    {
        str = unCamelCase(str);
        console.log(str);
        
        var th = document.createElement("th");
        th.innerHTML = str;
        tr.appendChild(th);
        th.style.textAlign = "center";
    }

    function formatData(tr, data) {

        function formatCurrency(num) {
            num = Number(num);
            return num.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
        }

        var td = document.createElement("td");
        td.innerHTML = data;
        tr.appendChild(td);
        var tempData = data.toString();

        if (data.length === 0) {
            return; // no value coming in - do nothing
        } else if (!isNaN(data)) { // if numeric, format and right align
            td.innerHTML = formatCurrency(data);
            td.style.textAlign = "right";
            return;
        } else if (tempData.indexOf(".jpg") !== -1 || tempData.indexOf(".png") !== -1) {
            td.innerHTML = "<img src='" + data + "'>";
        }
    }

// Create a new HTML table (DOM object) 
    var myTable = document.createElement("table");
    //console.log(myTable !== null);

    var myHeaderRow = document.createElement("tr");
    var myHeadings = [];

    var obj = dataList[0];
    for (var title in obj) {
        console.log(title);
        myHeadings.push(title);
    }


// NEW PART Add a row that will hold column headings.

    for (var x in myHeadings)
    {
        var heading = formatHeading(myHeaderRow, myHeadings[x]);
        console.log(heading);
    }

    console.log(myHeaderRow);

    myTable.appendChild(myHeaderRow);

// Add one row (to HTML table) per element (object) in the array.
// Each object property shall become a cell in the row. 
    for (var i in dataList) {
        var tableRow = document.createElement("tr");
        myTable.appendChild(tableRow);
        var obj = dataList[i];
        console.log(tableRow);
        for (var prop in obj)
        {
            //addToRow("td", tableRow, obj[prop], "left");
            formatData(tableRow, obj[prop]);
            //addToRow("td", tableRow, obj[prop], "left");
        }
    }

    console.log(myTable);
    document.getElementById(divId).appendChild(myTable);
}