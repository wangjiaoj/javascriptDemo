(function(){
	window.c2D={
		lineData:[],//[{x:"0",y:"0"},{x:"0",y:"0"}]
		init:function(id,width,height){
              window.c2D.canvas=document.getElementById(id);
              c2D.canvas.width=1024;
              c2D.canvas.height=768;
              
              window.c2D.context=this.canvas.getContext('2d');
              return this;
        },
        fillStyleColor:function(color){
        	this.fillColor=color;
        	return this;
        },

        fillrect:function(x,y,w,h){
            //@ line接受多个参数，所以此处采用数组
            var context=this.context;
            context.fillRect(x,y,w,h);
            context.fillStyle=this.fillColor;
            context.fill();//填充色
        	return this;
        },
        strockRect:function(x,y,height,weight){
        	var context=this.context;
            context.strokeStyle=this.strokeColor;
            context.strokeRect(x,y,w,h);
        	return this;
        },
        clearRect:function(x,y,height,weight){
        	var context=this.context;
        	context.clearRect(x,y,w,h);
        	return this;
        },
        lineReact:function(){
        	this.style="rect";
        	this.rectData={x:x,y:y,h:height,w:weight};
        	return this;
        },
        line:function(lineData){
        	//@ line接受多个参数，所以此处采用数组
        	this.style="line";
        	this.lineData=lineData;
        	return this;
        },
        lineArc：function(x,y,radius,startAngle,endAngle,counterClockwise){
        	this.style="arc";
        	return this;
        },
        lineArcTo：function(){
        	this.style="arcTo";
        	return this;
        },
        lineBezierCurveTo:function(c1x,c1y,c2x,c2y,x,y){

        },
		draw:function(){
			//@ 绘制路径
			var context=this.context;
            context.beginPath();
            if(this.style==="line"){
             	var coordinate=this.lineData;
             	context.moveTo(coordinate[0].x,coordinate[0].y);
             	for(var i=1;i<coordinate.length;i++){
             		context.lineTo(coordinate[i].x,coordinate[i].y);
             	}
             	context.fillStyle=this.fillColor;
             	context.fill();//填充色
             }
             else if(this.style==="rect"){
             
             }
             context.closePath();
             context.lineWidth=3;
             context.strokeStyle="black";
             context.stroke();//画线
            return this;
         }
	}
          
}());
 
         




 