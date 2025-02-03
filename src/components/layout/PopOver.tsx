import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { useGetSingleUserQuery } from "@/redux/features/admin/user.api";

const PopOver = () => {
  const user = useAppSelector(selectCurrentUser);
  // console.log(user);
  const { data: singleUser } = useGetSingleUserQuery(user?.userId);
  const disPatch = useAppDispatch();

  // console.log(singleUser);

  const handleLogout = () => {
    disPatch(logOut());
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-1">
          <img
            src={singleUser?.data?.image}
            alt=""
            className="h-10 w-10 rounded-full bg-white"
          />
          <p>{singleUser?.data?.name}</p>
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
