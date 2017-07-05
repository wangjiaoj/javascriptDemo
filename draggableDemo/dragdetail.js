    var detilDaiog={
    	downflag:false,
    	init:function(){
          this.bindDialog();
          this.initDrag();
    	},
    	bindDialog:function (){
           $('.financing-deal.leftBar').on('click','td>img',function(){
           	  var type = $(this).data('type');
           	  var data={};
           	  data.title = $('.information h3').text();            
           	  if(type=='rzDetailTemp'){
	           	  data.date = $(this).data('date');
	           	  var  title =$(this).data('title');
	           	  if(title){
	           	  	data.title = title ;
	           	  }
	           	  data.tzje = $(this).data('tzje');
	           	  data.tzf = $(this).parents('tr').find('.tzf').text();
	           	  data.gqbl = $(this).data('gqbl');
	           	  data.sm = $(this).data('sm');
           	  }else{
                  data.date = $(this).data('date');
	           	  data.buyer = $(this).parents('tr').find('.buyer').text();
	           	  data.jyjg = $(this).data('jyjg');
	           	  data.seller = $(this).parents('tr').find('.seller').text();           	
	           	  data.sm = $(this).data('sm');
           	  }
              var html = template(type,data);         	 
           	  $('.detail-dialog').html(html).addClass('active');
           	  var height = $('.detail-dialog').get(0).offsetHeight;
              height = 0-height/2;
           	  $('.detail-dialog').css({
		            	'top':'50%',
		            	'left':'50%',
		            	'margin-top':height+'px'
		            })   

           });  
            $('.detail-dialog').on('click','.close',function(){
            	$('.detail-dialog').removeClass('active');
            })
    	},
    	initDrag : function(){
			 var self=this;
			 self.maxHeight= document.documentElement.clientHeight-60;
			 self.maxWidth= document.documentElement.clientWidth-140;		   
			 $('.detail-dialog').on('mousedown',function(e){
		            self.initClientX = e.clientX;
		            self.initClientY = e.clientY;
		            self.downflag = true;
		            var position = $(this).position();
		            self.top = position.top;
		            self.left = position.left;
		            self.startDrag();
		           $(this).addClass('drag-cusor');
		           $('body').addClass('noselect');
			 });
		},
        startDrag:function (){
        	var self = this;
        	var html=$('.detail-dialog');
		    $('body').on('mousemove',function(e){     
				 if(!!self.downflag){
		            var top =  self.top + e.clientY - self.initClientY;
		            var left = self.left + e.clientX - self.initClientX;
		            if(top < 0){	top = 0; }
		            else if(top > self.maxHeight){ top=self.maxHeight; }
		            if(left < 140){ left = 140; }
		            else if(left > self.maxWidth){ left = self.maxWidth;}
		            html.css({
		            	'top':top+'px',
		            	'left':left+'px'
		            })   
		         }        
			 });
			 $('body').on('mouseup',function(e){
			 	    self.downflag=false;
		            self.endDrag();
			 });
        },
        endDrag: function(){
			$('body').off('mousemove');
			$('body').off('mouseup');
			$('body').removeClass('noselect');
			$('.detail-dialog').removeClass('drag-cusor');
		}
    }