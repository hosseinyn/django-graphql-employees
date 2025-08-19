import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/List-styles.css";

const List = () => {
  const [employeesList, setEmployeesList] = useState({});

  const getEmployeesList = async () => {
      const schema_query = `{
                allEmployees{
                    id
                    firstname
                    lastname
                    age 
                    hireDate
                }
            }`;

      try {
        let response = await axios.post("http://127.0.0.1:8000/graphql", {
          query: schema_query,
        });

        setEmployeesList(response.data.data.allEmployees);
      } catch (e) {
        console.log(e);
      }
    };

  useEffect(() => {
    getEmployeesList();
  }, []);

const handleDeleteForm = async (e) => {
    e.preventDefault();

    let id = e.target.dataset.id;

    const schema_query = `
        mutation {
            deleteEmployee(id: ${id}) {
                ok
            }
        }`;

    try {
        let response = await axios.post("http://127.0.0.1:8000/graphql" , {
            query : schema_query
        })

        if (response.data.data.deleteEmployee.ok) {
            alert("Deleted.")
            getEmployeesList()
        } else {
            alert("Error.")
        }

    } catch (e) {
        alert(e)
    }

}

  return (
    <>
      <h1 className="mt-5 text-center">Employees List</h1>

      <p className="text-center mt-4">
        <Link to="/add-employee">
          <button className="btn btn-success">Add employee</button>
        </Link>
      </p>

      <div className="d-flex flex-column gap-5 mt-5 justify-content-center align-items-center">
        {employeesList.length > 0 &&
          employeesList.map((value, index) => {
            return (
              <div
                key={index}
                className="employees-list d-flex flex-row gap-3 align-items-center justify-content-center"
              >
                <h5>
                  {value.firstname} {value.lastname}
                </h5>
                <h5>{value.age} years old</h5>
                <h5>Hired at {value.hireDate}</h5>
                <form
                  method="post"
                  data-id={value.id}
                  onSubmit={handleDeleteForm}
                >
                  <button type="submit" className="btn btn-danger">
                    Delete
                  </button>
                  <Link to={`/edit-employee/${value.id}`}>
                    <button type="button" className="btn btn-warning ms-1">
                        Edit
                    </button>
                  </Link>
                </form>
              </div>
            );
          })}

        {employeesList.length === 0 && <h4>No employee found.</h4>}
      </div>
    </>
  );
};

export default List;
