import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { TbCircleDotFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { results } from "../../mock/mockData";
import { HOME_PATH } from "../../routes/path";

export const MyRides = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  h-dvh">
      <div className="h-16 bg-white shadow-md flex flex-row items-center gap-6 px-4">
        <FaArrowLeft
          onClick={() => navigate(HOME_PATH)}
          className="cursor-pointer"
        />
        <span>My Rides</span>
      </div>
      <div className="bg-[#f7f7f7] m-4 flex flex-col gap-3 overflow-auto h-full  ">
        {results.map((result: any, index: number) => (
          <div
            key={index}
            className="h-52 bg-white border-[#ccd3db] border-1 rounded-sm flex flex-col"
          >
            <div className="h-7/12 border-b-2 border-b-[#e6e9ed] mt-3  flex flex-col">
              <div className="flex justify-between mx-4 ">
                <span>₹ {result.amount}</span>
                <span
                  className={`${result.backgroundColor} text-white py-[1px] px-3 rounded-md`}
                >
                  {result.status}
                </span>
              </div>
              <div className="mx-4 flex flex-col gap-1 mb-3">
                <span>{result.type}</span>
                <span className="text-sm text-[#808080]">
                  {result.date} {result.time}
                </span>
                <span className="text-[#808080] font-semibold text-sm">
                  {result.rideId}
                </span>
              </div>
            </div>
            <div className="h-5/12 ">
              <div className=" flex border rounded-xl border-none  px-4 py-3 gap-6">
                <div className="flex flex-col justify-between">
                  <FaLocationDot className="w-4 h-4 text-[#0a6b37]" />
                  <div className="border-l-2 h-8 border-dashed border-gray-400 mx-auto"></div>
                  <TbCircleDotFilled className="w-4 h-4 text-[#d13b2a]" />
                </div>
                <div className="flex flex-col justify-between w-full">
                  {result.pickupLocation}
                  <div className="border-b w-full border-[#dfe2e6] my-2"></div>
                  {result.dropLocation}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
