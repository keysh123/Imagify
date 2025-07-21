import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BuyCredit = () => {
  const navigate = useNavigate();
  const { user, backendUrl, token, loadCreditData, setShowLogin } =
    useContext(AppContext);

  const initPayment = async (order) => {
    // console.log("Initializing payment with order:", order,import.meta.env.RAZORPAY_KEY_ID);
    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or ₹500.
      currency: order.currency,
      name: "Imagify",
      description: "Purchase Credits",
      order_id: order.id, //This is a sample Order ID. Replace with the actual Order ID generated from the backend.
      receipt: order.receipt,
      handler: async (response) => {
        try{
          const verifyResponse = await fetch(`${backendUrl}/api/user/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
           body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const data = await verifyResponse.json();
          if (data.success) {
            toast.success("Payment successful! Credits added.");
            loadCreditData();
            navigate("/");
          } else {
            toast.error(data.message || "Payment verification failed.");
          }


        }
        catch (error) {
          console.error("Payment handler error:", error);
          toast.error("Payment failed. Please try again later.");
          return;
        }
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  };

  const paymentRazorpay = async (plan) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }
      const response = await fetch(`${backendUrl}/api/user/buy-credits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          userId: user.id,

          planId: plan,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || "Payment failed. Please try again later.");
        return;
      }
      initPayment(data.order);
     
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("Payment failed. Please try again later.");
      return;
    }
  };

  return (
    <>
      <motion.div
        className="min-h-[80vh] text-center pt-14 mb-10"
        initial={{ opacity: 0.2, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
          Our Plans
        </button>
        <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
          Choose the plan
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-left">
          {plans.map((item, index) => {
            return (
              <div
                className="bg-white drop-shadow-sm  rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
                key={index}
              >
                <img width={40} src={assets.logo_icon} alt="" />
                <p className="mt-3 mb-1 font-semibold">{item.id}</p>
                <p className="text-sm">{item.desc}</p>
                <p className="mt-6">
                  {" "}
                  <span className="text-3xl font-medium">
                    $ {item.price}{" "}
                  </span>{" "}
                  / {item.credits} credits
                </p>
                <button
                  onClick={() => {
                    paymentRazorpay(item.id);
                  }}
                  className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
                >
                  {user ? "Purchase" : "Get Started"}
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default BuyCredit;
