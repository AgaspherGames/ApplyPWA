import React from "react";
import { SwiperSlideProps } from "swiper/react";
import { IBanner } from "../../../entities/banner";
import { Card } from "@agaspher/apply.ui-kit";
interface BannerSlideProps extends SwiperSlideProps {
  banner: IBanner;
}

const BannerSlide: React.FC<BannerSlideProps> = ({ banner, ...props }, ref) => {
  return (
    <Card className="w-full p-0 overflow-hidden">
      <img src={banner.image} />
    </Card>
  );
};

export default BannerSlide;
