import { toast } from "react-toastify";
import { IApiResponse, ICustomFetchParams } from "../interfaces/api";

export const apiUrl = "http://localhost:8080/api/v1";
// import.meta.env.VITE_API_URL;

export /**
 * Description for the below snippet
 *
 * @template T
 * @param {ICustomFetchParams} param0
 * @param {ICustomFetchParams} param0.path
 * @param {ICustomFetchParams} [param0.method="GET"]
 * @param {ICustomFetchParams} param0.data
 * @returns {Promise<T>}
 */
const customFetch = async <T, U>({
  path,
  method = "GET",
  data,
}: ICustomFetchParams<T>): Promise<IApiResponse<U>> => {
  const result = await fetch(`${apiUrl}/${path}`, {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((resp) => resp.json())
    .then((result) => result)
    .catch((e) => {
      toast.error(e?.message);
      throw new Error(e?.message);
    });

  return result;
};
