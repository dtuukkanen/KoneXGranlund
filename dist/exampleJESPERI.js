/* MD

### 🌎 Creating our 3D world
---

In this tutorial you'll learn how to create a simple scene using `@thatopen/components`.

:::tip Hello world!

A world represents a 3D environment in your application. It consists of a scene, a camera and (optionally) a renderer. You can create multiple worlds and show them in multiple viewports at the same time.

:::

In this tutorial, we will import:

- `Three.js` to get some 3D entities for our app.
- `@thatopen/components` to set up the barebone of our app.
- `@thatopen/ui` to add some simple and cool UI menus.
- `Stats.js` (optional) to measure the performance of our app.

*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "three", "@thatopen/ui", "stats.js", "@thatopen/components"], function (require, exports, THREE, BUI, stats_js_1, OBC) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    THREE = __importStar(THREE);
    BUI = __importStar(BUI);
    stats_js_1 = __importDefault(stats_js_1);
    OBC = __importStar(OBC);
    /* MD
      ### 🖼️ Getting the container
      ---
    
      Next, we need to tell the library where do we want to render the 3D scene. We have added an DIV  element to this HTML page that occupies the whole width and height of the viewport. Let's fetch it by its ID:
    */
    const container = document.getElementById("container");
    /* MD
      ### 🚀 Creating a components instance
      ---
    
      Now we will create a new instance of the `Components` class. This class is the main entry point of the library. It will be used to register and manage all the components in your application.
    
      :::tip Don't forget to dispose it when you are done!
    
      Once you are done with your application, you need to dispose the `Components` instance to free up the memory. This is a requirement of Three.js, which can't dispose the memory of 3D related elements automatically.
    
      :::
    
    */
    const components = new OBC.Components();
    /* MD
      ### 🌎 Setting up the world
      ---
    
      Now we are ready to create our first world. We will use the `Worlds` component to manage all the worlds in your application. Instead of instancing it, we can get it from the `Components` instance. All components are singleton, so this is always a better way to get them.
    
    */
    const worlds = components.get(OBC.Worlds);
    /* MD
    
      We can create a new world by calling the `create` method of the `Worlds` component. It's a generic method, so we can specify the type of the scene, the camera and the renderer we want to use.
    
    */
    const world = worlds.create();
    /* MD
    
      Now we can set the scene, the camera and the renderer of the world, and call the init method to start the rendering process.
    
    */
    world.scene = new OBC.SimpleScene(components);
    world.renderer = new OBC.SimpleRenderer(components, container);
    world.camera = new OBC.SimpleCamera(components);
    components.init();
    /* MD
      We could add some lights, but the SimpleScene class can do that easier for us using its `setup` method:
    */
    world.scene.setup();
    /* MD
    
      We'll make the background of the scene transparent so that it looks good in our docs page, but you don't have to do that in your app!
    
    */
    world.scene.three.background = null;
    /* MD
      ### 💄 Adding things to our scene
      ---
    
      Now we are ready to start adding some 3D entities to our scene. We will add a simple cube:
    
    */
    const material = new THREE.MeshBasicMaterial({ color: "#6528D7" });
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, material);
    world.scene.three.add(cube);
    /* MD
      Finally, we will make the camera look at the cube:
    */
    world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);
    /* MD
      ### ⏱️ Measuring the performance (optional)
      ---
    
      We'll use the [Stats.js](https://github.com/mrdoob/stats.js) to measure the performance of our app. We will add it to the top left corner of the viewport. This way, we'll make sure that the memory consumption and the FPS of our app are under control.
    
    */
    const stats = new stats_js_1.default();
    stats.showPanel(2);
    document.body.append(stats.dom);
    stats.dom.style.left = "0px";
    stats.dom.style.zIndex = "unset";
    world.renderer.onBeforeUpdate.add(() => stats.begin());
    world.renderer.onAfterUpdate.add(() => stats.end());
    /* MD
      ### 🧩 Adding some UI
      ---
    
      We will use the `@thatopen/ui` library to add some simple and cool UI elements to our app. First, we need to call the `init` method of the `BUI.Manager` class to initialize the library:
    
    */
    BUI.Manager.init();
    /* MD
      Now we will create a new panel with some inputs to change the background color of the scene and the intensity of the directional and ambient lights. For more information about the UI library, you can check the specific documentation for it!
    */
    const panel = BUI.Component.create(() => {
        return BUI.html `
    <bim-panel label="Worlds Tutorial" class="options-menu">
      <bim-panel-section collapsed label="Controls">
      
        <bim-color-input 
          label="Background Color" color="#202932" 
          @input="${({ target }) => {
            world.scene.config.backgroundColor = new THREE.Color(target.color);
        }}">
        </bim-color-input>
        
        <bim-number-input 
          slider step="0.1" label="Directional lights intensity" value="1.5" min="0.1" max="10"
          @change="${({ target }) => {
            world.scene.config.directionalLight.intensity = target.value;
        }}">
        </bim-number-input>
        
        <bim-number-input 
          slider step="0.1" label="Ambient light intensity" value="1" min="0.1" max="5"
          @change="${({ target }) => {
            world.scene.config.ambientLight.intensity = target.value;
        }}">
        </bim-number-input>
        
      </bim-panel-section>
    </bim-panel>
    `;
    });
    document.body.append(panel);
    /* MD
      And we will make some logic that adds a button to the screen when the user is visiting our app from their phone, allowing to show or hide the menu. Otherwise, the menu would make the app unusable.
    */
    const button = BUI.Component.create(() => {
        return BUI.html `
      <bim-button class="phone-menu-toggler" icon="solar:settings-bold"
        @click="${() => {
            if (panel.classList.contains("options-menu-visible")) {
                panel.classList.remove("options-menu-visible");
            }
            else {
                panel.classList.add("options-menu-visible");
            }
        }}">
      </bim-button>
    `;
    });
    document.body.append(button);
});
/* MD
  ### 🎉 Wrap up
  ---

  That's it! You have created your first 3D world and added some UI elements to it. You can now play with the inputs to see how the scene changes.

*/ 