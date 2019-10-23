package model.clothingInventory;

import model.clothingInventory.*;
import dbUtils.DbConn;
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

} // class
