
var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                       window.mozRequestAnimationFrame || window.msRequestAnimationFrame || 
                       function(c) {window.setTimeout(c, 15)};

window.addEventListener('load', onloadHandler, false);
var bitmaps = [];

var rotacionArray = [0.1964,-0.1964,0.3928,-0.3928];
var pause = false;
var XoY = false;
var numX = 0;
var numY = 0;
var vueltaAux = 0;
var vuelta = 8;
var duracion = 128;
var rotacion = 0;

function onloadHandler()
{
   // get the images loading
   var loader = new Phoria.Preloader();
   for (var i=0; i<6; i++)
   {
      bitmaps.push(new Image());
      loader.addImage(bitmaps[i], 'images/' + "shapes" + '/texture'+i+'.png');
   }
   bitmaps.push(new Image());
   loader.addImage(bitmaps[6], 'images/plano/fondo.jpg');
   loader.onLoadCallback(init);
}


function init()
{
   // get the canvas DOM element and the 2D drawing context
   var canvas = document.getElementById('canvas');

   canvas.width = document.body.scrollWidth - 8;
   canvas.height = screen.height - 115;
   
   // create the scene and setup camera, perspective and viewport
   var scene = new Phoria.Scene();
   scene.camera.position = {x:0.0, y:5.0, z:-15.0};
   scene.perspective.aspect = canvas.width / canvas.height;
   scene.viewport.width = canvas.width;
   scene.viewport.height = canvas.height;

   
   // create a canvas renderer
   var renderer = new Phoria.CanvasRenderer(canvas);
   
   // add a grid to help visualise camera position etc.
   
   var p = Phoria.Util.generateTesselatedPlane(4,4,0,20, true);
   var plane = Phoria.Entity.create({
      points: p.points,
      edges: p.edges,
      polygons: p.polygons,
      style: {
         shademode: "plain",
         texture: 0
      }
   });
   plane.translateY(-1);
   plane.textures.push(bitmaps[6]);
   scene.graph.push(plane);
   
   var c = Phoria.Util.generateUnitCube();
   var cube = Phoria.Entity.create({
      points: c.points,
      edges: c.edges,
      polygons: c.polygons
   });
   for (var i=0; i<6; i++)
   {
      cube.textures.push(bitmaps[i]);
      cube.polygons[i].texture = i;
   }
   scene.graph.push(cube);
   scene.graph.push(Phoria.DistantLight.create({
      direction: {x:0, y:-0.5, z:1}
   }));

   var fnAnimate = function() {
      if (pause && (numX < duracion || numY < duracion))
      {

         // rotate local matrix of the cube
         //cube.rotateY((Math.random()*0.3));
            /*
            if(numX == duracion){
               XoY = true;
            }
            */
            if(vueltaAux >= vuelta){
               vueltaAux = 0;
               XoY= !XoY;
               rotacion = rotacionArray[Math.round(Math.random()*3)];
            }
            
            if(!XoY){

               cube.rotateX(rotacion);
               cube.rotateY(0);
               numX++;
               vueltaAux++;

            }

            if(XoY){

               cube.rotateY(rotacion);
               cube.rotateX(0);
               numY++;
               vueltaAux++;

            }
            
         //cube.rotateZ((Math.random()*0.3));  
         // execute the model view 3D pipeline and render the scene
         scene.modelView();
         renderer.render(scene);
      }else{
         // rotate local matrix of the cube
         //cube.rotateY(0);
         cube.rotateX(0);
         cube.rotateZ(0);
         pause = false;


         // execute the model view 3D pipeline and render the scene
         scene.modelView();
         renderer.render(scene);
      }
      requestAnimFrame(fnAnimate);
   };
   
   // add GUI controls
   /*
   var gui = new dat.GUI();
   var f = gui.addFolder('Perspective');
   f.add(scene.perspective, "fov").min(5).max(175);
   f.add(scene.perspective, "near").min(1).max(100);
   f.add(scene.perspective, "far").min(1).max(1000);
   //f.open();
   f = gui.addFolder('Camera LookAt');
   f.add(scene.camera.lookat, "x").min(-100).max(100);
   f.add(scene.camera.lookat, "y").min(-100).max(100);
   f.add(scene.camera.lookat, "z").min(-100).max(100);
   f.open();
   f = gui.addFolder('Camera Position');
   f.add(scene.camera.position, "x").min(-100).max(100);
   f.add(scene.camera.position, "y").min(-100).max(100);
   f.add(scene.camera.position, "z").min(-100).max(100);
   f.open();
   f = gui.addFolder('Camera Up');
   f.add(scene.camera.up, "x").min(-10).max(10).step(0.1);
   f.add(scene.camera.up, "y").min(-10).max(10).step(0.1);
   f.add(scene.camera.up, "z").min(-10).max(10).step(0.1);
   */
   // key binding


   document.addEventListener('keydown', function(e) {
      switch (e.keyCode)
      {
         case 27:
         {
           /*
            pause = !pause;
            numY = 0;
            numX = 0;
            */
            break;
         }
         case 32:
         {
            /*
            for (var i=0; i<6; i++)
            {
               //cube.textures.push(bitmaps[i]);
               cube.polygons[i].texture = 5-i;
            }
            */
            break;
            
         }
      }
   }, false);

   // start animation
   requestAnimFrame(fnAnimate);
}
function lanzarDados()
{
   pause = true;
   numY = 0;
   numX = 0;

}
function changeShapes(){

  
  
}

function redimencionar(){
   
   location.reload(true);

}
