import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  

  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        
        navigate(from, {replace: true});
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError("Email Not Found");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect Password");
        } else {
          setError("Login Failed. Please try again.");
        }
      });
  };

  return (
    <>

      <div className=" my-16 flex flex-col justify-center items-center font-workSans">
        <div className="w-96  rounded bg-gradient-to-tr from-black to-[#6eb6e5] p-6">
          <div className="mb-8">
            <h2 className="text-2xl text-center font-semibold text-white">
              Please Login
            </h2>
          </div>
          {/* form */}
          <div className="">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-8 w-full"
            >
              <input
                className="p-4 rounded-lg border border-[#00C957] "
                type="email"
                name="email"
                placeholder="Email"
              />
              <div className="relative">
                <input
                  className="p-4 rounded-lg border border-[#00C957] w-full"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                <span
                  className="absolute top-5 right-2 text-xl text-[#0064A5]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              {error && <p className="text-red-100">{error}</p>}

              <input
                className="p-2 border border-white bg-gray-700 hover:bg-gray-500 text-white rounded-lg shadow-black shadow-xl hover:shadow-md cursor-pointer text-lg font-semibold"
                type="submit"
                value="Login"
              />
            </form>
            <p className="p-4 text-center text-white">
              New here?
              <Link to="/register">
                <button className="text-green-200 pl-2">Register</button>
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

export default Login;
