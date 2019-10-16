<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // must use same name for getAttribute as you used for setAttribute in the logon API
    // must type class the object that is extracted.
    StringData loggedOnWebUser = (StringData) session.getAttribute("webUser");
    StringDataList list = new StringDataList();
    Gson gson = new Gson();

    if (loggedOnWebUser != null) {
        list.add(loggedOnWebUser);
        out.print(gson.toJson(list).trim());
    } else {
        list.dbError = "No user is logged on"; //Add something to the list error msg so we can check it in profile.js 
        out.print(gson.toJson(list).trim());
    }
    //I just got rid of the above code so this ajax call returns nothing if there is no session
%>