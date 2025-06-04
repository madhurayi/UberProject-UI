import type { IBookingProps } from "../types/booking";
import apiClient from "./apiClient";

export const createBooking=async(bookingInfo: IBookingProps)=>{
    try{
        const response= await apiClient.post("/booking/api/v1/booking",bookingInfo);
        return response.data;
    }catch (error) {
    console.error("Booking creation failed:", error);
    return null;
  }
}   