import { BookingRides } from "./BookingRides";
import { TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import { useState } from "react";

export const Rider = () => {
  const driver_id = localStorage.getItem("driver-id");
  const [isOnline, setIsOnline] = useState(true);
  const onToggleOnline = () => {
    setIsOnline((prev) => !prev);
  };
  return (
    <div className="grid grid-rows-[80px_1fr] h-screen">
      <TopBar isOnline={isOnline} onToggleOnline={onToggleOnline} />
      <div className="grid grid-cols-[200px_1fr]">
        <SideBar />
        <BookingRides />
      </div>
    </div>
  );
};
