import { useState } from "react";

function Book(props) {
  const { item, onDelete, onSave } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(item.id);
  const [title, setTitle] = useState(item.title);
  const [gen, setGen] = useState(item.gen);
  const [url, setUrl] = useState(item.url);

  const deleteBook = (evt) => {
    onDelete(item.id);
  };

  const saveBook = (evt) => {
    onSave(item.id, {
      id,
      title,
      gen,
      url,
    });

    setIsEditing(false);
  };

  const edit = () => {
    setIsEditing(true);
  };

  const cancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <table>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Gen</th>
              <th>URL</th>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  value={id}
                  onChange={(evt) => setId(evt.target.value)}
                />{" "}
                {item.id}
              </td>
              <td>
                <input
                  type="text"
                  value={title}
                  onChange={(evt) => setTitle(evt.target.value)}
                />{" "}
                {item.title}
              </td>

              <td>
                <input
                  type="text"
                  value={gen}
                  onChange={(evt) => setGen(evt.target.value)}
                />
                {item.gen}
              </td>
              <td>
                <input
                  type="text"
                  value={url}
                  onChange={(evt) => setUrl(evt.target.value)}
                />
                {item.date}
              </td>
            </tr>
          </table>

          <input type="button" value="save" onClick={saveBook} />
          <input type="button" value="cancel" onClick={cancel} />
        </>
      ) : (
        <>
          <table>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Gen</th>
              <th>URL</th>
            </tr>
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.gen}</td>
              <td>{item.url}</td>
            </tr>
            <input type="button" value="delete" onClick={deleteBook} />
            <input type="button" value="edit" onClick={edit} />
          </table>
        </>
      )}
    </div>
  );
}

export default Book;
