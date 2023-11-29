import Input from "../foundations/input";
import Button from "../foundations/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Settings from "../foundations/settings";

function AddDepartment() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    const department = await fetch("http://localhost:5119/api/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((departments) => departments.find((dep: any) => dep.name == name));

    if (department !== undefined) {
      alert("Department name already exists");
    } else if (name == "") {
      alert("Enter a name");
    }

    //post request
    else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("Token"),
        },
        body: JSON.stringify({ departmentId: 0, name: name }),
      };
      fetch("http://localhost:5119/api/departments", requestOptions)
        .then((response) => response.json())
        .then((data) => alert("Department added"));

      navigate("/admin");
    }
  }

  return (
    <div className="text-center">
      <h2>Add Department</h2>
      <div>
        <Input
          hierarchy="md"
          name="username"
          placeholder="Enter Department Name"
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>
      <br />
      <Settings></Settings>
      <Button
        hierarchy="xl"
        type="primary"
        onClick={handleSubmit}
        rounded="slight"
      >
        Add Department
      </Button>
      <h3></h3>
      <Button
        hierarchy="md"
        type="destructive"
        onClick={() => (window.location.href = "/admin")}
        rounded="slight"
      >
        Back
      </Button>
    </div>
  );
}

export default AddDepartment;
