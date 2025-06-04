import CAR from "../assets/CAR.png";
import AUTO from "../assets/AUTO.png";
import { serviceTypes } from "../data/constants";

export const BookingRides = () => {

  const Upcomingbookings = [{
    vehicleType: "Car",
    time: "Today 10:08pm",
    address: "Ameerpet, Hyderabad, Telangana",
  },
  {
    vehicleType: "Auto",
    time: "Today 12:08pm",
    address: "Madhapur, Hyderabad, Telangana",
  }]
  return (
    <div className="bg-[#e0efff] w-full flex flex-col gap-4 pt-5">
      {Upcomingbookings.map((booking) => <div>
        <div className="flex flex-row h-24 flex-1 rounded-md mx-5 bg-white justify-between">
          <div className="flex flex-row gap-2 items-center mx-5">
            {serviceTypes.map((type) => {
              if (type.name === booking.vehicleType)
                return <img src={type.image} className="w-14 h-14"></img>
            })}
            <div className="flex flex-col">
              <span>
                {booking.time}
              </span>
              <span>
                {booking.address}
              </span>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  )
}
