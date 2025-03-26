/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IFilter } from "../interfaces/app.interface";
import { customFetch } from "../utils/api";

export const fetchPatients = async (
  userId: string,
  currentPage: number,
  pageLimit: number,
  filter: IFilter
) => {
  try {
    // Filter out undefined properties from filter
    const definedFilter = Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => value !== "")
    );
    // Extract defined properties from filter
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      limit: pageLimit.toString(),
      ...definedFilter,
    }).toString();
    console.log(filter);
    const resp = await customFetch({
      path: `patients/${userId}?${queryParams}`,
    });
    return resp.data;
  } catch (error) {
    return null;
  }
};

export const userInfoService = { fetchPatients };
