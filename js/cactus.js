"use-strict";

class Cactus {
  constructor(cacutus_obj, ctx) { this.obj_cactus = cacutus_obj; this.content = ctx; this.arr_obj_cactus = []; this.index = 0; this.arr_type_cactus = ["/img/cactus_1.png", "/img/cactus_3.png"]; this.frameCurrent = 0; this.frameMax = this.arr_obj_cactus.length; this.random = 0; this.frameTimer = 0; this.frameEllapsed = 120; this.index = 0;}
  ImageCactus() {
    let image = new Image(), result;
    this.frameTimer++;
    result = this.frameTimer % this.frameEllapsed;
    this.random = Math.random() % 2;
    if (result === 0) {
      if (this.random <= 0.86 && this.random >= 0.60) {
      this.index = 1;
    } else if (this.random < 0.60 && this.random >= 0.10) {
      this.index = 2;
    }else 
      {
        this.index = 2;
      }

     image.src =  this.arr_type_cactus[this.arr_type_cactus.length - this.index];
     this.arr_obj_cactus.push({x:this.obj_cactus.x ,  y:this.obj_cactus.y , w:this.obj_cactus.w , h :this.obj_cactus.h ,img:image,});
    }
    
    
     if(this.arr_obj_cactus.length >= 70) this.arr_obj_cactus.pop();
    return  this.arr_obj_cactus;
  }
  drawCactus() {
   for(let cactus  of  [...this.ImageCactus()]) 
    {
      this.content.drawImage(cactus.img,cactus.x ,cactus.y ,cactus.w ,cactus.h);
    }
  }
  moveCactus() 
  {
   [...this.ImageCactus()].map((elt)=>
    {
         elt.x += this.obj_cactus.vx;
    });
  }
};

export default Cactus;