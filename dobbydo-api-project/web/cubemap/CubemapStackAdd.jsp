<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*" %>
<%--@page contentType="text/html; charset=UTF-8"--%>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.parser.ParseException"%>
<%

	String stack_nm = (String)request.getParameter("stack_nm");
	String stack_remk = (String)request.getParameter("stack_remk");
    String sql  = "";
    
    try
    {
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn=null;
        conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/dobbydo","root","1234");
        ResultSet rs=null;
        Statement stm1=conn.createStatement();
        Statement stm2=conn.createStatement();
        
        sql = "SELECT MAX(stack_id)+1 AS stack_id FROM dobbydo.stack";
        rs=stm1.executeQuery(sql);
        
        JSONObject obj=new JSONObject();
        while(rs.next()){
	        String max_id = rs.getString("stack_id");
	        
	        sql = "INSERT INTO dobbydo.stack (stack_id, stack_nm, keep_booksf_cnt, stack_remk) VALUES ("+max_id+", '"+stack_nm+"', 0, '"+stack_remk+"')";
	        stm2.executeUpdate(sql);
	        obj.put("stack_id", rs.getString("stack_id"));
	        //System.out.println(max_id+" "+stack_nm+" "+stack_remk);
        }
        out.print(obj);
        
    }
    catch(Exception ex)
    {
    	System.out.println(ex.toString());
        out.println("<h1>aaa"+ex+"</g1>");
    }
%>