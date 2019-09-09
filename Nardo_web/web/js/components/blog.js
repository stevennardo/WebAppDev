function blog(id) {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
            <h2> HW 1 Home Page </h2>
            <p>
            My web development experience consists of some HTML, CSS, and JavaScript coding in high school, but I don't remember much if any of it.
            </p>
            <p>
            In this homework I learned about HTML, CSS, and how to publish a web page to the Linux server; I didn't know we had access to tools like that.
            The parts that I found hard or confusing were all the numerous example code files. I found it very confusing and time consuming piecing all the elements together, especially when some sample code requires you to rebuild your site multiple times before reaching the end result. Also, not knowing much about the code itself, being only taught how the sample code should work, not the code concepts and not working toward building the site myself.
            </p>
            <h2> HW 2 Routing & DB </h2>
            <p>
            My database experience consists of some Ruby coding via Chef.io.
            </p>
            <p>
            In this homework I learned what routing was and how that relates to websites, also using more than one file for a webpage. 
            The parts that I found easy were 
            The parts that I found hard or confusing were the same, it is very disorienting trying to piece together code from multiple files and folders without being taught really how it works and what it's doing. Also, getting the CSS to work properly, a lot of my code was being overwritten for whatever reason and getting what I want to look how I want took some overriding.
            </p>
            <ul>
            <li>
            To see how my routing works, click on these icons: home, then blog, then home again.
            </li>
            <li>
            To see my database work, click <a href = "files/HW2.docx" >here</a>.
            </li>
            </ul>
            <h2> HW 3 Web API </h2>
            <p>
            In this homework I learned...
            The parts that I found easy were...
            The parts that I found hard or confusing were...
            </p>
            <ul>
            <li>
            To invoke my user list Web API, click <a target = "_blank" href = "webAPIs/listUsersAPI.jsp" > here </a>.
            </li>
            <li>
            To invoke my [other] list Web API, click <a target = "_blank" href = "webAPIs/listOtherAPI.jsp" > here </a>.
            </li>
            </ul>
            <h2> HW 4 Display Data </h2>
            <p>
            In this homework I learned...
            The parts that I found easy were...
            The parts that I found hard or confusing were...
            </p>
            <ul>
            <li>
            To see my user and [other] list pages, click under the search icon
            in the navigation bar.
            </li>
            </ul>
            <h2> HW 5 JavaScript </h2>
            <p>
            In this homework I learned...
            The parts that I found easy were...
            The parts that I found hard or confusing were...
            </p>
            <ul>
            <li>
            To see how my JavaScript code works,
            click <a target = "_blank" href = "05_JS/index.html" > here </a>.
            </li>
            </ul>
            <h2> Tutorial Proposal </h2>
            <p>
            Every student created a Tutorial Proposal (in lab activity),
            even if they will not choose option B, Tutorial.
            </p>
            <ul>
            <li>
            Click <a target = "_blank" href = "tutorial/proposal.pdf" > here </a> for my Tutorial Proposal, 
            a pdf that describes the consumer / provider style JS code I might like
            to implement.This code would do a fancier job of displaying my data.The pdf
            should provide links to pages that inspired my idea.
            </li>
            <li>
            Click <a target = "_blank" href = "tutorial/poc.pdf" > here </a> to see my Proof of Concept, 
            code not converted to consumer / provider style yet, code just copy / pasted and modified
            so that it works locally and published and demonstrates the idea you had in mind.
            </li>
            </ul>
            <h2> HW 6 Delete </h2>
            <p>
            In this homework I learned...
            The parts that I found easy were...
            The parts that I found hard or confusing were...
            </p>
            <ul>
            <li>
            To see how delete user works, click on the delete icon next to a
            user in my user listing (after clicking on "user" under the
                    search icon).
            </li>
            <li>
            To see how delete [other] works, click on the delete icon next to a
            record in my [other] listing.
            </li>
            </ul>
            <h2> HW 7 Log On </h2>
            <p>
            In this homework I learned
            < em > [if you chose option A, Log On & amp; Update HW] < /em> ... 
            The parts that I found easy were...
            The parts that I found hard or confusing were...
            </p>
            <ul>
            <li>
            To see how my Log On code works, click on these items under the
            account icon: "Log On", "Profile", and "Log Off".You'll only see 
            the profile information if you are logged on.
            </li>
            </ul>

            <h2> HW 8 Insert </h2>
            <p>
            In this homework I learned...
            The parts that I found easy were...
            The parts that I found hard or confusing were...
            </p>
            <ul>
            <li>
            To see how insert user works, click on the plus sign at the top of the
            user listing page - OR - click on the "register" item under the account icon.
            </li>
            <li>
            To see how insert [other] works, click on the plus sign at the top of the
            [other] listing page.
            </li>
            </ul>
            <h2> HW 9 Update </h2>
            <p>
            In this homework I learned
            < em > [if you chose option A, Log On & amp; Update HW] < /em> ... 
            The parts that I found easy were...
            The parts that I found hard or confusing were...
            </p>
            <ul>
            <li>
            To see how update user works, click on the update icon next to a
            user in my user listing (after you clicked on "user" under the
                    search icon).
            </li>
            <li>
            To see how update [other] works, click on the update icon next to a
            record in my [other] listing.
            </li>
            </ul>
            <h2> Tutorial </h2>
            <p>
            By doing the tutorial < em > [if you chose option B, the tutorial] < /em> 
            I learned...
            The parts that I found easy were...
            The parts that I found hard or confusing were...
            </p>

            <ul>
            <li>
            To see my tutorial, click on "proposal", "demo", and "log" under the tutorial icon
            in the navigation bar.
            </li>
            </ul>
            `;
            document.getElementById(id).innerHTML = content;
}