import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useFullDate from "../../../Hooks/useFullDate";


const AddUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const date = useFullDate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
      createUser(data.email, data.password).then((result) => {
        const loggedUser = result.user;
        console.log("Logged User", loggedUser);
        updateUserProfile(data.name, data.photoURL).then(() => {
          console.log("User Profile Updated");
          const userInfo = {
            name: data.name,
            email: data.email,
            date: date,
            status: "Active",
          };

          console.log(userInfo);

          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${data.name} Successfully Added`,
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
              navigate("/dashboard/allUsers");
            }
          });
        });
      });

  };

  return (
    <div className="w-full border rounded-t-md">
      <div className=" mb-4 flex flex-col justify-center items-center font-workSans w-full">
      <div className="border-b-2  mb-4 rounded-t-md py-4 bg-gradient-to-r from-slate-700 to-black  w-full">
        <h3 className="text-3xl text-white flex flex-col text-center">
          <span className="">Add User</span>
        </h3>
        
      </div>
        <div className=" rounded-lg p-6">
          {/* form */}
          <div className="w-[800px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-2"
            >
              {/* Name*/}
              <div className={`flex gap-2`}>
                {/* Name */}
                <div className="w-full ">
                  <input
                    {...register("name", { required: true, maxLength: 20 })}
                    className="p-2 rounded border w-full"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                  {errors?.name && (
                    <span className="text-red-100">
                      Your Full Name is Required
                    </span>
                  )}
                </div>
              </div>

              {/* Email and Password */}
              <div className={`flex flex-col gap-2`}>
                {/* Email */}
                <div className="w-full">
                  <input
                    {...register("email", { required: true })}
                    className="p-2 rounded border w-full"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  {errors.email?.type === "required" && (
                    <span className="text-red-100">Your Email is required</span>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                    })}
                    className="p-2 rounded border w-full"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                  />
                  <span
                    className="absolute top-3 right-2 text-xl text-[#0064A5]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                  {/* Password Validation Message */}
                  <div className="w-96">
                    {errors.password?.type === "required" && (
                      <span className="text-red-100">
                        Password field is required
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-100">
                        Password must be 6 characters
                      </span>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <span className="text-red-100">
                        Password must be less than 20 characters
                      </span>
                    )}
                    {errors.password?.type === "pattern" && (
                      <span className="text-red-100">
                        Password at least one uppercase, one lowercase, one
                        number and one special character
                      </span>
                    )}
                  </div>
                </div>
              </div>


              <div className="w-full">
                <input
                  className="p-2 border border-[#0064A5] bg-slate-800 hover:bg-slate-700 text-white rounded cursor-pointer text-base font-medium w-full"
                  type="submit"
                  value="Add User"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
