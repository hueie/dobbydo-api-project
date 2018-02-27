var rollOverBooksfXMesh = [];
var rollOverBooksfYMesh = [];
var rollOverBooksfZMesh = [];
var rollOverBooksfFlwMesh = [];
var GLOBAL_ID;
var grabbing_objects = [];

function DOBBYDO_CUBEMAP(pGLOBAL_ID) {
	GLOBAL_ID = pGLOBAL_ID;
	this.type = "edit"; //edit, view
	this.option1 = "square";
	
	this.object_id = 0; // In Graph
	this.static_linked_id = 0;

	this.container;
	this.camera, this.scene, this.renderer;
	this.plane, this.cube, this.line;
	this.mouse, this.raycaster, this.isShiftDown = false, this.isCtrlDown = false, this.isAltDown = false;

	this.rollOverGeo, this.rollOverMesh, this.rollOverMaterial;
	this.rollOverBooksfXGeo, this.rollOverBooksfXMaterial; 
	this.rollOverBooksfYGeo, this.rollOverBooksfYMaterial; 
	this.rollOverBooksfZGeo, this.rollOverBooksfZMaterial; 
	this.rollOverBooksfFlwGeo, this.rollOverBooksfFlwMateria; 

	this.cubeGeo, this.cubeMaterial, this.cctvMaterial;
	this.realBooksfXGeo, this.realBooksfXMaterial;
	this.realBooksfYGeo, this.realBooksfYMaterial;
	this.realBooksfZGeo, this.realBooksfZMaterial;
	this.realBooksfFlwGeo, this.realBooksfFlwMaterial;

	this.objects = [];

	this.pen_type = 999; // 999:magnifier//0:eraser//1:white box//2:red box//3,4,5:y,z,x-axis
						// green pen//6:rack//990:hand , 991:hand-grab
	this.cubes = [];

	this.booksf_flw = 1; 
	this.booksf_y = 1; 
	this.booksf_z = 1; 
	this.booksf_x = 1; 
	
	//DOBBYDO_CUBEMAP.run(); if auto run
}

DOBBYDO_CUBEMAP.run = function () {
	var init_html = "<input type=\"hidden\" id=\"stack_id\" value=\"0\"><!-- 서고 ID  --><input type=\"hidden\" id=\"linked_id\" value=\"0\"><!-- 연결 ID  --><input type=\"hidden\" id=\"booksf_id\" value=\"0\"/><!-- 서가 ID --><div id=\"cubemapview\" oncontextmenu=\"return false;\">	<div style=\"width: 60%; position: absolute\">		<div id=\"info\" >			<span id=\"stackInfo\" style=\"font-weight:bold;\">				오른쪽 서고 아이콘을 이용하여 서고를 선택해주세요.			</span>			<span style=\"float:right;margin:10px;\">				<div class=\"stack-event dbd-cubemap-top-menu-stack\" ></div>				<div id=\"menu_icons\" style=\"display:inline-block;\">					<div class=\"shelf-event dbd-cubemap-top-menu-shelf\" ></div>					<div class=\"box-event dbd-cubemap-top-menu-box\" ></div>					<div class=\"magnifier-event dbd-cubemap-top-menu-magnifier\" ></div>					<div class=\"eraser-event dbd-cubemap-top-menu-eraser\" ></div>					<div class=\"hand-event dbd-cubemap-top-menu-hand\" ></div>					<div class=\"loader-truck-event dbd-cubemap-top-menu-loader-truck\" ></div>					<div class=\"redo-event dbd-cubemap-top-menu-redo\" ></div>					<div class=\" dbd-cubemap-top-menu-saving-location\" onclick=\"DOBBYDO_CUBEMAP.savemap(); event.stopPropagation();\" ></div>					<div class=\" dbd-cubemap-top-menu-saving-documents\" onclick=\"DOBBYDO_CUBEMAP.savestack(); event.stopPropagation();\" ></div> <div class=\" dbd-cubemap-top-menu-saving-documents\" onclick=\"DOBBYDO_CUBEMAP.transferto2D(); event.stopPropagation();\" ></div>					<!-- <div class=\"camera-event dbd-cubemap-top-menu-camera\" ></div> -->									</div>				<div style=\"float:right;\">					<table>						 						<tr>						<td></td>							<td>								<div class=\"up-arrow-event dbd-cubemap-top-menu-up-arrow\" ></div>							</td>						<td></td>						</tr>						<tr>							<td>								<div class=\"left-arrow-event dbd-cubemap-top-menu-left-arrow\" ></div>							</td>							<td>								<div class=\"down-arrow-event dbd-cubemap-top-menu-down-arrow\" ></div>							</td>							<td>								<div class=\"right-arrow-event dbd-cubemap-top-menu-right-arrow\" ></div>							</td>						</tr>											</table>				</div>			</span>			<hr>	 <!-- Not Use For Basic Cubemap API		<div id=\"canvas_contents\" style=\"display:block;\">				 <img id=\"canvas_img\"></img>				<div class=\"round-plus-button-event dbd-cubemap-round-plus-button\" ></div>				<div class=\"round-minus-button-event dbd-cubemap-round-minus-button\" ></div>				<div class=\"round-delete-button-event dbd-cubemap-round-delete-button\" ></div>				<div id=\"line_list\" style=\"background-color:white\"></div>			</div> -->		</div>	</div>	<div>		<div style=\"position:absolute;z-index:90;display:none;height:100%;width:60%;\" id=\"rightClickContainer\" onclick=\"DOBBYDO_CUBEMAP.disappearRightClickContainer();\">			<table id=\"rightClickMenuTable\" style=\"position:absolute;z-index:91;\">				<tr>					<td>						<div class=\"box-event dbd-cubemap-top-menu-box\" ></div>					</td>					<td>						<div class=\"shelf-event dbd-cubemap-top-menu-shelf\" ></div>					</td>					<td>					</td>				</tr>				<tr>					<td>						<div class=\"loader-truck-event dbd-cubemap-top-menu-loader-truck\" ></div>					</td>					<td>					</td>					<td>						<div class=\"magnifier-event dbd-cubemap-top-menu-magnifier\" ></div>					</td>				</tr>				<tr>					<td>						<div class=\"hand-event dbd-cubemap-top-menu-hand\" ></div>					</td>					<td>					</td>					<td>						<div class=\"eraser-event dbd-cubemap-top-menu-eraser\" ></div>					</td>				</tr>			</table>			<div id=\"view\" style=\"position:absolute;background-color:#feffce;left:50%;top:50%;border-radius: 10px;padding:10px;\" onclick=\";event.stopPropagation();\"></div>			<div id=\"addandlist\" style=\"position:absolute;background-color:#feffce;left:50%;top:50%;border-radius: 10px;padding:10px;\" onclick=\";event.stopPropagation();\">				<div id=\"stack_add_form\" style=\"display: none\">					<span  style=\"height:50px; line-height:50px; text-align:center;\">						새 서고 이름 : <input style=\"height:24px;\" type=\"text\" id=\"stack_nm\" onclick=\";event.stopPropagation();\"> 						비고 : <input style=\"height:24px;\" type=\"text\" id=\"stack_remk\" onclick=\";event.stopPropagation();\">					</span> 					<div class=\"dbd-cubemap-check-green\" onclick=\"DOBBYDO_CUBEMAP.addStack(); event.stopPropagation();\"></div>				</div>				<div id=\"booksf_add_form\" style=\"display: none\">					<span style=\"height:50px; line-height:50px; text-align:center;\">						새 서가 이름 : <input type=\"text\" style=\"height:24px;\" id=\"booksf_nm\" onclick=\";event.stopPropagation();\"> <!-- 단계수 : <input type=\"text\" id=\"booksf_f_cnt\"><br> -->						비고 : <input type=\"text\" style=\"height:24px;\" id=\"booksf_remk\" onclick=\";event.stopPropagation();\">					</span>					<div class=\" dbd-cubemap-check-green\" onclick=\"DOBBYDO_CUBEMAP.addBooksf();event.stopPropagation();\"></div>					<br>					<div style=\"display: inline\">						x : <input type=\"text\" id=\"booksf_x\" style=\"width: 20px\" value=\"1\"></input>						<button onclick=\"DOBBYDO_CUBEMAP.upNdown('booksf_x','1');event.stopPropagation();\">+</button>						<button onclick=\"DOBBYDO_CUBEMAP.upNdown('booksf_x','-1');event.stopPropagation();\">-</button>					</div>					<div style=\"display: inline\">						z : <input type=\"text\" id=\"booksf_z\" style=\"width: 20px\" value=\"1\"></input>						<button onclick=\"DOBBYDO_CUBEMAP.upNdown('booksf_z','1');event.stopPropagation();\">+</button>						<button onclick=\"DOBBYDO_CUBEMAP.upNdown('booksf_z','-1');event.stopPropagation();\">-</button>					</div>					<div style=\"display: inline\">						y : <input type=\"text\" id=\"booksf_y\" style=\"width: 20px\"							value=\"1\"></input>						<button onclick=\"upNdown('booksf_y','1');event.stopPropagation();\">+</button>						<button onclick=\"DOBBYDO_CUBEMAP.upNdown('booksf_y','-1');event.stopPropagation();\">-</button>					</div>					<div style=\"display: inline\">						단계수 : <input type=\"text\" id=\"booksf_flw\" style=\"width: 20px\"							value=\"1\"></input>						<button onclick=\"DOBBYDO_CUBEMAP.upNdown('booksf_flw','1');event.stopPropagation();\">+</button>						<button onclick=\"DOBBYDO_CUBEMAP.upNdown('booksf_flw','-1');event.stopPropagation();\">-</button>					</div>				</div>					<div id=\"box_add_form\" style=\"display: none\">					<span style=\"height:50px; line-height:50px; text-align:center;\">						새 상자 이름: <input type=\"text\" style=\"height:24px;\" id=\"box_nm\" onclick=\";event.stopPropagation();\"> 						비고 : <input type=\"text\" style=\"height:24px;\" id=\"box_remk\" onclick=\";event.stopPropagation();\">					</span>					<div class=\" dbd-cubemap-check-green\" onclick=\"DOBBYDO_CUBEMAP.addBox(); event.stopPropagation();\"></div>				</div>				<hr>				<div id=\"list\"></div>			</div>		</div>				<div style=\"width: 60%; display: inline;\" id=\"container\"></div>			</div></div>";
	$('#'+GLOBAL_ID).html(init_html) ;
    //$('#'+GLOBAL_ID).load('/dobbydo-cubemap-1.0.1/html/dbd-cubemap.html') ;
	DOBBYDO_CUBEMAP.setStackId(0);
	DOBBYDO_CUBEMAP.getStackList();
}

DOBBYDO_CUBEMAP.getInfo = function () {
    return GLOBAL_ID + ' : ' + this.type + ' ' +this.option1 ;
}

