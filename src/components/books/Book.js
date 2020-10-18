import React, { Component, Fragment } from "react";

class Book extends Component {
  state = {
    title: "",
    description: "",
    completed: false,
  };

  taskId = this.props.match.params.taskId;
  url = `http://127.0.0.1:8000/backend/tasks/${this.taskId}/`;

  componentDidMount() {
    fetch(this.url)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          title: data.title,
          description: data.description,
          completed: data.completed,
        });

        console.log(this.taskId);
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { title, description, completed } = this.state;
    return (
      <Fragment>
        <div className="card">
          <div className="card-header text-center">{title}</div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{description}</p>
              <footer className="blockquote-footer">
                {completed ? "Zadanie zakończone" : "Zadanie aktywne"}
              </footer>
            </blockquote>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Book;
