"use-strict";
class Player {
  constructor(Player_obj, ctx, state) { this.obj_player = Player_obj; this.context = ctx; this.state_array_dino = ["/img/standing_still.png", "/img/standing_still_eye_closed.png"];this.array_run = ["/img/dino_run1.png", "/img/dino_run2.png"];  this.frameRun = 2; this.index = { indexRun:0, indexStillOver: 3,frameTime:0,frameEllapsed:5,}; this.state_g = state;}
  defineImagePlayer() { let dino_img = new Image(),time = 0;  if (this.state_g.START_GAME == true) { dino_img.src = this.state_array_dino[0]; } else if (this.state_g.PLAY_GAME == true && this.state_g.END_GAME == false && this.state_g.START_GAME == false) { 
       this.index.frameTime++;
       time =  this.index.frameTime % this.index.frameEllapsed;
      if(time == 0) {this.index.indexRun++;}
      this.index.indexRun %= this.frameRun; 
      dino_img.src = this.array_run[this.index.indexRun]; } else if (this.state_g.END_GAME == true && this.state_g.START_GAME == false && this.state_g.PLAY_GAME == false) { dino_img.src = this.state_array_dino[1]; } return dino_img; }
  drawPlayer() { this.context.drawImage(this.defineImagePlayer(), this.obj_player.x, this.obj_player.y, this.obj_player.w, this.obj_player.h); }
};

export default Player;