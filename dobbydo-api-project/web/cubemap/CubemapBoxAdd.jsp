<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*" %>
<%--@page contentType="text/html; charset=UTF-8"--%>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.parser.ParseException"%>
<%

	String box_nm = (String)request.getParameter("box_nm");
	String box_remk = (String)request.getParameter("box_remk");
    String sql  = "";
    
    try
    {
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn=null;
        conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/dobbydo","root","1234");
        ResultSet rs=null;
        Statement stm1=conn.createStatement();
        Statement stm2=conn.createStatement();
        
        sql = "SELECT MAX(box_id)+1 AS box_id FROM dobbydo.box";
        rs=stm1.executeQuery(sql);
        String max_id = "";
        while(rs.next()){
	        max_id = rs.getString("box_id");
	    }
        sql = "INSERT INTO dobbydo.box (box_id, box_nm, box_remk) VALUES "
        		+"("+max_id+", '"+box_nm+"', '"+box_remk+"')";
        
        System.out.println(sql);
        stm2.executeUpdate(sql);
    
        JSONObject obj=new JSONObject();
        //obj.put("stack_id", rs.getString("stack_id"));
		out.print(obj);
        
    }
    catch(Exception ex)
    {
        out.println("<h1>aaa"+ex+"</g1>");
    }
%>