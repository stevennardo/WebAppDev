function home(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
      <div id="content">
            <img src="pics/store.jpg" style="margin-top:-20px" class="pageImage" alt="StoreImage">

            <div id="text">
                Your one stop shop for all you need! We've got everything from tops and bottoms to makeup and jewelry. We carry both men's and women's clothing as classically categorized, but all of our clothing is unisex. <br/><br/>Don't forget, spend $50 and get free shipping! Feel free to visit <a href="https://www.usps.com">USPS</a> for any shipping particulars.
            </div>
        </div>
    `;
    document.getElementById(id).innerHTML = content;
}