DOBBYDO_CUBEMAP.setStackId = function (stack_id){
	if(stack_id == -1){
		// 되돌리기
		stack_id = $("#stack_id").val();
	}else{
		$("#stack_id").val(stack_id);
	}
	
	$.ajax({
        type: "get",
        url: "/cubemap/Cubemap.jsp",
        data: {"stack_id" : stack_id},
        success: function(data){
        	DOBBYDO_CUBEMAP.initpushdata(data);
        	DOBBYDO_CUBEMAP.init();
        	DOBBYDO_CUBEMAP.render();
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
        } 
    });
}

DOBBYDO_CUBEMAP.savemap = function (){
    var str = "";
	var cube_list = [];
	// cube_axis : none:0 y:1 z:2 x:3
	var cube_idx, pos_x, pos_y, pos_z, object_id, cube_type, linked_id, cube_size, cube_axis;
    for (var idx in this.objects) {
		if(idx != 0){
			str += '\n'+idx +'th ';
			cube_idx = idx;
			for (var key in this.objects[idx]) {
		        if (this.objects[idx].hasOwnProperty(key)) {
		            if(key == "position"){
		            	str += ' x:' + this.objects[idx][key]['x'];
		            	str += ' y:' + this.objects[idx][key]['y'];
		            	str += ' z:' + this.objects[idx][key]['z'];
		            	
		            	pos_x = this.objects[idx][key]['x'];
		            	pos_y = this.objects[idx][key]['y'];
		            	pos_z = this.objects[idx][key]['z'];
		            }
		            if(key == "name"){
		            	// alert(objects[idx][key]);
		            	var jsonobj = JSON.parse(this.objects[idx][key]);
		            	str += ' cube_idx : '+jsonobj.cube_idx +' ';
	        			str += ' object_id : ' + jsonobj.object_id +' ';
		            	str += ' cube_type : '+jsonobj.cube_type +' ';
	        			str += ' linked_id : ' + jsonobj.linked_id +' ';
	        			str += ' cube_size : ' + jsonobj.cube_size +' ';
	        			str += ' cube_axis : ' + jsonobj.cube_axis +' ';
	        			object_id = jsonobj.object_id;
	        			cube_type = jsonobj.cube_type;
	        			linked_id = jsonobj.linked_id;
	        			cube_size = jsonobj.cube_size;
	        			cube_axis = jsonobj.cube_axis;
		            }
		        }
			}
			cube_list.push({cube_idx:cube_idx, pos_x:pos_x, pos_y:pos_y, pos_z:pos_z, object_id:object_id, cube_type:cube_type, linked_id:linked_id, cube_size:cube_size, cube_axis:cube_axis });
		}
    }
	// alert(str);
	
	var stack_id = $("#stack_id").val();
	var myJsonString = "{cube_list:"+JSON.stringify(cube_list)+"}";
    $.ajax({
        type: "post",
        url: "/cubemap/CubemapSavemap.jsp",
        data: {"cube_list" : myJsonString, "stack_id":stack_id},
        success: function(msg){
          alert("저장이 완료되었습니다.");
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    });
	
}
DOBBYDO_CUBEMAP.savestack = function (){
	var stackId = $("#stack_id").val();
	$.ajax({
        type: "post",
        url: "/cubemap/CubemapSavestack.jsp",
        data: {"stack_id" : stackId},
        success: function(msg){
        	alert("저장이 완료되었습니다.");
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    });
}
DOBBYDO_CUBEMAP.addStack = function (){
	var stackNm = $("#stack_nm").val();
	var stackRemk = $("#stack_remk").val();
	$.ajax({
        type: "post",
        url: "/cubemap/CubemapStackAdd.jsp",
        data: {"stack_nm" : stackNm, "stack_remk" : stackRemk},
        success: function(data){        	
        	//DOBBYDO_CUBEMAP.setStackId(0);
        	//pending
        	//DOBBYDO_CUBEMAP.disappearRightClickContainer();
        	DOBBYDO_CUBEMAP.getStackList();
            alert("등록되었습니다.");
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    });
}
DOBBYDO_CUBEMAP.addBooksf = function (){
	var stack_id = $("#stack_id").val();
	var booksf_nm = $("#booksf_nm").val();
	var booksf_remk = $("#booksf_remk").val();
	var booksf_y = $("#booksf_y").val();
	var booksf_x = $("#booksf_x").val();
	var booksf_z = $("#booksf_z").val();
	var booksf_flw = $("#booksf_flw").val();
	
	$.ajax({
        type: "post",
        url: "/cubemap/CubemapBooksfAdd.jsp",
        data: {"stack_id" : stack_id, "booksf_nm" : booksf_nm, "booksf_remk" : booksf_remk, "booksf_y":booksf_y, "booksf_x":booksf_x, "booksf_z":booksf_z, "booksf_flw":booksf_flw},
        success: function(msg){
            alert("등록되었습니다.");
        	DOBBYDO_CUBEMAP.getBooksfList();
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    });
}

DOBBYDO_CUBEMAP.addBox = function (){
	var box_nm = $("#box_nm").val();
	var box_remk = $("#box_remk").val();
	
	$.ajax({
        type: "post",
        url: "/cubemap/CubemapBoxAdd.jsp",
        data: {"box_nm" : box_nm, "box_remk" : box_remk},
        success: function(msg){
            alert("등록되었습니다.");
        	DOBBYDO_CUBEMAP.getBoxList();
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    });
}

DOBBYDO_CUBEMAP.getStackList = function (){
	$("#stack_add_form").css("display","block");
	$("#booksf_add_form").css("display","none");
	$("#box_add_form").css("display","none");
	// 서고
    var stack_id = 0;
    
	$.ajax({
        type: "get",
        url: "/cubemap/CubemapStackList.jsp",
        data: { },
        //contentType: "application/json",
        success: function(data, textStatus, xhr){
        	//var objs = JSON.parse(data);
        	var obj = data;//objs;// objs.data;
        	var html = "<table><tr><td></td><td>이름</td><td>비고</td></tr>";
        	for(var idx in obj){
        		html += "<tr>";
        		html += "<td><div class=\"dbd-cubemap-check-green\" style=\"width:24px;height:24px;\" onclick=\"$('#menu_icons').css('display','inline-block');$('#stackInfo').text('서고 : "+obj[idx].stack_nm+" ');DOBBYDO_CUBEMAP.setStackId("+obj[idx].stack_id+");DOBBYDO_CUBEMAP.disappearRightClickContainer();\"></td>";
        		html += "<td>"+obj[idx].stack_nm + "</td>"; 
        		html += "<td>"+obj[idx].stack_remk + "</td>";
        		html += "</tr>"; 
        	}
        	html += "</table>";
        	$("#list").html(html);
        },
        error:function (xhr, ajaxOptions, thrownError){
        	alert(xhr.status);
            alert(thrownError);
        } 
    });
}
DOBBYDO_CUBEMAP.getBooksfList = function (){
	$("#stack_add_form").css("display","none");
	$("#booksf_add_form").css("display","block");
	$("#box_add_form").css("display","none");
	// 서가
    var stack_id = $("#stack_id").val();
	$.ajax({
        type: "get",
        url: "/cubemap/CubemapBooksfList.jsp",
        data: {"stack_id":stack_id },
        success: function(data, textStatus, xhr){
        	// alert(data);
        	var objs = data;// JSON.parse(msg);
        	var html = "<table><tr><td></td><td>이름</td><td>비고</td><td>X</td><td>Z</td><td>Y</td><td>단계수</td></tr>";
        	for(var idx in objs){
        		html += "<tr>";
        		html += "<td><div class=\"dbd-cubemap-check-green\" style=\"width:24px;height:24px;\" onclick=\"DOBBYDO_CUBEMAP.upNdown('selected_booksf_y',"+objs[idx].booksf_y+");DOBBYDO_CUBEMAP.upNdown('selected_booksf_x',"+objs[idx].booksf_x+");DOBBYDO_CUBEMAP.upNdown('selected_booksf_z',"+objs[idx].booksf_z+");DOBBYDO_CUBEMAP.upNdown('selected_booksf_flw',"+objs[idx].booksf_flw+");DOBBYDO_CUBEMAP.upNdown('linked_id',"+objs[idx].booksf_id+");DOBBYDO_CUBEMAP.setPen_type(7);DOBBYDO_CUBEMAP.disappearRightClickContainer();\"></td>";
        		html += "<td>"+objs[idx].booksf_nm + "</td>";
        		html += "<td>"+objs[idx].booksf_remk + "</td>";
        		html += "<td>"+objs[idx].booksf_x + "</td>";
        		html += "<td>"+objs[idx].booksf_z + "</td>";
        		html += "<td>"+objs[idx].booksf_y + "</td>";
        		html += "<td>"+objs[idx].booksf_flw + "</td>";
        		html += "</tr>"; 
        	}
        	html += "</table>";
        	$("#list").html(html);
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    });
}
DOBBYDO_CUBEMAP.getBoxList = function (){
	$("#stack_add_form").css("display","none");
	$("#booksf_add_form").css("display","none");
	$("#box_add_form").css("display","block");
	// 상자
	
	$.ajax({
		type:"post",
		url: "/cubemap/CubemapBoxList.jsp",
		data: {},
		success: function (data, textStatus, xhr){
			var objs = data;
			var html = "<table><tr><td></td><td>이름</td><td>비고</td><tr>";
			for(var idx in objs){
				html +="<tr>";
				html +="<td><div class=\"dbd-cubemap-check-green\" style=\"width:24px;height:24px;\" onclick=\"DOBBYDO_CUBEMAP.upNdown('linked_id',"+objs[idx].box_id+");DOBBYDO_CUBEMAP.setPen_type(1);DOBBYDO_CUBEMAP.disappearRightClickContainer();\"></td>";
				html +="<td>"+objs[idx].box_nm+"</td>";
				html +="<td>"+objs[idx].box_remk+"</td>";
				html +="</tr>";
			}
			html += "</table>";
			$("#list").html(html);
		},
		error: function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
		}
	});
}

DOBBYDO_CUBEMAP.getAllFiles2 = function (){
	$("#stack_add_form").css("display","none");
	$("#booksf_add_form").css("display","none");
	$("#box_add_form").css("display","none");
    
	$.ajax({
        type: "get",
        url: "/cammapping/getAllCams",
        data: { },
        success: function(data, textStatus, xhr){
        	var objs = data;// JSON.parse(msg);
        	var html = "";
        	for(var idx in objs){
        		var file_img_nm = objs[idx].file_nm.split(".")[0];
        		html += "<span><button class=\"btn btn-xs btn-warning\" onclick=\"DOBBYDO_CUBEMAP.setImgSrc2("+objs[idx].fileupload_id+",'"+file_img_nm+"', "+objs[idx].fileupload_reg_id+");DOBBYDO_CUBEMAP.setPen_type(999);\">카메라 선택</button>"+ objs[idx].fileupload_id + ", " + objs[idx].file_nm + ", " + objs[idx].fileupload_reg_id + "</span><br>"; 
        	}
        	$("#list").html(html);
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    });
}

DOBBYDO_CUBEMAP.setImgSrc2 = function (fileupload_id, file_img_nm, fileupload_reg_id ) {
	$("#fileupload_id").val(fileupload_id);
	
	img = new Image(); // 480, 360
	img.src = "/files/"+fileupload_reg_id+"/"+file_img_nm+".jpg";
	
	line_list = [];
	line_id = 1;
	prev_pointbool = false;
	
	img.onload = function() {
		canvas =  document.createElement("CANVAS");    // document.getElementById("myCanvas");
		canvas.width = img.width;
		canvas.height = img.height;
		
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0, img.width, img.height); // 480, 360
		
		$.ajax({
	        type: "get",
	        url: "/cammapping/getLinesfsByFileuploadId",
	        data: {fileupload_id:fileupload_id },
	        success: function(data, textStatus, xhr){
	        	var objs = data;// JSON.parse(msg);
	        	var html = "";
	        	for(var idx in objs){
	        		var sub_cammapping_id = objs[idx].cammapping_id;
	        		var sub_fileupload_id = objs[idx].fileupload_id;
	        		var sub_line_id = objs[idx].line_id;
	        		var sub_start_x = objs[idx].start_x;
	        		var sub_start_y = objs[idx].start_y;
	        		var sub_end_x = objs[idx].end_x;
	        		var sub_end_y = objs[idx].end_y;

	        		fillpoint(canvas, sub_start_x, sub_start_y);
	        		fillpoint(canvas, sub_end_x, sub_end_y);
	        		fillline(canvas, sub_start_x, sub_start_y, sub_end_x, sub_end_y);
					filltext(canvas, sub_start_x, sub_start_y, sub_line_id);
					line_list.push({
						fileupload_id : sub_fileupload_id,
						line_id : sub_line_id,
						start_x : sub_start_x,
						start_y : sub_start_y,
						end_x : sub_end_x,
						end_y : sub_end_y
					});
					line_id++;
					
	        		html += "<span><button class=\"btn btn-xs btn-warning\" onclick=\"DOBBYDO_CUBEMAP.updateBooksfIdToCammapping("+sub_cammapping_id+");\">서가 선 연동하기</button>"+ sub_fileupload_id + ", " + sub_line_id + "</span><br>"; 
					
	        	}
	        	
	        	$("#line_list").html(html);// canvas_list
	        	$("#canvas_contents").css("display","block");
	        	var dataUrl = canvas.toDataURL();
	            var imageFoo = document.getElementById('canvas_img');
	        	imageFoo.src = dataUrl;
	        	imageFoo.style.width =  300 + 'px';
	        	imageFoo.style.height = parseInt(img.height*(300/img.width))+'px';

	        },
	        error:function (xhr, ajaxOptions, thrownError){
	            alert(xhr.status);
	            alert(thrownError);
	        } 
	    });
		/*
		 * canvas.addEventListener('mousemove', function(evt) { var mousePos =
		 * getMousePos(canvas, evt); var message = 'Mouse position: ' +
		 * mousePos.x + ',' + mousePos.y + ''; //writediv.append(message);
		 * fillpoint(canvas, mousePos.x, mousePos.y); }, false);
		 */
	}
};

DOBBYDO_CUBEMAP.zoomIn = function (){
	var str = $('#canvas_img').css('width'); 
	var rewidth = parseInt(str.substring(0,str.length-2)) * 2;
	str = $('#canvas_img').css('height'); 
	var reheight = parseInt(str.substring(0,str.length-2)) * 2;
	
	var imageFoo = document.getElementById('canvas_img');
	imageFoo.style.width =  rewidth + 'px';
	imageFoo.style.height =  reheight + 'px';
}
DOBBYDO_CUBEMAP.zoomOut = function (){
	var str = $('#canvas_img').css('width'); 
	var rewidth = parseInt(str.substring(0,str.length-2)) * 0.5;
	str = $('#canvas_img').css('height'); 
	var reheight = parseInt(str.substring(0,str.length-2)) * 0.5;
	
	var imageFoo = document.getElementById('canvas_img');
	imageFoo.style.width =  rewidth + 'px';
	imageFoo.style.height =  reheight + 'px';
}

/*
 * function getAllCams(){ $("#stack_add_form").css("display","none");
 * $("#booksf_add_form").css("display","none");
 * $("#box_add_form").css("display","none");
 * 
 * $.ajax({ type: "get", url: "/cammapping/getAllCams", data: { }, success:
 * function(data, textStatus, xhr){ var objs = data;// JSON.parse(msg); var html =
 * ""; for(var idx in objs){ html += "<span><button class=\"btn btn-xs
 * btn-warning\"
 * onclick=\"setImgSrc("+objs[idx].fileupload_id+",'"+file_img_nm+"',
 * "+objs[idx].fileupload_reg_id+");\">카메라 선택</button>"+
 * objs[idx].fileupload_id + ", " + objs[idx].file_nm + ", " +
 * objs[idx].fileupload_reg_id + "</span><br>"; }
 * document.getElementById("list").innerHTML = html; }, error:function (xhr,
 * ajaxOptions, thrownError){ alert(xhr.status); alert(thrownError); } }); }
 * 
 * 
 * function getLinesfsByCamId(cam_id){
 * $("#stack_add_form").css("display","none");
 * $("#booksf_add_form").css("display","none");
 * $("#box_add_form").css("display","none");
 * 
 * $.ajax({ type: "get", url: "/cammapping/getLinesfsByCamId", data:
 * {"cam_id":cam_id }, success: function(data, textStatus, xhr){ var objs =
 * data;// JSON.parse(msg); var html = ""; for(var idx in objs){ html += "<span><button
 * onclick=\"updateBooksfIdToCammapping("+objs[idx].cammapping_id+");\">연동하기</button>"+
 * objs[idx].cammapping_id + ", " + objs[idx].cam_id + ", " + objs[idx].line_id + ", " +
 * objs[idx].booksf_id + "</span><br>"; }
 * document.getElementById("list").innerHTML = html; }, error:function (xhr,
 * ajaxOptions, thrownError){ alert(xhr.status); alert(thrownError); } }); }
 */
function wait(ms) {
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while(d2-d < ms);
}

DOBBYDO_CUBEMAP.transferto2D = function (){
	var x_poss = DOBBYDO_CUBEMAP.camera.position.x;
	var y_poss = DOBBYDO_CUBEMAP.camera.position.y;
	var z_poss = DOBBYDO_CUBEMAP.camera.position.z;
	
	if(x_poss == 1 && y_poss == 2000 && z_poss == 0){
		DOBBYDO_CUBEMAP.camera.position.x = 1000;
		DOBBYDO_CUBEMAP.camera.position.y = 1000;
		DOBBYDO_CUBEMAP.camera.position.z = 0;
		DOBBYDO_CUBEMAP.camera.lookAt( new THREE.Vector3() );
		DOBBYDO_CUBEMAP.render();
	} else{
		DOBBYDO_CUBEMAP.camera.position.x = 1;
		DOBBYDO_CUBEMAP.camera.position.y = -2000;
		DOBBYDO_CUBEMAP.camera.position.z = 0;
		DOBBYDO_CUBEMAP.camera.lookAt( new THREE.Vector3() );
		DOBBYDO_CUBEMAP.render();
	}
}

DOBBYDO_CUBEMAP.updateBooksfIdToCammapping = function (cammapping_id){
	var booksf_id = $("#booksf_id").val();
	if(booksf_id == ""){
		alert("연결할 서가를 선택해주세요.");
		return false;
	}
	
	$.ajax({
        type: "put",
        url: "/cammapping/updateBooksfIdToCammapping",
        data: {"booksf_id" : booksf_id, "cammapping_id" : cammapping_id},
        success: function(data){
        	$("#booksf_id").val("");
        	
        	alert("save it finish");
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    }); 
}


DOBBYDO_CUBEMAP.getBooksfView = function (booksf_id){
	// 서가
	$.ajax({
        type: "post",
        url: "/cubemap/CubemapBooksfView.jsp",
        data: { "booksf_id" : booksf_id},
        success: function(data){
        	var obj = data;
        	
        	var html = "<span>"+ obj.stack_id + ", " + obj.booksf_id + ", " + obj.booksf_nm + ", " + obj.booksf_remk + "<br>"; 
        	$("#view").html(html);
        	$("#booksf_id").val(booksf_id);
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    });
}
DOBBYDO_CUBEMAP.getBoxView = function (box_id){
	//alert(box_id);
	// 상자
	$.ajax({
        type: "post",
        url: "/cubemap/CubemapBoxView.jsp",
        data: { "box_id" : box_id},
        success: function(data){
        	var obj = data;
        	var html = "<span>"+ obj.box_id + ", " + obj.box_nm + ", " + obj.box_remk + "</span><br>"; 
        	$("#view").html(html);
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        } 
    });
}
DOBBYDO_CUBEMAP.upNdown = function (tag_id, i){
	var value =  $("#"+tag_id).val();
	if(value == 1 && parseInt(i) < 0 ){
		return false;
	}
	if(tag_id == "booksf_flw" && $("#booksf_flw").val() == $("#booksf_y").val() && parseInt(i) > 0){
		return false;
	}
	
	if(tag_id == "linked_id" || tag_id == "selected_booksf_x" || tag_id == "selected_booksf_z" || tag_id == "selected_booksf_y" || tag_id == "selected_booksf_flw"){
		value = i;
	} else {
		value = parseInt(value) + parseInt(i);
	}
	
	if(tag_id == "selected_booksf_x"){
		$("#booksf_x").val(value);
	} else if (tag_id == "selected_booksf_z"){
		$("#booksf_z").val(value);
	} else if (tag_id == "selected_booksf_y"){
		$("#booksf_y").val(value);
	} else if (tag_id == "selected_booksf_flw"){
		$("#booksf_flw").val(value);
	} else {
		$("#"+tag_id).val(value);
	}
	
	if(tag_id == "booksf_y" || tag_id == "selected_booksf_y"){
		this.booksf_y = value;
	} else if(tag_id == "booksf_z" || tag_id == "selected_booksf_z"){
		this.booksf_z = value;
	} else if(tag_id == "booksf_x" || tag_id == "selected_booksf_x"){
		this.booksf_x = value;
	} else if(tag_id == "booksf_flw" || tag_id == "selected_booksf_flw"){
		this.booksf_flw = value;
	} else if(tag_id == "linked_id"){
		this.static_linked_id = value;
	}
}

DOBBYDO_CUBEMAP.initRoleOverMesh = function (){
	
}

DOBBYDO_CUBEMAP.initpushdata = function (objs){
	this.booksf_flw = 1; 
	this.booksf_y = 1; 
	this.booksf_z = 1; 
	this.booksf_x = 1; 
	
	this.objects = [];
	//pen_type = 1;
	this.cubes = [];
	for(var idx in objs){
		var myVar = objs[idx].cube_idx;
		if (typeof myVar != 'undefined'){
			this.cubes.push({cube_idx:objs[idx].cube_idx, pos_x:objs[idx].pos_x, pos_y:objs[idx].pos_y, pos_z:objs[idx].pos_z, object_id:objs[idx].object_id, cube_type:objs[idx].cube_type, linked_id:objs[idx].linked_id, cube_size:objs[idx].cube_size, cube_axis:objs[idx].cube_axis });
		}
	}
}

DOBBYDO_CUBEMAP.init = function () {
	// container = document.createElement( 'div' );
	// document.body.appendChild( container );
	this.container = $( "#container" );
	//this.container.html("");
	
	/* Create Scene */
	this.scene = new THREE.Scene();
	/* Camera Setting */
	this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth*6/10 / window.innerHeight, 1, 10000 );
	this.camera.position.set( 1000, 1000, 0 );
	this.camera.lookAt( new THREE.Vector3() );
	
	/* Blue Cube Setting (roll-over helpers) */
	this.rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
	this.rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true } );
	this.rollOverMesh = new THREE.Mesh( this.rollOverGeo, this.rollOverMaterial ); 
	this.rollOverMesh.position.y = 10000;
	this.scene.add( this.rollOverMesh );
	
	/* Start Rack */
	this.rollOverBooksfYGeo = new THREE.BoxGeometry(8,50*this.booksf_y,8);
	this.rollOverBooksfYMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true } );
	
	rollOverBooksfYMesh[1] = new THREE.Mesh( this.rollOverBooksfYGeo, this.rollOverBooksfYMaterial ); 
	rollOverBooksfYMesh[1].rotation.y = 0.5*Math.PI;
	/* !!
	rollOverBooksfYMesh[1].position.divideScalar( 50 ).round().multiplyScalar( 50 );// .addScalar(
	rollOverBooksfYMesh[1].position.y += 25*booksf_y;
	*/
	rollOverBooksfYMesh[1].position.y = 10000;
	this.scene.add( rollOverBooksfYMesh[1] );
	
	rollOverBooksfYMesh[2] = rollOverBooksfYMesh[1].clone();
	// !! rollOverBooksfYMesh[2].position.x += 50*booksf_x;
	this.scene.add( rollOverBooksfYMesh[2] );

	rollOverBooksfYMesh[3] = rollOverBooksfYMesh[1].clone();
	// !! rollOverBooksfYMesh[3].position.z += 50*booksf_z;
	this.scene.add( rollOverBooksfYMesh[3] );

	rollOverBooksfYMesh[4] = rollOverBooksfYMesh[1].clone();
	// !! rollOverBooksfYMesh[4].position.x += 50*booksf_x;
	// !! rollOverBooksfYMesh[4].position.z += 50*booksf_z;
	this.scene.add( rollOverBooksfYMesh[4] );
	
	
	this.rollOverBooksfZGeo = new THREE.BoxGeometry(8,8,50*this.booksf_z);
	this.rollOverBooksfZMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true } );
	
	rollOverBooksfZMesh[1] = new THREE.Mesh( this.rollOverBooksfZGeo, this.rollOverBooksfZMaterial ); 
	/* !!
	rollOverBooksfZMesh[1].position.divideScalar( 50 ).round().multiplyScalar( 50 );
	rollOverBooksfZMesh[1].position.z += 25*booksf_z;
	*/
	rollOverBooksfZMesh[1].position.y = 10000;
	this.scene.add( rollOverBooksfZMesh[1] );
	
	rollOverBooksfZMesh[2] = rollOverBooksfZMesh[1].clone();
	// !! rollOverBooksfZMesh[2].position.y += 50*booksf_y;
	this.scene.add( rollOverBooksfZMesh[2] );
	
	rollOverBooksfZMesh[3] = rollOverBooksfZMesh[1].clone();
	// !! rollOverBooksfZMesh[3].position.x += 50*booksf_x;
	this.scene.add( rollOverBooksfZMesh[3] );
	
	rollOverBooksfZMesh[4] = rollOverBooksfZMesh[1].clone();
	// !! rollOverBooksfZMesh[4].position.y += 50*booksf_y;
	// !! rollOverBooksfZMesh[4].position.x += 50*booksf_x;
	this.scene.add( rollOverBooksfZMesh[4] );
	
	
	this.rollOverBooksfXGeo = new THREE.BoxGeometry(50*this.booksf_x,8,8);
	this.rollOverBooksfXMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true } );
	
	rollOverBooksfXMesh[1] = new THREE.Mesh( this.rollOverBooksfXGeo, this.rollOverBooksfXMaterial ); 
	rollOverBooksfXMesh[1].rotation.x = 0.5*Math.PI;
	/* !!
	rollOverBooksfXMesh[1].position.divideScalar( 50 ).round().multiplyScalar( 50 );
	rollOverBooksfXMesh[1].position.x += 25*booksf_x;
	*/
	rollOverBooksfXMesh[1].position.y = 10000;
	this.scene.add( rollOverBooksfXMesh[1] );

	rollOverBooksfXMesh[2] = rollOverBooksfXMesh[1].clone();
	// !! rollOverBooksfXMesh[2].position.y += 50*booksf_y;
	this.scene.add( rollOverBooksfXMesh[2] );
	
	rollOverBooksfXMesh[3] = rollOverBooksfXMesh[1].clone();
	// !! rollOverBooksfXMesh[3].position.z += 50*booksf_z;
	this.scene.add( rollOverBooksfXMesh[3] );
	
	rollOverBooksfXMesh[4] = rollOverBooksfXMesh[1].clone();
	// !! rollOverBooksfXMesh[4].position.y += 50*booksf_y;
	// !! rollOverBooksfXMesh[4].position.z += 50*booksf_z;
	this.scene.add( rollOverBooksfXMesh[4] );
	/* End Rack */
	
	/* Book Shelves */
	this.rollOverBooksfFlwGeo = new THREE.BoxGeometry( 50, 1, 50 );
	this.rollOverBooksfFlwMaterial = new THREE.MeshLambertMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true } );
	for(var idx=0; idx<50; idx++){
		rollOverBooksfFlwMesh[idx] = new THREE.Mesh(this.rollOverBooksfFlwGeo, this.rollOverBooksfFlwMaterial); 
		rollOverBooksfFlwMesh[idx].position.y = 10000;
		this.scene.add( rollOverBooksfFlwMesh[idx] );
	}
	
	
	/* Textures !!! */
	/* White Cube Setting */
	this.cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
	
	//pending 경로 바꿔야함 상대경로로 
	this.cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff , map: new THREE.TextureLoader().load( "/dobbydo-cubemap-1.0.1/images/texture/box-texture.jpg" ) });
	
	/* Red Cube Setting */
	this.cctvMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red
		
	
	/* Start Rack */
	this.realBooksfYGeo = new THREE.BoxGeometry(8,50*this.booksf_y,8);
	this.realBooksfYMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "/dobbydo-cubemap-1.0.1/images/texture/booksf-texture.jpg" ) } );
	
	this.realBooksfZGeo = new THREE.BoxGeometry(8,8,50*this.booksf_z);
	this.realBooksfZMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "/dobbydo-cubemap-1.0.1/images/texture/booksf-texture.jpg" ) } );
	
	this.realBooksfXGeo = new THREE.BoxGeometry(50*this.booksf_x,8,8);
	this.realBooksfXMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "/dobbydo-cubemap-1.0.1/images/texture/booksf-texture.jpg" ) } );

	this.realBooksfFlwGeo = new THREE.BoxGeometry(50,1,50);
	this.realBooksfFlwMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, map: new THREE.TextureLoader().load( "/dobbydo-cubemap-1.0.1/images/texture/booksf-texture.jpg" ) } );
	/* End Rack */
	
	/* Grid Floor Setting */
	var size = 500, step = 50;
	var geometry = new THREE.Geometry();
	for ( var i = - size; i <= size; i += step ) {
		geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
	}
	var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
	this.line = new THREE.LineSegments( geometry, material );
	this.scene.add( this.line );
	
	/* Raycaster Setting : Renders a 3D world based on a 2D map */
	this.raycaster = new THREE.Raycaster();
	this.mouse = new THREE.Vector2();
	var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
	geometry.rotateX( -Math.PI/2 );
	this.plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
	this.scene.add( this.plane );
	this.objects.push( this.plane );
	
	/* Lights Setting */
	var ambientLight = new THREE.AmbientLight( 0x606060 );
	this.scene.add( ambientLight );
	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
	this.scene.add( directionalLight );
	
	
	/* Build Boxes From DB */
	for(var key in this.cubes){
		//alert(JSON.stringify(cubes[key]));
		var voxel;
		if(this.cubes[key]['cube_type'] == 1){
			voxel = new THREE.Mesh( this.cubeGeo, this.cubeMaterial );
			voxel.position.set(this.cubes[key]['pos_x'], this.cubes[key]['pos_y'], this.cubes[key]['pos_z']);
		} else if(this.cubes[key]['cube_type'] == 2){
			voxel = new THREE.Mesh( this.cubeGeo, this.cctvMaterial );
			voxel.position.set(this.cubes[key]['pos_x'], this.cubes[key]['pos_y'], this.cubes[key]['pos_z']);
		} else if(this.cubes[key]['cube_type'] == 3){
			// green pen
			voxel = new THREE.Mesh( this.rollOverPenGeo, this.rollOverPenMaterial );
			voxel.position.set(this.cubes[key]['pos_x'], this.cubes[key]['pos_y'], this.cubes[key]['pos_z']);
		} else if(this.cubes[key]['cube_type'] == 4){
			// green pen
			voxel = new THREE.Mesh( this.rollOverPenGeo, this.rollOverPenMaterial );
			voxel.rotation.x = 0.5*Math.PI;
			voxel.rotation.z = 0;
			voxel.position.set(this.cubes[key]['pos_x'], this.cubes[key]['pos_y'], this.cubes[key]['pos_z']);
		} else if(this.cubes[key]['cube_type'] == 5){
			// green pen
			voxel = new THREE.Mesh( this.rollOverPenGeo, this.rollOverPenMaterial );
			voxel.rotation.x = 0.5*Math.PI;
			voxel.rotation.z = 0.5*Math.PI;
			voxel.position.set(this.cubes[key]['pos_x'], this.cubes[key]['pos_y'], this.cubes[key]['pos_z']);
		} else if(this.cubes[key]['cube_type'] == 7){
			// cube_axis : none:0 y:1 z:2 x:3 flw:4
			if(this.cubes[key]['cube_axis'] == 1){
				// YMesh
				console.log("cube_size : "+this.cubes[key]['cube_size']);
				voxel = new THREE.Mesh( this.realBooksfYGeo, this.realBooksfYMaterial ); 
				this.booksf_y = this.cubes[key]['cube_size'];
				voxel.scale.y = this.booksf_y;
				voxel.rotation.y = 0.5*Math.PI;
				voxel.position.set(this.cubes[key]['pos_x'], this.cubes[key]['pos_y'], this.cubes[key]['pos_z']);
			} else if(this.cubes[key]['cube_axis'] == 2){
				// ZMesh
				voxel = new THREE.Mesh( this.realBooksfZGeo, this.realBooksfZMaterial ); 
				this.booksf_z = this.cubes[key]['cube_size'];
				voxel.scale.z = this.booksf_z;
				voxel.position.set(this.cubes[key]['pos_x'], this.cubes[key]['pos_y'], this.cubes[key]['pos_z']);
			} else if(this.cubes[key]['cube_axis'] == 3){
				// XMesh
				voxel = new THREE.Mesh( this.realBooksfXGeo, this.realBooksfXMaterial ); 
				this.booksf_x = this.cubes[key]['cube_size'];
				voxel.scale.x = this.booksf_x;
				voxel.rotation.x = 0.5*Math.PI;
				voxel.position.set(this.cubes[key]['pos_x'], this.cubes[key]['pos_y'], this.cubes[key]['pos_z']);
			} else if(this.cubes[key]['cube_axis'] == 4){
				// Flw
				voxel = new THREE.Mesh( this.realBooksfFlwGeo, this.realBooksfFlwMaterial ); 
				voxel.scale.x = this.booksf_x;
				voxel.scale.z = this.booksf_z;
				voxel.position.set(this.cubes[key]['pos_x'], this.cubes[key]['pos_y'], this.cubes[key]['pos_z']);
			}
		}
		voxel.name = "{ \"cube_type\":"+this.cubes[key]['cube_type']+", \"linked_id\":"+this.cubes[key]['linked_id']+", \"object_id\":"+this.cubes[key]['object_id']+", \"cube_size\":"+this.cubes[key]['cube_size']+", \"cube_axis\":"+this.cubes[key]['cube_axis']+" }";
		console.log(voxel.name);
		this.scene.add( voxel );
		this.objects.push( voxel );
	}
	
	/* Render */
	this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	this.renderer.setClearColor( 0xf0f0f0 );
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( window.innerWidth*6/10, window.innerHeight );
	//console.log("###"); console.log(this.renderer.domElement);
	this.container.html( this.renderer.domElement );
	
	/* Event */
	$("#container").unbind();
	$("#container").bind( "mousemove", DOBBYDO_CUBEMAP.onDocumentMouseMove);
	$("#container").bind( "mousedown", DOBBYDO_CUBEMAP.onDocumentMouseDown);
	
	$(document).unbind();
	$(document).bind( "keydown", DOBBYDO_CUBEMAP.onDocumentKeyDown);
	$(document).bind( "keyup", DOBBYDO_CUBEMAP.onDocumentKeyUp);
	$(window).unbind();
	$(window).bind( "resize", DOBBYDO_CUBEMAP.onWindowResize);
	
	$(".shelf-event").click(function(event){
		DOBBYDO_CUBEMAP.setPen_type(7);
		DOBBYDO_CUBEMAP.getBooksfList();
		DOBBYDO_CUBEMAP.appearAddandList();
	    event.stopPropagation();
	});
	
	$(".box-event").click(function(event){
		DOBBYDO_CUBEMAP.setPen_type(1);
		DOBBYDO_CUBEMAP.getBoxList();
		DOBBYDO_CUBEMAP.appearAddandList();
	    event.stopPropagation();
	});
	
	$(".stack-event").click(function(event){
		DOBBYDO_CUBEMAP.getStackList();
		DOBBYDO_CUBEMAP.appearAddandList();
	    event.stopPropagation();
	});
	
	$(".magnifier-event").click(function(event){
		DOBBYDO_CUBEMAP.setPen_type(999);
	    event.stopPropagation();
	});
	
	$(".eraser-event").click(function(event){
		DOBBYDO_CUBEMAP.setPen_type(0);
	    event.stopPropagation();
	});
	
	$(".hand-event").click(function(event){
		DOBBYDO_CUBEMAP.setPen_type(990);
	    event.stopPropagation();
	});
	
	$(".loader-truck-event").click(function(event){
		DOBBYDO_CUBEMAP.setPen_type(992);
	    event.stopPropagation();
	});
	
	$(".redo-event").click(function(event){
		DOBBYDO_CUBEMAP.setStackId(-1);
	    event.stopPropagation();
	});
	
	$(".saving-location-event").click(function(event){
		DOBBYDO_CUBEMAP.savemap();
	    event.stopPropagation();
	});
	
	$(".saving-documents-event").click(function(event){
		DOBBYDO_CUBEMAP.savestack();
	    event.stopPropagation();
	});
	
	$(".camera-event").click(function(event){
		DOBBYDO_CUBEMAP.getAllFiles2()
		DOBBYDO_CUBEMAP.appearAddandList();
	    event.stopPropagation();
	});
	

	
	$(".up-arrow-event").click(function(event){
		var e = $.Event('keydown');
		e.keyCode = 38;DOBBYDO_CUBEMAP.onDocumentKeyDown(e);
	    event.stopPropagation();
	});
	
	$(".left-arrow-event").click(function(event){
		var e = $.Event('keydown');
		e.keyCode = 37;DOBBYDO_CUBEMAP.onDocumentKeyDown(e);
	    event.stopPropagation();
	});
	
	$(".down-arrow-event").click(function(event){
		var e = $.Event('keydown');
		e.keyCode = 40;DOBBYDO_CUBEMAP.onDocumentKeyDown(e);
	    event.stopPropagation();
	});
	
	$(".right-arrow-event").click(function(event){
		var e = $.Event('keydown');
		e.keyCode = 39;DOBBYDO_CUBEMAP.onDocumentKeyDown(e);
	    event.stopPropagation();
	});
	

	
	$(".round-plus-button-event").click(function(event){
		DOBBYDO_CUBEMAP.zoomIn();
	    event.stopPropagation();
	});

	$(".round-minus-button-event").click(function(event){
		DOBBYDO_CUBEMAP.zoomOut();
	    event.stopPropagation();
	});

	$(".round-delete-button-event").click(function(event){
		$('#canvas_contents').css('display','none');DOBBYDO_CUBEMAP.getAllFiles2();
	    event.stopPropagation();
	});
	
	$(".add-stack-event").click(function(event){
		DOBBYDO_CUBEMAP.addStack();
	    event.stopPropagation();
	});
	
	$(".add-booksf-event").click(function(event){
		DOBBYDO_CUBEMAP.addBooksf();
	    event.stopPropagation();
	});

	$(".add-box-event").click(function(event){
		DOBBYDO_CUBEMAP.addBox();
	    event.stopPropagation();
	});
	
	
	
}
DOBBYDO_CUBEMAP.onWindowResize = function () {
	DOBBYDO_CUBEMAP.camera.aspect = (window.innerWidth*6/10) / window.innerHeight;
	DOBBYDO_CUBEMAP.camera.updateProjectionMatrix();
	DOBBYDO_CUBEMAP.renderer.setSize( (window.innerWidth*6/10), window.innerHeight );
}
DOBBYDO_CUBEMAP.onDocumentMouseMove = function ( event ) {
	event.stopPropagation();
	event.preventDefault();
	var d = document.getElementById('cubemapview').getBoundingClientRect();
	var left_margin = parseInt(d.left);
	var top_margin = parseInt(d.top);
	
	// alert(top_margin + " "+left_margin);
	DOBBYDO_CUBEMAP.mouse.set( ( (event.clientX-left_margin) / (window.innerWidth*6/10) ) * 2 - 1, - ( (event.clientY-top_margin) / window.innerHeight ) * 2 + 1 );
	DOBBYDO_CUBEMAP.raycaster.setFromCamera( DOBBYDO_CUBEMAP.mouse, DOBBYDO_CUBEMAP.camera );
	
	var intersects = DOBBYDO_CUBEMAP.raycaster.intersectObjects( DOBBYDO_CUBEMAP.objects );
	
	if ( intersects.length > 0 ) {
		var intersect = intersects[ 0 ];
		
		if(DOBBYDO_CUBEMAP.pen_type == 1 || DOBBYDO_CUBEMAP.pen_type == 2){
			DOBBYDO_CUBEMAP.rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
			DOBBYDO_CUBEMAP.rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
			//For Intersect Different Booksf_Y and Booksf_Flw
			DOBBYDO_CUBEMAP.rollOverMesh.position.y = intersect.point.y + 25;
		} else if( DOBBYDO_CUBEMAP.pen_type == 991 ){
			var jsonobj = JSON.parse(grabbing_objects[0]["name"]);
			if(jsonobj.cube_type == "7"){
				//Y
				grabbing_objects[0].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[0].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[0].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
				
				grabbing_objects[1].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[1].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[1].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[1].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
				
				grabbing_objects[2].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[2].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[2].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[2].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
				
				grabbing_objects[3].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[3].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[3].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[3].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
				grabbing_objects[3].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
				
				//Z
				grabbing_objects[4].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[4].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[4].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
				
				grabbing_objects[5].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[5].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[5].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
				grabbing_objects[5].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
				
				grabbing_objects[6].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[6].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[6].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
				grabbing_objects[6].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
				
				grabbing_objects[7].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[7].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[7].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
				grabbing_objects[7].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[7].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
				
				//X
				grabbing_objects[8].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[8].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[8].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
				
				grabbing_objects[9].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[9].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[9].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
				grabbing_objects[9].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
				
				grabbing_objects[10].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[10].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[10].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
				grabbing_objects[10].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
				
				grabbing_objects[11].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[11].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[11].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
				grabbing_objects[11].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[11].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
				
				var step = 50*DOBBYDO_CUBEMAP.booksf_y/DOBBYDO_CUBEMAP.booksf_flw;
				console.log("step : "+step+" length" + grabbing_objects.length);
				for(var idx=12; idx < grabbing_objects.length; idx++){
					grabbing_objects[idx].position.copy( intersect.point ).add( intersect.face.normal );
					grabbing_objects[idx].position.divideScalar( 50 ).round().multiplyScalar( 50 );
					grabbing_objects[idx].position.y += (step*(idx-12));
					grabbing_objects[idx].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
					grabbing_objects[idx].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
				}
			} else if(jsonobj.cube_type == "1" || jsonobj.cube_type == "2") {
				grabbing_objects[0].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[0].position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
				grabbing_objects[0].position.y = intersect.point.y + 25;
			}
		} else if(DOBBYDO_CUBEMAP.pen_type == 993){
			var jsonobj = JSON.parse(grabbing_objects[0]["name"]);
			if(jsonobj.cube_type == "7"){
				//Y
				grabbing_objects[0].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[0].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[0].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
				
				grabbing_objects[1].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[1].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[1].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[1].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
				
				grabbing_objects[2].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[2].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[2].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[2].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
				
				grabbing_objects[3].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[3].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[3].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[3].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
				grabbing_objects[3].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
				
				//Z
				grabbing_objects[4].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[4].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[4].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
				
				grabbing_objects[5].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[5].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[5].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
				grabbing_objects[5].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
				
				grabbing_objects[6].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[6].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[6].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
				grabbing_objects[6].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
				
				grabbing_objects[7].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[7].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[7].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
				grabbing_objects[7].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[7].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
				
				//X
				grabbing_objects[8].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[8].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[8].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
				
				grabbing_objects[9].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[9].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[9].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
				grabbing_objects[9].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
				
				grabbing_objects[10].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[10].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[10].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
				grabbing_objects[10].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
				
				grabbing_objects[11].position.copy( intersect.point ).add( intersect.face.normal );
				grabbing_objects[11].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				grabbing_objects[11].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
				grabbing_objects[11].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
				grabbing_objects[11].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
				
				var step = 50*DOBBYDO_CUBEMAP.booksf_y/DOBBYDO_CUBEMAP.booksf_flw;
				console.log("step : "+step+" length" + grabbing_objects.length);
				var center_floor_x_pos = grabbing_objects[12].position.x;
				var center_floor_z_pos = grabbing_objects[12].position.z;
				var center_floor_y_pos = grabbing_objects[12].position.y;
				var var_x_pos, var_z_pos, var_y_pos;
				for(var idx=12; idx < grabbing_objects.length; idx++){
					var jsonobj = JSON.parse(grabbing_objects[idx]["name"]);
					if(jsonobj.cube_type == "7"){
						grabbing_objects[idx].position.copy( intersect.point ).add( intersect.face.normal );
						grabbing_objects[idx].position.divideScalar( 50 ).round().multiplyScalar( 50 );
						grabbing_objects[idx].position.y += (step*(idx-12));
						grabbing_objects[idx].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
						grabbing_objects[idx].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
					}  else if(jsonobj.cube_type == "1" || jsonobj.cube_type == "2") {
						var_x_pos = grabbing_objects[idx].position.x - center_floor_x_pos;
						var_z_pos = grabbing_objects[idx].position.z - center_floor_z_pos;
						var_y_pos = grabbing_objects[idx].position.y - center_floor_y_pos;
						grabbing_objects[idx].position.copy( intersect.point ).add( intersect.face.normal );
						grabbing_objects[idx].position.divideScalar( 50 ).round().multiplyScalar( 50 );
						grabbing_objects[idx].position.x += 25*DOBBYDO_CUBEMAP.booksf_x + var_x_pos;
						grabbing_objects[idx].position.z += 25*DOBBYDO_CUBEMAP.booksf_z + var_z_pos;
						grabbing_objects[idx].position.y += var_y_pos;
					}
				}
			}
			
		} else if(DOBBYDO_CUBEMAP.pen_type == 7){
			rollOverBooksfYMesh[1].scale.y = DOBBYDO_CUBEMAP.booksf_y;// 50*booksf_y;
			rollOverBooksfYMesh[1].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfYMesh[1].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfYMesh[1].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
			
			rollOverBooksfYMesh[2].scale.y = DOBBYDO_CUBEMAP.booksf_y;
			rollOverBooksfYMesh[2].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfYMesh[2].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfYMesh[2].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
			rollOverBooksfYMesh[2].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
			
			rollOverBooksfYMesh[3].scale.y = DOBBYDO_CUBEMAP.booksf_y;// 50*booksf_y;
			rollOverBooksfYMesh[3].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfYMesh[3].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfYMesh[3].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
			rollOverBooksfYMesh[3].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
			
			rollOverBooksfYMesh[4].scale.y = DOBBYDO_CUBEMAP.booksf_y;
			rollOverBooksfYMesh[4].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfYMesh[4].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfYMesh[4].position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
			rollOverBooksfYMesh[4].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
			rollOverBooksfYMesh[4].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
			
			
			rollOverBooksfZMesh[1].scale.z = DOBBYDO_CUBEMAP.booksf_z;
			rollOverBooksfZMesh[1].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfZMesh[1].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfZMesh[1].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
			
			rollOverBooksfZMesh[2].scale.z = DOBBYDO_CUBEMAP.booksf_z;
			rollOverBooksfZMesh[2].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfZMesh[2].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfZMesh[2].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
			rollOverBooksfZMesh[2].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
			
			rollOverBooksfZMesh[3].scale.z = DOBBYDO_CUBEMAP.booksf_z;
			rollOverBooksfZMesh[3].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfZMesh[3].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfZMesh[3].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
			rollOverBooksfZMesh[3].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
			
			rollOverBooksfZMesh[4].scale.z = DOBBYDO_CUBEMAP.booksf_z;
			rollOverBooksfZMesh[4].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfZMesh[4].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfZMesh[4].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
			rollOverBooksfZMesh[4].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
			rollOverBooksfZMesh[4].position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
			

			rollOverBooksfXMesh[1].scale.x = DOBBYDO_CUBEMAP.booksf_x;
			rollOverBooksfXMesh[1].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfXMesh[1].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfXMesh[1].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
			
			rollOverBooksfXMesh[2].scale.x = DOBBYDO_CUBEMAP.booksf_x;
			rollOverBooksfXMesh[2].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfXMesh[2].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfXMesh[2].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
			rollOverBooksfXMesh[2].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
			
			rollOverBooksfXMesh[3].scale.x = DOBBYDO_CUBEMAP.booksf_x;
			rollOverBooksfXMesh[3].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfXMesh[3].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfXMesh[3].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
			rollOverBooksfXMesh[3].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
			
			rollOverBooksfXMesh[4].scale.x = DOBBYDO_CUBEMAP.booksf_x;
			rollOverBooksfXMesh[4].position.copy( intersect.point ).add( intersect.face.normal );
			rollOverBooksfXMesh[4].position.divideScalar( 50 ).round().multiplyScalar( 50 );
			rollOverBooksfXMesh[4].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
			rollOverBooksfXMesh[4].position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
			rollOverBooksfXMesh[4].position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
			
			var step = 50*DOBBYDO_CUBEMAP.booksf_y/DOBBYDO_CUBEMAP.booksf_flw;
			for(var i=0; i <= DOBBYDO_CUBEMAP.booksf_flw; i++){
				rollOverBooksfFlwMesh[i].scale.x = DOBBYDO_CUBEMAP.booksf_x;
				rollOverBooksfFlwMesh[i].scale.z = DOBBYDO_CUBEMAP.booksf_z;
				rollOverBooksfFlwMesh[i].position.copy( intersect.point ).add( intersect.face.normal );
				rollOverBooksfFlwMesh[i].position.divideScalar( 50 ).round().multiplyScalar( 50 );
				rollOverBooksfFlwMesh[i].position.y += (step*i);
				rollOverBooksfFlwMesh[i].position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
				rollOverBooksfFlwMesh[i].position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
			}
		} else{
			//pen_type == 0 || pen_type == 999 990 991
		}
	}
	DOBBYDO_CUBEMAP.render();
}
DOBBYDO_CUBEMAP.onDocumentMouseDown = function ( event ) {
	event.preventDefault();
	if($("#stack_id").val() == 0){
		alert("서고를 선택해주세요.");
		DOBBYDO_CUBEMAP.getStackList();
		DOBBYDO_CUBEMAP.appearAddandList();
		event.stopPropagation();
	    return false;
	}
	switch (event.which) {
	    case 1:
	        // alert('Left Mouse button pressed.');
			var d = document.getElementById('cubemapview').getBoundingClientRect();
			var left_margin = parseInt(d.left);
			var top_margin = parseInt(d.top);
			DOBBYDO_CUBEMAP.mouse.set( ( (event.clientX-left_margin) / (window.innerWidth*6/10) ) * 2 - 1, - ( (event.clientY-top_margin) / window.innerHeight ) * 2 + 1 );
			DOBBYDO_CUBEMAP.raycaster.setFromCamera( DOBBYDO_CUBEMAP.mouse, DOBBYDO_CUBEMAP.camera );
			var intersects = DOBBYDO_CUBEMAP.raycaster.intersectObjects( DOBBYDO_CUBEMAP.objects );
			
			if ( intersects.length > 0 ) {
				var intersect = intersects[0];
				var voxel;
				if ( DOBBYDO_CUBEMAP.pen_type == 0 ) {
					// eraser
					if ( intersect.object != DOBBYDO_CUBEMAP.plane ) {
						var jsonobj = JSON.parse(intersect.object["name"]);
						if(jsonobj.cube_type == "7"){
							// Rack
							var erased_id = jsonobj.object_id;
							var objectsdel_flag = false, objectsdel_idx=0, objectsdel_cnt=0;
							
							for(var idx in DOBBYDO_CUBEMAP.objects){
								if(DOBBYDO_CUBEMAP.objects[idx] != DOBBYDO_CUBEMAP.plane){
									var tmpjsonobj = JSON.parse(DOBBYDO_CUBEMAP.objects[idx]["name"]);
									if(tmpjsonobj.object_id == erased_id){
										objectsdel_cnt++;
										//console.log("objectsdel_cnt : " + objectsdel_cnt);
										DOBBYDO_CUBEMAP.scene.remove( DOBBYDO_CUBEMAP.objects[idx] );
										if(objectsdel_flag == false){
											objectsdel_idx = idx;
											objectsdel_flag = true;
										}
									}
								}
							}
							if(objectsdel_flag){
								DOBBYDO_CUBEMAP.objects.splice( objectsdel_idx, objectsdel_cnt );
							}
							
							
						} else{
							DOBBYDO_CUBEMAP.scene.remove( intersect.object );
							DOBBYDO_CUBEMAP.objects.splice( DOBBYDO_CUBEMAP.objects.indexOf( intersect.object ), 1 );
						}
					}
				} else if( DOBBYDO_CUBEMAP.pen_type == 1) {
					// white pen
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.cubeGeo, DOBBYDO_CUBEMAP.cubeMaterial );
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
					voxel.position.y = intersect.point.y + 25;
					voxel.name = "{ \"cube_type\":1, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":1, \"cube_axis\":0 }";

					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					DOBBYDO_CUBEMAP.object_id++;
				} else if ( DOBBYDO_CUBEMAP.pen_type == 2 ) {
					// red box
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.cubeGeo, DOBBYDO_CUBEMAP.cctvMaterial );
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
					voxel.position.y = intersect.point.y + 25;
					voxel.name = "{ \"cube_type\":2, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":1, \"cube_axis\":0 }";

					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					DOBBYDO_CUBEMAP.object_id++;
				} else if( DOBBYDO_CUBEMAP.pen_type == 7) {
					var voxel;
					
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfYGeo, DOBBYDO_CUBEMAP.realBooksfYMaterial ); 
					voxel.scale.y = DOBBYDO_CUBEMAP.booksf_y;// 50*booksf_y;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_y+", \"cube_axis\":1 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfYGeo, DOBBYDO_CUBEMAP.realBooksfYMaterial ); 
					voxel.scale.y = DOBBYDO_CUBEMAP.booksf_y;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
					voxel.position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_y+", \"cube_axis\":1 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfYGeo, DOBBYDO_CUBEMAP.realBooksfYMaterial ); 
					voxel.scale.y = DOBBYDO_CUBEMAP.booksf_y;// 50*booksf_y;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
					voxel.position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_y+", \"cube_axis\":1 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfYGeo, DOBBYDO_CUBEMAP.realBooksfYMaterial ); 
					voxel.scale.y = DOBBYDO_CUBEMAP.booksf_y;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.y += 25*DOBBYDO_CUBEMAP.booksf_y;
					voxel.position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
					voxel.position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_y+", \"cube_axis\":1 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
							
					// Z
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfZGeo, DOBBYDO_CUBEMAP.realBooksfZMaterial ); 
					voxel.scale.z = DOBBYDO_CUBEMAP.booksf_z;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_z+", \"cube_axis\":2 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfZGeo, DOBBYDO_CUBEMAP.realBooksfZMaterial ); 
					voxel.scale.z = DOBBYDO_CUBEMAP.booksf_z;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
					voxel.position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_z+", \"cube_axis\":2 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfZGeo, DOBBYDO_CUBEMAP.realBooksfZMaterial ); 
					voxel.scale.z = DOBBYDO_CUBEMAP.booksf_z;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
					voxel.position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_z+", \"cube_axis\":2 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfZGeo, DOBBYDO_CUBEMAP.realBooksfZMaterial ); 
					voxel.scale.z = DOBBYDO_CUBEMAP.booksf_z;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
					voxel.position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
					voxel.position.x += 50*DOBBYDO_CUBEMAP.booksf_x;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_z+", \"cube_axis\":2 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					
					// X
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfXGeo, DOBBYDO_CUBEMAP.realBooksfXMaterial ); 
					voxel.scale.x = DOBBYDO_CUBEMAP.booksf_x;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_x+", \"cube_axis\":3 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
							
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfXGeo, DOBBYDO_CUBEMAP.realBooksfXMaterial ); 
					voxel.scale.x = DOBBYDO_CUBEMAP.booksf_x;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
					voxel.position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_x+", \"cube_axis\":3 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
					
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfXGeo, DOBBYDO_CUBEMAP.realBooksfXMaterial ); 
					voxel.scale.x = DOBBYDO_CUBEMAP.booksf_x;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
					voxel.position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_x+", \"cube_axis\":3 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
						
					voxel = new THREE.Mesh( DOBBYDO_CUBEMAP.realBooksfXGeo, DOBBYDO_CUBEMAP.realBooksfXMaterial ); 
					voxel.scale.x = DOBBYDO_CUBEMAP.booksf_x;
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
					voxel.position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
					voxel.position.y += 50*DOBBYDO_CUBEMAP.booksf_y;
					voxel.position.z += 50*DOBBYDO_CUBEMAP.booksf_z;
					voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_x+", \"cube_axis\":3 }";
					DOBBYDO_CUBEMAP.scene.add( voxel );
					DOBBYDO_CUBEMAP.objects.push( voxel );
		
					//Add Booksf_flw
					var step = 50 * DOBBYDO_CUBEMAP.booksf_y / DOBBYDO_CUBEMAP.booksf_flw;
					for(var i=0; i <= DOBBYDO_CUBEMAP.booksf_flw; i++){
						voxel = new THREE.Mesh(DOBBYDO_CUBEMAP.realBooksfFlwGeo, DOBBYDO_CUBEMAP.realBooksfFlwMaterial); 
						voxel.scale.x = DOBBYDO_CUBEMAP.booksf_x;
						voxel.scale.z = DOBBYDO_CUBEMAP.booksf_z;
						voxel.position.copy( intersect.point ).add( intersect.face.normal );
						voxel.position.divideScalar( 50 ).round().multiplyScalar( 50 );
						voxel.position.y += (step*i);
						voxel.position.x += 25*DOBBYDO_CUBEMAP.booksf_x;
						voxel.position.z += 25*DOBBYDO_CUBEMAP.booksf_z;
							
						voxel.name = "{ \"cube_type\":7, \"linked_id\":"+DOBBYDO_CUBEMAP.static_linked_id+", \"object_id\":"+DOBBYDO_CUBEMAP.object_id+", \"cube_size\":"+DOBBYDO_CUBEMAP.booksf_flw+", \"cube_axis\":4 }";
						DOBBYDO_CUBEMAP.scene.add( voxel );
						DOBBYDO_CUBEMAP.objects.push( voxel );
					}
					
					DOBBYDO_CUBEMAP.object_id++;
				} else if ( DOBBYDO_CUBEMAP.pen_type == 999 ) {// 999:magnifier
					if ( intersect.object != DOBBYDO_CUBEMAP.plane ) {
						var jsonobj = JSON.parse(intersect.object["name"]);
						if(jsonobj.cube_type == "1" || jsonobj.cube_type == "2"){
							DOBBYDO_CUBEMAP.getBoxView(jsonobj.linked_id);
						} else if(jsonobj.cube_type == "7"){
							DOBBYDO_CUBEMAP.getBooksfView(jsonobj.linked_id);
						}

				        var left_margin = parseInt(event.clientX) - 48;
						var top_margin = parseInt(event.clientY) - 48*2;
						$("#view").css("left",left_margin);
						$("#view").css("top",top_margin);

						$("#view").css("display","block");
						$("#rightClickMenuTable").css("display","none");
						$("#rightClickContainer").css("display","block");
					}
				} else if( DOBBYDO_CUBEMAP.pen_type == 990 ){//990:hand 
					if ( intersect.object != DOBBYDO_CUBEMAP.plane ) {
						DOBBYDO_CUBEMAP.setPen_type(991);
						var jsonobj = JSON.parse(intersect.object["name"]);
						if(jsonobj.cube_type == "1" || jsonobj.cube_type == "2"){
							intersect.object.material.transparent = true;
							intersect.object.material.opacity  = 0.5;
							grabbing_objects[0] = intersect.object;
							DOBBYDO_CUBEMAP.objects.splice( DOBBYDO_CUBEMAP.objects.indexOf( intersect.object ), 1 );
						} else if(jsonobj.cube_type == "7"){
							// Rack
							var erased_id = jsonobj.object_id;
							var objectsdel_flag = false, objectsdel_idx=0, objectsdel_cnt=0;
							
							for(var idx in DOBBYDO_CUBEMAP.objects){
								if(DOBBYDO_CUBEMAP.objects[idx] != DOBBYDO_CUBEMAP.plane){
									var tmpjsonobj = JSON.parse(DOBBYDO_CUBEMAP.objects[idx]["name"]);
									if(tmpjsonobj.object_id == erased_id){
										DOBBYDO_CUBEMAP.objects[idx].material.transparent = true;
										DOBBYDO_CUBEMAP.objects[idx].material.opacity  = 0.5;
										grabbing_objects[objectsdel_cnt] = DOBBYDO_CUBEMAP.objects[idx];
										objectsdel_cnt++;
										if(objectsdel_flag == false){
											objectsdel_idx = idx;
											objectsdel_flag = true;
										}
										if(tmpjsonobj.cube_axis == 1){
											DOBBYDO_CUBEMAP.booksf_y = tmpjsonobj.cube_size;
										} else if(tmpjsonobj.cube_axis == 2){
											DOBBYDO_CUBEMAP.booksf_z = tmpjsonobj.cube_size;
										} else if(tmpjsonobj.cube_axis == 3){
											DOBBYDO_CUBEMAP.booksf_x = tmpjsonobj.cube_size;
										} else if(tmpjsonobj.cube_axis == 4){
											DOBBYDO_CUBEMAP.booksf_flw = tmpjsonobj.cube_size;
										}
										console.log(DOBBYDO_CUBEMAP.booksf_y+" "+DOBBYDO_CUBEMAP.booksf_x+" "+DOBBYDO_CUBEMAP.booksf_z+" "+DOBBYDO_CUBEMAP.booksf_y+" ")
										console.log("objectsdel_cnt : " + objectsdel_cnt)
									}
								}
							}
							if(objectsdel_flag){
								DOBBYDO_CUBEMAP.objects.splice( objectsdel_idx, objectsdel_cnt );
							}
						}
					}
				} else if( DOBBYDO_CUBEMAP.pen_type == 991 ){ //991:hand-grab
					DOBBYDO_CUBEMAP.setPen_type(990);
					var jsonobj = JSON.parse(grabbing_objects[0]["name"]);
					if(jsonobj.cube_type == "1" || jsonobj.cube_type == "2"){
						grabbing_objects[0].material.opacity  = 1;
						grabbing_objects[0].material.transparent = false;
						DOBBYDO_CUBEMAP.objects.push( grabbing_objects[0] );
						grabbing_objects = [];
					} else if(jsonobj.cube_type == "7"){
						for(var idx in grabbing_objects){
							grabbing_objects[idx].material.opacity  = 1;
							grabbing_objects[idx].material.transparent = false;
							DOBBYDO_CUBEMAP.objects.push( grabbing_objects[idx] );
						}
						grabbing_objects = [];
					}
				} else if(DOBBYDO_CUBEMAP.pen_type == 992){ //992:full-grab tractor
					if ( intersect.object != DOBBYDO_CUBEMAP.plane ) {
						DOBBYDO_CUBEMAP.setPen_type(993);
						var jsonobj = JSON.parse(intersect.object["name"]);
						if(jsonobj.cube_type == "7"){ // Rack
							var erased_id = jsonobj.object_id;
							var objectsdel_flag = false, objectsdel_idx=0, objectsdel_cnt=0;
							var rack_x_pos_min=9999, rack_x_pos_max=-9999;
							var rack_z_pos_min=9999, rack_z_pos_max=-9999;
							
							for(var idx in DOBBYDO_CUBEMAP.objects){
								if(DOBBYDO_CUBEMAP.objects[idx] != DOBBYDO_CUBEMAP.plane){
									var tmpjsonobj = JSON.parse(DOBBYDO_CUBEMAP.objects[idx]["name"]);
									if(tmpjsonobj.object_id == erased_id){
										DOBBYDO_CUBEMAP.objects[idx].material.transparent = true;
										DOBBYDO_CUBEMAP.objects[idx].material.opacity  = 0.5;
										grabbing_objects[objectsdel_cnt] = DOBBYDO_CUBEMAP.objects[idx];
										objectsdel_cnt++;
										
										if(DOBBYDO_CUBEMAP.objects[idx].position.x >= rack_x_pos_max){
											rack_x_pos_max = DOBBYDO_CUBEMAP.objects[idx].position.x;
										}
										if(DOBBYDO_CUBEMAP.objects[idx].position.x <= rack_x_pos_min){
											rack_x_pos_min = DOBBYDO_CUBEMAP.objects[idx].position.x;
										}
										if(DOBBYDO_CUBEMAP.objects[idx].position.z >= rack_z_pos_max){
											rack_z_pos_max = DOBBYDO_CUBEMAP.objects[idx].position.z;
										}
										if(DOBBYDO_CUBEMAP.objects[idx].position.z <= rack_z_pos_min){
											rack_z_pos_min = DOBBYDO_CUBEMAP.objects[idx].position.z;
										}
										if(objectsdel_flag == false){
											objectsdel_idx = idx;
											objectsdel_flag = true;
										}
										if(tmpjsonobj.cube_axis == 1){
											DOBBYDO_CUBEMAP.booksf_y = tmpjsonobj.cube_size;
										} else if(tmpjsonobj.cube_axis == 2){
											DOBBYDO_CUBEMAP.booksf_z = tmpjsonobj.cube_size;
										} else if(tmpjsonobj.cube_axis == 3){
											DOBBYDO_CUBEMAP.booksf_x = tmpjsonobj.cube_size;
										} else if(tmpjsonobj.cube_axis == 4){
											DOBBYDO_CUBEMAP.booksf_flw = tmpjsonobj.cube_size;
										}
									}
								}
							}
							if(objectsdel_flag){
								DOBBYDO_CUBEMAP.objects.splice( objectsdel_idx, objectsdel_cnt );
							}
							
							var rest_objects_last_idx = DOBBYDO_CUBEMAP.objects.length-1;
							var splice_object_lst = [];
							console.log("rest_objects_last_idx : "+rest_objects_last_idx);
							//Boxes In The Rack 
							for(var idx in DOBBYDO_CUBEMAP.objects){
								if(rest_objects_last_idx - idx != 0){ // plane
									var jsonobj = JSON.parse(DOBBYDO_CUBEMAP.objects[rest_objects_last_idx - idx]["name"]);
									if(jsonobj.cube_type != "7"){ // Not Near Rack
										console.log("idx : "+idx+" x:"+rack_x_pos_min+","+rack_x_pos_max +" z:"+rack_z_pos_min+","+rack_z_pos_max);
										if(rack_x_pos_min <= DOBBYDO_CUBEMAP.objects[rest_objects_last_idx - idx].position.x && DOBBYDO_CUBEMAP.objects[rest_objects_last_idx - idx].position.x <= rack_x_pos_max){
											if(rack_z_pos_min <= DOBBYDO_CUBEMAP.objects[rest_objects_last_idx - idx].position.z && DOBBYDO_CUBEMAP.objects[rest_objects_last_idx - idx].position.z <= rack_z_pos_max){
												DOBBYDO_CUBEMAP.objects[rest_objects_last_idx - idx].material.transparent = true;
												DOBBYDO_CUBEMAP.objects[rest_objects_last_idx - idx].material.opacity  = 0.5;
												
												grabbing_objects[objectsdel_cnt] = DOBBYDO_CUBEMAP.objects[rest_objects_last_idx - idx];
												objectsdel_cnt++;
												splice_object_lst.push(rest_objects_last_idx - idx);
											}
										}
									}
								}
							}
							for(var idx in splice_object_lst){
								//Splice Object From Backside
								DOBBYDO_CUBEMAP.objects.splice( splice_object_lst[idx], 1 );
							}
							
						}
					}
					
				} else if( DOBBYDO_CUBEMAP.pen_type == 993 ){
					DOBBYDO_CUBEMAP.setPen_type(992);
					for(var idx in grabbing_objects){
						grabbing_objects[idx].material.opacity  = 1;
						grabbing_objects[idx].material.transparent = false;
						DOBBYDO_CUBEMAP.objects.push( grabbing_objects[idx] );
					}
					grabbing_objects = [];
				}
				
				DOBBYDO_CUBEMAP.render();
			}
			break;
	    case 2:
	        // alert('Middle Mouse button pressed.');
	        break;
	    case 3:
	    	var d = document.getElementById('cubemapview').getBoundingClientRect();
			var left_margin = parseInt(d.left);
			var top_margin = parseInt(d.top);
			DOBBYDO_CUBEMAP.mouse.set( ( (event.clientX-left_margin) / (window.innerWidth*6/10) ) * 2 - 1, - ( (event.clientY-top_margin) / window.innerHeight ) * 2 + 1 );
			DOBBYDO_CUBEMAP.raycaster.setFromCamera( DOBBYDO_CUBEMAP.mouse, DOBBYDO_CUBEMAP.camera );
			var intersects = DOBBYDO_CUBEMAP.raycaster.intersectObjects( objects );
			
			if ( intersects.length > 0 ) {
				var intersect = intersects[0];
				var voxel;
		    	if( pen_type == 991 ){
		    		var jsonobj = JSON.parse(grabbing_objects[0]["name"]);
					if(jsonobj.cube_type == "1" || jsonobj.cube_type == "2"){
						DOBBYDO_CUBEMAP.setPen_type(990);
						grabbing_objects[0].material.opacity  = 1;
						grabbing_objects[0].material.transparent = false;
						objects.push( grabbing_objects[0] );
						grabbing_objects = [];
					}
		    	}
			}
	    	//alert('Right Mouse button pressed.');
	        rollOverMesh.position.y = 10000;
	    	
	    	rollOverBooksfXMesh[1].position.y = 10000;
	    	rollOverBooksfXMesh[2].position.y = 10000;
	    	rollOverBooksfXMesh[3].position.y = 10000;
	    	rollOverBooksfXMesh[4].position.y = 10000;

	    	rollOverBooksfZMesh[1].position.y = 10000;
	    	rollOverBooksfZMesh[2].position.y = 10000;
	    	rollOverBooksfZMesh[3].position.y = 10000;
	    	rollOverBooksfZMesh[4].position.y = 10000;

	    	rollOverBooksfYMesh[1].position.y = 10000;
	    	rollOverBooksfYMesh[2].position.y = 10000;
	    	rollOverBooksfYMesh[3].position.y = 10000;
	    	rollOverBooksfYMesh[4].position.y = 10000;
	    		
	    	for(var idx=0; idx<50; idx++){
	    		rollOverBooksfFlwMesh[idx].position.y = 10000;
	    	}
	    	
	    	DOBBYDO_CUBEMAP.render();
	    	
	    	var left_margin = parseInt(event.clientX) - 48;
			var top_margin = parseInt(event.clientY) - 48*2;
			$("#rightClickMenuTable").css("left",left_margin);
			$("#rightClickMenuTable").css("top",top_margin);

			$("#view").css("display","none");
			$("#addandlist").css("display","none");
			$("#rightClickMenuTable").css("display","block");
			$("#rightClickContainer").css("display","block");
			
	        break;
	    default:
	        alert('You have a strange Mouse!');
	}
	event.stopPropagation();
	return false;
}

