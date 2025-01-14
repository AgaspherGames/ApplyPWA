import { Card } from "@agaspher/apply.ui-kit";
import React from "react";
interface ProfileMenuButtonProps {
  setTab: () => void;
  image: string;
  title: string;
  description: string;
}

const ProfileMenuButton: React.FC<ProfileMenuButtonProps> = ({
  setTab,
  image,
  description,
  title,
}) => {
  return (
    <button className="block h-full w-full" onClick={setTab}>
      <Card className="flex flex-col justify-center rounded-3xl px-4 h-full relative overflow-hidden w-full">
        <div className="w-1/2 absolute left-0 -translate-x-[35%] rotate-12">
          <img className="w-full" src={image} />
          <img
            className="blur-3xl opacity-30 absolute -z-10 top-0 left-0 w-full"
            src={image}
          />
        </div>
        <div className="ml-[35%] text-left">
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-zinc-500 text-balance ">{description}</p>
        </div>
      </Card>
    </button>
  );
};

export default ProfileMenuButton;
