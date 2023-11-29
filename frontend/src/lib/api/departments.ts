import {
  API_BASE_URL,
  getBaseQueryRequest,
  getBaseMutateRequest,
  ApiRequest,
} from "@/lib/api";

export namespace ApiDepartments {
  export async function getAll() {
    const departments = await fetch(
      `${API_BASE_URL}/api/departments`,
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

    const requestInit = getBaseMutateRequest();
    const department = await getAll().then((departments) =>
      departments.find((dep: any) => dep.name == name)
    );

    if (department !== undefined) {
      alert("Department name already exists");
    } else if (name == "") {
      alert("Enter a name");
    } else {
      const response = await fetch("http://localhost:5119/api/departments", {
        ...requestInit,
        body: JSON.stringify({ departmentId: 0, name: name }),
      });

      try {
        const json = response.json();

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
