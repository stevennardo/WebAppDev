<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.clothingInventory.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    // This is the object we get from the GSON library.
    // This object knows how to convert betweeb these two formats: 
    //    POJO (plain old java object) 
    //    JSON (JavaScript Object notation)
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    StringData errorMsgs = new StringData();

    String jsonInsertData = request.getParameter("jsonData");

    if (jsonInsertData == null) {
        errorMsgs.errorMsg = "Cannot insert -- no data was received";
        System.out.println(errorMsgs.errorMsg);
    } else { // URL parameter data was received
        System.out.println("insertData received and is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
            System.out.println("DB connection OK to proceed");

            // Must use gson to convert JSON (that the user provided as part of the url, the insertData. 
            // Convert from JSON (JS object notation) to POJO (plain old java object).
            StringData insertData = gson.fromJson(jsonInsertData, StringData.class);

            /* Useful to copy field names from StringData as a reference
    
      "itemId": "39",
      "itemCategory": "extra2",
      "imgUrl": "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/409323/item/goods_15_409323.jpg",
      "description": "extra2",
      "color": "",
      "discount": "$10.00",
      "webUserId": "19",
      "errorMsg": ""
    }
            
            
 ?jsonData={ "itemCategory": "urltampering", "imgUrl": "pic", "description": "urltampering", "color": "green", "discount": "", "webUserId": "1", "errorMsg": ""}
}
             */
            // Validation - field by field, check what's in insertData and put error message (if any) 
            // into corresponding field of errorMsgs.
            errorMsgs.itemCategory = ValidationUtils.stringValidationMsg(insertData.itemCategory, 45, true);
            errorMsgs.imgUrl = ValidationUtils.stringValidationMsg(insertData.imgUrl, 150, true);
            errorMsgs.description = ValidationUtils.stringValidationMsg(insertData.description, 150, true);
            errorMsgs.color = ValidationUtils.stringValidationMsg(insertData.color, 20, false);
            errorMsgs.discount = ValidationUtils.decimalValidationMsg(insertData.discount, false);
            errorMsgs.webUserId = ValidationUtils.integerValidationMsg(insertData.webUserId, true);

            if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
                errorMsgs.errorMsg = "Please try again";

            } else { // all fields passed validation

                /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
                 */
                // Start preparing SQL statement
                String sql = "INSERT INTO clothing_inventory (item_category, img_url, description, color, discount, web_user_id) "
                        + "values (?,?,?,?,?,?)";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encode string values into the prepared statement (wrapper class).
                pStatement.setString(1, insertData.itemCategory); // string type is simple
                pStatement.setString(2, insertData.imgUrl);
                pStatement.setString(3, insertData.description);
                pStatement.setString(4, insertData.color);
                pStatement.setBigDecimal(5, ValidationUtils.decimalConversion(insertData.discount));
                pStatement.setInt(6, ValidationUtils.integerConversion(insertData.webUserId));

                // here the SQL statement is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                errorMsgs.errorMsg = pStatement.getErrorMsg();
                if (errorMsgs.errorMsg.length() == 0) {
                    if (numRows == 1) {
                        errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                } else if (errorMsgs.errorMsg.contains("foreign key")) {
                    errorMsgs.errorMsg = "Invalid Web User Id";
                } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                    errorMsgs.errorMsg = "That web user ID is already taken";
                }

            } // all fields passed validation

        } // db connection OK
    } // URL parameter data was received.

    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();
%>

