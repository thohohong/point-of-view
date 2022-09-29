//Layer
let circleMask;
let myImage;
let myImage2;
var myImage3;

var circleSize = 10;

let RGB_ = [122, 122, 122];
let waveNum = 20;
let numLayer = 4;

var Layers = [];
var maskList = [];
var LayerImageList_w = [];
var LayerImageList_b = [];

var global_gap = 20;
var global_opacity = 0.25;
var global_delay = 10;


// ========================================

function wave(x, y, size, opacity){
  this.size = size;
  this.opacity = opacity;
  this.x = x;
  this.y = y;
}

function Layer(delayTime, gap, opacity, velocity, graphic, w_img, b_img, org_img) {
  this.delayTime = delayTime;
  this.gap = gap;
  this.opacity = opacity;
  
  this.waveList = [];
  this.velocity = velocity;
  this.waveNum = 60 + delayTime;
  
  this.w_img = w_img;
  this.org_img = org_img;
  this.b_img = b_img;
  this.graphic = graphic;
  
  this.addPoint = function(x, y) {
    var cur_size = delayTime * velocity;
     
    for (i = 0; i < this.waveNum; i++){
      this.waveList[this.waveList.length] = new wave(x, y, cur_size, this.opacity);
      cur_size -= gap;
    }
    
    // for (i = 0; i < waveNum; i++){
    //   console.log("["+i+"] size=" + this.waveList[i].size+", opacity="+this.waveList[i].opacity);
    // }
  }
  
  this.drawWave = function(){
    var remove_list = [];
    for (i = 0; i < this.waveList.length; i++){
      if (this.waveList[i].opacity <= 0) {
        remove_list[remove_list.length] = i;
        continue;
      }
      if (this.waveList[i].size >= 0){
        graphic.fill('rgba(0, 0, 0, 0)');
        graphic.strokeWeight(2);
        graphic.stroke('rgba('+RGB_[0]+','+RGB_[1]+','+RGB_[2]+','+this.waveList[i].opacity+')');
        graphic.circle(this.waveList[i].x, this.waveList[i].y, this.waveList[i].size);
        this.waveList[i].opacity -= 0.003;
      }
      this.waveList[i].size += velocity;
    }
    
    for (i = remove_list.length - 1; i >= 0 ; i--){
      this.waveList.splice(remove_list[i], 1);
    }
  }
  
  this.drawAll = function() {
    this.graphic.clear();
    this.w_img.copy(this.org_img, 0, 0, 800, 800, 0, 0, 800, 800);
    this.drawWave();
    this.w_img.mask(graphic);
    
    //image(this.graphic, 0, 0);
    image(this.b_img, 0, 0);
    image(this.w_img, 0, 0);
  }
}

function setup() {
  frameRate(60);
  createCanvas(800, 800);
  
  var cur_delay = 0;
  var cur_opacity = 1;
  var cur_gap = 20;
  var cur_velocity = 5;
  
  for (i = 0; i < numLayer; i++){
    maskList[i] = createGraphics(800, 800);
    
    let w_str = 'image/'+i+'w.png';
    let b_str = 'image/'+i+'b.png';
    Layers[i] = new Layer(cur_delay, cur_gap, cur_opacity, cur_velocity, maskList[i], loadImage(w_str), loadImage(b_str), loadImage(w_str));
    cur_delay -= global_delay;
    cur_opacity -= global_opacity;
    cur_gap += global_gap;
    cur_velocity *= 0.8;
  }
  
  // Layers[0].addPoint(600, 400);
  // Layers[1].addPoint(600, 400);
  // Layers[2].addPoint(600, 400);
  // Layers[3].addPoint(600, 400);  
}

function mouseClicked() {
  Layers[0].addPoint(mouseX, mouseY);
  Layers[1].addPoint(mouseX, mouseY);
  Layers[2].addPoint(mouseX, mouseY);
  Layers[3].addPoint(mouseX, mouseY);
}

function draw() {
  background(0);
  
  Layers[0].drawAll();
  Layers[1].drawAll();
  Layers[2].drawAll();
  Layers[3].drawAll();
  // for (i = 0; i < numLayer; i++){
  //   Layers[i].drawAll();
  // }
  
}