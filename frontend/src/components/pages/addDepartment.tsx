import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiDepartments } from "@/lib/api/departments";
import { Icons } from "../foundations/icons";

function AddDepartment() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Add Department
      </Button>
    </div>
  );
}

export default AddDepartment;
