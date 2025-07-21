import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const loadCreditData = async () => {
    if (token) {
      try {
        const response = await fetch(`${backendUrl}/api/user/get-credits`, {
          method: "GET",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          setCredit(data.credit);
          console.log("Credit data loaded:", data);
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching credit data:", error);
      }
    }
  };

  const generateImage = async (prompt) => {
    try {
      const response = await fetch(`${backendUrl}/api/image/generate-image`, {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          prompt: prompt,
        }),
      });
      const data = await response.json();
      if (data.success) {
        loadCreditData();
        console.log("Image generated successfully:", data);
        return data.resultImage; // Assuming the API returns the image URL
      }
      else{
        toast.error(data.message || "Image generation failed. Please try again.");
        console.error("Image generation failed:", data.message);
        loadCreditData(); // Reload credit data in case of failure
        if(data.creditBalance == 0) {
          toast.error("You have no credit left. Please buy more credits.");
          navigate('/buy-credit');
        }
      }
   
      return null;
    } catch (error) {
      console.error("Error in generateImage:", error);
      return null;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setCredit(0);
    setShowLogin(false);
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      console.log("Token found, loading credit data...");

      loadCreditData();
    }
  }, [token]);
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logout,
    generateImage,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export { AppContext, AppContextProvider };

export default AppContextProvider;
