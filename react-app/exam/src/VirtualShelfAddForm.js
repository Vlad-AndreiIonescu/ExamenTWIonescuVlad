import { useState } from "react";
import Button from "@mui/material/Button";

function VirtualShelfAddForm(props) {
  const { onAdd } = props;
  const [id, setId] = useState("");
  const [descriere, setDescriere] = useState("");
  const [date, setDate] = useState("");

  const add = (evt) => {
    onAdd({
      id,
      descriere,
      date,
    });
  };

  return (
    <div>
      <h6>Add a VirtualShelf</h6>

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
          placeholder="descriere"
          onChange={(evt) => setDescriere(evt.target.value)}
        />
      </div>

      <div>
        <input
          type="date"
          placeholder="date"
          onChange={(evt) => setDate(evt.target.value)}
        />
      </div>

      <div>
        <Button className="column" variant="contained" onClick={add}>
          Add VirtualShelf
        </Button>
      </div>
    </div>
  );
}

export default VirtualShelfAddForm;
