import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Settings from "../foundations/settings";
import { ApiDepartments } from "@/lib/api/departments";

function AddDepartment() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2>Add Department</h2>
      <div>
        <Input
          name="username"
          placeholder="Enter Department Name"
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>
      <Settings />
      <Button
        variant="default"
        onClick={() =>
          ApiDepartments.add({
            name,
            onSuccess: () => navigate("/admin"),
          })
        }
      >
        Add Department
      </Button>
      <Link to="/admin">
        <Button variant="destructive">Back</Button>
      </Link>
    </div>
  );
}

export default AddDepartment;
