import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

export const SideBar = () => {
  return (
    <div className="w-44 bg-white ">
      <div className="flex flex-col w-full gap-7 mt-5 ">
        <div className="flex flex-row gap-1 items-center px-2">
          <FaCheckCircle className="text-green-800 w-5 h-5" />
          <span>Dashboard</span>
        </div>
        <div className="border-b-[1px] border-gray-300"></div>
        <div className="flex flex-row gap-1 items-center px-2">
          <FaCheckCircle className="text-green-800 w-5 h-5" />
          <span>Completed Rides</span>
        </div>
        <div className="border-b-[1px] border-gray-300"></div>

        <div className="flex flex-row gap-1 items-center px-2">
          <IoMdCloseCircle className="text-red-800 w-5 h-5" />
          <span>Cancelled Rides</span>
        </div>
        <div className="border-b-[1px] border-gray-300"></div>

      </div>
    </div>
  )
}
