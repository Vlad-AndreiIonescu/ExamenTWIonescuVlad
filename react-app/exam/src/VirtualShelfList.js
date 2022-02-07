import { useEffect, useState } from "react";
import store from "./VirtualShelfStore";
import VirtualShelfAddForm from "./VirtualShelfAddForm";
import VirtualShelf from "./VirtualShelf";

function VirtualShelfList() {
  const [virtualShelfs, setVirtualShelfs] = useState([]);

  useEffect(() => {
    store.getVirtualShelfs();
    store.emitter.addListener("GET_VIRTUALSHELFS_SUCCESS", () => {
      setVirtualShelfs(store.data);
    });
  }, []);

  const addVirtualShelf = (virtualShelf) => {
    store.addVirtualShelf(virtualShelf);
  };

  const deleteVirtualShelf = (id) => {
    store.deleteVirtualShelf(id);
  };

  const saveVirtualShelf = (id, virtualShelf) => {
    store.saveVirtualShelf(id, virtualShelf);
  };

  return (
    <div>
      <h4>List of VirtualShelfs</h4>
      {virtualShelfs.map((e) => (
        <VirtualShelf
          key={e.id}
          item={e}
          onDelete={deleteVirtualShelf}
          onSave={saveVirtualShelf}
        />
      ))}
      <VirtualShelfAddForm onAdd={addVirtualShelf} />
    </div>
  );
}

export default VirtualShelfList;
