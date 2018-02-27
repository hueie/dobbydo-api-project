
var DOBBYDO_FLOORPLANMAP_GLOBAL_ID;
function DOBBYDO_FLOORPLANMAP(pGLOBAL_ID, pW, pH, pIl) {
	DOBBYDO_FLOORPLANMAP_GLOBAL_ID = pGLOBAL_ID;
	
	this.type = "edit"; //edit, view

	this.rects;

	//input configuration width height interval
	this.canvas;
	this.ctx;
	this.width;
	this.height;
	this.intervalLength;
	this.widthCnt;
	this.heightCnt;
	
	this.canvas2;
	this.ctx2;
	this.width2;
	this.height2;
	this.widthCnt2;
	this.heightCnt2;
	
	this.isClicked = false;
	this.isClickedDivBefore = true;
	this.clickedDiv;
	this.clickedPosition;
	this.preOffsetX;
	this.preOffsetY;
	
	DOBBYDO_FLOORPLANMAP.run(pW, pH, pIl);
}

DOBBYDO_FLOORPLANMAP.run = function (pW, pH, pIl) {
	DOBBYDO_FLOORPLANMAP.width = pW;
	DOBBYDO_FLOORPLANMAP.height = pH;
	DOBBYDO_FLOORPLANMAP.intervalLength = pIl;
	
	var init_html = "<canvas width='"+DOBBYDO_FLOORPLANMAP.width+"px' height='"+DOBBYDO_FLOORPLANMAP.height+"px' id='DOBBYDO_FLOORPLANMAP_BASE_CONTAINER' style='z-index:1;position:fixed;top:0;left:0;margin:0;padding:0;'></canvas>";
	//init_html += "<canvas width='500px' height='500px' id='DOBBYDO_FLOORPLANMAP_CONTAINER' style='z-index:10;position: fixed;'></canvas>";
	init_html += "<div id='DOBBYDO_FLOORPLANMAP_CONTAINER' style='z-index:10;position: fixed; border: 1px solid red;'> </div>";
	
	$('#'+DOBBYDO_FLOORPLANMAP_GLOBAL_ID).html(init_html) ;

	DOBBYDO_FLOORPLANMAP.canvas = $('#DOBBYDO_FLOORPLANMAP_BASE_CONTAINER'); // in your HTML this element appears as <canvas id="myCanvas"></canvas>
	DOBBYDO_FLOORPLANMAP.ctx = DOBBYDO_FLOORPLANMAP.canvas[0].getContext('2d');
	//DOBBYDO_FLOORPLANMAP.width = DOBBYDO_FLOORPLANMAP.canvas[0].scrollWidth;
	//DOBBYDO_FLOORPLANMAP.height = DOBBYDO_FLOORPLANMAP.canvas[0].scrollHeight;
	DOBBYDO_FLOORPLANMAP.widthCnt = DOBBYDO_FLOORPLANMAP.width/DOBBYDO_FLOORPLANMAP.intervalLength;
	DOBBYDO_FLOORPLANMAP.heightCnt = DOBBYDO_FLOORPLANMAP.height/DOBBYDO_FLOORPLANMAP.intervalLength;

	
	for(var idx=0; idx <= DOBBYDO_FLOORPLANMAP.widthCnt ; idx++){
		DOBBYDO_FLOORPLANMAP.ctx.beginPath();
		DOBBYDO_FLOORPLANMAP.ctx.moveTo(idx * DOBBYDO_FLOORPLANMAP.widthCnt,0);
		DOBBYDO_FLOORPLANMAP.ctx.lineTo(idx * DOBBYDO_FLOORPLANMAP.widthCnt,DOBBYDO_FLOORPLANMAP.height);
		DOBBYDO_FLOORPLANMAP.ctx.lineWidth = 1;
		DOBBYDO_FLOORPLANMAP.ctx.strokeStyle = '#808080';
		DOBBYDO_FLOORPLANMAP.ctx.stroke();
	}

	for(var idx=0; idx <= DOBBYDO_FLOORPLANMAP.heightCnt ; idx++){
		DOBBYDO_FLOORPLANMAP.ctx.beginPath();
		DOBBYDO_FLOORPLANMAP.ctx.moveTo(0, idx * DOBBYDO_FLOORPLANMAP.heightCnt);
		DOBBYDO_FLOORPLANMAP.ctx.lineTo(DOBBYDO_FLOORPLANMAP.width, idx * DOBBYDO_FLOORPLANMAP.heightCnt);
		DOBBYDO_FLOORPLANMAP.ctx.lineWidth = 1;
		DOBBYDO_FLOORPLANMAP.ctx.strokeStyle = '#808080';
		DOBBYDO_FLOORPLANMAP.ctx.stroke();
	}
	
	
	DOBBYDO_FLOORPLANMAP.canvas2 = $('#DOBBYDO_FLOORPLANMAP_CONTAINER'); // in your HTML this element appears as <canvas id="myCanvas"></canvas>
	/*
	DOBBYDO_FLOORPLANMAP.ctx2 = DOBBYDO_FLOORPLANMAP.canvas2[0].getContext('2d');
	DOBBYDO_FLOORPLANMAP.width2 = DOBBYDO_FLOORPLANMAP.canvas2[0].scrollWidth;
	DOBBYDO_FLOORPLANMAP.height2 = DOBBYDO_FLOORPLANMAP.canvas2[0].scrollHeight;
	DOBBYDO_FLOORPLANMAP.widthCnt2 = DOBBYDO_FLOORPLANMAP.width2/20;
	DOBBYDO_FLOORPLANMAP.heightCnt2 = DOBBYDO_FLOORPLANMAP.height2/20;
	DOBBYDO_FLOORPLANMAP.ctx2.strokeStyle="#FF0000";
	*/
	
	DOBBYDO_FLOORPLANMAP.rects = [
		{idx: 1, x: DOBBYDO_FLOORPLANMAP.widthCnt *1, y: DOBBYDO_FLOORPLANMAP.heightCnt * 1, w: DOBBYDO_FLOORPLANMAP.widthCnt *2, h: DOBBYDO_FLOORPLANMAP.heightCnt * 2},
        {idx: 2, x: DOBBYDO_FLOORPLANMAP.widthCnt *5, y: DOBBYDO_FLOORPLANMAP.heightCnt * 5, w: DOBBYDO_FLOORPLANMAP.widthCnt *6, h: DOBBYDO_FLOORPLANMAP.heightCnt * 7}
		];
	
	for (var i = 0, len = DOBBYDO_FLOORPLANMAP.rects.length; i < len; i++) {
		var tmpW = parseInt(DOBBYDO_FLOORPLANMAP.rects[i].w)-1;
		var tmpH = parseInt(DOBBYDO_FLOORPLANMAP.rects[i].h)-1;
		var tmpX = DOBBYDO_FLOORPLANMAP.rects[i].x;
		var tmpY = DOBBYDO_FLOORPLANMAP.rects[i].y;
		
		var childHTML = "<div id='booksf_id_"+DOBBYDO_FLOORPLANMAP.rects[i].idx+"' style='z-index:11;position: fixed; border: 2px solid #0000ff; top: "+tmpY+"px; left: "+tmpX+"px; padding:"+tmpW+"px "+tmpH+"px;'> </div>"
		$("#DOBBYDO_FLOORPLANMAP_CONTAINER").append(childHTML);
		
		$("#booksf_id_"+DOBBYDO_FLOORPLANMAP.rects[i].idx).bind( "mousedown", DOBBYDO_FLOORPLANMAP.onDivMouseDown);
		$("#booksf_id_"+DOBBYDO_FLOORPLANMAP.rects[i].idx).bind( "mouseup", DOBBYDO_FLOORPLANMAP.onDivMouseUp);
		$("#booksf_id_"+DOBBYDO_FLOORPLANMAP.rects[i].idx).bind( "mousemove", DOBBYDO_FLOORPLANMAP.onDivMouseMove);
		//DOBBYDO_FLOORPLANMAP.ctx2.strokeRect(DOBBYDO_FLOORPLANMAP.rects[i].x, DOBBYDO_FLOORPLANMAP.rects[i].y, DOBBYDO_FLOORPLANMAP.rects[i].w, DOBBYDO_FLOORPLANMAP.rects[i].h);
    }
	
	//DOBBYDO_FLOORPLANMAP.canvas.bind( "mousedown", DOBBYDO_FLOORPLANMAP.onDocumentMouseDown);
	//DOBBYDO_FLOORPLANMAP.canvas.bind( "mouseup", DOBBYDO_FLOORPLANMAP.onDivMouseUp);
	DOBBYDO_FLOORPLANMAP.canvas.bind( "mousemove", DOBBYDO_FLOORPLANMAP.onDocumentMouseMove);
	
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
        	if(height != 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('top', top+'px');
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-top', height+'px');
        	} else {
        		
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
        	if(height != 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-bottom', height+'px');
        		DOBBYDO_FLOORPLANMAP.preOffsetY = e.offsetY;
        	} else {
        		
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 6){
			console.log("clickedPosition 6");
			var preLeft = DOBBYDO_FLOORPLANMAP.clickedDiv.offset().left;
			var preWidth = parseInt(DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-left'));
    		var subOffsetX = e.offsetX - preLeft;

    		var left = e.offsetX;//preTop + subOffsetY;
        	var width = preWidth - subOffsetX;
        	if(width != 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('left', left+'px');
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-left', width+'px');
        	} else {
        		
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
        	if(width != 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-right', width+'px');
        		DOBBYDO_FLOORPLANMAP.preOffsetX = e.offsetX;
        	} else {
        		
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
    		//$(this).css('top', top+'px');
    		//$(this).css('left', left+'px');
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 4){
			console.log("clickedPosition 4");
			var preTop = $(this).offset().top;
    		var preHeight = parseInt($(this).css('padding-top'));
    		var subOffsetY = e.offsetY - DOBBYDO_FLOORPLANMAP.preOffsetY;
    			
        	var top = preTop + subOffsetY;
        	var height = preHeight - subOffsetY;
        	if(height != 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('top', top+'px');
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-top', height+'px');
        	} else {
        		
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 5){
			console.log("clickedPosition 5");
    		var preHeight = parseInt($(this).css('padding-bottom'));
    		var subOffsetY = e.offsetY - DOBBYDO_FLOORPLANMAP.preOffsetY;
    		
    		var preTop = $(this).offset().top;
    		if(DOBBYDO_FLOORPLANMAP.isClickedDivBefore == false){
    			subOffsetY += preTop;
    			DOBBYDO_FLOORPLANMAP.isClickedDivBefore = true;
    		}
    		
        	var height = preHeight + subOffsetY;
        	if(height != 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-bottom', height+'px');
        		DOBBYDO_FLOORPLANMAP.preOffsetY = e.offsetY;
        	} else {
        		
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 6){
			console.log("clickedPosition 6");
			var preLeft = $(this).offset().left;
    		var preWidth = parseInt($(this).css('padding-left'));
    		var subOffsetX = e.offsetX - DOBBYDO_FLOORPLANMAP.preOffsetX;
    			
        	var left = preLeft + subOffsetX;
        	var width = preWidth - subOffsetX;
        	if(width != 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('left', left+'px');
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-left', width+'px');
        	} else {
        		
        	}
		} else if(DOBBYDO_FLOORPLANMAP.clickedPosition == 7){
			console.log("clickedPosition 7");
			var preWidth = parseInt($(this).css('padding-right'));
    		var subOffsetX = DOBBYDO_FLOORPLANMAP.preOffsetX - e.offsetX;
    		
    		var preLeft = $(this).offset().left;
    		if(DOBBYDO_FLOORPLANMAP.isClickedDivBefore == false){
    			subOffsetX -= preLeft;
    			DOBBYDO_FLOORPLANMAP.isClickedDivBefore = true;
    		}
    		
        	var width = preWidth - subOffsetX;
        	if(width != 0 ) {
        		DOBBYDO_FLOORPLANMAP.clickedDiv.css('padding-right', width+'px');
        		DOBBYDO_FLOORPLANMAP.preOffsetX = e.offsetX;
        	} else {
        		
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
	    	
	    	var top = Math.round(preTop/DOBBYDO_FLOORPLANMAP.heightCnt)*DOBBYDO_FLOORPLANMAP.heightCnt;
	    	var left = Math.round(preLeft/DOBBYDO_FLOORPLANMAP.widthCnt)*DOBBYDO_FLOORPLANMAP.widthCnt;

	    	$(this).css('top', top+'px');
	    	$(this).css('left', left+'px');
	    	
	    	$(this).css("z-index","11");
	    	$(this).css("border-color","#0000ff");
	        break;
	    case 4:
	    	var preTop = $(this).offset().top;
	    	var preHeight = parseInt($(this).css('padding-top'));
	    	
	    	var top = Math.round(preTop/DOBBYDO_FLOORPLANMAP.heightCnt)*DOBBYDO_FLOORPLANMAP.heightCnt;
	    	var height = Math.round(preHeight/DOBBYDO_FLOORPLANMAP.heightCnt)*DOBBYDO_FLOORPLANMAP.heightCnt;
	    	
	    	$(this).css('top', top+'px');
    		$(this).css('padding-top', height+'px');
	    	
	    	$(this).css("z-index","11");
	    	$(this).css("border-color","#0000ff");
	        break;
	    case 5:
	    	//var preBottom = $(this).offset().bottom;
	    	var preHeight = parseInt($(this).css('padding-bottom'));
	    	
	    	//var bottom = Math.round(preBottom/DOBBYDO_FLOORPLANMAP.heightCnt)*DOBBYDO_FLOORPLANMAP.heightCnt;
	    	var height = Math.round(preHeight/DOBBYDO_FLOORPLANMAP.heightCnt)*DOBBYDO_FLOORPLANMAP.heightCnt;
	    	
	    	//$(this).css('bottom', bottom+'px');
    		$(this).css('padding-bottom', height+'px');
	    	
	    	$(this).css("z-index","11");
	    	$(this).css("border-color","#0000ff");
	        break;    
	    case 6:
	    	var preLeft = $(this).offset().left;
	    	var preWidth = parseInt($(this).css('padding-left'));
	    	
	    	var left = Math.round(preLeft/DOBBYDO_FLOORPLANMAP.widthCnt)*DOBBYDO_FLOORPLANMAP.widthCnt;
	    	var width = Math.round(preWidth/DOBBYDO_FLOORPLANMAP.widthCnt)*DOBBYDO_FLOORPLANMAP.widthCnt;
	    	
	    	$(this).css('left', left+'px');
    		$(this).css('padding-left', width+'px');
	    	
	    	$(this).css("z-index","11");
	    	$(this).css("border-color","#0000ff");
	        break;
	    case 7:
	    	//var preBottom = $(this).offset().bottom;
	    	var preWidth = parseInt($(this).css('padding-right'));
	    	
	    	//var bottom = Math.round(preBottom/DOBBYDO_FLOORPLANMAP.heightCnt)*DOBBYDO_FLOORPLANMAP.heightCnt;
	    	var width = Math.round(preWidth/DOBBYDO_FLOORPLANMAP.widthCnt)*DOBBYDO_FLOORPLANMAP.widthCnt;
	    	
	    	//$(this).css('bottom', bottom+'px');
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