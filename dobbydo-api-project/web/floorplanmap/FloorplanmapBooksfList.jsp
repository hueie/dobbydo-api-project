<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*" %>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.parser.ParseException"%>
<%
    String stack_id = (String)request.getParameter("stack_id");
    String sql  = "SELECT object_id, linked_id, min(pos_x) min_pos_x, max(pos_x) max_pos_x, min(pos_z) min_pos_z, max(pos_z) max_pos_z FROM dobbydo.cube_map where cube_type = 7 and pos_y = 0 and cube_axis != 4 group by object_id and stack_id='"+stack_id+"'";
 
    try
    {
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn=null;
        conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/dobbydo","root","1234");
        ResultSet rs=null;
        Statement stm1=conn.createStatement();
 
        JSONArray list = new JSONArray();
        rs=stm1.executeQuery(sql);
        while(rs.next())
        {
            JSONObject obj=new JSONObject();
            obj.put("object_id", rs.getString("object_id"));
            obj.put("linked_id", rs.getString("linked_id"));
            obj.put("min_pos_x", rs.getString("min_pos_x"));
            obj.put("max_pos_x", rs.getString("max_pos_x"));
            obj.put("min_pos_z", rs.getString("min_pos_z"));
            obj.put("max_pos_z", rs.getString("max_pos_z"));
 			
            list.add(obj);
        }

        conn.close();
        out.print(list);
    }
    catch(Exception ex)
    {
        out.println("<h1>"+ex+"</g1>");
    }
%>