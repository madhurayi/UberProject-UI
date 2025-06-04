import { HomePageTopBar } from "../components/HomePageTopBar";
import GOOGLE_MAPS_BACKGROUND from "../../../assets/GOOGLE_MAPS_BACKGROUND.png";
import { FaLocationDot } from "react-icons/fa6";
import { TbCircleDotFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { BOOKING_PATH } from "../../../routes/path";
import { GeoSearchResults } from "../components/GeoSearchResults";
import { useGeoSearch } from "../../../hooks/useGeoSearch";
import { useEffect, useRef, useState } from "react";
import { createBooking } from "../../../api/bookingApi";

export const HomePage = () => {
  const {
    results: pickupResults,
    setResults: setPickupResults,
    handleSearch: handlePickupSearch,
  } = useGeoSearch();

  const {
    results: dropResults,
    setResults: setDropResults,
    handleSearch: handleDropSearch,
  } = useGeoSearch();

  const pickupRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const [pickupAddress, setPickupAddress] = useState<string | "">("");
  const [dropAddress, setDropAddress] = useState<string>("");

  const navigate = useNavigate();
  const handleBookRide = async () => {
    const repsonse = await createBooking({
      passengerId: 2,
      startLocation: {
        latitude: 17.62,
        longitude: 78.09,
      },
      endLocation: {
        latitude: 18.62,
        longitude: 77.09,
      },
    });
    console.log("repsonse", repsonse);

    if (pickupAddress && dropAddress) {
      navigate(
        BOOKING_PATH.replace(":pickupAddress", pickupAddress).replace(
          ":dropAddress",
          dropAddress
        )
      );
    }
  };
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!pickupRef.current?.contains(e.target as Node)) {
        setPickupResults([]);
      }
      if (!dropRef.current?.contains(e.target as Node)) {
        setDropResults([]);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div>
      <HomePageTopBar />
      <div className="h-1/3 w-full ">
        <div className="flex flex-col justify-center items-center absolute top-1/5 left-4/12">
          <span className=" text-5xl font-bold">Bharat Moves on Go Ride</span>
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className=" flex flex-col mt-12 gap-4 ">
              <div className=" relative ">
                <input
                  placeholder="Enter Pickup Location"
                  className="p-5 pl-12.5 text-xl border-1 border-gray-400 rounded w-full"
                  value={pickupAddress}
                  onChange={(e) => {
                    setPickupAddress(e.target.value);
                    handlePickupSearch(e.target.value);
                  }}
                />
                <FaLocationDot className="absolute w-6 h-6 -mt-11.5 ml-4" />
                {pickupAddress.length > 3 && (
                  <GeoSearchResults
                    resultRef={resultRef}
                    results={pickupResults}
                    onSelect={async (result) => {
                      await handlePickupSearch(result.formatted);
                      setPickupAddress(result.formatted);
                      setPickupResults([]);
                    }}
                  />
                )}
              </div>

              <div className="relative">
                <input
                  placeholder="Enter Drop Location"
                  className="p-5 pl-12.5 text-xl border-1 border-gray-400 rounded w-full"
                  value={dropAddress}
                  onChange={(e) => {
                    setDropAddress(e.target.value);
                    handleDropSearch(e.target.value);
                  }}
                />
                <TbCircleDotFilled className="absolute w-6 h-6 -mt-11.5 ml-4 text-black" />
                {dropAddress.length > 3 && (
                  <GeoSearchResults
                    resultRef={resultRef}
                    results={dropResults}
                    onSelect={async (result) => {
                      await handleDropSearch(result.formatted);
                      setDropAddress(result.formatted);
                      setDropResults([]);
                    }}
                  />
                )}
              </div>
              <div className="mt-6">
                <button
                  className="bg-black text-white w-full text-2xl font-semibold py-5 rounded-md cursor-pointer"
                  onClick={handleBookRide}
                >
                  Book Ride
                </button>
              </div>
            </div>
          </form>
        </div>
        <img src={GOOGLE_MAPS_BACKGROUND} className="w-full h-[500px] " />
      </div>
    </div>
  );
};
