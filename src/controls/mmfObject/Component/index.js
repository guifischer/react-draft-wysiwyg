import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';

import { isMMF } from '../../../utils/url';


class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
    doCollapse: PropTypes.func,
  };

  state = {
    objectLink: '',
  };

  componentDidUpdate(prevProps) {
    const { expanded, config } = this.props;
    if (!expanded && prevProps.expanded) {
      this.setState({
        objectLink: ''
      });
    }
  }

  onChange = () => {
    const { onChange } = this.props;
    const { objectLink} = this.state;
    onChange(objectLink);
  };

  updateLink = event => {
    this.setState({
      objectLink: event.target.value,
    });
  };

  rendeobjectLinkModal() {
    const { objectLink } = this.state;
    const {
      config: { popupClassName },
      doCollapse,
      translations,
    } = this.props;
    return (
      <div
        className={classNames('rdw-mmfObject-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <div className="rdw-mmfObject-modal-header">
          <span className="rdw-mmfObject-modal-header-option">
            {translations['components.controls.mmfObject.mmfObject']}
            <span className="rdw-mmfObject-modal-header-label" />
          </span>
        </div>
        <div className="rdw-mmfObject-modal-link-section">
          <span className="rdw-mmfObject-modal-link-input-wrapper">
            <input
              className="rdw-mmfObject-modal-link-input"
              placeholder={
                translations['components.controls.mmfObject.enterlink']
              }
              onChange={this.updateLink}
              onBlur={this.updateLink}
              value={objectLink}
              name="objectLink"
            />
            <span className="rdw-image-mandatory-sign">*</span>
          </span>
        </div>
        <span className="rdw-mmfObject-modal-btn-section">
          <button
            type="button"
            className="rdw-mmfObject-modal-btn"
            onClick={this.onChange}
            disabled={!objectLink || !isMMF(objectLink)}
          >
            {translations['generic.add']}
          </button>
          <button
            type="button"
            className="rdw-mmfObject-modal-btn"
            onClick={doCollapse}
          >
            {translations['generic.cancel']}
          </button>
        </span>
      </div>
    );
  }

  render() {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className="rdw-mmfObject-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-mmfObject-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title || translations['components.controls.mmfObject.mmfObject']}
        >
          <img src={icon} alt="" />
        </Option>
        {expanded ? this.rendeobjectLinkModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
