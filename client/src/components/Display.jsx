import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function Display() {
  const [response, setResponse] = useState([]);
  const [modalData, setModalData] = useState({
    id: "",
    name: "",
    role: "",
    age: "",
    blood: "",
    division: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/get-all");
        setResponse(res.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 500);

    return () => clearInterval(intervalId);
  }, []);

  const handleEditClick = (item) => {
    setModalData(item);
    document.getElementById("my_modal_1").showModal();
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      setResponse(response.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleCloseModal = async () => {
    document.getElementById("my_modal_1").close();

    try {
      await axios.put(
        `http://localhost:3000/update/${modalData.id}`,
        modalData
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="mt-10">
      <h1 className="text-center font-bold text-4xl">Display</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Age</th>
              <th>Blood</th>
              <th>Division</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {response.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>{item.age}</td>
                <td>{item.blood}</td>
                <td>{item.division}</td>
                <td>
                  <button className="btn" onClick={() => handleEditClick(item)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box w-[500px]">
          <section>
            <p className="text-xl font-bold">EDIT</p>
            <input
              type="text"
              name="name"
              value={modalData.name}
              onChange={handleChange}
              className="input input-bordered w-fit m-1"
            />
            <input
              type="text"
              name="role"
              value={modalData.role}
              onChange={handleChange}
              className="input input-bordered w-fit m-1"
            />
            <input
              type="text"
              name="age"
              value={modalData.age}
              onChange={handleChange}
              className="input input-bordered w-fit m-1"
            />
            <input
              type="text"
              name="blood"
              value={modalData.blood}
              onChange={handleChange}
              className="input input-bordered w-fit m-1"
            />
            <input
              type="text"
              name="division"
              value={modalData.division}
              onChange={handleChange}
              className="input input-bordered w-fit m-1"
            />
          </section>
          <div className="modal-action">
            <button className="btn" onClick={handleCloseModal}>
              Update
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Display;
