
var DOBBYDO_FLOORPLANMAP_GLOBAL_ID;

function DOBBYDO_FLOORPLANMAP(pGLOBAL_ID) {
	DOBBYDO_FLOORPLANMAP_GLOBAL_ID = pGLOBAL_ID;
	this.type = "edit"; //edit, view

	this.rects;

	this.canvas;
	this.ctx;
	this.width;
	this.height;
	this.widthCnt;
	this.heightCnt;
	
	this.canvas2;
	this.ctx2;
	this.width2;
	this.height2;
	this.widthCnt2;
	this.heightCnt2;
	this.isClicked = false;
	
	DOBBYDO_FLOORPLANMAP.run();
}

DOBBYDO_FLOORPLANMAP.run = function () {
	var init_html = "<canvas width='500px' height='500px' id='DOBBYDO_FLOORPLANMAP_BASE_CONTAINER' style='z-index:1;position: fixed;'></canvas>";
	init_html += "<canvas width='500px' height='500px' id='DOBBYDO_FLOORPLANMAP_CONTAINER' style='z-index:10;position: fixed;'></canvas>";
	
	$('#'+DOBBYDO_FLOORPLANMAP_GLOBAL_ID).html(init_html) ;

	DOBBYDO_FLOORPLANMAP.canvas = $('#DOBBYDO_FLOORPLANMAP_BASE_CONTAINER'); // in your HTML this element appears as <canvas id="myCanvas"></canvas>
	DOBBYDO_FLOORPLANMAP.ctx = DOBBYDO_FLOORPLANMAP.canvas[0].getContext('2d');
	DOBBYDO_FLOORPLANMAP.width = DOBBYDO_FLOORPLANMAP.canvas[0].scrollWidth;
	DOBBYDO_FLOORPLANMAP.height = DOBBYDO_FLOORPLANMAP.canvas[0].scrollHeight;
	DOBBYDO_FLOORPLANMAP.widthCnt = DOBBYDO_FLOORPLANMAP.width/20;
	DOBBYDO_FLOORPLANMAP.heightCnt = DOBBYDO_FLOORPLANMAP.height/20;

	for(var idx=0; idx <= 20 ; idx++){
		DOBBYDO_FLOORPLANMAP.ctx.beginPath();
		DOBBYDO_FLOORPLANMAP.ctx.moveTo(idx * DOBBYDO_FLOORPLANMAP.widthCnt,0);
		DOBBYDO_FLOORPLANMAP.ctx.lineTo(idx * DOBBYDO_FLOORPLANMAP.widthCnt,DOBBYDO_FLOORPLANMAP.height);
		DOBBYDO_FLOORPLANMAP.ctx.lineWidth = 1;
		DOBBYDO_FLOORPLANMAP.ctx.strokeStyle = '#808080';
		DOBBYDO_FLOORPLANMAP.ctx.stroke();
	}

	for(var idx=0; idx <= 20 ; idx++){
		DOBBYDO_FLOORPLANMAP.ctx.beginPath();
		DOBBYDO_FLOORPLANMAP.ctx.moveTo(0, idx * DOBBYDO_FLOORPLANMAP.heightCnt);
		DOBBYDO_FLOORPLANMAP.ctx.lineTo(DOBBYDO_FLOORPLANMAP.width, idx * DOBBYDO_FLOORPLANMAP.heightCnt);
		DOBBYDO_FLOORPLANMAP.ctx.lineWidth = 1;
		DOBBYDO_FLOORPLANMAP.ctx.strokeStyle = '#808080';
		DOBBYDO_FLOORPLANMAP.ctx.stroke();
	}
	
	
	DOBBYDO_FLOORPLANMAP.canvas2 = $('#DOBBYDO_FLOORPLANMAP_CONTAINER'); // in your HTML this element appears as <canvas id="myCanvas"></canvas>
	DOBBYDO_FLOORPLANMAP.ctx2 = DOBBYDO_FLOORPLANMAP.canvas2[0].getContext('2d');
	DOBBYDO_FLOORPLANMAP.width2 = DOBBYDO_FLOORPLANMAP.canvas2[0].scrollWidth;
	DOBBYDO_FLOORPLANMAP.height2 = DOBBYDO_FLOORPLANMAP.canvas2[0].scrollHeight;
	DOBBYDO_FLOORPLANMAP.widthCnt2 = DOBBYDO_FLOORPLANMAP.width2/20;
	DOBBYDO_FLOORPLANMAP.heightCnt2 = DOBBYDO_FLOORPLANMAP.height2/20;

	DOBBYDO_FLOORPLANMAP.ctx2.strokeStyle="#FF0000";
	
	DOBBYDO_FLOORPLANMAP.rects = [
		{x: DOBBYDO_FLOORPLANMAP.widthCnt2 *1, y: DOBBYDO_FLOORPLANMAP.heightCnt2 * 1, w: DOBBYDO_FLOORPLANMAP.widthCnt2 *2, h: DOBBYDO_FLOORPLANMAP.heightCnt2 * 2},
        {x: DOBBYDO_FLOORPLANMAP.widthCnt2 *5, y: DOBBYDO_FLOORPLANMAP.heightCnt2 * 5, w: DOBBYDO_FLOORPLANMAP.widthCnt2 *6, h: DOBBYDO_FLOORPLANMAP.heightCnt2 * 7}
		];
	
	for (var i = 0, len = DOBBYDO_FLOORPLANMAP.rects.length; i < len; i++) {
		DOBBYDO_FLOORPLANMAP.ctx2.strokeRect(DOBBYDO_FLOORPLANMAP.rects[i].x, DOBBYDO_FLOORPLANMAP.rects[i].y, DOBBYDO_FLOORPLANMAP.rects[i].w, DOBBYDO_FLOORPLANMAP.rects[i].h);
    }
	

	DOBBYDO_FLOORPLANMAP.canvas2.bind( "mousedown", DOBBYDO_FLOORPLANMAP.onDocumentMouseDown);
	DOBBYDO_FLOORPLANMAP.canvas2.bind( "mouseup", DOBBYDO_FLOORPLANMAP.onDocumentMouseUp);
	DOBBYDO_FLOORPLANMAP.canvas2.bind( "mousemove", DOBBYDO_FLOORPLANMAP.onDocumentMouseMove);
	
}

