import React from "react"
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaPlus } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa6";
import { IoCloseSharp, IoSettingsSharp, IoSearchOutline, IoBagOutline, IoMenuOutline } from "react-icons/io5";
import { IconType } from "../types/Icon.type";
import { GoHeartFill, GoHeart, GoProjectRoadmap, GoHome, GoHomeFill, GoPerson  } from "react-icons/go";
import { MdLocalHospital } from "react-icons/md";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

const IconShared = ({ iconType, iconSize = "md", className, ...props }: IconType) => {
    let component = null;

    switch (iconType) {
        case "google":
            component = <FcGoogle />;
            break;
        case "apple":
            component = <FaApple />;
            break;
        case "kakao":
            component = <RiKakaoTalkFill />;
            break;
        case "left":
            component = <LiaAngleLeftSolid />;
            break;
        case "right":
            component = <LiaAngleRightSolid />;
            break;
        case "eye":
            component = <FaEye />;
            break;
        case "eye_active":
            component = <FaEyeSlash />;
            break;
        case "close":
            component = <IoCloseSharp />;
            break;
        case "plus":
            component = <FaPlus />;
            break;
        case "person":
            component = <GoPerson />;
            break;
        case "home":
            component = <GoHome />;
            break;
        case "home_active":
            component = <GoHomeFill />;
            break;
        case "like":
            component = <GoHeart />;
            break;
        case "like_active":
            component = <GoHeartFill />;
            break;
        case "setting":
            component = <IoSettingsSharp />;
            break;
        case "search":
            component = <IoSearchOutline />;
            break;
        case "review":
            component = <GoProjectRoadmap />;
            break;
        case "star":
            component = <FaStar />;
            break;
        case "hospital":
            component = <MdLocalHospital />;
            break;
        case "menu":
            component = <IoMenuOutline />;
            break;
        case "cart":
            component = <IoBagOutline />;
            break;
        default:
            component = null;
            break;
    }

    return <span {...props} className={`icon-${iconSize} text-back ${className}`}>{component}</span>
};

export default IconShared;