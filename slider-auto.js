;(function(){
	
	function Slider(selector,setting){

//speed:每隔2s去播放一张。	
//	isautoplay : true
//startIndex:从第几张开始放
//istxt:是否要有底部的文字区域,true | false
		var defaultSetting = {
			speed:2000,
			isautoplay:true,
			startIndex:1,
			istxt:true
		}
		//debugger;
		if(setting){
			for(var p in  defaultSetting){
				if( setting[p] != undefined ){
					defaultSetting[p] = setting[p];
				}
			}
		}

		this.speed = defaultSetting.speed//每隔speed播放一张
		this.isautoplay = defaultSetting.isautoplay;  
		this.currentIndex = defaultSetting.startIndex //当前是第几张图
		this.istxt = defaultSetting.istxt;
		
		if(typeof selector == "string"){
			this.slider = document.querySelector(selector);
		}
		else{
			this.slider = selector;
		}
		

		this.num = this.slider.querySelectorAll("li").length ;//没有各加一张图之前的 图片的张数
		this.w  = this.slider.offsetWidth; //每张图的基本宽度
		
		this.addNode(); //前面各加一张图
		this.timer = -1; //定时器
		
		this.isMoving = false; //是否正在动画
		
		this.addIndirector();  //添加指示条
		
		this.addBtns();			//添加按钮
		if(this.istxt){
			this.addTxt();			//添加文字区域
		}
		
		

		//整体的图片容器 ul的宽度是  (this.num + 2)*w
		this.ul = this.slider.querySelector("ul");
		this.ul.style.width = this.w * (this.num+2) +"px";
		
		var that = this;
		
		
		
		
		this.ul.addEventListener("transitionend",function(){
			//console.info("动画结束....");
			//获取当前的图片的索引：即当前是第几张？
			//console.info(that, that.currentIndex);
			
			if(that.currentIndex == 0){
				
				//当前是第0张时，直接拉到第n张的位置 
				//不要有过渡动画过过程：把动画的时间设置为0
				that.ul.style.transitionDuration = '0s';
				that.ul.style.transform = "translateX("+ -that.w* that.num  +"px)";
				
				that.currentIndex = that.num;
			}
			else if( that.currentIndex == that.num + 1){
				//当前是第n+1张时，直接拉到第1张的位置
				that.ul.style.transitionDuration = '0s';
				that.ul.style.transform = "translateX("+ -that.w* 1  +"px)";
				
				that.currentIndex = 1;
				
			}
			
			that.isMoving = false; //动画结束，目前不是处于移动状态
		})
	
		this.spans = this.slider.querySelectorAll(".indirector span");
		this.goto( this.currentIndex );
		
		if( this.isautoplay == true){
			
			this.slider.addEventListener("mouseenter",function(){
				that.pause();
			});
			this.slider.addEventListener("mouseleave",function(){
				that.autoplay();
			})
		
			this.autoplay();
		}
		
		
	}
	Slider.prototype = {
		constructor:Slider,
		autoplay:function(){
			var that = this;
			that.timer = setInterval(function(){
				that.next();
			}, this.speed)
		},
		pause:function(){
			clearInterval ( this.timer);
		},
		addTxt:function(){
			var div = document.createElement("div");
			div.className = "txt";
			div.innerHTML = "<p></p>";
			this.slider.appendChild(div);
		},
		addBtns:function(){
			var that = this;
			var btnleft = document.createElement("span");
			btnleft.className = "btn btnleft";
			
			var btnright = document.createElement("span");
			btnright.className = "btn btnright";
			
			btnleft.addEventListener("click",function(){
				that.prev();
			});
			
			btnright.addEventListener("click",function(){
				that.next();
			})
			
			this.slider.appendChild(btnleft);
			this.slider.appendChild(btnright);
			
		},
		addIndirector:function(){//添加指示条
			var that = this;
			var div = document.createElement("div");
			div.className = "indirector";
			for(var i =0 ;i < this.num;i++){
				var span = document.createElement("span");
				div.appendChild(span);
				
//						span.index = i;
//						span.addEventListener("mouseenter",function(){
//							
//							console.info(this.index);
//							that.goto( this.index + 1)
//							
//						})
				span.addEventListener("mouseenter",function(index){
					return function(){
						that.goto( index + 1)
					}
				}(i) )
				
			}
			this.slider.appendChild(div);
		},
		addNode:function(){
			var ul = this.slider.querySelector("ul");
			//console.info(ul);
			//把第一个li找到，复制一份，加入到最后
			var lis  = ul.querySelectorAll("li");
			var firstLi = ul.querySelectorAll("li")[0];
			var firstLiClone = firstLi.cloneNode(true);
			//console.info(firstLiClone);
			ul.appendChild(firstLiClone);//appendChild是在最后一个子元素的后面再加入 到ul中
			
			//把最后一个li找到，复制一份，加入到最前面
			var lastLi  = ul.querySelectorAll("li")[lis.length-1];
			var lastLiClone = lastLi.cloneNode(true);
			//在父结点ul中找到firstLi，然后在前面插入lastLiClone
			ul.insertBefore(lastLiClone,firstLi);
		},
		goto:function(yourIndex){
			
			if( this.isMoving ==  true){
				//console.info("动画没有完，操作被忽略")
				return;
			}
			
			this.isMoving = true;
//					通过移动ul,把第yourIndex张显示出来
//					2.动画的原理是：不断更新transform:translateX(值)
//					   第1张 ：transform:translateX(-w*1)
//					   第2张 ：transform:translateX(-w*2)
//					   第3张 ：transform:translateX(-w*3)
			 this.ul.style.transitionDuration = '.5s';
			 this.ul.style.transform = "translateX("+ -this.w*yourIndex  +"px)";
			 
			 this.currentIndex = yourIndex;
			 
			 //console.info("当前的index"+this.currentIndex)
			 //更新指示条的状态
			 var y  = ( ( this.currentIndex -1) + this.num) % this.num;
		     for(var i = 0; i<this.spans.length;i++){
		     	if(i === y){
		     		this.spans[i].className = "current";
		     	}
		     	else{
		     		this.spans[i].className = "";
		     	}
		     }

		     //更新文字区域的内容
			 // 获取当前的图片的alt
			 if( this.istxt){
				 var t = this.ul.querySelectorAll("img")[yourIndex].alt ;
				 this.slider.querySelector(".txt p").innerHTML = t;
			 }
		},
		prev:function(){
			//console.info("上一张");
			
			var t = this.currentIndex;
			
			this.goto( t - 1 );
		},
		next:function(){
			//console.info("下一张");
			var t = this.currentIndex;
			
			this.goto( t + 1 );
		}
		
	}
	
	window.Slider = Slider;
	
//	document.body.addEventListener("load",function(){
//		alert("ok")
//	})
	window.onload = function(){
		//找出这个页面上所有.slider，把它们变成轮播图
		
		var sliders = document.querySelectorAll(".slider");
		//data-speed="2000" data-isautoplay="false" data-startIndex="1" data-istxt="false"
		
		for(var i = 0; i <sliders.length;i++){
			//console.info( sliders[i].getAttribute("data-speed") )
			var isautoplay = sliders[i].getAttribute("data-isautoplay");
			var istxt = sliders[i].getAttribute("data-istxt");
			var speed = parseInt( sliders[i].getAttribute("data-speed"));
			var startIndex = parseInt( sliders[i].getAttribute("data-startIndex"));
			
			isautoplay = isautoplay == "false" ?  false  :true;
			istxt = istxt == "false" ?  false  :true;
			
			var s = new Slider( sliders[i],{
				speed      : speed,
				isautoplay : isautoplay,
				startIndex : startIndex,
				istxt      : istxt
			} );
			console.info(s);
		}
	}
})();
