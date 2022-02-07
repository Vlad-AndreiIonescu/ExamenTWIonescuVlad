import { useState } from "react";
import Button from "@mui/material/Button";

function VirtualShelf(props) {
  const { item, onDelete, onSave } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(item.id);
  const [descriere, setDescriere] = useState(item.descriere);
  const [date, setDate] = useState(item.date);

  const deleteVirtualShelf = (evt) => {
    onDelete(item.id);
  };

  const saveVirtualShelf = (evt) => {
    onSave(item.id, {
      id,
      descriere,
      date,
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
    <div className="row">
      {isEditing ? (
        <>
          <table>
            <tr>
              <th>Id</th>
              <th>Descriere</th>
              <th>Date</th>
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
                  value={descriere}
                  onChange={(evt) => setDescriere(evt.target.value)}
                />{" "}
                {item.descriere}
              </td>
              <td>
                <input
                  type="date"
                  value={date}
                  onChange={(evt) => setDate(evt.target.value)}
                />
                {item.date}
              </td>
            </tr>
          </table>

          <Button
            className="column"
            variant="contained"
            onClick={saveVirtualShelf}
          >
            SAVE
          </Button>
          <Button className="column" variant="contained" onClick={cancel}>
            CANCEL
          </Button>
        </>
      ) : (
        <>
          <table>
            <tr>
              <th>Id</th>
              <th>Descriere</th>
              <th>Date</th>
            </tr>
            <tr>
              <td>{item.id}</td>
              <td>{item.descriere}</td>
              <td>{item.date}</td>
            </tr>

            <Button
              className="column"
              variant="contained"
              onClick={deleteVirtualShelf}
            >
              DELETE
            </Button>

            <Button className="column" variant="contained" onClick={edit}>
              EDIT
            </Button>
          </table>
        </>
      )}
    </div>
  );
}

export default VirtualShelf;
