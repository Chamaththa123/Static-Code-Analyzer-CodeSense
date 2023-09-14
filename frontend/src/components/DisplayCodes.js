import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DisplayCodes() {
  const [oitems, setoitems] = useState([]);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    getOitems();
  }, [id, deletedItemId]);

  const getOitems = () => {
    axios
      .get("http://localhost:7000/")
      .then((res) => {
        const sortedData = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setoitems(sortedData);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleDelete = async (idToDelete) => {
    try {
      await axios.delete(`http://localhost:7000/oitem/delete/${idToDelete}`);
      setDeletedItemId(idToDelete);
      alert("File deleted successfully!");
    } catch (error) {
      alert("Error deleting item: " + error.message);
    }
  };

  return (
    <div>
      <h1>Code List</h1>
      <ul>
        {oitems.map((item) => (
          <li key={item._id}>
            {item.file} {item.date}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayCodes;
