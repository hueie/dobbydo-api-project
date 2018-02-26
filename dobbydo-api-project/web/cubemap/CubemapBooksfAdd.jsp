<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*" %>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.parser.ParseException"%>
<%

	String stack_id = (String)request.getParameter("stack_id");
	String booksf_nm = (String)request.getParameter("booksf_nm");
	String booksf_remk = (String)request.getParameter("booksf_remk");
	String booksf_y = (String)request.getParameter("booksf_y");
	String booksf_x = (String)request.getParameter("booksf_x");
	String booksf_z = (String)request.getParameter("booksf_z");
	String booksf_flw = (String)request.getParameter("booksf_flw");
    String sql  = "";
    
    try
    {
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn=null;
        conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/dobbydo","root","1234");
        ResultSet rs=null;
        Statement stm1=conn.createStatement();
        Statement stm2=conn.createStatement();
        
        sql = "SELECT MAX(booksf_id)+1 AS booksf_id FROM dobbydo.booksf WHERE stack_id = "+stack_id;
        rs=stm1.executeQuery(sql);
        String max_id = "";
        while(rs.next()){
	        max_id = rs.getString("booksf_id");
	    }
        sql = "INSERT INTO dobbydo.booksf (stack_id, booksf_id, booksf_nm, booksf_remk, booksf_y, booksf_x, booksf_z, booksf_flw) VALUES "
        		+"("+stack_id+", "+max_id+", '"+booksf_nm+"', '"+booksf_remk+"', "+booksf_y+", "+booksf_x+", "+booksf_z+", "+booksf_flw+")";
        
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