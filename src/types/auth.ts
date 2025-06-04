export interface IPassengerProps{
    name: string,
    email: string,
    password: string,
    phoneNumber: number | undefined
}

export interface IDriverProps{
    name: string,
    email: string,
    password: string,
    phoneNumber: number | undefined,
    activeCity?: string,
    vehicleNumber?: string,
    carType?: string
}

export interface ISigninProps {
    email: string,
    password: string,
    role:  string
}