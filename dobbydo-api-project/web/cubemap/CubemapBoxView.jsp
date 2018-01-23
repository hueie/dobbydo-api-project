<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*" %>
<%--@page contentType="text/html; charset=UTF-8"--%>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.parser.ParseException"%>
<%
    String box_id = (String)request.getParameter("box_id");
    String sql  = "SELECT * FROM dobbydo.box WHERE box_id='"+box_id+"'";
 
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
            obj.put("box_id", rs.getString("box_id"));
            obj.put("box_nm", rs.getString("box_nm"));
            obj.put("box_remk", rs.getString("box_remk"));
 			//System.out.println("1"+rs.getString("BOX_NM"));
 			out.print(obj);
            //list.add(obj);
        }
 
        //out.print(list);
    }
    catch(Exception ex)
    {
        out.println("<h1>"+ex+"</g1>");
    }
%>