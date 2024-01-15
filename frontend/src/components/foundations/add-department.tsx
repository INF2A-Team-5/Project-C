import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Icons } from "./icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  postBaseMutateRequest,
} from "@/lib/api";
import { toast } from "../ui/use-toast";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { useTranslation } from "react-i18next";

function AddDepartment({ setOpen }: { setOpen: (_: boolean) => void }) {
  const { t, i18n } = useTranslation();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit() {
    setIsLoading(true);
    const department = await fetch(
      API_BASE_URL + "/api/departments",
      getBaseQueryRequest(),
    )
      .then((data) => data.json())
      .then((departments) => departments.find((dep: any) => dep.name == name));

    if (department !== undefined) {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.department_exists_error"),
      });
      setIsLoading(false);
    } else if (name == "") {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.choose_department_error"),
      });
      setIsLoading(false);
    } else {
      try {
        fetch(
          API_BASE_URL + "/api/departments",
          postBaseMutateRequest(JSON.stringify({ name: name })),
        );
        toast({
          variant: "default",
          title: t("toast.successtitle"),
          description: t("toast.department_added"),
        });
        setIsLoading(false);
        setOpen(false);
      } catch {
        toast({
          variant: "destructive",
          title: t("toast.errortitle"),
          description: t("toast.something_wrong_error"),
        });
        setIsLoading(false);
      }
    }
  }
  return (
    <div className="grid gap-2">
      <Input
        placeholder={t("department.inputname")}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <DialogFooter>
        <DialogClose>
          <Button variant="outline">{t("department.close")}</Button>
        </DialogClose>
        <Button
          className="w-fit"
          variant="default"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {t("department.add")}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default AddDepartment;
