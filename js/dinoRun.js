"use-strict";
import Player from "./player.js";
import Ground from "./ground.js";
import Cactus from "./cactus.js";
try {
  (() => {
    var cvs = document.querySelector("canvas"), cvs_h = cvs.height, cvs_w = cvs.width, ctx = cvs.getContext('2d'), delay_time_loop = 25, ground_obj = { x: 0, y: cvs_h - 40, w_ground: cvs_w, h_ground: 15, img_src: "/img/ground.png", }, size_Player = 30, state_game = { START_GAME:true, PLAY_GAME:false, END_GAME: false, },cactus_obj =   {x:cvs_w-size_Player,y:ground_obj.y - 24,w:size_Player * 1.25,h:size_Player *  1.05,vx:-5},
      ground = new Ground(ground_obj, ctx, state_game),player_obj = { x: 12, y: (ground_obj.y - size_Player) + 6, w: size_Player, h: size_Player,onground:true,vy:0,gravity:0,}, player_dino = new Player(player_obj, ctx,state_game),title_obj =  {x:cvs_w/2-(160/2),y:120,},text_obj  =  {x:(cvs_w/2)-(120/2),y:title_obj.y +  40,} ,  frame_anim_obj  =  {frameCount:7,gameFr:0,},cactus =  new Cactus(cactus_obj,ctx),point = 1,score=0 , score_obj =  {x:cvs_w-80,y:43,},isGameOver = false,
      timer = 0 ,  timerEllapsed =  60,delay, game_over_obj = {x:(cvs_w/2)-(123/2) ,y:44,w: 123,h:40,}   ,  btn_reset_obj = {x:(cvs_w/2)-(size_Player/2),y:(2*game_over_obj.y)+ 15,w:size_Player,h:size_Player,};
    let loopGame = () => {
      ctx.clearRect(0, 0, cvs_w, cvs_w); if (state_game.START_GAME == true && state_game.PLAY_GAME == false && state_game.END_GAME == false) {
        ground.drawGround();  player_dino.drawPlayer(); Title_game("DINO  RUN  GAME",title_obj); frame_anim_obj.gameFr++;  if(frame_anim_obj.gameFr  %  frame_anim_obj.frameCount  ==  0) { animInstructions("PRESS  SPACE  TO PLAY ",text_obj);}
      } else if (state_game.START_GAME == false && state_game.PLAY_GAME == true && state_game.END_GAME == false) {


        ground.moveGround(); ground.drawGround(); player_dino.drawPlayer();

        //  player Movement
        if(player_obj.y  + player_obj.h  >=  ground_obj.y) 
          {
            player_obj.y =  (ground_obj.y - size_Player)+6;
            player_obj.onground =  true;
            if(player_obj.onground && player_obj.vy > 0) 
              {
                player_obj.gravity  = 0;
                 player_obj.y-=12;
              }
          }

        player_obj.vy+=player_obj.gravity;
        player_obj.y+=player_obj.vy;


        ///  cactus  

        cactus.drawCactus();
        cactus.moveCactus(); 


        // detection collision sprite 

        cactus.arr_obj_cactus.forEach(function(cactus) 
        {
           let cact = cactus; 

           if(DetectionCollision(player_dino.obj_player,cact)) 
            {
                state_game.PLAY_GAME = false;
                state_game.START_GAME = false;
                state_game.END_GAME  =  true;
            }
        });


        //  make Score 
         timer++;
         delay = timer  %  timerEllapsed;

        if(isGameOver == false) 
          {
            if(delay ===  0) increaseScore();
          } 
        

           setScore(score_obj.x,score_obj.y,score_obj.clr);

      } else if (state_game.START_GAME == false && state_game.PLAY_GAME == false && state_game.END_GAME == true) 
        {
          ground.drawGround(); player_dino.drawPlayer();
          setButtonReset(btn_reset_obj);
          setInstruction();
         }
    };
    setInterval(loopGame, delay_time_loop);
    window.addEventListener("keydown" , function(event) 
    {
         if(event.code ==   "Space") { 
          state_game.START_GAME  =  false;   state_game.PLAY_GAME =  true;  state_game.END_GAME =  false;
         }else if(event.code == "KeyP") {
           if(player_obj.onground ==  true) 
            {
               player_obj.vy =  -14; 
               player_obj.gravity=0.93;
               player_obj.onground =  false;
            }
         }else if(event.code ==  "KeyS") 
          {
            this.window.location.reload();
          }
        
    });
   let    Title_game  =  (text,Title_obj) => {   ctx.font =  " bold   24px  'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";   ctx.fillStyle= "#111";  ctx.fillText(`${text}`,Title_obj.x ,Title_obj.y);} 
   let animInstructions  =  (text_anim  ,   text_obj)=>  {ctx.font =  "120  11.65px Georgia, 'Times New Roman', Times, serif"; ctx.fillStyle="#111";ctx.fillText(`${text_anim}`,text_obj.x  , text_obj.y);}
  let  DetectionCollision =  function(a,b) 
  {
    return   a.x +  a.w  >=   b.x &&
             a.x  <  b.x  +  b.w &&
             a.y + a.h   >= b.y  &&
             a.y <=  b.y +  b.w;
  }
  
  let increaseScore =  () => score+=point;

  let setScore =  function() 
  {
    ctx.font =" bold   24px  sans-serif";
    ctx.fillStyle="#111";
    ctx.fillText(`${score}`,score_obj.x,score_obj.y);
  }

  let setInstruction =  function() 
  {
    ctx.font =" bold   14px  sans-serif";
    ctx.fillStyle="#111";
    ctx.fillText(`press key S to restart`,(cvs_w/2)-(120/2),34);
  }

  let  setButtonReset = function ({x,y,w,h})
  {
    let  ImageBtn =  new Image();
    ImageBtn.src =  "/img/reset.jpg";
    ctx.drawImage(ImageBtn,x,y,w,h);
  }
})();
} catch (err) { console.error(err); }
finally { console.info("code has executly !"); }