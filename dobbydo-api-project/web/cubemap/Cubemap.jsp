<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*" %>
<%--@page contentType="text/html; charset=UTF-8"--%>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.parser.ParseException"%>
<%
    String stack_id = (String)request.getParameter("stack_id");
	if(stack_id != null || !stack_id.equals("")|| !stack_id.equals("0")){
		String sql  = "SELECT * FROM dobbydo.cube_map WHERE stack_id='"+stack_id+"'";
	
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
	            obj.put("cube_idx", rs.getString("cube_idx"));
	            obj.put("stack_id", rs.getString("stack_id"));
	            obj.put("pos_x", rs.getString("pos_x"));
	            obj.put("pos_y", rs.getString("pos_y"));
	            obj.put("pos_z", rs.getString("pos_z"));
	            obj.put("object_id", rs.getString("object_id"));
	            obj.put("cube_type", rs.getString("cube_type"));
	            obj.put("linked_id", rs.getString("linked_id"));
	            obj.put("cube_size", rs.getString("cube_size"));
	            obj.put("cube_axis", rs.getString("cube_axis"));
	 
	            list.add(obj);
	        }
	 
	        out.print(list);
	    }
	    catch(Exception ex)
	    {
	        out.println("<h1>"+ex+"</g1>");
	    }
	} else{
	}
%>