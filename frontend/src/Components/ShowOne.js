import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShowOne = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = () => {
      axios.get(`http://localhost:8070/student/get/${id}`).then((res) => {
        setUser(res.data.user);
      });
    };
    getUser();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8070/student/update/${id}`, user)
      .then(() => {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            navigate("/get");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      })
      .catch((err) => Swal.fire("Not Updated", err.message, "error"));
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Âge</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            value={user.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Genre</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
          >
            <option value="Male">Homme</option>
            <option value="Female">Femme</option>
          </select>
        </div>
        <br />
        <button onClick={handleFormSubmit} className="btn btn-primary">
        Soumettre
        </button>
      </form>
    </div>
  );
};

export default ShowOne;
