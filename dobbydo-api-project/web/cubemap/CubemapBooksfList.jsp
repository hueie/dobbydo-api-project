<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*" %>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.parser.ParseException"%>
<%
    String stack_id = (String)request.getParameter("stack_id");
    String sql  = "SELECT * FROM dobbydo.booksf WHERE stack_id='"+stack_id+"'";
 
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
            obj.put("booksf_id", rs.getString("booksf_id"));
            obj.put("stack_id", rs.getString("stack_id"));
            obj.put("booksf_nm", rs.getString("booksf_nm"));
            obj.put("booksf_remk", rs.getString("booksf_remk"));
            obj.put("booksf_row_cnt", rs.getString("booksf_row_cnt"));
            obj.put("booksf_y", rs.getString("booksf_y"));
            obj.put("booksf_x", rs.getString("booksf_x"));
            obj.put("booksf_z", rs.getString("booksf_z"));
            obj.put("booksf_flw", rs.getString("booksf_flw"));
 			
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