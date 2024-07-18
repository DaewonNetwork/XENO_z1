import React from "react"
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa6";
import { IoCloseOutline, IoSettingsSharp, IoSearchOutline, IoBagOutline, IoMenuOutline } from "react-icons/io5";
import { IconType } from "../types/Icon.type";
import { GoHeartFill, GoPlus, GoHeart, GoProjectRoadmap, GoHome, GoHomeFill, GoPerson, GoChevronLeft, GoChevronRight, GoChevronUp, GoChevronDown, GoSun, GoMoon, GoDash } from "react-icons/go";
import { MdLocalHospital } from "react-icons/md";

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
            component = <GoChevronLeft />;
            break;
        case "right":
            component = <GoChevronRight />;
            break;
        case "top":
            component = <GoChevronUp />;
            break;
        case "bottom":
            component = <GoChevronDown />;
            break;
        case "eye":
            component = <FaEye />;
            break;
        case "eye_active":
            component = <FaEyeSlash />;
            break;
        case "close":
            component = <IoCloseOutline />;
            break;
        case "plus":
            component = <GoPlus />;
            break;
        case "minus":
            component = <GoDash />;
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
        case "sun":
            component = <GoSun />;
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
        case "moon":
            component = <GoMoon />;
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