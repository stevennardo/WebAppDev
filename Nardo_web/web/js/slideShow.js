
function slideShowCreator(parameters)
{
    var slideShow = document.getElementById(parameters.showID);
    var list = parameters.list;
    var picProp = parameters.picProp;
    var captionPropName = parameters.captionPropName;
    
    if(parameters.color) //optional, default is in external style sheet
    {
        slideShow.style.backgroundColor = parameters.color;
    }

    var div = document.createElement("div");
    slideShow.appendChild(div);
    var imageHolder = document.createElement("img");
    div.append(imageHolder);
    var divCaption = document.createElement("div");
    slideShow.appendChild(divCaption);

    var previous = document.createElement("button");
    previous.innerHTML = "Back";
    slideShow.appendChild(previous);

    var next = document.createElement("button");
    next.innerHTML = "Next";
    slideShow.appendChild(next);

    var picBeingShown = 0;
    update();

    //private
    function nextImg() {
        picBeingShown++;
        if (picBeingShown >= list.length) {
            picBeingShown = 0;
        }				
        update();
    }

    //private
    function prevImg() {
        picBeingShown--;
        if (picBeingShown < 0) {
            picBeingShown = list.length - 1;
        }				
        update();
    }

    previous.onclick = prevImg;
    next.onclick = nextImg;

    slideShow.setPicNum = function (newNum) {
        if ((newNum >= 0) && (newNum < list.length)) {
            picBeingShown = newNum;				
            update();
        }
    };

    function update() {
        var obj = list[picBeingShown];
        imageHolder.src = obj[picProp];
        divCaption.innerHTML = obj[captionPropName];
    }

    return slideShow;
}
