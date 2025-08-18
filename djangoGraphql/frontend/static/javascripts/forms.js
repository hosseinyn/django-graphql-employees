// Delete form
const handleDeleteForm = (e) => {
    let id = e.target.dataset.id;
    e.preventDefault();
    const schema_query = `
        mutation {
            deleteEmployee(id: ${id}) {
                ok
            }
        }`;

    fetch("http://127.0.0.1:8000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: schema_query }),
    })
        .then((res) => res.json())
        .then((data) => {
        if (data.data.deleteEmployee.ok === true) {
            alert("Deleted.");
            window.location.reload()
        } else {
            alert("Something went wrong.");
        }
        })
        .catch((err) => console.error(err));
};
