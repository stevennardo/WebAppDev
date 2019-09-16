package model.clothingInventory;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. 

item_I’d int
item_category string
img_url string
description string
color\ string
discount decimal
web_user_I’d int
*/
public class StringData {

    public String itemId = "";
    public String itemCategory = "";
    public String imgUrl = "";
    public String description = "";
    public String color = "";
    public String discount = "";   // Foreign Key
    public String webUserId = ""; // getting it from joined user_role table.

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.itemId = FormatUtils.formatInteger(results.getObject("item_id"));
            this.itemCategory = FormatUtils.formatString(results.getObject("item_category"));
            this.imgUrl = FormatUtils.formatString(results.getObject("img_url"));
            this.description = FormatUtils.formatString(results.getObject("description"));
            this.color = FormatUtils.formatString(results.getObject("color"));
            this.discount = FormatUtils.formatDollar(results.getObject("discount"));
            this.webUserId = FormatUtils.formatInteger(results.getObject("web_user_id"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.clothingInventory.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s =  this.webUserId+ this.itemId + this.imgUrl + this.description
                + this.color + this.discount + this.itemCategory;
        return s.length();
    }

    public String toString() {
        return "Web User Id:" + this.webUserId
                + ", User Id: " + this.itemId
                + ", Username: " + this.imgUrl
                + ", Birthday: " + this.description
                + ", Image URL: " + this.color
                + ", User Description: " + this.discount
                + ", User Size: " + this.itemCategory;
    }
}
