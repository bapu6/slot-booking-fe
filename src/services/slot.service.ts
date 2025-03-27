import { POST } from "../constants/api";
import { ISlotObject } from "../interfaces/user";
import { customFetch } from "../utils/api";

export const bookSlot = async (slotDetails: ISlotObject) => {
  const booked = await customFetch({
    path: "/slots/book",
    method: POST,
    data: slotDetails,
  });
  return booked;
};

export const releaseSlot = async (slotDetails: ISlotObject) => {
  const released = await customFetch({
    path: "/slots/release",
    method: POST,
    data: slotDetails,
  });
  return released;
};


export const SlotService = {bookSlot,releaseSlot}
