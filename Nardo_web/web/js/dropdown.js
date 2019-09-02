function dropdown(menuItem)
{
    var dropdown = document.getElementById(menuItem);

    if (dropdown.style.visibility === "visible")
    {
        hide(dropdown);
    }
    else
    {
        show(dropdown);
    }
}

function hide(dropdown)
{
    dropdown.style.visibility = "hidden";
}

function show(dropdown)
{
    dropdown.style.visibility = "visible";
}
