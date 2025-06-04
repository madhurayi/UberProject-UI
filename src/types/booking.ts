export interface IBookingProps {
    passengerId: number,
    startLocation: ILocationCoordinates,
    endLocation: ILocationCoordinates
}

export interface ILocationCoordinates {
    latitude: number,
    longitude: number
}