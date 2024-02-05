import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useFullDate from "../../Hooks/useFullDate";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const date = useFullDate();
  const navigate = useNavigate();
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
                title: `${data.name} Successfully Registered`,
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
              navigate("/");
            }
          });
        });
      });
    


  };

  return (
    <>
      <div className=" my-4 flex flex-col justify-center items-center font-workSans">
        <div className=" rounded-lg bg-gradient-to-tr from-black to-[#6eb6e5] p-6">
          <div className="mb-8">
            <h2 className="text-2xl text-center font-semibold text-white">
              Please Sign Up
            </h2>
          </div>
          {/* form */}
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4 w-full"
            >
              {/* Name */}
              <div className={`flex flex-col`} >
                <div className="w-full ">
                    <input
                      {...register("name", { required: true, maxLength: 20 })}
                      className="p-2 rounded border border-[#00C957] w-full"
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                  {errors.name && (
                    <span className="text-red-100">
                      Your Full Name is Required
                    </span>
                  )}
                </div>
              </div>



              {/* Email */}
              <div className="w-full">
                <input
                  {...register("email", { required: true })}
                  className="p-2 rounded border border-[#00C957] w-full"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              {errors.email?.type === "required" && (
                <span className="text-red-100">Your Email is required</span>
              )}

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
                  className="p-2 rounded border border-[#00C957] w-full"
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
                      Password at least one uppercase, one lowercase, one number
                      and one special character
                    </span>
                  )}
                </div>
              </div>

              <input
                className="p-2 border border-white bg-gray-700 hover:bg-gray-500 text-white rounded-lg shadow-black shadow-xl hover:shadow-md cursor-pointer text-lg font-semibold"
                type="submit"
                value="Submit"
              />
            </form>
            <p className="p-4 text-center text-white">
              Have an account? Please
              <Link to="/login">
                <button className="text-green-200 pl-1">Login</button>
              </Link>
            </p>
            <div>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
