import { IfcViewerAPI } from 'web-ifc-viewer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container });

viewer.IFC.loader.ifcManager.setWasmPath("/src/");
viewer.axes.setAxes();
viewer.grid.setGrid();

const input = document.getElementById("file-input");

input.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  const ifcURL = URL.createObjectURL(file);
  await viewer.IFC.loadIfcUrl(ifcURL);
});
