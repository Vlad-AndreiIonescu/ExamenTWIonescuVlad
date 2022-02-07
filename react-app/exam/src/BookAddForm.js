import { useState } from "react";

function BookAddForm(props) {
  const { onAdd } = props;
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [gen, setGen] = useState("");
  const [url, setUrl] = useState("");

  const add = (evt) => {
    onAdd({
      id,
      title,
      gen,
      url,
    });
  };

  return (
    <div>
      <h5>Add a Book</h5>

      <div>
        <input
          type="number"
          placeholder="id"
          onChange={(evt) => setId(evt.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(evt) => setTitle(evt.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="content"
          onChange={(evt) => setGen(evt.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="url"
          onChange={(evt) => setUrl(evt.target.value)}
        />
      </div>

      <div>
        <input type="button" value="addMe" onClick={add} />
      </div>
    </div>
  );
}

export default BookAddForm;
