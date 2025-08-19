import "../assets/styles/Add-styles.css";
import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";

const Edit = () => {
    const [formData , setFormData] = useState({
        firstname : '',
        lastname : '',
        age : 0,
        hireDate : ''
    });
    const navigate = useNavigate()

    const { employeeId } = useParams()

    useEffect(() => {
        const getEmployeeData = async () => {
            const schema_query = `query {
                allEmployees(employeeId: ${employeeId}) {
                    id
                    firstname
                    lastname
                    age
                    hireDate
                }
            }`

            try {
                let response = await axios.post("http://127.0.0.1:8000/graphql" , {
                    query : schema_query
                })

                const result = response.data.data.allEmployees[0]

                setFormData({
                    firstname: result.firstname,
                    lastname : result.lastname,
                    age : result.age,
                    hireDate : result.hireDate,
                })

            } catch (e) {
                console.log(e)
            }

        }

        getEmployeeData()

    } , [])

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
                editEmployee(firstname:"${formData.firstname}" , lastname:"${formData.lastname}" , age:${formData.age} , hireDate:"${formData.hireDate}" , id:${employeeId} ){
                    employee {
                    id
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

            if (response.data.data.editEmployee) {
                navigate("/")
            }

        } catch (e) {
            console.log(e)
        }
    }

  return (
    <>
      <h1 className="text-center mt-5">Edit Employee</h1>

      <center>
        <form
          method="post"
          className="add-employee-form d-flex flex-column mt-5 gap-3 align-items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="firstname">Firstname : </label>
          <input type="text" id="firstname" name="firstname" maxLength={50} required placeholder="Enter firstname" onChange={handleChange} value={formData.firstname} />

          <label htmlFor="lastname">Lastname : </label>
          <input type="text" id="lastname" name="lastname" maxLength={50} required placeholder="Enter lastname" onChange={handleChange} value={formData.lastname} />

          <label htmlFor="age">Age : </label>
          <input type="number" id="lastname" name="age" max={70} required placeholder="Enter age" onChange={handleChange} value={formData.age} />

          <label htmlFor="hireDate">Hire date : </label>
          <input type="date" id="hireDate" name="hireDate" required placeholder="Enter hire date" onChange={handleChange} value={formData.hireDate}  />

          <button className="btn btn-success" type="submit">
            Update
          </button>
        </form>
      </center>

      <br></br>
    </>
  );
};

export default Edit;
