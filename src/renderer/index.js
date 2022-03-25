import Embedded from "./Embedded";
import MMFEmbedded from "./MMFEmbedded";
import getImageComponent from "../renderer/Image";

const getBlockRenderFunc = (config, customBlockRenderer) => (block) => {
  if (typeof customBlockRenderer === "function") {
    const renderedComponent = customBlockRenderer(block, config, config.getEditorState);
    if (renderedComponent) return renderedComponent;
  }
  if (block.getType() === "atomic") {
    const contentState = config.getEditorState().getCurrentContent();
    const entity = contentState.getEntity(block.getEntityAt(0));
    if (entity && entity.type === "IMAGE") {
      return {
        component: getImageComponent(config),
        editable: false,
      };
    } else if (entity && entity.type === "EMBEDDED_LINK") {
      return {
        component: Embedded,
        editable: false,
      };
    }
    else if (entity && entity.type === "MMF_EMBEDDED_OBJECT") {
      return {
        component: MMFEmbedded,
        editable: false,
      };
    }
  }
  return undefined;
};

export default getBlockRenderFunc;
