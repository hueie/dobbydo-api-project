<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%--@page import="com.dobbydo.cubemap.entity.Cubemap"--%>
<%
	String stack_id = (String) request.getParameter("stack_id");
	String cube_list = (String) request.getParameter("cube_list");
	String sql = "";

	try {
		Class.forName("com.mysql.jdbc.Driver");
		Connection conn = null;
		conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/dobbydo", "root", "1234");
		ResultSet rs = null;
		Statement stm1 = conn.createStatement();
		Statement stm2 = conn.createStatement();

		//Clear Stack
		sql = "DELETE FROM dobbydo.cube_map WHERE stack_id = " + stack_id + "";
		System.out.println(sql);
		stm1.executeUpdate(sql);

		//Create Monuments
		JSONObject obj = new JSONObject(cube_list);
		JSONArray items = obj.getJSONArray("cube_list");

		for (int i = 0; i < items.length(); i++) {
			JSONObject item = items.getJSONObject(i);
			int cube_idx = item.getInt("cube_idx");
			int pos_x = item.getInt("pos_x");
			int pos_y = item.getInt("pos_y");
			int pos_z = item.getInt("pos_z");
			int object_id = item.getInt("object_id");
			int cube_type = item.getInt("cube_type");
			int linked_id = item.getInt("linked_id");
			int cube_size = item.getInt("cube_size");
			int cube_axis = item.getInt("cube_axis");

			/*
			Cubemap cubemap = new Cubemap();
			cubemap.setCube_idx(cube_idx);
			cubemap.setStack_id(new Integer(stack_id));
			cubemap.setPos_x(pos_x);
			cubemap.setPos_y(pos_y);
			cubemap.setPos_z(pos_z);
			cubemap.setObject_id(object_id);
			cubemap.setCube_type(cube_type);
			cubemap.setLinked_id(linked_id);
			cubemap.setCube_size(cube_size);
			cubemap.setCube_axis(cube_axis);
			*/
			
			sql = "INSERT INTO dobbydo.cube_map (cube_idx, stack_id, pos_x, pos_y, pos_z, object_id, cube_type, linked_id, cube_size, cube_axis) VALUES "
					+"("+cube_idx+", "+stack_id+", "+pos_x+", "+pos_y+", "+pos_z+", "+object_id+", "+cube_type+", "+linked_id+", "+cube_size+", "+cube_axis+")";
			System.out.println(sql);
			stm2.executeUpdate(sql);
			
		}

		JSONObject obj2 = new JSONObject();
		//obj.put("stack_id", rs.getString("stack_id"));
		out.print(obj2);

	} catch (Exception ex) {
		out.println("<h1>aaa" + ex + "</g1>");
	}
%>