import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/ListSite.css';
import TopBar from './TopBar';
import Column from './Column';
import config from '../config';
import NewProject from './NewProject';

class ListSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Flowcharts', id: 1 },
        { title: 'Wireframes', id: 2 },
        { title: 'Prototype', id: 3 },
        { title: 'Development', id: 4 },
        { title: 'Test', id: 5 },
        { title: 'Launch', id: 6 }
      ]
    };
  }

  componentDidMount() {
    this.fetchdata();
  }

  newPost = (column, title, content) => {
    axios({
      method: 'post',
      withCredentials: true,
      url: `${config.backend}/notes`,
      data: {
        column,
        title,
        content
      }
    })
      .then(res => {
        if (res.status === 201) {
          this.fetchdata();
        }
      })
      .catch(err => this.notify(`error: ${err}`));
  };

  notify = err => toast.error(err);

  fetchdata = () => {
    axios
      .get(`${config.backend}/notes`)
      .then(res => {
        this.setState({ data: res.data.notes });
      })
      .catch(err => this.notify(`error: ${err}`));
  };

  render() {
    return (
      <div className="list__site">
        <NewProject
          notify={this.notify}
          projectData={this.state.columns}
          newPost={this.newPost}
        />
        <TopBar items={this.state.columns} />
        <div className="grid__area">
          {this.state.columns.map(column => (
            <Column
              notify={this.notify}
              key={column.id}
              fetchdata={this.fetchdata}
              title={column.title}
              content={
                this.state.data
                  ? this.state.data.filter(note => note.column === column.title)
                  : []
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ListSite;