DOBBYDO_FLOORPLANMAP.onDocumentMouseMove = function ( e ) {
	e.stopPropagation();
	e.preventDefault();
	console.log('move: ' + e.offsetX + '/' + e.offsetY);
    
	
	var rect = collides(DOBBYDO_FLOORPLANMAP.rects, e.offsetX, e.offsetY);
    switch(rect.isCollision) {
	    case 1:
	    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","all-scroll");
	        break;
	    case 4:
	    	if(DOBBYDO_FLOORPLANMAP.isClicked){
	    		DOBBYDO_FLOORPLANMAP.ctx2.strokeRect(DOBBYDO_FLOORPLANMAP.rects[rect.rectIdx].x, DOBBYDO_FLOORPLANMAP.rects[i].y, DOBBYDO_FLOORPLANMAP.rects[i].w, DOBBYDO_FLOORPLANMAP.rects[i].h);
	    	} else{
		    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","n-resize");
	    	}
	        break;
	    case 5:
	    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","n-resize");
	        break;    
	    case 6:
	    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","e-resize");
	        break;
	    case 7:
	    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","e-resize");
	        break;    
	    default:
	    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","default");
    }
}

DOBBYDO_FLOORPLANMAP.onDocumentMouseDown = function ( e ) {
	e.stopPropagation();
	e.preventDefault();
	
	DOBBYDO_FLOORPLANMAP.isClicked = false;

}
/* Pending */
DOBBYDO_FLOORPLANMAP.onDocumentMouseDown = function ( e ) {
	e.stopPropagation();
	e.preventDefault();
	console.log('down: ' + e.offsetX + '/' + e.offsetY);
    var rect = collides(DOBBYDO_FLOORPLANMAP.rects, e.offsetX, e.offsetY);
    //alert(rect.rectIdx + " " + rect.isCollision);
    switch(rect.isCollision) {
	    case 4:
	    	DOBBYDO_FLOORPLANMAP.ctx2.clearRect(DOBBYDO_FLOORPLANMAP.rects[rect.rectIdx].x - 1, DOBBYDO_FLOORPLANMAP.rects[rect.rectIdx].y - 1, DOBBYDO_FLOORPLANMAP.rects[rect.rectIdx].w + 2, DOBBYDO_FLOORPLANMAP.rects[rect.rectIdx].h + 2);
	    	DOBBYDO_FLOORPLANMAP.isClicked = true;
	    	break;
	    case 5:
	    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","n-resize");
	        break;
	    case 6:
	    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","e-resize");
	        break;    
	    case 7:
	    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","e-resize");
	        break;
	    default:
	    	DOBBYDO_FLOORPLANMAP.canvas2.css("cursor","default");
    }
}

function collides(rects, x, y) {
	var rectIdx = 0;
    var isCollision = false;
    for (var i = 0, len = rects.length; i < len; i++) {
        var left = rects[i].x, right = rects[i].x+rects[i].w;
        var top = rects[i].y, bottom = rects[i].y+rects[i].h;
        if (right > x
            && left < x
            && bottom > y
            && top < y) {
            isCollision = 1;
            rectIdx = i;
        }
        /*
        else if (bottom == y
                || top == y) {
            isCollision = 2;
            rectIdx = i;
        } else if (right == x
                || left == x) {
            isCollision = 3;
            rectIdx = i;
        }
        */
        else if (top == y) {
            isCollision = 4;
            rectIdx = i;
        } else if (bottom == y) {
            isCollision = 5;
            rectIdx = i;
        } else if (right == x) {
            isCollision = 6;
            rectIdx = i;
        } else if (left == x) {
            isCollision = 7;
            rectIdx = i;
        } else {
        	isCollision = 0;
            rectIdx = i;
        }
    }
    return {isCollision, rectIdx};
}