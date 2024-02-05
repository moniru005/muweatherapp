import { FaTrashAlt, FaUserAlt } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  // get users from user api
  const {
    data: users = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  if (loading) {
    return <Loading></Loading>;
  }

  // Change User Status
  const handleStatus = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Verify? ",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Want!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/status/${user._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${user.name} is Verified Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  //User Add
  const handleAddUser = () => {};

  // User Delete
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: `You want delete ${user.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

    //search users
    const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const name = user?.name?.toLowerCase();
    const email = user.email;
    const date = user.date;
    const status = user?.status?.toLowerCase();

    return name.includes(query) ||
     email?.includes(query) ||
     date?.includes(query) ||
     status?.includes(query);
  });

  return (
    <div className="border rounded-t-md font-workSans">
      <div className="border-b-2  mb-4 rounded-t-md py-4 bg-gradient-to-r from-slate-700 to-black w-full">
        <h3 className="text-3xl text-white flex flex-col text-center">
          <span className="">User List</span>
        </h3>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> 

        <div className="flex items-center font-medium mb-4">
          <h2 className=" text-xl ">All Users ({users.length})</h2>
          <div className=" lg:ml-8 flex gap-4">
            <input
              className="p-2 border border-[#8e8e8e] font-workSans font-medium rounded-lg"
              type="text"
              placeholder="Search any key"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <table className="table w-full border">
          <thead className="border">
            <tr className="user-heading text-xs font-medium">
              <th className={`border`}>SL</th>
              <th className="border">User Name</th>
              <th className={`border`}>Email</th>
              <th className={`border`}>Date</th>
              <th className="border flex flex-col justify-center items-center">
                <span className="">Action</span>
                <span className="pl-1 font-medium">(Add / Delete user)</span>
              </th>
              <th className="border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className=" text-center">
                <td className={`border `}>{index + 1}</td>
                <td className="border w-fit">{user.name}</td>
                <td className={`border `}>{user.email}</td>
                <td className={`border `}>{user.date}</td>

                {/* Add / Delete User */}
                <td className={` flex flex-row gap-4 items-center justify-center`}>
                  <button
                    onClick={() => handleAddUser(user)}
                    className="bg-green-600 p-2 rounded"
                  >
                    <FaUserAlt className="text-white"></FaUserAlt>
                  </button>

                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="bg-red-600 p-2 rounded"
                  >
                    <FaTrashAlt className="text-white"></FaTrashAlt>
                  </button>
                </td>

                {/* Change status*/}
                <td className={`border uppercase`}>
                  {user.status === "Inactive" ? (
                    <p className="flex justify-center items-center">
                      {/* <FaCheck className="text-2xl font-bold text-green-600 " /> */}
                      <p className="text-red-600 font-medium">Inactive</p>
                    </p>
                  ) : (
                    <button
                      onClick={() => handleStatus(user)}
                      className="btn btn-sm"
                    >
                      {/* <RxCross2 className="text-2xl font-bold text-red-400 " /> */}
                      <p className="text-green-600 font-medium">Active</p>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
