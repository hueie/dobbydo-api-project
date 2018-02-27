
var DOBBYDO_FLOORPLANMAP_GLOBAL_ID;
var DOBBYDO_FLOORPLANMAP_GLOBAL_WIDTH;
var DOBBYDO_FLOORPLANMAP_GLOBAL_HEIGHT;
var DOBBYDO_FLOORPLANMAP_GLOBAL_WIDTHCNT;
var DOBBYDO_FLOORPLANMAP_GLOBAL_HEIGHTCNT;

function DOBBYDO_FLOORPLANMAP(pGLOBAL_ID, pW, pH, pWC, pHC) {
	DOBBYDO_FLOORPLANMAP_GLOBAL_ID = pGLOBAL_ID;
	DOBBYDO_FLOORPLANMAP_GLOBAL_WIDTH = pW;
	DOBBYDO_FLOORPLANMAP_GLOBAL_HEIGHT = pH;
	DOBBYDO_FLOORPLANMAP_GLOBAL_WIDTHCNT = pWC;
	DOBBYDO_FLOORPLANMAP_GLOBAL_HEIGHTCNT = pHC;
	this.type = "edit"; //edit, view
	this.rects;

	//input configuration width height interval
	this.canvas;
	this.ctx;
	this.width;
	this.height;
	this.widthCnt;
	this.heightCnt;
	this.widthIntval;
	this.heightIntval;
	
	this.isClicked = false;
	this.isClickedDivBefore = true;
	this.clickedDiv;
	this.clickedPosition;
	this.preOffsetX;
	this.preOffsetY;
	
	//DOBBYDO_FLOORPLANMAP.run();
}

DOBBYDO_FLOORPLANMAP.run = function () {
	DOBBYDO_FLOORPLANMAP.width = DOBBYDO_FLOORPLANMAP_GLOBAL_WIDTH;
	DOBBYDO_FLOORPLANMAP.height = DOBBYDO_FLOORPLANMAP_GLOBAL_HEIGHT;
	DOBBYDO_FLOORPLANMAP.widthCnt = DOBBYDO_FLOORPLANMAP_GLOBAL_WIDTHCNT;
	DOBBYDO_FLOORPLANMAP.heightCnt = DOBBYDO_FLOORPLANMAP_GLOBAL_HEIGHTCNT;
	DOBBYDO_FLOORPLANMAP.widthIntval = DOBBYDO_FLOORPLANMAP.width/DOBBYDO_FLOORPLANMAP.widthCnt;
	DOBBYDO_FLOORPLANMAP.heightIntval = DOBBYDO_FLOORPLANMAP.height/DOBBYDO_FLOORPLANMAP.heightCnt;
	
	var init_html = "<canvas width='"+DOBBYDO_FLOORPLANMAP.width+"px' height='"+DOBBYDO_FLOORPLANMAP.height+"px' id='DOBBYDO_FLOORPLANMAP_BASE_CONTAINER' style='z-index:1;position:fixed;top:0;left:0;margin:0;padding:0;'></canvas>";
	init_html += "<div id='DOBBYDO_FLOORPLANMAP_CONTAINER' style='z-index:10;position: fixed; border: 1px solid red;'> </div>";
	
	$('#'+DOBBYDO_FLOORPLANMAP_GLOBAL_ID).html(init_html) ;

	DOBBYDO_FLOORPLANMAP.canvas = $('#DOBBYDO_FLOORPLANMAP_BASE_CONTAINER'); // in your HTML this element appears as <canvas id="myCanvas"></canvas>
	DOBBYDO_FLOORPLANMAP.ctx = DOBBYDO_FLOORPLANMAP.canvas[0].getContext('2d');
	
	for(var idx=0; idx <= DOBBYDO_FLOORPLANMAP.widthCnt ; idx++){
		DOBBYDO_FLOORPLANMAP.ctx.beginPath();
		DOBBYDO_FLOORPLANMAP.ctx.moveTo(idx * DOBBYDO_FLOORPLANMAP.widthIntval,0);
		DOBBYDO_FLOORPLANMAP.ctx.lineTo(idx * DOBBYDO_FLOORPLANMAP.widthIntval,DOBBYDO_FLOORPLANMAP.height);
		DOBBYDO_FLOORPLANMAP.ctx.lineWidth = 1;
		DOBBYDO_FLOORPLANMAP.ctx.strokeStyle = '#808080';
		DOBBYDO_FLOORPLANMAP.ctx.stroke();
	}

	for(var idx=0; idx <= DOBBYDO_FLOORPLANMAP.heightCnt ; idx++){
		DOBBYDO_FLOORPLANMAP.ctx.beginPath();
		DOBBYDO_FLOORPLANMAP.ctx.moveTo(0, idx * DOBBYDO_FLOORPLANMAP.heightIntval);
		DOBBYDO_FLOORPLANMAP.ctx.lineTo(DOBBYDO_FLOORPLANMAP.width, idx * DOBBYDO_FLOORPLANMAP.heightIntval);
		DOBBYDO_FLOORPLANMAP.ctx.lineWidth = 1;
		DOBBYDO_FLOORPLANMAP.ctx.strokeStyle = '#808080';
		DOBBYDO_FLOORPLANMAP.ctx.stroke();
	}
	
	DOBBYDO_FLOORPLANMAP.getBooksfList();
	DOBBYDO_FLOORPLANMAP.drawRects(DOBBYDO_FLOORPLANMAP.rects);
	DOBBYDO_FLOORPLANMAP.canvas.bind( "mousemove", DOBBYDO_FLOORPLANMAP.onDocumentMouseMove);
	
}

