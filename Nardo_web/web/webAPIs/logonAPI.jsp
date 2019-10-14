<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    StringData list = new StringData();

    String searchEmail = request.getParameter("email");
    String searchPass = request.getParameter("pass");
    if (searchEmail == null) {
        list.errorMsg = "Cannot search for user - 'email' most be supplied";
    } 
    else if (searchPass == null) {
        list.errorMsg = "Cannot search for user - 'pass' most be supplied";
    }
    else {

        DbConn dbc = new DbConn();
        list.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (list.errorMsg.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call allUsersAPI");
            list = DbMods.logonFind(searchEmail, searchPass, dbc);  
            if(list == null)
            {
                System.out.println("User not found");
            }
            else
            {
                session.setAttribute("webUser", list);
            }
        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>