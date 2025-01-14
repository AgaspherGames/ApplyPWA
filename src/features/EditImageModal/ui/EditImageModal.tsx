import { BackButton } from "@agaspher/apply.ui-kit";
import { IonContent, IonModal } from "@ionic/react";
import React, { useEffect, useRef } from "react";
import { CircleStencil, Cropper, CropperRef } from "react-mobile-cropper";
import "react-mobile-cropper/dist/style.css";
interface EditImageModalProps {
  image: string;
  isOpen: boolean;
  close: () => void;
  onCrop: (blob: Blob) => void;
}

const EditImageModal: React.FC<EditImageModalProps> = ({
  image,
  isOpen,
  close,
  onCrop,
}) => {
  const cropperRef = useRef<CropperRef>(null);

  const cropImage = () => {
    cropperRef.current?.getCanvas()?.toBlob(async (blob) => {
      if (blob) {
        onCrop(blob);
        close();
      }
    });
  };

  function checkCropper() {
    console.log(cropperRef.current?.isLoaded());
    if (!cropperRef.current?.isLoaded() && image && isOpen)
      setTimeout(() => {
        cropperRef.current?.refresh();
        checkCropper();
      }, 100);
  }

  useEffect(() => {
    checkCropper();
  }, [image]);

  return (
    <IonModal isOpen={isOpen} className="z-10">
      <IonContent>
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-full max-h-[80%]">
            <Cropper
              ref={cropperRef}
              aspectRatio={() => 1}
              stencilComponent={CircleStencil}
              src={image}
              className={"cropper"}
            />
          </div>
          <button
            onClick={cropImage}
            className="bg-stone-800 px-4 py-1 rounded-lg mt-2 font-medium relative overflow-hidden"
          >
            Сохранить
          </button>
        </div>
        <BackButton
          back={() => {
            close();
          }}
        />
      </IonContent>
    </IonModal>
  );
};

export default EditImageModal;