DOBBYDO_CUBEMAP.appearAddandList = function (){
	$("#view").css("display","none");
	// $("#addandlist").css("z-index","92");
	$("#addandlist").css("display","block");
	$("#rightClickMenuTable").css("display","none");
	$("#rightClickContainer").css("display","block");
}

DOBBYDO_CUBEMAP.disappearRightClickContainer = function (){
	// $("#view").css("z-index","-1");
	$("#view").css("display","none");
	// $("#addandlist").css("z-index","-1");
	$("#addandlist").css("display","none");
	// $("#rightClickMenuTable").css("z-index","-1");
	$("#rightClickMenuTable").css("display","none");
	// $("#rightClickContainer").css("z-index","-1");
	$("#rightClickContainer").css("display","none");
	document.getElementById("container").focus();
}

DOBBYDO_CUBEMAP.onDocumentKeyDown = function ( event ) {
	switch( event.keyCode ) {
		// case 16: isShiftDown = true; break; //shift key
		// case 17: isCtrlDown = true; break; //ctrl key
		// case 18: isAltDown = true; break; //ctrl key
		case 37:  // left = 37
			if(DOBBYDO_CUBEMAP.camera.position.z != -2000){
				DOBBYDO_CUBEMAP.camera.position.z -= 100;
				DOBBYDO_CUBEMAP.camera.lookAt( new THREE.Vector3() );
				DOBBYDO_CUBEMAP.render();
			}
			break;
		case 38:  // up = 38
			if(DOBBYDO_CUBEMAP.camera.position.y != 0){
				DOBBYDO_CUBEMAP.camera.position.x -= 100;
				DOBBYDO_CUBEMAP.camera.position.y -= 100;
				DOBBYDO_CUBEMAP.camera.lookAt( new THREE.Vector3() );
				DOBBYDO_CUBEMAP.render();
			}
			break;
		case 39:  // right = 39
			if(DOBBYDO_CUBEMAP.camera.position.z != 2000){
				DOBBYDO_CUBEMAP.camera.position.z += 100;
				DOBBYDO_CUBEMAP.camera.lookAt( new THREE.Vector3() );
				DOBBYDO_CUBEMAP.render();
			}
			break;
		case 40:  // down = 40
			DOBBYDO_CUBEMAP.camera.position.x += 100;
			DOBBYDO_CUBEMAP.camera.position.y += 100;
			DOBBYDO_CUBEMAP.camera.lookAt( new THREE.Vector3() );
			DOBBYDO_CUBEMAP.render();
			break;
	}
}

