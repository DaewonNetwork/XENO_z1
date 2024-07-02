import React from "react"
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaPlus } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash, FaStar } from "react-icons/fa6";
import { IoCloseCircle, IoPersonSharp, IoChatbubble, IoPersonCircleOutline, IoPersonCircle, IoCopy, IoChatbubbleOutline, IoCopyOutline, IoHeart, IoHeartOutline, IoSettingsSharp, IoMenu, IoSearchOutline, IoBagOutline, IoEllipsisHorizontal, IoMenuOutline } from "react-icons/io5";
import { GoHome, GoHomeFill, GoPencil } from "react-icons/go";
import { IconType } from "../types/Icon.type";
import { IoMdListBox } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
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
            component = <FaChevronLeft />;
            break;
        case "right":
            component = <FaChevronRight />;
            break;
        case "eye":
            component = <FaEye />;
            break;
        case "eye_active":
            component = <FaEyeSlash />;
            break;
        case "close":
            component = <IoCloseCircle />;
            break;
        case "plus":
            component = <FaPlus />;
            break;
        case "person":
            component = <IoPersonSharp />;
            break;
        case "home":
            component = <GoHome />;
            break;
        case "home_active":
            component = <GoHomeFill />;
            break;
        case "chat":
            component = <IoChatbubbleOutline />;
            break;
        case "chat_active":
            component = <IoChatbubble />;
            break;
        case "profile":
            component = <IoPersonCircleOutline />;
            break;
        case "profile_active":
            component = <IoPersonCircle />;
            break;
        case "matching":
            component = <IoCopyOutline />;
            break;
        case "matching_active":
            component = <IoCopy />;
            break;
        case "like":
            component = <GoHeartFill />;
            break;
        case "setting":
            component = <IoSettingsSharp />;
            break;
        case "pencil":
            component = <GoPencil />;
            break;
        case "ellip":
            component = <IoEllipsisHorizontal />;
            break;
        case "search":
            component = <IoSearchOutline />;
            break;
        case "review":
            component = <IoMdListBox />;
            break;
        case "person":
            component = <IoPerson />;
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