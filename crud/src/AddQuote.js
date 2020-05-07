import React, { useState, useEffect } from "react";
import axios from "axios";
const initial = {
  author: "",
  quote: "",
};

const AddQuote = () => {
  const [addMode, setAddMode] = useState(false);
  const [addedQuote, setAddedQuote] = useState(initial);
  const reloadPage = () => {
    window.location.reload();
  };
  const handleChange = (e) => {
    e.preventDefault();
    setAddedQuote({ ...addedQuote, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://api1-project.herokuapp.com/api/users`, addedQuote)
      .then((res) => {
        setAddedQuote(res.data);
        reloadPage();
        setAddMode(false);
      })
      .catch((err) => console.log(err, "recipeData failed to return"));
  };

  return (
    <div>
      {addMode && (
        <form onSubmit={handleSubmit}>
          <label>Author:</label>
          <input
            placeholder="author"
            onChange={handleChange}
            type="text"
            name="author"
            value={addedQuote.author}
          ></input>

          <label>Quote:</label>
          <textarea
            placeholder="quote"
            onChange={handleChange}
            type="text"
            name="quote"
            value={addedQuote.quote}
          ></textarea>
          <button type="submit">Submit</button>
          <button onClick={() => setAddMode(false)}>cancel</button>
        </form>
      )}
      <button onClick={() => setAddMode(true)}>Add a quote</button>
    </div>
  );
};
export default AddQuote;
