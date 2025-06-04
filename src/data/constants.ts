import CAR from "../assets/CAR.png";
import AUTO from "../assets/AUTO.png";
import AUTO_RICKSHAW from "../assets/AUTO_RICKSHAW.png";
import VEHICLE_TYPE_CAR from "../assets/VEHICLE_TYPE_CAR.png";

export const serviceTypes = [
  { image: AUTO, name: "Auto", priceRange: "₹ 68 - ₹ 83" },
  { image: CAR, name: "Cab Economy", priceRange: "₹ 122 - ₹ 149" },
  { image: CAR, name: "Cab Premium", priceRange: "₹ 131 - ₹ 160" },
];

export const carTypes=[
  {name: "Auto-rickshaw", image:AUTO_RICKSHAW ,value: "AUTO",className:"w-15 h-15"},
  // {name: "Two-Wheeler",image: },
  {name: "Car", image: VEHICLE_TYPE_CAR, value: "CAR",className:"w-25 h-20"},
  // {name: "Slow EV"}
]