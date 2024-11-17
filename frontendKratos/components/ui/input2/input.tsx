"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./input.module.scss";
import { InputProps } from "./input.props";

const Input: React.FC<InputProps> = ({
   type,
   className = "",
   value,
   name,
   placeholder,
   onChange,
}) => {
   const [typeProp, setTypeProp] = useState(type);

   const togglePasswordVisibility = () => {
      setTypeProp(type === "password" ? "text" : "password");
   };

   return (
      <div className={styles.Container}>
         <input
            name={name}
            type={typeProp}
            className={`${styles.Input} ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />

         {type === "password" && (
            <button
               type="button"
               className={styles.Btn}
               onClick={togglePasswordVisibility}
            >
               {typeProp === "password" ? <FaEyeSlash /> : <FaEye />}
            </button>
         )}
      </div>
   );
};

export default Input;
