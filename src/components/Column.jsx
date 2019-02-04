import axios from 'axios';

import React, { Component } from 'react';
import Card from './Card';
import config from '../config';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDrop = e => {
    const id = e.dataTransfer.getData('id');
    const endcol = e.target.className.split(' ')[1];
    axios({
      method: 'put',
      withCredentials: true,
      url: `${config.backend}/notes/${id}`,
      data: {
        column: endcol
      }
    })
      .then(res => {
        if (res.status === 204) {
          this.props.fetchdata();
        }
      })
      .catch(err => this.props.notify('error:', err));
  };

  onDragOver = e => {
    e.preventDefault();
  };

  render() {
    return (
      <ul
        className={`column ${this.props.title}`}
        onDragOver={e => {
          this.onDragOver(e);
        }}
        onDrop={e => {
          this.onDrop(e, 'dropped');
        }}
      >
        {this.props.content &&
          this.props.content.map(card => (
            <Card
              notify={this.props.notify}
              fetchdata={this.props.fetchdata}
              content={card}
              key={card._id}
            />
          ))}
      </ul>
    );
  }
}

export default Column;
