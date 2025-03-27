import { toast } from "react-toastify";
import { IApiResponse, ICustomFetchParams } from "../interfaces/api";
import { COMMON_ERROR } from "../constants/error";

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
    try {
      const res = await fetch(`${apiUrl}/${path}`, {
        method,
        body: data ? JSON.stringify(data) : null,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "An error occurred");
      }
      const result = await res.json();
      return result;
    } catch (e) {
      toast.error(e?.message);
      throw new Error(e?.message);
    }
  };
