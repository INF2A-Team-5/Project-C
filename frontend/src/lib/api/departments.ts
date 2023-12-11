import { toast } from "@/components/ui/use-toast";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
  ApiRequest,
} from "@/lib/api";

export namespace ApiDepartments {
  export async function getAll() {
    const departments = await fetch(API_BASE_URL +"/api/departments",
      getBaseQueryRequest()
    ).then((res) => res.json());

    return departments;
  }

  export async function add<T>({
    name,
    ...options
  }: ApiRequest<{
    name: string;
  }>): Promise<T | null> {
    const { onSuccess, onError, throwOnError } = options;
    const department = await getAll().then((departments) =>
      departments.find((dep: any) => dep.name == name)
    );

    if (department !== undefined) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Department already exists",
      });
    } else if (name == "") {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Enter a department name",
      });
    } else {
      const response = await fetch(API_BASE_URL + "/api/departments", putBaseMutateRequest(JSON.stringify({ name: name }))
      );

      try {
        const json = response.json();
        toast({
          variant: "default",
          title: "Success!",
          description: "Department successfully added",
        });
        onSuccess && onSuccess();

        return json;
      } catch (exception) {
        onError && onError();

        if (throwOnError) {
          throw exception;
        }
      }
    }

    return null;
  }
}
