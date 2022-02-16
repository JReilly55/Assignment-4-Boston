
    require([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/Camera",
      "esri/widgets/Home",
      "dojo/domReady!"
    ], function(WebScene, SceneView, Camera, Home) {

    
      /*var map = new Map({
        basemap: "streets",
        ground: "world-elevation"
      });*/
      var scene = new WebScene({
        portalItem:{
         id:"8046207c1c214b5587230f5e5f8efc77" 
        }
      });
      
      // North End
      var camera = new Camera({
        position: [
          -71.054522, // lon
          42.365087, // lat
          2000// elevation in meters
        ],
        tilt:0,
        heading: 0
      })
      
      // Boston-Logan International Airport
      var camera2 = new Camera({
        position: {
          x: -71.009355,
          y: 42.362236,
          z: 6000
        },
        tilt: 0,
        heading: 0
      });
      
      // Downtown from Atlantic
      var camera3 = new Camera({
        position: {
          x: -71.018825,
          y: 42.350320,
          z: 500
        },
        tilt:80,
        heading: 285
      });

      var view = new SceneView({
        container: "viewDiv",
        map: scene,
        viewingMode:"global",
       // viewingMode:"local", App becomes a 2D Scene view and features are removed. Is it a difference between geographic (global scene) and projected (local scene) coordinate systems? 
       // However, putting this in Arc Online's local scene causes no issues.
        camera: camera,
        environment: {
            lighting: {
              date: new Date(),
              directShadowsEnabled: true,
              // don't update the view time when user pans.
              // The clock widget drives the time
              cameraTrackingEnabled: false
            }
        },
    });
    
    var homeBtn = new Home({
        view: view
      });

      // Add the home button to the top left corner of the view
    view.ui.add(homeBtn, "top-left");
    
    [NE, KBOS, DTN].forEach(function(button) {
      button.style.display = 'flex';
      view.ui.add(button, 'top-right');
    });
    
    KBOS.addEventListener('click', function() {
      // reuse the default camera position already established in the homeBtn
      view.goTo({
        target:camera2
      });
    });
    
    NE.addEventListener('click', function() {
      // reuse the default camera position already established in the homeBtn
      view.goTo({
        target:camera
      });
    });

      DTN.addEventListener('click', function() {
      // reuse the default camera position already established in the homeBtn
      view.goTo({
        target:camera3
      });
    });

    });
