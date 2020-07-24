oldrad = 0; incrementor=0;
q=5;z=0 ; col =[];  arr = [];


function isPrime()
{
   // Eratosthenes algorithm to find all primes under n
    for (var i = 0; i < 1000; ++ i)
   {
      arr[i] = true;
   }
   // Make an array from 2 to (n - 1)
   arr[0] = false;
   arr[1] = true;

   // Remove multiples of primes starting from 2, 3, 5, ...
   i = 2;
   while (i < 1000){
      if (arr[i])
      {
         for (var j = i * i; j < 2000; j += i)
         {
            arr[j] = false;
            arr[ - j] = false;
         }
      }
      i ++ ;
   }
   return arr;
}

function rndColor() {
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7',
               '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
        color = '#', i;
    for (i = 0; i < 6 ; i++) {
        color = color + hex[Math.floor(Math.random() * 16)];
    }
    return color;
}


function circleGraphic()
{
   if (incrementor<700 && osc==true){ q=q+0.032;incrementor=incrementor+4; if(incrementor>690){osc=false;} } 
   else if (incrementor>-500 && osc==false){ q=q-0.032;incrementor=incrementor-4;if(incrementor<-490){osc=true;} }
   theta+=step;
   circle();
   clear();
   initPiano();
   main(q);
}

function clear()
{
  //ctm.fillStyle = "#000840";
  // ctm.fillRect(400, 60, 1900, 1900);
   ctT.fillStyle = "#000840";
    ctT.fillRect(0, 0, 500, 500);
}



function BAQ(){
osc=true;
colorChange();
isPrime();
stopCircle = setInterval(circleGraphic, 50);

   
}

function colorChange(){
	col[0] ="#FFFFFF";
    for (var i = 1; i < 800; ++ i)
   {
      
      color=rndColor();
      col[i] =color;
   }
}

  var theta=3000;
  var step = Math.PI/40; 
  var h = 0; 
  var k = 2;
  var r = 100;

 function circle(){
  xfactor = h + r*Math.cos(theta);
  yfactor = k - r*Math.sin(theta);    

 
}

function main(){
	
  y=20;
  dia = 1;
  rad=dia/2;
  offset=20;
  T = 800+(-220* q);
  centerY =480 +yfactor*1.8;
 
  for(i = 400 ; i >=10; i -- ){
   if(arr[i] == true) {
        mult = 1;
        offset = offset - q;
         while(dia * i * mult <= 400 )
         {
           offset = rad * i - oldrad + offset;
            radius = (i * rad);
            oldrad = radius;
	        ctm.fillStyle = y;
            ctm.beginPath();
            if(mult>z){
				
				centerY=centerY+mult/4+(yfactor/20);
 		        centerX = T+ ( dia * i * mult )-offset+80;
				centerX=centerX+760+incrementor+(1.4*xfactor*(mult/20));
                ctm.arc(centerX,centerY, radius,0, 2 * Math.PI);
				ctm.fill();
				ctm.stroke();
				ctm.closePath();
				
			}
            mult ++ ;
			
         }
		
        ctT.fillStyle=y
		ctT.font = radius+"px Arial";
		
        ctT.fillText("BAQ 2 BASIC", centerY-100, centerX-1100); 
		
		y=col[i];
	}
  }
  
}


