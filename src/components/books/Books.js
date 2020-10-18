import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const booksUrl = "http://127.0.0.1:8000/api/books/";
const authorsUrl = "http://127.0.0.1:8000/api/authors/";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(booksUrl, {
      accept: "application/json",
      mode: "cors",
      "Content-Type": "application/json",
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //   const deleteTask = (task_id) => {
  //     try {
  //       fetch(booksUrl + task_id + "/", {
  //         credentials: "include",
  //         method: "DELETE",
  //         mode: "same-origin",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           "X-CSRFToken": csrftoken,
  //         },
  //       }).then((res) => res.text()); // or res.json()
  //       // .then((res) => console.log(res));
  //     } catch {
  //       //   console.log(error);
  //     }
  //   };

  //   const handleClick = (task_id) => {
  //     deleteTask(task_id);
  //   };
  return (
    <Fragment>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tytuł</th>
            <th scope="col">Autor</th>
            <th scope="col">Język</th>
            <th scope="col">Data publikacji</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{book.title}</td>
              {book.author.map((author) => (
                <td>{author.name}</td>
              ))}
              <td>{book.language}</td>
              <td>
                {book.partial_date
                  ? book.published_date.substring(0, 4)
                  : book.published_date}
              </td>
              <td>
                <NavLink
                  to={`books/${book.id}`}
                  className="btn btn-link btn-sm"
                >
                  <img
                    src="https://img.icons8.com/material-sharp/16/000000/edit.png"
                    alt="edit"
                  />
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Books;
