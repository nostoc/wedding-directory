"use client";
import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import profilePicPlaceholder from "../../assets/images/dashboardProfilePic.jpg";
//import profilePic from "../../../public/dashboard_profile_pic_placeholder.jpg"
interface ProfilePictureProps {
  profilePic: string | StaticImageData;
  setProfilePic: (image: string) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ profilePic, setProfilePic }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden transform -rotate-12 shadow-lg cursor-pointer"
      onClick={handleProfilePicClick}
    >
      <Image
        src={profilePic}
        alt="dashboard profile picture"
        className="w-[175px] h-[175px] object-cover"
        width={175}
        height={175}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleProfilePicChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ProfilePicture;
