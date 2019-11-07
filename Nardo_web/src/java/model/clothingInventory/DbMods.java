package model.clothingInventory;

import model.clothingInventory.*;
import dbUtils.DbConn;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringDataList findById(DbConn dbc, String id) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT clothing_inventory.web_user_id, img_url, description, color, item_category, discount, item_id FROM web_user, clothing_inventory WHERE web_user.web_user_id = clothing_inventory.web_user_id ORDER BY web_user_id;";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in clothinginv.getUserById(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;

    } // getUserById

    // method delete returns "" (empty string) if the delete worked fine. Otherwise, 
    // it returns an error message.
    public static String delete(String itemId, DbConn dbc) {

        if (itemId == null) {
            return "Error in model.clothingInventory.DbMods.delete: cannot delete inventory record because 'itemId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM clothing_inventory WHERE item_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, itemId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with item_id " + itemId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.clothingInventory.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }
    
    public static StringDataList findByIdUpdate(DbConn dbc, String id) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id, item_id, img_url, description, color, item_category, discount FROM clothing_inventory WHERE web_user_id = ?;";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in clothinginv.getInvFromId(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;

    } // getUserByIdUpdate
    
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
    "itemId": "47",
      "itemCategory": "top",
      "imgUrl": "https://www.nbcstore.com/media/catalog/product/d/o/download-2_4_5_1.jpg",
      "description": "greytop",
      "color": "grey",
      "discount": "",
      "webUserId": "34",
      "errorMsg": ""
         */
        // Validation
        errorMsgs.itemId = ValidationUtils.integerValidationMsg(inputData.itemId, true);
        errorMsgs.itemCategory = ValidationUtils.stringValidationMsg(inputData.itemCategory, 45, true);
        errorMsgs.imgUrl = ValidationUtils.stringValidationMsg(inputData.imgUrl, 150, true);
        errorMsgs.description = ValidationUtils.stringValidationMsg(inputData.description, 150, true);
        errorMsgs.color = ValidationUtils.stringValidationMsg(inputData.color, 20, false);
        errorMsgs.discount = ValidationUtils.decimalValidationMsg(inputData.discount, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate 
    
    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                "itemId": "47",
      "itemCategory": "top",
      "imgUrl": "https://www.nbcstore.com/media/catalog/product/d/o/download-2_4_5_1.jpg",
      "description": "greytop",
      "color": "grey",
      "discount": "",
      "webUserId": "34",
             */
            String sql = "UPDATE clothing_inventory SET item_id=?, item_category=?, img_url=?, description=?, "
                    + "color=?, discount=? WHERE web_user_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setInt(1, ValidationUtils.integerConversion(inputData.itemId)); // string type is simple
            pStatement.setString(2, inputData.itemCategory);
            pStatement.setString(3, inputData.imgUrl); //ValidationUtils.decimalConversion(inputData.membershipFee)
            pStatement.setString(4, inputData.description);
            pStatement.setString(5, inputData.color);
            pStatement.setBigDecimal(6, ValidationUtils.decimalConversion(inputData.discount));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

} // class