DOBBYDO_FLOORPLANMAP.getBooksfList = function (){
	//Move (-500,-500)/50 -> (0,0)/25 
	var x_axis_gap = 500;
	var z_axis_gap = 500;
	
	var min_pos_x = 0;
	var max_pos_x = 150;
	var min_pos_z = 50;
	var max_pos_z = 150;
	var cubemap_intval = 50;
	var tmp_w = (max_pos_x - min_pos_x)/cubemap_intval;
	var tmp_h = (max_pos_z - min_pos_z)/cubemap_intval;
	var tmp_y = (min_pos_x + x_axis_gap)/cubemap_intval;
	var tmp_x = DOBBYDO_FLOORPLANMAP.widthCnt - tmp_h - (min_pos_z + z_axis_gap)/cubemap_intval;
	console.log(tmp_x + " " + tmp_y + " " + tmp_w + " " + tmp_h + " ");
	
	/*
	DOBBYDO_FLOORPLANMAP.rects = [
		{idx: 1, x: DOBBYDO_FLOORPLANMAP.widthCnt *1, y: DOBBYDO_FLOORPLANMAP.heightCnt * 1, w: DOBBYDO_FLOORPLANMAP.widthCnt *2, h: DOBBYDO_FLOORPLANMAP.heightCnt * 2},
        {idx: 2, x: DOBBYDO_FLOORPLANMAP.widthCnt *5, y: DOBBYDO_FLOORPLANMAP.heightCnt * 5, w: DOBBYDO_FLOORPLANMAP.widthCnt *6, h: DOBBYDO_FLOORPLANMAP.heightCnt * 7}
		];
	*/
	DOBBYDO_FLOORPLANMAP.rects = [
		{idx: 1, x: tmp_x, y: tmp_y, w: tmp_w, h: tmp_h},
		];
	
	/*
	$("#stack_add_form").css("display","none");
	$("#booksf_add_form").css("display","block");
	$("#box_add_form").css("display","none");
	// 서가
    var stack_id = "77";//$("#stack_id").val();
    //SELECT min(pos_x), max(pos_x), min(pos_z), max(pos_z) FROM dobbydo.cube_map where cube_type = 7 and pos_y = 0 and cube_axis != 4 group by object_id;

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
	*/
}



DOBBYDO_FLOORPLANMAP.drawRects = function (rects) {
	for (var i = 0, len = rects.length; i < len; i++) {
		var tmpW = parseInt(rects[i].w);
		tmpW *= DOBBYDO_FLOORPLANMAP.widthIntval;
		tmpW -= 1;
		var tmpH = parseInt(rects[i].h);
		tmpH *= DOBBYDO_FLOORPLANMAP.heightIntval;
		tmpH -= 1;
		var tmpX = parseInt(rects[i].x);
		tmpX *= DOBBYDO_FLOORPLANMAP.widthIntval;
		var tmpY = parseInt(rects[i].y);
		tmpY *= DOBBYDO_FLOORPLANMAP.heightIntval;
		
		var tmpIdx = rects[i].idx;
		var childHTML = "<div id='booksf_id_"+tmpIdx+"' style='z-index:11;position: fixed; border: 2px solid #0000ff; top: "+tmpY+"px; left: "+tmpX+"px; padding:"+tmpW/2+"px "+tmpH/2+"px;'> </div>"
		$("#DOBBYDO_FLOORPLANMAP_CONTAINER").append(childHTML);
		
		$("#booksf_id_"+rects[i].idx).bind( "mousedown", DOBBYDO_FLOORPLANMAP.onDivMouseDown);
		$("#booksf_id_"+rects[i].idx).bind( "mouseup", DOBBYDO_FLOORPLANMAP.onDivMouseUp);
		$("#booksf_id_"+rects[i].idx).bind( "mousemove", DOBBYDO_FLOORPLANMAP.onDivMouseMove);
    }
}


