package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.dataTable.*;

// classes in my project
import dbUtils.*;

public class dataTableView {

    public static StringDataList allUsersAPI(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id, user_name, img_url, description, birthday, user_size, user_id FROM data_table ORDER BY web_user_id";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in dataTableView.allUsersAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

}
