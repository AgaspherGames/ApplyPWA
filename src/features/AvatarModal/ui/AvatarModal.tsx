import { IonAvatar, IonContent, IonModal } from "@ionic/react";
import React, { useRef, useState } from "react";
import { UserApi, useUserStore } from "@/entities/user";
import { BackButton } from "@agaspher/apply.ui-kit";
import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import EditImageModal from "@/features/EditImageModal";
interface AvatarModalProps {}

const AvatarModal: React.FC<AvatarModalProps> = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
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

  return (
    <>
      <IonModal ref={modal} trigger="open-avatar-modal">
        <IonContent>
          <BackButton
            back={() => {
              modal.current?.dismiss();
            }}
          />
          <div className="p-4 flex flex-col h-full">
            <div className="flex flex-col items-center ">
              <div className="box-border w-3/4 bg-stone-600 rounded-full overflow-hidden">
                <img
                  src={getFileLink(user?.avatar, "avatar")}
                  alt=""
                  className="w-full aspect-square h-auto"
                />
              </div>

              <button className="bg-stone-800 px-4 py-1 rounded-lg mt-2 font-medium relative overflow-hidden">
                <input
                  onChange={loadImage}
                  type="file"
                  className="absolute inset-0 opacity-0"
                />
                Изменить
              </button>
            </div>
            <div className=" mt-6">
              <h1 className="text-2xl font-semibold mb-4">Готовые аватары</h1>
              <div className="grid grid-cols-3 gap-4 flex-wrap">
                {Array(9)
                  .fill("a")
                  .map((el, ind) => (
                    <div>
                      <IonAvatar
                        onClick={() => {
                          setImage(`/images/avatars/avatar_${ind + 1}.jpg`);
                          setIsSelectModalOpen(true);
                        }}
                        className=" h-auto aspect-square w-full"
                      >
                        <img
                          alt="avatar"
                          src={`/images/avatars/avatar_${ind + 1}.jpg`}
                        />
                      </IonAvatar>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </IonContent>
      </IonModal>
      <EditImageModal
        onCrop={async (blob) => {
          if (blob) {
            await UserApi.uploadAvatar(blob);
            setUser();
            setIsSelectModalOpen(false);
          }
        }}
        close={() => {
          setIsSelectModalOpen(false);
        }}
        isOpen={isSelectModalOpen}
        image={image}
      />
    </>
  );
};

export default AvatarModal;
