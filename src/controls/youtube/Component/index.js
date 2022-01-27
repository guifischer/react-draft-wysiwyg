import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';

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
    youtubeLink: '',
  };

  componentDidUpdate(prevProps) {
    const { expanded, config } = this.props;
    if (!expanded && prevProps.expanded) {
      this.setState({
        youtubeLink: ''
      });
    }
  }

  isYTBvideo = (url: string) => {
    return url.includes('youtu')
  }

  getId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  convertYTBUrl = (url: string) => {
    return "https://www.youtube.com/embed/" + this.getId(url);
  };

  onChange = () => {
    const { onChange } = this.props;
    const { youtubeLink} = this.state;
    onChange(youtubeLink);
  };

  updateLink = event => {
    this.setState({
      youtubeLink: this.convertYTBUrl(event.target.value),
    });
  };

  rendeyoutubeLinkModal() {
    const { youtubeLink } = this.state;
    const {
      config: { popupClassName },
      doCollapse,
      translations,
    } = this.props;
    return (
      <div
        className={classNames('rdw-youtube-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <div className="rdw-youtube-modal-header">
          <span className="rdw-youtube-modal-header-option">
            {translations['components.controls.youtube.youtubevideo']}
            <span className="rdw-youtube-modal-header-label" />
          </span>
        </div>
        <div className="rdw-youtube-modal-link-section">
          <span className="rdw-youtube-modal-link-input-wrapper">
            <input
              className="rdw-youtube-modal-link-input"
              placeholder={
                translations['components.controls.youtube.enterlink']
              }
              onChange={this.updateLink}
              onBlur={this.updateLink}
              value={youtubeLink}
              name="youtubeLink"
            />
            <span className="rdw-image-mandatory-sign">*</span>
          </span>
        </div>
        <span className="rdw-youtube-modal-btn-section">
          <button
            type="button"
            className="rdw-youtube-modal-btn"
            onClick={this.onChange}
            disabled={!youtubeLink || !this.isYTBvideo(youtubeLink) || this.getId(youtubeLink)==null}
          >
            {translations['generic.add']}
          </button>
          <button
            type="button"
            className="rdw-youtube-modal-btn"
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
        className="rdw-youtube-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-youtube-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title || translations['components.controls.youtube.youtube']}
        >
          <img src={icon} alt="" />
        </Option>
        {expanded ? this.rendeyoutubeLinkModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
