import React, { Component } from 'react';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      title: '',
      content: ''
    };
  }

  submit = () => {
    const { column, title, content } = this.state;
    if (!column) this.setState({ error: 'column must be specified' });
    else if (!title) this.setState({ error: "title can't be empty" });
    else if (!content) this.setState({ error: "content can't be empty" });
    else {
      this.props.newPost(column, title, content);
      this.setState({ title: '', content: '' });
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="new__project">
        {this.state.error && (
          <div className="new__project__error">{this.state.error}</div>
        )}
        <select
          name="column"
          onChange={e => this.handleInputChange(e)}
          className="new__project__dropdown"
          defaultValue=""
        >
          <option value="">New Project</option>
          {this.props.projectData.map(column => (
            <option value={column.title} key={column.id}>
              {column.title}
            </option>
          ))}
        </select>
        <input
          name="title"
          value={this.state.title}
          onChange={e => this.handleInputChange(e)}
          placeholder="Project title"
          type="text"
          className="new__project__title new__project__input"
        />
        <textarea
          name="content"
          value={this.state.content}
          onChange={e => this.handleInputChange(e)}
          placeholder="Project description"
          // name="new__project__description"
          id=""
          cols="18"
          rows="5"
          className="new__project__description  new__project__input"
        />
        <button
          type="button"
          onClick={this.submit}
          className="new__project__submit-button"
        >
          Add Project +
        </button>
      </div>
    );
  }
}

export default NewProject;
