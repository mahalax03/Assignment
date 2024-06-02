import React, { useState } from "react";
import axios from "axios";

function InputForm() {
  const [inputValue, setInputValue] = useState({ id: 0, name: "", role: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputValue.name && inputValue.role) {
        console.log(inputValue);
        await axios.post("http://localhost:3000/create-employee", inputValue);
        console.log("Data submitted successfully");
      } else {
        console.log("Please fill in all fields");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className="flex flex-wrap w-[80%] gap-10 justify-center items-center mt-20 mx-auto">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-xl font-semibold">
              What is your Id?
            </span>
          </div>
          <input
            type="number"
            name="id"
            value={inputValue.id}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered input-md  w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-xl font-semibold">
              What is your Name?
            </span>
          </div>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered input-md  w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-xl font-semibold">
              What is your Role?
            </span>
          </div>
          <input
            type="text"
            name="role"
            value={inputValue.role}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered input-md  w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-xl font-semibold">
              What is your Age?
            </span>
          </div>
          <input
            type="number"
            name="age"
            value={inputValue.age}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered input-md  w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-xl font-semibold">
              What is your Blood Group?
            </span>
          </div>
          <input
            type="text"
            name="blood"
            value={inputValue.blood}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered input-md  w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-xl font-semibold">
              What is your Division?
            </span>
          </div>
          <input
            type="text"
            name="division"
            value={inputValue.division}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered input-md  w-full max-w-xs"
          />
        </label>
      </form>
      <section className="flex justify-center items-center">
        <button
          type="submit"
          className="btn btn-success mt-5"
          onClick={handleSubmit}
        >
          {" "}
          Submit{" "}
        </button>
      </section>
    </>
  );
}

export default InputForm;
