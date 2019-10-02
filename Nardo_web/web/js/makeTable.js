
function makeTable(params) {

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
            //console.log("OBJ:"+obj);
            var propValue = obj[prop];
            console.log("checking if " + filterTextCaps + " is in " + propValue); //prop value is not what it should be checking
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

    function formatHeading(prop)
    {
        
        if (prop.length === 0) {
            return "";
        }

        var newHdg = "<img src='" + sortPic + "'>";
        newHdg += " ";
        // capitalize first letter
        newHdg += unCamelCase(prop);
        console.log("HDG: "+newHdg);
        return newHdg;
    }
    
    function buildColHeadings(myTable, list) {

        var tableHead = document.createElement("thead");
        myTable.appendChild(tableHead);
        var tableHeadRow = document.createElement("tr");
        tableHead.appendChild(tableHeadRow);

        var data = list[0];
        for (var prop in data) {
            var tableHeadDetail = document.createElement("th");
            tableHeadRow.appendChild(tableHeadDetail);
            tableHeadDetail.innerHTML = formatHeading(prop); //tr, str, prop
            tableHeadDetail.sortOrder = prop; // add custom property to DOM element
            tableHeadDetail.sortReverse = false; // add custom property to DOM element

            tableHeadDetail.onclick = function () {
                // the keyword 'this' means the DOM element that was clicked.
                console.log("SORTING by " + this.sortOrder + " -  this.sortReverse is " + this.sortReverse);
                sort(list, this.sortOrder, this.sortReverse);
                fillTableRows(myTable, list); // places sorted data from list into tbody of table.
                this.sortReverse = !this.sortReverse;
                console.log("SORTed sortReverse is now " + this.sortReverse);
            };
        }
    } // buildColHeadings

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
        var oldBody = myTable.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            myTable.removeChild(oldBody[0]);
        }
        
        var tableBody = document.createElement("tbody");
        myTable.appendChild(tableBody);
        
        //console.log("IN FTR");
        for (var i in list) {
            var data = list[i];
            console.log("FTR:Data " + data);

            console.log(show(data, filter));
            if (show(data, filter))// still gets created even when its false
            {
                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);
                //var element = list[i];
                console.log(tableRow);
                for (var prop in data)
                {
                    formatData(tableRow, data[prop]);
                }
            }
        }
    }
    
    var dataList = params.dataList;
    var divId = params.divId;
    var sortPic = params.sortPic;
    var sortProp = params.sortProp;
    var textFilter = params.textFilter;
    var reverse = params.reverse;

    sortTable(dataList, sortProp);
    
    if (sortProp && sortProp.length > 0) {
        sort(dataList, sortProp, reverse);
        console.log("SORTED LIST NEXT LINE");
        console.log(dataList);
    }
    
    var myTable = document.createElement("table");

    if (textFilter) {
        console.log("there is a search key textbox");
        textFilter.onkeyup = function () {
            console.log("search key is " + textFilter.value);
            fillTableRows(dataList, myTable, textFilter.value);
        };
    }


    console.log("END"); //doesnt
    document.getElementById(divId).innerHTML = "";
    document.getElementById(divId).appendChild(myTable);

    buildColHeadings(myTable, dataList);
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

function convert(input) {

    if (!input || input.length === 0) {
        //console.log("input is null or empty string");
        return -1;
    }

    var parsedDate = Date.parse(input);
    if (isNaN(input) && !isNaN(parsedDate)) {
        //console.log(s + " is a Date ");
        return parsedDate;
    } else {
        var temp = input;
        console.log("temp is " + temp);
        temp = temp.replace("$", ""); // remove dollar signs
        temp = temp.replace(",", ""); // remove commas
        if (isNaN(temp)) { // if not a number, return what was passed in 
            return input.toUpperCase();
        } else {
            //console.log(tmp + " is a number");
            return Number(temp);
        }
    }
} // convert 

 
function compare(a, b, reverse) {

    // convert each 
    var convertedItem1 = convert(a);
    var convertedItem2 = convert(b);

    if (convertedItem1 === -1 && isNaN(convertedItem2)) {
        convertedItem1 = "";
        //console.log("1st value was -1 and 2nd was string, changed -1 to empty");
    }
    if (convertedItem2 === -1 && isNaN(convertedItem1)) {
        convertedItem2 = "";
        //console.log("2nd value was -1 and 1nd was string, changed -1 to empty");
    }

    // come up with comparison value: 1, 0, or -1
    var comparison = 0;
    if (convertedItem1 > convertedItem2) {
        comparison = 1;
    } else if (convertedItem1 < convertedItem2) {
        comparison = -1;
    }
    console.log("comparing " + convertedItem1 + " to " + convertedItem2 + " is " + comparison);
    if (reverse) {
        comparison = -comparison;
    }
    return comparison;
}

function sort(list, byProperty, reverse) {
  
    list.sort(function (item1, item2) {

        return compare(item1[byProperty], item2[byProperty], reverse);
    });
} // sort


