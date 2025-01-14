import EditImageModal from "@/features/EditImageModal";
import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import { ResumeApi } from "@/subapps/practice/entities/resume";
import React, { useState } from "react";
interface ResumeImageButtonProps {
  resumeId: string;
  resumeImage: string;
  onChange: () => void;
}

const ResumeImageButton: React.FC<ResumeImageButtonProps> = ({
  resumeId,
  resumeImage,
  onChange
}) => {
  const [image, setImage] = useState("/images/avatars/avatar_1.jpg");
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  function loadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result as string;
        if (imageSrc) {
          setImage(imageSrc);
          setIsSelectModalOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async function uploadImage(image: Blob) {
    await ResumeApi.uploadImage(resumeId, image);
    onChange()
  }

  return (
    <>
      <div className="relative">
        <img
          className="w-20 rounded-lg h-fit"
          src={getFileLink(resumeImage, "avatar")}
        />
        <input
          onChange={loadImage}
          type="file"
          className="absolute inset-0 opacity-0"
        />
      </div>
      <EditImageModal
        onCrop={uploadImage}
        close={() => {
          setIsSelectModalOpen(false);
        }}
        isOpen={isSelectModalOpen}
        image={image}
      />
    </>
  );
};

export default ResumeImageButton;
