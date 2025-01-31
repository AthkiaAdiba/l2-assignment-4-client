import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";

const PopOver = () => {
  const user = useAppSelector(selectCurrentUser);
  const disPatch = useAppDispatch();

  const handleLogout = () => {
    disPatch(logOut());
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-1">
          <img
            src={profile}
            alt=""
            className="h-10 w-10 rounded-full bg-white"
          />
          <p>ATHKIA ADIBA</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-[#f6dfd1] w-40 text-base font-normal">
        <Link
          to={`/${user?.role}/dashboard`}
          className="flex items-center gap-2"
        >
          <RxDashboard /> Dashboard
        </Link>
        <h1 onClick={handleLogout} className="flex items-center gap-2">
          <IoIosLogOut /> Log Out
        </h1>
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
