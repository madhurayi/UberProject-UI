import type { IDriverProps, IPassengerProps, ISigninProps } from "../types/auth"
import apiClient from "./apiClient"

export const registerPassengerUser=async(passengerData : IPassengerProps)=>{
    try{
    const response= await apiClient.post("/auth/api/v1/auth/signup/passenger",passengerData)
    return response.data;
    }catch (error) {
        console.error("Booking creation failed:", error);
    return null;
  }
}

export const registerDriverUser=async(driverData : IDriverProps)=>{
    try{
    const response= await apiClient.post("/auth/api/v1/auth/signup/driver",driverData)
    return response.data;
    }catch (error) {
        console.error("Booking creation failed:", error);
    return null;
  }
}

export const signIn = async(signinData: ISigninProps)=>{
  try{
    const response= await apiClient.post("auth/api/v1/auth/signin",signinData);
    return response.data;
  }catch(error){
    console.error("Login failed:", error);
    return null;
  }
}