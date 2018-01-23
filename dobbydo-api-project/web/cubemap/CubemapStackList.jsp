<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*" %>
<%--@page contentType="text/html; charset=UTF-8"--%>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.parser.ParseException"%>
<%
    //String stack_id = (String)request.getParameter("stack_id");
    String sql  = "SELECT * FROM dobbydo.stack";
 
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
            obj.put("stack_id", rs.getString("stack_id"));
            obj.put("stack_nm", rs.getString("stack_nm"));
            obj.put("keep_booksf_cnt", rs.getString("keep_booksf_cnt"));
            obj.put("stack_remk", rs.getString("stack_remk"));

			list.add(obj);
        }

        conn.close();
        out.print(list);
    }
    catch(Exception ex)
    {
        out.println("<h1>dsaaaa"+ex+"</g1>");
    }
%>