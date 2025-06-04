import { FaUserCircle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { MdLocationOff } from "react-icons/md";

interface ITopBarProps {
  isOnline: boolean;
  onToggleOnline: () => void;
}
export const TopBar = ({ isOnline, onToggleOnline }: ITopBarProps) => {
  return (
    <div className="bg-black h-20 flex flex-row justify-between items-center w-full text-white px-10">
      <span className="text-base font-sans">Go Ride</span>
      <div className="flex flex-row justify-between gap-4 items-center">
        <button
          onClick={onToggleOnline}
          className={`flex flex-row gap-1 items-center px-2 py-1 font-semibold transition-colors rounded-full ${
            isOnline
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {isOnline ? (
            <MdLocationOn className="w-3 h-3" />
          ) : (
            <MdLocationOff className="w-3 h-3" />
          )}
          {isOnline ? "Online" : "Offline"}
        </button>
        <FaUserCircle className="w-7 h-7" />
      </div>
    </div>
  );
};
