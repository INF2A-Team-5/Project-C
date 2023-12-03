import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiDepartments } from "@/lib/api/departments";

function AddDepartment() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="grid gap-2">
      <Input
        placeholder="Enter Department Name"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Button
        className="w-fit"
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
    </div>
  );
}

export default AddDepartment;
