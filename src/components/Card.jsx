import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  cropLongString = (string, maxLength) => {
    if (string) {
      return string.length < maxLength
        ? string
        : `${string.substring(0, maxLength)}...`;
    }
    return 'error';
  };

  handleclick = () => {
    this.setState({ hidden: true });
    axios({
      method: 'delete',
      withCredentials: true,
      url: `${config.backend}/notes/${this.props.content._id}`
    })
      .then(res => {
        if (res.status === 204) this.props.fetchdata();
      })
      .catch(err => this.props.notify('error:', err));
    // this.props.fetchdata();
    // debugger;
  };

  onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  render() {
    const { content } = this.props;
    if (this.state.hidden) return null;
    return (
      <div
        className="card"
        draggable
        onDragStart={e => this.onDragStart(e, content._id, content.column)}
      >
        <div className="card__top-box">
          <h3 className="card__title">
            {this.cropLongString(content.title, 20)}
          </h3>
          <button
            type="button"
            onClick={this.handleclick}
            className="card__close__button"
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <p className="card__content">{content.content}</p>
      </div>
    );
  }
}

export default Card;