DOBBYDO_FLOORPLANMAP.onDocumentMouseMove = function ( e ) {
	e.stopPropagation();
	e.preventDefault();
	console.log('move: ' + e.offsetX + '/' + e.offsetY);
	console.log('size: ' + $(this).outerWidth() + '/' + $(this).outerHeight());
	
	var w = $(this).outerWidth();
	var h = $(this).outerHeight();
	
	var rect = collides(w, h, e.offsetX, e.offsetY);
    
	if(DOBBYDO_FLOORPLANMAP.isClicked){
		if(DOBBYDO_FLOORPLANMAP.clickedPosition == 1){
			var preTop = DOBBYDO_FLOORPLANMAP.clickedDiv.offset().top;
    		var preLeft = DOBBYDO_FLOORPLANMAP.clickedDiv.offset().left;
    		var subOffsetY = e.offsetY - DOBBYDO_FLOORPLANMAP.preOffsetY;
    		var subOffsetX = e.offsetX - DOBBYDO_FLOORPLANMAP.preOffsetX;
    		
    		var top = preTop + subOffsetY;
    		var left = preLeft + subOffsetX;
    		DOBBYDO_FLOORPLANMAP.clickedDiv.css('top', top+'px');
    		DOBBYDO_FLOORPLANMAP.clickedDiv.css('left', left+'px');
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 4){
			console.log("clickedPosition 4");
			var preTop = DOBBYDO_FLOORPLANMAP.clickedDiv.offset().top;
			var preHeight = parseInt(DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-top'));
    		var subOffsetY = e.offsetY - preTop;

    		var top = e.offsetY;//preTop + subOffsetY;
        	var height = preHeight - subOffsetY;
        	if(height > 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('top', top+'px');
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-top', height+'px');
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 5){
			console.log("clickedPosition 5");
			var preTop = DOBBYDO_FLOORPLANMAP.clickedDiv.offset().top;
    		var preHeight = parseInt(DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-bottom'));
    		var subOffsetY = e.offsetY - DOBBYDO_FLOORPLANMAP.preOffsetY;
    		
    		if(DOBBYDO_FLOORPLANMAP.isClickedDivBefore == true){
    			subOffsetY -= preTop;
    			DOBBYDO_FLOORPLANMAP.isClickedDivBefore = false;
    		}
    		
        	var height = preHeight + subOffsetY;
        	if(height > 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-bottom', height+'px');
        		DOBBYDO_FLOORPLANMAP.preOffsetY = e.offsetY;
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 6){
			console.log("clickedPosition 6");
			var preLeft = DOBBYDO_FLOORPLANMAP.clickedDiv.offset().left;
			var preWidth = parseInt(DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-left'));
    		var subOffsetX = e.offsetX - preLeft;

    		var left = e.offsetX;//preTop + subOffsetY;
        	var width = preWidth - subOffsetX;
        	if(width > 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('left', left+'px');
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-left', width+'px');
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 7){
			console.log("clickedPosition 7");
			var preLeft = DOBBYDO_FLOORPLANMAP.clickedDiv.offset().left;
    		var preWidth = parseInt(DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-right'));
    		var subOffsetX = e.offsetX - DOBBYDO_FLOORPLANMAP.preOffsetX;
    		
    		if(DOBBYDO_FLOORPLANMAP.isClickedDivBefore == true){
    			subOffsetX -= preLeft;
    			DOBBYDO_FLOORPLANMAP.isClickedDivBefore = false;
    		}
        	
    		var width = preWidth + subOffsetX;
        	if(width > 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-right', width+'px');
        		DOBBYDO_FLOORPLANMAP.preOffsetX = e.offsetX;
        	}
		}
	} else {
		switch(rect.isCollision) {
		    case 1:
		    	$(this).css("cursor","all-scroll");
		        break;
		    case 4:
		    	$(this).css("cursor","n-resize");
		        break;
		    case 5:
		    	$(this).css("cursor","n-resize");
		        break;    
		    case 6:
		    	$(this).css("cursor","e-resize");
		        break;
		    case 7:
		    	$(this).css("cursor","e-resize");
		        break;    
		    default:
		    	$(this).css("cursor","default");
		}
	}
	
}

DOBBYDO_FLOORPLANMAP.onDivMouseMove = function ( e ) {
	e.stopPropagation();
	e.preventDefault();
	console.log('move: ' + e.offsetX + '/' + e.offsetY);
	console.log('size: ' + $(this).outerWidth() + '/' + $(this).outerHeight());
	
	var w = $(this).outerWidth();
	var h = $(this).outerHeight();
	
	var rect = collides(w, h, e.offsetX, e.offsetY);
    
	if(DOBBYDO_FLOORPLANMAP.isClicked){
		if(DOBBYDO_FLOORPLANMAP.clickedPosition == 1){
			var preTop = $(this).offset().top;
    		var preLeft = $(this).offset().left;
    		
    		var subOffsetY = e.offsetY - DOBBYDO_FLOORPLANMAP.preOffsetY;
    		var subOffsetX = e.offsetX - DOBBYDO_FLOORPLANMAP.preOffsetX;
    		
    		var top = preTop + subOffsetY;
    		var left = preLeft + subOffsetX;
    		DOBBYDO_FLOORPLANMAP.clickedDiv.css('top', top+'px');
    		DOBBYDO_FLOORPLANMAP.clickedDiv.css('left', left+'px');
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 4){
			console.log("clickedPosition 4");
			var preTop = $(this).offset().top;
    		var preHeight = parseInt($(this).css('padding-top'));
    		var subOffsetY = e.offsetY - DOBBYDO_FLOORPLANMAP.preOffsetY;
    			
        	var top = preTop + subOffsetY;
        	var height = preHeight - subOffsetY;
        	if(height > 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('top', top+'px');
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-top', height+'px');
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 5){
			console.log("clickedPosition 5");
			var preTop = $(this).offset().top;
    		var preHeight = parseInt($(this).css('padding-bottom'));
    		var subOffsetY = e.offsetY - DOBBYDO_FLOORPLANMAP.preOffsetY;
    		
    		if(DOBBYDO_FLOORPLANMAP.isClickedDivBefore == false){
    			subOffsetY += preTop;
    			DOBBYDO_FLOORPLANMAP.isClickedDivBefore = true;
    		}
    		
        	var height = preHeight + subOffsetY;
        	if(height > 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-bottom', height+'px');
        		DOBBYDO_FLOORPLANMAP.preOffsetY = e.offsetY;
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 6){
			console.log("clickedPosition 6");
			var preLeft = $(this).offset().left;
    		var preWidth = parseInt($(this).css('padding-left'));
    		var subOffsetX = e.offsetX - DOBBYDO_FLOORPLANMAP.preOffsetX;
    			
        	var left = preLeft + subOffsetX;
        	var width = preWidth - subOffsetX;
        	if(width > 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('left', left+'px');
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-left', width+'px');
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 7){
			console.log("clickedPosition 7");
			var preLeft = $(this).offset().left;
    		var preWidth = parseInt($(this).css('padding-right'));
    		var subOffsetX = DOBBYDO_FLOORPLANMAP.preOffsetX - e.offsetX;
    		
    		if(DOBBYDO_FLOORPLANMAP.isClickedDivBefore == false){
    			subOffsetX -= preLeft;
    			DOBBYDO_FLOORPLANMAP.isClickedDivBefore = true;
    		}
    		
        	var width = preWidth - subOffsetX;
        	if(width > 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-right', width+'px');
        		DOBBYDO_FLOORPLANMAP.preOffsetX = e.offsetX;
        	}
		}
	} else {
		switch(rect.isCollision) {
		    case 1:
		    	$(this).css("cursor","all-scroll");
		        break;
		    case 4:
		    	$(this).css("cursor","n-resize");
		        break;
		    case 5:
		    	$(this).css("cursor","n-resize");
		        break;    
		    case 6:
		    	$(this).css("cursor","e-resize");
		        break;
		    case 7:
		    	$(this).css("cursor","e-resize");
		        break;    
		    default:
		    	$(this).css("cursor","default");
		}
	}
	
}

DOBBYDO_FLOORPLANMAP.onDivMouseUp = function ( e ) {
	e.stopPropagation();
	e.preventDefault();
	var w = $(this).outerWidth();
	var h = $(this).outerHeight();
	var rect = collides(w, h, e.offsetX, e.offsetY);
    switch(rect.isCollision) {
	    case 1:
	    	var preTop = $(this).offset().top;
	    	var preLeft = $(this).offset().left;
	    	var top = Math.round(preTop/DOBBYDO_FLOORPLANMAP.heightIntval)*DOBBYDO_FLOORPLANMAP.heightIntval;
	    	var left = Math.round(preLeft/DOBBYDO_FLOORPLANMAP.widthIntval)*DOBBYDO_FLOORPLANMAP.widthIntval;

	    	$(this).css('top', top+'px');
	    	$(this).css('left', left+'px');
	    	$(this).css("z-index","11");
	    	$(this).css("border-color","#0000ff");
	        break;
	    case 4:
	    	var preTop = $(this).offset().top;
	    	var preHeight = parseInt($(this).css('padding-top'));
	    	var top = Math.round(preTop/DOBBYDO_FLOORPLANMAP.heightIntval)*DOBBYDO_FLOORPLANMAP.heightIntval;
	    	var height = Math.round(preHeight/DOBBYDO_FLOORPLANMAP.heightIntval)*DOBBYDO_FLOORPLANMAP.heightIntval;
	    	
	    	$(this).css('top', top+'px');
    		$(this).css('padding-top', height+'px');
	    	$(this).css("z-index","11");
	    	$(this).css("border-color","#0000ff");
	        break;
	    case 5:
	    	var preHeight = parseInt($(this).css('padding-bottom'));
	    	var height = Math.round(preHeight/DOBBYDO_FLOORPLANMAP.heightIntval)*DOBBYDO_FLOORPLANMAP.heightIntval;
	    	
    		$(this).css('padding-bottom', height+'px');
	    	$(this).css("z-index","11");
	    	$(this).css("border-color","#0000ff");
	        break;    
	    case 6:
	    	var preLeft = $(this).offset().left;
	    	var preWidth = parseInt($(this).css('padding-left'));
	    	var left = Math.round(preLeft/DOBBYDO_FLOORPLANMAP.widthIntval)*DOBBYDO_FLOORPLANMAP.widthIntval;
	    	var width = Math.round(preWidth/DOBBYDO_FLOORPLANMAP.widthIntval)*DOBBYDO_FLOORPLANMAP.widthIntval;
	    	
	    	$(this).css('left', left+'px');
    		$(this).css('padding-left', width+'px');
	    	$(this).css("z-index","11");
	    	$(this).css("border-color","#0000ff");
	        break;
	    case 7:
	    	var preWidth = parseInt($(this).css('padding-right'));
	    	var width = Math.round(preWidth/DOBBYDO_FLOORPLANMAP.widthIntval)*DOBBYDO_FLOORPLANMAP.widthIntval;
	    	
    		$(this).css('padding-right', width+'px');
	    	$(this).css("z-index","11");
	    	$(this).css("border-color","#0000ff");
	        break;    
	    default:
	    	$(this).css("cursor","default");
    }
	DOBBYDO_FLOORPLANMAP.isClicked = false;
}

DOBBYDO_FLOORPLANMAP.onDivMouseDown = function ( e ) {
	e.stopPropagation();
	e.preventDefault();
	console.log('down: ' + e.offsetX + '/' + e.offsetY);
	var w = $(this).outerWidth();
	var h = $(this).outerHeight();
	var rect = collides(w, h, e.offsetX, e.offsetY);
    switch(rect.isCollision) {
	    case 1:
	    	DOBBYDO_FLOORPLANMAP.isClicked = true;
	    	DOBBYDO_FLOORPLANMAP.isClickedDivBefore = true;
	    	DOBBYDO_FLOORPLANMAP.clickedPosition = 1;
	    	DOBBYDO_FLOORPLANMAP.preOffsetX = e.offsetX;
	    	DOBBYDO_FLOORPLANMAP.preOffsetY = e.offsetY;
	    	DOBBYDO_FLOORPLANMAP.clickedDiv = $(this);
	    	
			$(this).css("z-index","12");
			$(this).css("border-top-color","#ff0000");
			$(this).css("border-right-color","#ff0000");
			$(this).css("border-bottom-color","#ff0000");
			$(this).css("border-left-color","#ff0000");
	    	break;
	    case 4:
	    	DOBBYDO_FLOORPLANMAP.isClicked = true;
	    	DOBBYDO_FLOORPLANMAP.isClickedDivBefore = true;
	    	DOBBYDO_FLOORPLANMAP.clickedPosition = 4;
	    	DOBBYDO_FLOORPLANMAP.preOffsetX = e.offsetX;
	    	DOBBYDO_FLOORPLANMAP.preOffsetY = e.offsetY;
	    	DOBBYDO_FLOORPLANMAP.clickedDiv = $(this);
	    	
	    	$(this).css("z-index","12");
			$(this).css("border-top-color","#ff0000");
    		$(this).css("border-right-color","#ff0000");
    		$(this).css("border-bottom-color","#ff0000");
    		$(this).css("border-left-color","#ff0000");
	    	break;
	    case 5:
	    	DOBBYDO_FLOORPLANMAP.isClicked = true;
	    	DOBBYDO_FLOORPLANMAP.isClickedDivBefore = true;
	    	DOBBYDO_FLOORPLANMAP.clickedPosition = 5;
	    	DOBBYDO_FLOORPLANMAP.preOffsetX = e.offsetX;
	    	DOBBYDO_FLOORPLANMAP.preOffsetY = e.offsetY;
	    	DOBBYDO_FLOORPLANMAP.clickedDiv = $(this);
	    	
	    	$(this).css("z-index","12");
			$(this).css("border-top-color","#ff0000");
    		$(this).css("border-right-color","#ff0000");
    		$(this).css("border-bottom-color","#ff0000");
    		$(this).css("border-left-color","#ff0000");
	        break;
	    case 6:
	    	DOBBYDO_FLOORPLANMAP.isClicked = true;
	    	DOBBYDO_FLOORPLANMAP.isClickedDivBefore = true;
	    	DOBBYDO_FLOORPLANMAP.clickedPosition = 6;
	    	DOBBYDO_FLOORPLANMAP.preOffsetX = e.offsetX;
	    	DOBBYDO_FLOORPLANMAP.preOffsetY = e.offsetY;
	    	DOBBYDO_FLOORPLANMAP.clickedDiv = $(this);
	    	
	    	$(this).css("z-index","12");
			$(this).css("border-top-color","#ff0000");
    		$(this).css("border-right-color","#ff0000");
    		$(this).css("border-bottom-color","#ff0000");
    		$(this).css("border-left-color","#ff0000");
	        break;    
	    case 7:
	    	DOBBYDO_FLOORPLANMAP.isClicked = true;
	    	DOBBYDO_FLOORPLANMAP.isClickedDivBefore = true;
	    	DOBBYDO_FLOORPLANMAP.clickedPosition = 7;
	    	DOBBYDO_FLOORPLANMAP.preOffsetX = e.offsetX;
	    	DOBBYDO_FLOORPLANMAP.preOffsetY = e.offsetY;
	    	DOBBYDO_FLOORPLANMAP.clickedDiv = $(this);
	    	
	    	$(this).css("z-index","12");
			$(this).css("border-top-color","#ff0000");
    		$(this).css("border-right-color","#ff0000");
    		$(this).css("border-bottom-color","#ff0000");
    		$(this).css("border-left-color","#ff0000");
	        break;
	    default:
	    	$(this).css("cursor","default");
    }
}

function collides(w, h, x, y) {
	var rectIdx = 0;
    var isCollision = false;
    var left = 3, right = w-6;
    var top = 3, bottom = h-6;
    if (right > x
        && left < x
        && bottom > y
        && top < y) {
        isCollision = 1;
    }
    else if (top >= y) {
        isCollision = 4;
    } else if (bottom <= y) {
        isCollision = 5;
    } else if (left >= x) {
        isCollision = 6;
    } else if (right <= x) {
        isCollision = 7;
    } else {
      	isCollision = 0;
        
    }
    //rectIdx = i;
    return {isCollision, rectIdx};
}