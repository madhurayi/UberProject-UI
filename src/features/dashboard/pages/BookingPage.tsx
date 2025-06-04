import { useEffect, useState } from "react";
import { RideMap } from "../components/RideMap";
import GORIDE_BLACK_LOGO from "../../../assets/GORIDE_BLACK_LOGO.png";
import { FaLocationDot } from "react-icons/fa6";
import { TbCircleDotFilled } from "react-icons/tb";
import { GeoSearch } from "../components/GeoSearch";
import { serviceTypes } from "../../../data/constants";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetLatLang } from "../../../hooks/useGetLatLang";
import { useGetRouteDistanceDuration } from "../../../hooks/useGetRouteDistanceDuration";
import { createBooking } from "../../../api/bookingApi";

export interface Coordinates {
  lat: number;
  lng: number;
}

export const BookingPage = () => {
  const params = useParams();
  const { getLatLng } = useGetLatLang();
  const { getRouteDistanceDur, distance, duration } =
    useGetRouteDistanceDuration();

  const [pickupCoords, setPickupCoords] = useState<Coordinates | null>(null);
  const [dropCoords, setDropCoords] = useState<Coordinates | null>(null);
  const [pickupAddress, setPickupAddress] = useState<string | "">(
    params?.pickupAddress ?? ""
  );
  const [dropAddress, setDropAddress] = useState<string>(
    params?.dropAddress ?? ""
  );
  const [selectedService, setSelectedService] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (pickupAddress.trim() === "" || dropAddress.trim() === "") return;
      const pickup = await getLatLng(pickupAddress);
      const drop = await getLatLng(dropAddress);
      if (pickup && drop) {
        setPickupCoords(pickup);
        setDropCoords(drop);
        await getRouteDistanceDur(pickup, drop);
      }
    })();
  }, [pickupAddress, dropAddress]);

  const handleBooking = async () => {
    if (!pickupCoords || !dropCoords) {
      console.error("Pickup and drop coordinates must be set before booking.");
      return;
    }
    const payload = {
      passengerId: 2,
      startLocation: {
        latitude: pickupCoords.lat,
        longitude: pickupCoords.lng,
      },
      endLocation: {
        latitude: dropCoords.lat,
        longitude: dropCoords.lng,
      },
    };
    console.log("payload", payload);

    const response = await createBooking(payload);
    console.log("respones", response);
  };
  return (
    <div className="flex flex-col justify-between mt-0 gap-5 font-sans pb-10">
      <div className="z-20 sticky top-0  bg-white px-5 shadow-lg flex flex-row items-center">
        <FaArrowLeft className="text-black w-6 h-6" />
        <img src={GORIDE_BLACK_LOGO} className="w-32 h-24" />
      </div>
      <div className="flex flex-col mb-10 mx-4">
        <div className="h-24 flex border rounded-xl border-[#dfe2e6] bg-[#f7f8fa] px-4 py-4 gap-6 mt-2">
          <div className="flex flex-col justify-between ">
            <FaLocationDot className="w-4 h-4 text-[#0a6b37]" />
            <div className="border-l-2 h-8 border-dashed border-gray-400 mx-auto"></div>
            <TbCircleDotFilled className="w-4 h-4 text-[#d13b2a]" />
          </div>
          <div className="flex flex-col justify-between w-full">
            {pickupAddress.length > 0 && (
              <GeoSearch
                address={pickupAddress}
                setAddress={setPickupAddress}
              />
            )}
            <div className="border-b w-full border-[#dfe2e6] my-2"></div>
            {dropAddress.length > 0 && (
              <GeoSearch address={dropAddress} setAddress={setDropAddress} />
            )}
          </div>
        </div>
        {pickupCoords && dropCoords && (
          <RideMap pickup={pickupCoords} drop={dropCoords} />
        )}

        {distance && duration && (
          <div className="text-center text-sm text-gray-600 mt-2">
            Distance: {distance} km | ETA: {duration} mins
          </div>
        )}

        <div className="flex flex-col gap-4 mt-5 overflow-y-auto">
          <span className="text-lg font-semibold text-gray-900 mb-4">
            Select Service
          </span>
          <div className="space-y-2 mb-5">
            {serviceTypes.map((service, index) => (
              <div
                className={`flex items-center justify-between mx-6 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedService === service.name
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
                key={index}
                onClick={() => setSelectedService(service.name)}
              >
                <div className="flex items-center gap-5 text-lg">
                  <img src={service.image} className="w-10 h-7" />
                  <span className="text-lg font-medium text-gray-900">
                    {service.name}
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {service.priceRange}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 flex bg-white w-full border-t h-20 items-center justify-center">
        <div className="bg-black p-5 w-5/6 rounded-md text-white h-16 flex text-center mt-4 text-xl items-center justify-center">
          <button onClick={handleBooking} className="cursor-pointer">
            Continue Booking
          </button>
        </div>
      </div>
    </div>
  );
};