DOBBYDO_CUBEMAP.myKeyDownEventHandler = function (keycode){
	//
}

DOBBYDO_CUBEMAP.onDocumentKeyUp = function ( event ) {
	switch ( event.keyCode ) {
		// case 16: isShiftDown = false; break;
		// case 17: isCtrlDown = false; break;
		// case 18: isAltDown = false; break;
	}
}
DOBBYDO_CUBEMAP.render = function () {
	this.renderer.render( this.scene, this.camera );
}
DOBBYDO_CUBEMAP.setPen_type = function (i){
	$('#container').css("cursor", "default");
	if(i==3){
		// y-axis green pen
		rollOverPenMesh.rotation.x = 0;
		rollOverPenMesh.rotation.z = 0;
	} else if(i==4){
		// z-axis green pen
		rollOverPenMesh.rotation.x = 0.5*Math.PI;
		rollOverPenMesh.rotation.z = 0;
	} else if(i==5){
		// x-axis green pen
		rollOverPenMesh.rotation.z = 0.5*Math.PI;
	} else if(i==7){
		
	} else if(i==990 || i==992){
		$('#container').css("cursor", "grab");
		$('#container').css("cursor", "-moz-grab");
		$('#container').css("cursor", "-webkit-grab");
	} else if(i==991 || i==993){
		$('#container').css("cursor", "grabbing");
		$('#container').css("cursor", "-moz-grabbing");
		$('#container').css("cursor", "-webkit-grabbing");
	}
	
	
	this.pen_type=i;
	this.disappearRightClickContainer();
}
