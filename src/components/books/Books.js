import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const booksUrl = "https://lista-ksiazek.herokuapp.com/api/books/";

function Books() {
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState(booksUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tmp = `${booksUrl}?title=${title}&author=${author}&language=${language}&published_date__gt=${dateFrom}&published_date__lt=${dateTo}`;
    setUrl(tmp);
    console.log(`data: ${dateFrom}`);
    console.log(`url: ${url}`);
  };

  const onClickClear = (e) => {
    setAuthor("");
    setTitle("");
    setLanguage("");
    setDateFrom("");
    setDateTo("");
    setUrl(booksUrl);
  };

  const handleAuthor = (e) => {
    const value = e.target.value;
    setAuthor(value);
  };

  const handleLanguage = (e) => {
    const value = e.target.value;
    setLanguage(value);
  };

  const handleTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleDateFrom = (e) => {
    const value = e.target.value;
    setDateFrom(value);
  };

  const handleDateTo = (e) => {
    const value = e.target.value;
    setDateTo(value);
  };

  useEffect(() => {
    fetch(url, {
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
  }, [author, url]);

  return (
    <Fragment>
      {console.log(author)}
      <div className="card-body">
        <h5 className="card-title">Formularz wyszukiwania</h5>
      </div>
      <form action="/" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control mb-3 form-control-sm"
          placeholder="Tytuł"
          id="id_title"
          onChange={handleTitle}
          value={title}
        />
        <input
          type="text"
          name="author"
          className="form-control mb-3 form-control-sm"
          placeholder="Autor"
          id="id_author"
          onChange={handleAuthor}
          value={author}
        />
        <input
          type="text"
          name="language"
          className="form-control mb-3 form-control-sm"
          placeholder="Język publikacji"
          id="id_language"
          onChange={handleLanguage}
          value={language}
        />
        <label htmlFor="id_date_from">Data publikacji od:</label>
        <input
          type="date"
          name="date_from"
          className="form-control mb-3 form-control-sm"
          id="id_date_from"
          onChange={handleDateFrom}
          value={dateFrom}
        />
        <label htmlFor="id_date_to">Data publikacji do:</label>
        <input
          type="date"
          name="date_to"
          className="form-control mb-3 form-control-sm"
          id="id_date_to"
          onChange={handleDateTo}
          value={dateTo}
        />

        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary btn-sm">
              Wyszukaj
            </button>
            <NavLink
              to="/"
              className="btn btn-secondary btn-sm"
              onClick={onClickClear}
            >
              Wyczyść
            </NavLink>
          </div>
        </div>
      </form>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tytuł</th>
            <th scope="col">Autor</th>
            <th scope="col">Język</th>
            <th scope="col">Data publikacji</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <th scope="row">{index + 1}</th>
              <td>{book.title}</td>
              {book.author.map((author) => (
                <td key={author.id}>{author.name}</td>
              ))}
              <td>{book.language}</td>
              <td>
                {book.partial_date
                  ? book.published_date.substring(0, 4)
                  : book.published_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Books;
