import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../../routes/path";
import { useState } from "react";
import {
  registerDriverUser,
  registerPassengerUser,
} from "../../../api/authApi";
import Select from "react-select";
import { AVAILABLE_CITIES } from "../../../constants/cities";
import { carTypes } from "../../../data/constants";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IDriverProps } from "../../../types/auth";
import { InputField } from "../components/InputField";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDriverProps>({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);

  const [isDriver, setIsDriver] = useState<boolean>(false);
  const [carType, setCarType] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<{
    name: string;
    state: string;
    value: string;
    label: string;
  } | null>(null);

  console.log("errors", errors);

  const onSubmit: SubmitHandler<IDriverProps> = async (data) => {
    if (isDriver && !carType) {
      toast.error("Please select a car type");
      return;
    }
    if (isDriver && !selectedCity) {
      toast.error("Please select a city");
      return;
    }
    try {
      setIsLoading(true);
      if (!isDriver) {
        const response = await registerPassengerUser(data);
        if (response.data) {
          toast.success("Account created successfully!");

          reset();
          setCarType("");
          setSelectedCity(null);
          navigate(LOGIN_PATH);
        }
      } else {
        const driverData = {
          ...data,
          carType: carType,
          activeCity: selectedCity ? selectedCity.value : "",
          plateNumber: data.vehicleNumber,
          licenseNumber: data.vehicleNumber,
        };
        const response = await registerDriverUser(driverData);
        if (response.data) {
          reset();
          setCarType("");
          setSelectedCity(null);
          navigate(LOGIN_PATH);
        }
      }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex">
      <div className="w-1/2 h-dvh p-5 ">
        <div className="flex justify-center">
          <span className="text-xl font-semibold">REGISTER HERE</span>
        </div>
        <div className="flex flex-col gap-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-10 gap-4 items-cnter"
          >
            <InputField
              placeholder="Full Name"
              {...register("name", { required: "Full name is required" })}
              error={errors.name?.message}
            />
            <InputField
              placeholder="Mobile Number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: { value: /^[0-9]+$/, message: "Enter a valid number" },
              })}
              error={errors.phoneNumber?.message}
            />
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
              type="password"
              error={errors.password?.message}
            />
            {isDriver && (
              <div className="flex flex-col gap-4 items-cnter">
                <Select
                  options={AVAILABLE_CITIES}
                  value={selectedCity}
                  onChange={(selectedCity) => setSelectedCity(selectedCity)}
                  placeholder="Select the city you will drive in"
                />
                {!selectedCity && isDriver && (
                  <span className="text-red-500 text-sm">
                    Please select a city
                  </span>
                )}
                <label>Which vehicle you will be driving?</label>
                <div className="flex flex-row gap-5 justify-items-center align-middle items-center">
                  {carTypes.map((car, index) => {
                    const isSelected = car.value === carType;
                    return (
                      <div
                        key={index}
                        className={`flex flex-col items-center cursor-pointer p-2 rounded-md border-2 gap-2 ${
                          isSelected
                            ? "border-blue-500 shadow-lg"
                            : "border-transparent"
                        }`}
                        onClick={() => setCarType(car.value)}
                      >
                        <img
                          src={car.image}
                          className={`${car.className} ${
                            isSelected ? "scale-105" : "opacity-80"
                          } transition`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-blue-600" : "text-gray-600"
                          }`}
                        >
                          {car.name}
                        </span>{" "}
                      </div>
                    );
                  })}
                  {!carType && isDriver && (
                    <span className="text-red-500 text-sm">
                      Please select a vehicle type
                    </span>
                  )}
                </div>
                <InputField
                  placeholder="Vehicle Number"
                  {...register("vehicleNumber", { required: true })}
                  error={errors.vehicleNumber?.message}
                />
              </div>
            )}

            <button
              className="bg-black flex justify-center items-center text-white py-3 rounded-sm cursor-pointer "
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "CREATE ACCOUNT"}
            </button>
            <button
              className="bg-black flex justify-center items-center text-white py-3 rounded-sm mt-2 cursor-pointer "
              onClick={() => setIsDriver((prev) => !prev)}
            >
              {!isDriver ? "REGISTER AS A DRIVER" : "REGISTER AS A PASSENGER"}
            </button>
          </form>
          <div className="flex items-center justify-center gap-1 mb-10">
            <span className="text-[#7b7d8c]">
              {"Already have an account ? "}
            </span>
            <span
              className="font-bold text-sm cursor-pointer"
              onClick={() => navigate(LOGIN_PATH)}
            >
              {" "}
              {" Login"}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-black w-1/2 h-screen fixed right-0"></div>
    </div>
  );
};
