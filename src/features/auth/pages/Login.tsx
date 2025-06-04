import { useNavigate } from "react-router-dom";
import { HOME_PATH, REGISTER_PATH, RIDER } from "../../../routes/path";
import { useState } from "react";
import { ROLES, USER_ROLES } from "../../../utils/roleUtils";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputField } from "../components/InputField";
import type { ISigninProps } from "../../../types/auth";
import { signIn } from "../../../api/authApi";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninProps>({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const onsubmit: SubmitHandler<ISigninProps> = async (data) => {
    if (!selectedRole) {
      toast.error("Please select a role");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await signIn(data);
      if (response?.data) {
        toast.success("logged in successfully");
      }
      if (response.data.user.role === USER_ROLES.passenger) {
        localStorage.setItem("passenger_id", response.data.user.id);
        navigate(HOME_PATH);
      } else {
        localStorage.setItem("driver_id", response.data.user.id);
        navigate(RIDER);
      }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex font-sans">
      <div className="w-1/2 h-dvh p-5">
        <div className="flex justify-center">
          <span className="text-xl font-semibold">LOGIN HERE</span>
        </div>
        <div className="flex flex-col gap-3">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col mt-10 gap-4 items-cnter"
          >
            <InputField
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />
            <InputField
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password must contain at least one letter and one number",
                },
              })}
              error={errors.password?.message}
            />
            <div className="flex flex-col gap-2">
              <legend className="text-[#6f6e6f] font-medium mb-1">
                Select Role
              </legend>
              <div className="flex gap-2 items-center justify-start">
                {ROLES.map((role) => (
                  <label
                    key={role.value}
                    className={`px-3 py-2 border rounded cursor-pointer ${
                      selectedRole === role.value
                        ? " text-black border-blue-300"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name={role.name}
                      value={role.value}
                      checked={role.value === selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    />{" "}
                    {role.label}
                  </label>
                ))}
              </div>
            </div>
            <button
              className="bg-black flex justify-center items-center text-white py-3 rounded-sm cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
          <div className="flex items-center justify-center gap-1">
            <span className="text-[#7b7d8c]">{"Don't have an account ? "}</span>
            <span
              className="font-bold text-sm cursor-pointer"
              onClick={() => navigate(REGISTER_PATH)}
            >
              {" "}
              {" Register"}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-black w-1/2 h-dvh"></div>
    </div>
  );
};
