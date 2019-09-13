package model.dataTable;

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
 * free access to put data in or take it out. */
public class StringData {

    public String userId = "";
    public String userName = "";
    public String imgUrl = "";
    public String description = "";
    public String birthday = "";
    public String userSize = "";   // Foreign Key
    public String webUserId = ""; // getting it from joined user_role table.

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.userId = FormatUtils.formatInteger(results.getObject("user_id"));
            this.userName = FormatUtils.formatString(results.getObject("user_name"));
            this.imgUrl = FormatUtils.formatString(results.getObject("img_url"));
            this.description = FormatUtils.formatString(results.getObject("description"));
            this.birthday = FormatUtils.formatDate(results.getObject("birthday"));
            this.userSize = FormatUtils.formatString(results.getObject("user_size"));
            this.webUserId = FormatUtils.formatInteger(results.getObject("web_user_id"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.webUser.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s =  this.webUserId+ this.userName + this.imgUrl + this.description
                + this.birthday + this.userSize + this.userId;
        return s.length();
    }

    public String toString() {
        return "Web User Id:" + this.webUserId
                + ", User Id: " + this.userId
                + ", Username: " + this.userName
                + ", Birthday: " + this.birthday
                + ", Image URL: " + this.imgUrl
                + ", User Description: " + this.description
                + ", User Size: " + this.userSize;
    }
}
