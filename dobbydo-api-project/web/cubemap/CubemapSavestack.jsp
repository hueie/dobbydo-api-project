<%@page language="java" import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page language="java" import="com.dobbydo.cubemap.entity.Cubemap"%>
<%
	String stack_id = (String) request.getParameter("stack_id");
	String cube_list = (String) request.getParameter("cube_list");
	String sql = "";

	try {
		Class.forName("com.mysql.jdbc.Driver");
		Connection conn = null;
		conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/dobbydo", "root", "1234");
		ResultSet rs = null;
		ResultSet rs2 = null;
		Statement stm1 = conn.createStatement();
		Statement stm2 = conn.createStatement();
		Statement stm3 = conn.createStatement();
		Statement stm4 = conn.createStatement();

		//Clear Bookarng
		sql = "DELETE FROM dobbydo.bookarng WHERE stack_id = " + stack_id + "";
		System.out.println(sql);
		stm1.executeUpdate(sql);
		
		sql = "SELECT * FROM dobbydo.cube_map where stack_id = "+stack_id+" and cube_type = 7 order by object_id, cube_axis, pos_y";
		System.out.println(sql);
		rs=stm2.executeQuery(sql);
		List<Cubemap> list = new ArrayList<Cubemap>();
        while(rs.next())
        {
        	Cubemap cb=new Cubemap();
            cb.setCube_idx(rs.getInt("cube_idx"));
            cb.setStack_id(rs.getInt("stack_id"));
            cb.setPos_x(rs.getInt("pos_x"));
            cb.setPos_y(rs.getInt("pos_y"));
            cb.setPos_z(rs.getInt("pos_z"));
            cb.setObject_id(rs.getInt("object_id"));
            cb.setCube_type(rs.getInt("cube_type"));
            cb.setLinked_id(rs.getInt("linked_id"));
            cb.setCube_size(rs.getInt("cube_size"));
            cb.setCube_axis(rs.getInt("cube_axis"));
            
			list.add(cb);
        }
         
		int obejctId=0, booksfId=0;
		int posY, posX, posZ;

		int flw_idx=0, preFlwPosY=0;
		int minPosY=9999, maxPosY=-9999, minPosX=9999, maxPosX=-9999, minPosZ=9999, maxPosZ=-9999; 
		Cubemap preCube = new Cubemap();
		preCube.setObject_id(-1);
		for (Cubemap cube : list) {
			if(cube.getObject_id() != preCube.getObject_id()) {
				//Init Process
				flw_idx=0;
				minPosY=9999; maxPosY=-9999; minPosX=9999; maxPosX=-9999; minPosZ=9999; maxPosZ=-9999; 
				obejctId = cube.getObject_id();
				booksfId = cube.getLinked_id();
				//System.out.println("obejctId : "+obejctId+" booksfId : "+booksfId);
			}
			if(cube.getCube_axis() == 1) {
				posY = cube.getPos_y();
				if(posY > maxPosY){
					maxPosY = posY;
				}
				if(posY < minPosY) {
					minPosY = posY;
				}
			} else if(cube.getCube_axis() == 2) {
				posZ = cube.getPos_z();
				if(posZ > maxPosZ){
					maxPosZ = posZ;
				}
				if(posZ < minPosZ){
					minPosZ = posZ;
				}
			} else if(cube.getCube_axis() == 3) {
				posX = cube.getPos_x();
				if(posX > maxPosX){
					maxPosX = posX;
				}
				if(posX < minPosX){
					minPosX = posX;
				}
			} else if(cube.getCube_axis() == 4) {
				if(flw_idx != 0) {
					sql = "SELECT * FROM dobbydo.cube_map where stack_id = "+stack_id+" and cube_type = 1"+ 
							" AND pos_y between "+preFlwPosY+" and "+cube.getPos_y()+
							" AND pos_x between "+minPosX+" and "+maxPosX+
							" AND pos_z between "+minPosZ+" and "+maxPosZ;
					System.out.println(sql);
					
					rs2=stm3.executeQuery(sql);
					List<Cubemap> list2 = new ArrayList<Cubemap>();
			        while(rs2.next())
			        {
			        	Cubemap cb=new Cubemap();
			            cb.setCube_idx(rs2.getInt("cube_idx"));
			            cb.setStack_id(rs2.getInt("stack_id"));
			            cb.setPos_x(rs2.getInt("pos_x"));
			            cb.setPos_y(rs2.getInt("pos_y"));
			            cb.setPos_z(rs2.getInt("pos_z"));
			            cb.setObject_id(rs2.getInt("object_id"));
			            cb.setCube_type(rs2.getInt("cube_type"));
			            cb.setLinked_id(rs2.getInt("linked_id"));
			            cb.setCube_size(rs2.getInt("cube_size"));
			            cb.setCube_axis(rs2.getInt("cube_axis"));
			            
						list.add(cb);
			        }
					
					int boxId = 0, arngId = 0, box_pos_y = 0;
					for (Cubemap cube2 : list2) {
						boxId = cube2.getLinked_id();
						box_pos_y = cube2.getPos_y();
						
						sql = "INSERT INTO dobbydo.bookarng (boxId, stack_id, booksf_id, booksf_f_no, booksf_r_no, booksf_r_sno, arng_cd) VALUES "
								+"("+boxId+", "+stack_id+", "+booksfId+", "+flw_idx+", 0, 0, 1 )";
						System.out.println(sql);
						stm4.executeUpdate(sql);
					}
				}
				flw_idx++;
			} 
			preFlwPosY = cube.getPos_y();
			preCube = cube;
		}
		
		JSONObject obj2 = new JSONObject();
		out.print(obj2);

	} catch (Exception ex) {
		out.println("<h1>aaa" + ex + "</g1>");
	}
%>