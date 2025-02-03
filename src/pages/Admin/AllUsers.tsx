/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "@/redux/features/admin/user.api";

const AllUsers = () => {
  const { data: usersData } = useGetAllUserQuery(undefined);
  const [updateUserStatus] = useUpdateUserStatusMutation();
  // console.log(usersData?.data);
  const users = usersData?.data;

  const handleUpdateUserStatus = (userId: string) => {
    updateUserStatus(userId);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold pb-10 text-center">All Products</h1>
      <div className="mr-2 lg:mr-5 overflow-x-auto">
        <Table className="border-2 mb-5 lg:mb-10">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Status Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  {user.name}
                </TableCell>
                <TableCell>
                  <img src={user.image} alt="" className="w-14 h-14" />
                </TableCell>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  {user.email}
                </TableCell>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  {user.phone}
                </TableCell>
                <TableCell className="uppercase text-2xl md:text-xs lg:text-base">
                  {user.address}
                </TableCell>
                <TableCell className="uppercase text-2xl md:text-xs lg:text-base">
                  {user.role}
                </TableCell>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  <p
                    className={`text-center rounded-md ${
                      user.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.status}
                  </p>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateUserStatus(user._id)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllUsers;
