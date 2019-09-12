function other(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
      <p>
        Data listed from my [other] table - COMING SOON !
      </p>
    `;
    document.getElementById(id).innerHTML = content;
}