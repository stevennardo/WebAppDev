"use strict";

function dropdown(parametersInput)
{
    var parameters = parametersInput || {};

    var dropHeaderStyle = parameters.dropHeaderStyle || "dropHeader";

    var dropContentStyle = parameters.dropContentStyle || "dropContent";

    var headerList = document.getElementsByClassName(dropHeaderStyle);
    for (var i = 0; i < headerList.length; i++)
    {
        headerList[i].onclick = function ()
        {


            var parent = this.parentElement;
            var dContent = parent.getElementsByClassName(dropContentStyle)[0];

            var dropContentList = document.getElementsByClassName(dropContentStyle);

            for (var i = 0; i < dropContentList.length; i++)
            {
                if (dropContentList[i] !== dContent)
                {
                    hide(dropContentList[i]);
                }
            }

            if (dContent.style.visibility === "visible")
            {
                hide(dContent);
            }
            else
            {
                show(dContent);
            }
        };
    }

    function hide(dropElement)
    {
        dropElement.style.visibility = "hidden";
    }

    function show(dropElement)
    {
        dropElement.style.visibility = "visible";
    }

    function hideAllDropContents() {
        var dropContentList = document.getElementsByClassName(dropContentStyle);
        for (var i = 0; i < dropContentList.length; i++)
        {
            hide(dropContentList[i]);
        }
    }

    window.onclick = function (event)
    {
        if (!event.target.matches('.' + dropHeaderStyle))
        {
            hideAllDropContents();
        }
        else
        {
            console.log("not hiding drop lists");
        }
    };
}