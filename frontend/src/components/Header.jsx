import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Header = () => {
   const {user , showLogin , setShowLogin } = useContext(AppContext)
    const navigate = useNavigate();
  return (
    <>
      <motion.div
        className="flex flex-col items-center justify-center text-center my-20"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-stone-500 inline-flex  gap-2 text-center bg-white px-6 py-1 rounded-full border border-neutral-500"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p>Best text to Image Converter</p>
          <img src={assets.star_icon} alt="" />
        </motion.div>
        <motion.h1
          className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
          initial={{ opacity: 0 }}
          transition={{ duration: 2, delay: 0.4 }}
          animate={{ opacity: 1 }}
        >
          Turn text to <span className="text-blue-600">image</span>, in seconds.
        </motion.h1>

        <motion.p
          className="text-center mx-auto mt-5 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Unleash your creativity with AI. Turn your imagination into visual art
          in seconds - Just type and watch the magic happen.
        </motion.p>

        <motion.button
          className="sm:text-lg text-white bg-black w-auto mt-8 px-12  py-2.5 flex items-center gap-2 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
          onClick={()=>{
            if(user){
              
              navigate('/result')
            }
            else{
              
              setShowLogin(true)
            }
          }}
        >
          Genrerate Images{" "}
          <img className="h-6" src={assets.star_group} alt="" />
        </motion.button>

        <motion.div
          className="flex justify-center gap-3 mt-16 flex-wrap"
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          animate={{ opacity: 1 }}
        >
          {Array(6)
            .fill("")
            .map((item, index) => {
              return (
                <>
                  {index % 2 == 0 ? (
                    <motion.img
                      className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                      key={index}
                      src={assets.sample_img_2}
                      alt=""
                      width={70}
                      whileHover={{ scale: 1.05, duration: 0.1 }}
                    />
                  ) : (
                    <img
                      className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                      key={index}
                      src={assets.sample_img_1}
                      alt=""
                      width={70}
                    />
                  )}
                </>
              );
            })}
        </motion.div>
        <motion.p
          className="text-neutral-600 mt-2"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          animate={{ opacity: 1 }}
        >
          Genterated images from imagify
        </motion.p>
      </motion.div>
    </>
  );
};

export default Header;
