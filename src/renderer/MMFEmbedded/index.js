import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const MMFEmbed = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, height, width } = entity.getData();

  return (
    <div className="MMFfluidMedia">
      <iframe height={height} width={width} src={src} frameBorder="0" allowFullScreen title="Wysiwyg Embedded Content" scrolling="no" />
    </div>
  );
};

MMFEmbed.propTypes = {
  block: PropTypes.object,
  contentState: PropTypes.object,
};

export default MMFEmbed;
