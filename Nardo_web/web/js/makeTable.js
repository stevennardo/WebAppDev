/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function makeTable(dataList, divId, sortPic, sortProp, textFilter) {

// Add data as th or td (based on eleType) to row of HTML table.
    function addToRow(eleType, row, data, alignment) {
        var ele = document.createElement(eleType);
        ele.innerHTML = data;
        ele.style.textAlign = alignment;
        row.appendChild(ele);
    }

    function show(obj, filterText)
    {
        //console.log(filterText);
        if (!filterText || filterText.length === 0) {
            return true; // show the object if filterText is empty
        }
        var filterTextCaps = filterText.toUpperCase();
        for (var prop in obj)
        {
            var propValue = prop;
            console.log("checking if " + filterTextCaps + " is in " + propValue);
            var propValueCaps = propValue.toUpperCase();

            if (propValueCaps.includes(filterTextCaps))
            {
                console.log("yes it is inside");
                return true;
            }
        }
        console.log("no it is not inside");
        return false;
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

    function formatHeading(tr, str, prop)
    {
        str = unCamelCase(str);
        //console.log(str);
        var heading = str + " <img src='" + sortPic + "'>";

        var th = document.createElement("th");
        th.innerHTML = heading;
        th.sortField = prop; // add custom property to each th, so it knows how to sort.
        //console.log(prop);
        //debugger;
        th.onclick = function () {
            // "this" is the thing that was clicked, the "th" DOM object.
            makeTable(dataList, divId, sortPic, this.sortField);
        };

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
            if (data.indexOf(".") !== -1)
            {
                td.innerHTML = formatCurrency(data);
            }
            td.style.textAlign = "right";
            return;
        } else if (tempData.indexOf(".jpg") !== -1 || tempData.indexOf(".png") !== -1) {
            td.innerHTML = "<img src='" + data + "'>";
        }
    }

    function fillTableRows(list, myTable, filter)
    {
        //console.log("IN FTR");
        for (var i in list) {
            var data = list[i];
            console.log("FTR:Data " + data);

//            for (var x in data) {
//                var obj = data[x];
//                console.log("FTR:Obj " + obj);
//
//                //for (var title in obj) {
//                console.log("FTR:title " + title);

                if (show(data, filter))
                    console.log(show(data, filter));
                {
                    var tableRow = document.createElement("tr");
                    myTable.appendChild(tableRow);
                    var element = list[i];
                    console.log(tableRow);
                    for (var prop in element)
                    {
                        formatData(tableRow, element[prop]);
                    }
//                }
            }
        }
    }

    sortTable(dataList, sortProp);
    // Create a new HTML table (DOM object) 
    var myTable = document.createElement("table");

//    if (textFilter) {
//        //console.log("there is a search key textbox");
//        textFilter.onkeyup = function () {
//            //console.log("search key is " + textFilter.value);
//            fillTableRows(dataList, myTable, textFilter.value);
//        };
//    }

    var myHeaderRow = document.createElement("tr");
    var myHeadings = [];

    var obj = dataList[0];
    for (var title in obj) {
        console.log(title);
        myHeadings.push(title);
    }

    for (var prop in myHeadings)
    {
        var heading = formatHeading(myHeaderRow, myHeadings[prop], myHeadings[prop]);
        //console.log(heading);
    }

    //console.log(myHeaderRow);

    myTable.appendChild(myHeaderRow);

// Add one row (to HTML table) per element (object) in the array.
// Each object property shall become a cell in the row. 

    //console.log(myTable);
    document.getElementById(divId).innerHTML = "";
    document.getElementById(divId).appendChild(myTable);

    fillTableRows(dataList, myTable, "");
}

function sortTable(listToSort, byProperty) {

    listToSort.sort(function (item1, item2) {

        var value1 = item1[byProperty];
        var value2 = item2[byProperty];

        var c = 0;
        if (value1 > value2)
        {
            c = 1;
        } else if (value1 < value2)
        {
            c = -1;
        }
        //console.log("comparing " + value1 + " to " + value2 + " is " + c);
        return c;
    });
}



