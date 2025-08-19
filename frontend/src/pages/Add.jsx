import "../assets/styles/Add-styles.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [formData , setFormData] = useState({
        firstname : '',
        lastname : '',
        age : 0,
        hireDate : ''
    });
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const schema_query = `
            mutation {
                createEmployee(firstname:"${formData.firstname}" , lastname:"${formData.lastname}" , age:${formData.age} , hireDate:"${formData.hireDate}"){
                    employee {
                        firstname
                        lastname
                        age
                        hireDate
                        }
                    }
            }
  `

        try {
            let response = await axios.post("http://127.0.0.1:8000/graphql" , {
                query : schema_query
            })

            if (response.data.data.createEmployee) {
                navigate("/")
            }

        } catch (e) {
            console.log(e)
        }
    }

  return (
    <>
      <h1 className="text-center mt-5">Add Employee</h1>

      <center>
        <form
          method="post"
          className="add-employee-form d-flex flex-column mt-5 gap-3 align-items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="firstname">Firstname : </label>
          <input type="text" id="firstname" name="firstname" maxLength={50} required placeholder="Enter firstname" onChange={handleChange} />

          <label htmlFor="lastname">Lastname : </label>
          <input type="text" id="lastname" name="lastname" maxLength={50} required placeholder="Enter lastname" onChange={handleChange} />

          <label htmlFor="age">Age : </label>
          <input type="number" id="lastname" name="age" max={70} required placeholder="Enter age" onChange={handleChange} />

          <label htmlFor="hireDate">Hire date : </label>
          <input type="date" id="hireDate" name="hireDate" required placeholder="Enter hire date" onChange={handleChange}  />

          <button className="btn btn-success" type="submit">
            Add
          </button>
        </form>
      </center>

      <br></br>
    </>
  );
};

export default Add;
