import { FC } from "react";
import styles from "./button.module.scss";

import ButtonProps from "./button.props";
import Loader from "../Loader";
import match from "@/utils/match";

const Button: FC<ButtonProps> = ({
   handleClick,
   children,
   variant = "outline",
   size = "medium",
   className,
   loading,
   ...rest
}) => {
   const buttonVariant = match(variant, {
      outline: styles.variant__outline,
      solid: styles.variant__solid,
      red: styles.variant__red,
   });

   const sizeVariant = match(size, {
      small: styles.size__small,
      medium: styles.size__medium,
      large: styles.size__large,
   });

   return (
      <button
      onClick={handleClick}
         className={`outline-none rounded-[5px] font-semibold tracking-[1.25px] ${buttonVariant} ${sizeVariant} ${className || ""} ${loading ? "cursor-wait" : ""}`}
         {...rest}
      >
         {loading ? <Loader /> : children}
      </button>
   );
};

export default Button;
