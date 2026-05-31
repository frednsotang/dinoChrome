"use-strict";

class Ground {
    constructor(Ground_obj, ctx) { this.obj_ground = Ground_obj; this.context = ctx; this.arr = []; this.define_ground(); }
    define_ground() { let Obj_groundX = 0; for (let i = 0; i < 2; i++) { Obj_groundX = i * this.obj_ground.w_ground; this.arr.push({ x: Obj_groundX, y: this.obj_ground.y, w: this.obj_ground.w_ground, h: this.obj_ground.h_ground, }); } }
    drawGround() {
        let ground_img = new Image(); ground_img.src = this.obj_ground.img_src;[...this.arr].forEach(element => {
            this.context.drawImage(ground_img, element.x, element.y, element.w, element.h);
        });
    }
    moveGround() {
        let VelocityX = -5;[...this.arr].map(function (grounds, index) {
            grounds.x += VelocityX;
            if (index == 0) {
                if (grounds.x <= -740) grounds.x = 0;
            } else if (index == 1) {
                if (grounds.x <= 0) grounds.x = 740;
            }
        });
    }

};

export default Ground;