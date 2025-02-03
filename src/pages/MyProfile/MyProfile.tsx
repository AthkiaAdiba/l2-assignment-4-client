import { useAppSelector } from "@/redux/hooks";
import wallpaper from "../../assets/profilebg.jpg";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/admin/user.api";
import ProfileUpdateModal from "@/components/layout/ProfileUpdateModal";

const MyProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: singleUser } = useGetSingleUserQuery(user?.userId);
  //   console.log(singleUser);

  return (
    <div className="mt-0 lg:mt-10 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl w-full md:w-3/4 lg:w-4/5 xl:w-2/4">
        <img
          alt="profile"
          src={wallpaper}
          className="w-full mb-4 rounded-t-lg h-36"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={singleUser?.data?.image}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 uppercase px-4 text-xs text-white bg-gray-900 rounded-full">
            {singleUser?.data?.role}
          </p>
          <div className="w-full space-y-2 p-2 mt-4 rounded-lg">
            {/* first row */}
            <div className="flex flex-wrap items-center justify-between text-lg text-black dark:text-white">
              <p className="flex flex-col md:flex-row lg:flex-row font-semibold">
                Name:
                <span className="text-gray-600 ml-2 dark:text-white">
                  {singleUser?.data?.name}
                </span>
              </p>
              <p className="flex flex-col md:flex-row lg:flex-row font-semibold">
                Email:
                <span className="text-gray-600 ml-2 dark:text-white">
                  {singleUser?.data?.email}
                </span>
              </p>
            </div>
            {/* second row */}
            <div className="flex flex-wrap items-center justify-between text-lg text-black dark:text-white">
              <p className="flex flex-col md:flex-row lg:flex-row font-semibold">
                Address:
                <span className="text-gray-600 ml-2 dark:text-white">
                  {singleUser?.data?.address}
                </span>
              </p>
              <p className="flex flex-col md:flex-row lg:flex-row font-semibold">
                Phone:
                <span className="text-start text-gray-600 ml-2 dark:text-white">
                  {singleUser?.data?.phone}
                </span>
              </p>
            </div>
          </div>
          <ProfileUpdateModal />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
