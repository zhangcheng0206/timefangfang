var iNow = 0;
	var arr = ["#ffae00","black"];

	myClock();
    setInterval(myClock,1000);//每一秒钟重绘一次	

    function myClock(){	

		var myCanvas = document.getElementById("myCanvas");
		var oC = myCanvas.getContext("2d");
	
		//得到时分秒
		var now = new Date(),
		sec = now.getSeconds(),
		min = now.getMinutes(),
		hour = now.getHours();
		hour = hour>=12 ? hour-12 : hour;

		iNow++;
		iNow = iNow%2;		

		oC.save();
			//初始化画布
			oC.clearRect(0,0,myCanvas.width,myCanvas.height);    
			oC.translate(75,75);
			oC.scale(0.5,0.5);
			oC.rotate(-Math.PI/2);
			
			//白色背景
			oC.save();
				oC.fillStyle = "#fff";
				oC.beginPath();
				oC.arc(0,0,140,0,Math.PI*2,true);
				oC.fill();
			oC.restore();

			oC.strokeStyle = "black";
			oC.fillStyle = "black";
			oC.lineWidth = 4;
			oC.lineCap = "round";				

			//时针刻度
			oC.save();
				oC.beginPath();
				for(var i=0; i<12; i++){	
					oC.moveTo(110,0);
					oC.lineTo(120,0);
					oC.rotate(Math.PI/6);
				}
				oC.stroke();
			oC.restore();

			//分针刻度
			oC.save();
				oC.fillStyle = "black";
				oC.lineWidth = 2;
				oC.beginPath();
				for(var i=0; i<60; i++){
					if(i%5 != 0){
						oC.moveTo(116,0);
						oC.lineTo(120,0);
					}
					oC.rotate(Math.PI/30);
				}
				oC.stroke();
			oC.restore();			
			
			oC.save();
				oC.rotate(Math.PI/2);
				oC.font = "30px impact";
				//12点
				oC.fillText("12",-15,-80);					
				//3点
				oC.fillText("3",88,13);					
				//6点
				oC.fillText("6",-8,104);				
				//9点
				oC.fillText("9",-103,11);					
			oC.restore();
			
			//画时针
			oC.save();
				oC.strokeStyle = "#ff3300";
				oC.rotate((Math.PI/6)*hour+(Math.PI/360)*min+(Math.PI/21600)*sec);	
				oC.lineWidth = 8;
				oC.beginPath();
				oC.moveTo(-20,0);
				oC.lineTo(60,0);
				oC.stroke();
			oC.restore();
			
			//画分针
			oC.save();
				oC.rotate((Math.PI/30)*min+(Math.PI/1800)*sec);
				oC.strokeStyle = "#27A9E3";
				oC.lineWidth = 6;
				oC.beginPath();
				oC.moveTo(-28,0);
				oC.lineTo(90,0);
				oC.stroke();
			oC.restore();

			//画秒针
			/*oC.save();
				oC.rotate(sec*Math.PI/30);
				oC.strokeStyle = "#D40000";
				oC.lineWidth = 3;
				oC.beginPath();
				oC.moveTo(-30,0);
				oC.lineTo(105,0);
				oC.stroke();
			oC.restore();*/
	
			//风车秒针
			oC.save();
				oC.rotate(sec*Math.PI/30);				

				oC.save();					
					oC.fillStyle = "#f23";
					oC.beginPath();
					oC.arc(94,0,10,0,Math.PI,true);
					oC.fill();
				oC.restore();

				oC.save();
					oC.rotate(Math.PI/2);
					oC.fillStyle = "#ffae00";
					oC.beginPath();
					oC.arc(10,-84,10,0,Math.PI,true);				
					oC.fill();
				oC.restore();

				oC.save();
					oC.fillStyle = "#27A9E3";
					oC.beginPath();
					oC.arc(74,0,10,Math.PI,Math.PI*2,true);
					oC.fill();
				oC.restore();

				oC.save();
					oC.rotate(Math.PI/2);
					oC.fillStyle = "#0eaf52";
					oC.beginPath();
					oC.arc(-10,-84,10,Math.PI,Math.PI*2,true);
					oC.fill();
				oC.restore();
			oC.restore()
			//风车秒针


			//表框
			oC.save();
				oC.lineCap = "butt";
				oC.lineWidth = 16;
				oC.save();				
					oC.strokeStyle = "#0eaf52";
					oC.beginPath();
					oC.arc(0,0,142,0,Math.PI*2,true);
					oC.stroke();
				oC.restore();

				oC.save();
					oC.strokeStyle = "#ffae00";
					oC.beginPath();
					oC.arc(0,0,142,0,Math.PI/iNow*5/3,true);
					oC.stroke();
				oC.restore();
			oC.restore();

			//中心点
			oC.save();
				oC.fillStyle = "#fff";
				oC.beginPath();
				oC.arc(0,0,4,0,Math.PI*2,true);
				oC.fill();
			oC.restore();
			

		oC.restore();



	};