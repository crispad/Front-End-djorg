import React, { Component } from "react";

class AddNote extends Component {
  state = {
    Title: "",
    Content: "",
    Category: ""
  };

  handleChange(event) {
    this.setState({ Title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ Title: "", Content: "" });
    this.props.add(this.state);
    this.setState({ Category: "" });
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="AddNote">
        <h4 className="Title">Add A New Note:</h4>
        <form className="Form">
          <input
            className="InputText"
            type="text"
            name="title"
            placeholder="Note Title"
            onChange={this.handleChange}
            value={this.state.Title}
          />
          <textarea
            className="Inputfield"
            type="textarea"
            name="text"
            placeholder="Note Content"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button className="Button" onClick={this.handleSubmit}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default AddNote;
