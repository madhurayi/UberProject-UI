import { Link } from "react-router-dom";
import { TopBar } from "../../../shared/components/TopBar";

export const HomePageTopBar = () => {
  return (
    <TopBar>
      <div className="flex">
        <span className="text-white font-semibold text-3xl">GoRide</span>
      </div>
      <div className=" flex flex-row gap-16 text-xl text-white">
        <Link to={"/"}>About Us </Link>
        <Link to={"/"}>Safety</Link>
        <Link to={"/"}>Contact Us</Link>
      </div>
    </TopBar>
  );
};
