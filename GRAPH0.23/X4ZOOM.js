function size_font_square()
{
   divisorGlobal = divisorGlobal + size;
   // Set size range 1 -> 100
   if (divisorGlobal < 1)
   {
      divisorGlobal = 1;
   }
   else if (divisorGlobal > 100)
   {
      divisorGlobal = divisorGlobal - 1;
   }
   // Write out Zoom factor to form
   document.Zdoit.sqsize.value = divisorGlobal;
   // Global magnitude objects
   divisor = divisorGlobal;
   // Set fontsize
   fstor = 15 / divisor;
   ctx.font = "" + fstor + "px Arial";
   // Set distance squares
   asize = 67 / divisor;
   // Set square size
   storlek = 54;
   height = storlek / divisor;
   width = storlek / divisor;
   //hfuncoff = 30 / divisor;
   //vfuncoff =15 / divisor;
}

function zoomin()
{
   size = - 1;
   size_font_square();
}

function zoomout()
{
   size = + 1;
   size_font_square()
}

function square_size()
{
   size = 0;
   divisorGlobal = 1;
   if(divisorGlobal < 1)divisorGlobal = 1;
   size_font_square()
   redraw();
}


