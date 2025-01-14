import { IonIcon } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  Internship,
  InternshipApi,
} from "@/subapps/practice/entities/internship";
import {
  isFavoriteGetter,
  useFavoriteStore,
} from "@/subapps/practice/entities/favorite";
interface StarButtonProps {
  className?: string;
  internship: Internship;
}

const StarButton: React.FC<StarButtonProps> = ({ className, internship }) => {
  const isFavorite = useFavoriteStore(isFavoriteGetter(internship.id));
  const { addFavorite, removeFavorite, favorites } = useFavoriteStore();

  async function favoriteToggle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    if (isFavorite) {
      await addFavorite(internship);
    } else {
      await removeFavorite(internship);
    }
    console.log(favorites, internship);
  }

  return (
    <div className={twMerge("relative", className)}>
      <button onClick={favoriteToggle}>
        <motion.div
          whileTap={{ scale: 1.3 }}
          animate={isFavorite ? "starred" : "unstarred"}
        >
          <motion.div
            variants={{
              starred: { opacity: 1, scale: 1, rotate: 0 },
              unstarred: {
                opacity: 0,
                scale: 0,
                rotate: 360,
              },
            }}
          >
            <IonIcon className="w-6 h-6" icon={starOutline} />
          </motion.div>
          <motion.div
            className="absolute top-0"
            variants={{
              starred: { opacity: 0, scale: 0, rotate: 0 },
              unstarred: {
                opacity: 1,
                scale: 1,
                rotate: 360,
              },
            }}
          >
            <IonIcon className="w-6 h-6 text-yellow-500" icon={star} />
          </motion.div>
        </motion.div>
      </button>
    </div>
  );
};

export default StarButton;
