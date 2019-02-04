import React, { Component } from 'react';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="top__bar">
        <ul className="top__bar__titles">
          {this.props.items.map(column => (
            <li className="top__bar__title" key={column.id}>
              {column.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TopBar;
