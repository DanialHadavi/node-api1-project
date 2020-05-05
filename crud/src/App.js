import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AddQuote from "./AddQuote";
const initial = {
  id: "",
  author: "",
  quote: "",
};

function App() {
  const [editing, setEditing] = useState(false);
  const [quote, setQuote] = useState([]);
  const [quoteToEdit, setQuoteToEdit] = useState(initial);

  const reloadPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => setQuote(res.data))
      .then((err) => console.log(err));
  }, []);
  const editQuote = (quote) => {
    setEditing(true);

    // const edit = quote.find((updatedQuote) => updatedQuote.id === quote.id);

    setQuoteToEdit(quote);
  };
  const saveEdit = (e) => {
    const newQuote = {
      author: quoteToEdit.author,
      quote: quoteToEdit.quote,
    };
    e.preventDefault();

    axios
      .put(`/api/users/${quoteToEdit.id}`, newQuote)
      .then((res) => {
        setEditing(false);
        reloadPage();
      })
      .catch((err) => console.log(err));
  };
  const deleteQuote = (quote) => {
    axios
      .delete(`/api/users/${quote.id}`)
      .then((res) => {
        console.log("Quote has been returned", res);
        reloadPage();
      })

      .catch((err) => console.log(err, "sorry, Quote could not be returned"));
  };

  const editOnChange = (e) => {
    setQuoteToEdit({
      ...quoteToEdit,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="App">
      <div>
        {editing && (
          <form onSubmit={saveEdit}>
            <h3 className="edit-title">Edit Quote </h3>
            <input
              name="author"
              placeholder="author"
              value={quoteToEdit.author}
              onChange={editOnChange}
            />

            <textarea
              onChange={editOnChange}
              name="quote"
              placeholder="quote"
              value={quoteToEdit.quote}
            />

            <div>
              <button className="btn" type="submit">
                save
              </button>
              <button className="btn" onClick={() => setEditing(false)}>
                cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {quote.map((quote) => (
        <div key={quote.id}>
          <h3>{quote.author}</h3>
          <h4> {quote.quote}</h4>
          <button
            onClick={() => {
              editQuote(quote);
            }}
          >
            edit
          </button>
          <button
            onClick={() => {
              deleteQuote(quote);
            }}
          >
            delete
          </button>
          <br></br>
        </div>
      ))}
      <AddQuote />
    </div>
  );
}

export default App;
