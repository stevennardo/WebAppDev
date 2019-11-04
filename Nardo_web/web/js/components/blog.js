function blog(id) {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var content = `
            <h2> HW 1 Home Page </h2>
            <p>
            My web development experience consists of some HTML, CSS, and JavaScript coding in high school, but I don't remember much if any of it.
            </p>
            <p>
            In this homework I learned about HTML, CSS, and how to publish a web page to the Linux server; I didn't know we had access to tools like that.
            
            The parts that I found hard or confusing were all the numerous example code files. I found it confusing and time consuming piecing all the elements together, especially when some sample code requires you to rebuild your site multiple times before reaching the end result. Also, not knowing much about the code itself, only going over how the sample code works, and not toward building the site myself.
            </p>
            <h2> HW 2 Database </h2>
            <p>
            My database experience consists of some Ruby coding via Chef.io.
            </p>
            <p>
            I thought it was the easiest part of the homework, creating the tables was very straight forward and the GUI made it very simple. 
            </p>
            <ul>
            <li>
            To see my database work, click <a href = "files/HW2.docx" >here</a>.
            </li>
            </ul>
            <h2> HW 2 Routing </h2>
            <p>
            In this homework I learned what routing was and how that relates to websites, also using more than one file for a webpage as well as linking all the aspects together. 
            The parts that I found hard or confusing were the same, it is disorienting trying to piece together code from multiple files and folders, I'm hoping to learn more about what it's doing. Also, getting the CSS to work properly, a lot of my code was being overwritten for various reasons and getting what I want to look how I want took some overriding via in file and in text style code.
            </p>
            <ul>
            <li>
            To see how my routing works, click on these icons: home, then blog, then home again.
            </li>
            </ul>
    
     
            <h2> HW 3 Web API </h2>
            <p>
            In this homework I learned how websites and databases communicate and how data is transferred. Learning how the coding languages as well as the concepts of the front and back end come together and use this method to become things used everyday.
            The parts that I found easy were connecting to the database itself.
            The parts that I found hard or confusing were debugging the database errors as well as the API errors, also the SQL select statements. 
            </p>
            <ul>
            <li>
            To invoke my user list Web API, click <a target = "_blank" href = "webAPIs/listUsersAPI.jsp" >here</a>.
            </li>
            <li>
            To invoke my clothing inventory list Web API, click <a target = "_blank" href = "webAPIs/inventoryAPI.jsp" >here</a>.
            </li>
            </ul>
    
            <h2> HW 4 Display Data </h2>
            <p>
            In this homework I learned the complexities of click sort as well as how to implement it with extracted database data.
            The parts that I found easy were building the table from the data itself.
            The parts that I found very hard were implementing the sort as well as the search filter. It was hard for me to understand the directions and it was very difficult for me to understand the sample code in relation to my own code as well as understand the sample code in general, many problems I was having was because of this difference of code. The search field was the hardest part it got extremely hard to keep track of the comparisons and other factors amidst all the other code and elements; I wasn't able to complete it.
            </p>
            <ul>
            <li>
            To see my user and inventory list pages, click under the search icon in the navigation bar.
            </li>
            </ul>
    
            <h2> HW 5 JavaScript </h2>
            <p>
            In this homework I learned how to code a slideshow using JavaScript not just HTML and CSS
            The parts that I found easy were using the JSON data for the slide show.
            The parts that I found hard or confusing were the directions and what exactly needed to be done in order to receive full credit.
            </p>
            <ul>
            <li>
            To see how my slideshow works, click under the search icon in the navigation bar.
            </li>
            </ul>
    
            <h2> HW 6 Logon </h2>
            <p>
            In this homework I learned what it takes to use a database to fetch user information to log in, log off, and gather profile info
            The parts that I found easy were setting up the pages to get data injected into them.
            The parts that I found hard or confusing were getting the API to return exactly what was needed and how to debug output I didn't understand/recognise.
            To see the web APIs click the following links:    
            </p>
            <ul>
                <li>
                   Log On: <a target = "_blank" href = "webAPIs/logonAPI.jsp?email=user1@email.com&pass=p" >Login</a>
                </li>
                 <li>
                   Get Profile: <a target = "_blank" href = "webAPIs/getProfileAPI.jsp" >Profile</a>
                </li>
                <li>
                   Log Off: <a target = "_blank" href = "webAPIs/logoffAPI.jsp" >Log Out</a>
                </li>
            </ul>
            <p>
            To use the account tab, valid credentials are email: user1@email.com and password: p
            </p>
    
            <h2> HW 7 Log On </h2>
            <p>
            In this homework I learned
            < em > [if you chose option A, Log On & amp; Update HW] < /em> ... 
            The parts that I found easy were moving the code we did in the lab assignment as well as doing the code in lab.
            The parts that I found hard or confusing were taking note of the error messages and fixing the errors.
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
            In this homework I learned what it takes to send data to a database and the SQL involved.
            The parts that I found easy were using the insert code to then create the form for my other table.
            The parts that I found hard or confusing were making sure everything worked and was inputted correctly.
            </p>
            <ul>
            <li>
            To see how insert user works, click on the plus sign at the top of the
            user listing page - OR - click on the "register" item under the account icon.
            </li>
            <li>
            To see how insert inventory item works, click on the plus sign at the top of the
            inventory listing page.
            </li>
            </ul>
<!--
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
            </ul> -->
            `;
        document.getElementById(id).innerHTML = content;
}