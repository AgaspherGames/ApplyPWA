import { IonCard } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerSlide from "./BannerSlide";
import { IBanner } from "../../../entities/banner";

interface SwiperBannerProps {
  banners: IBanner[];
}

export default ({ banners }: SwiperBannerProps) => {
  return (
    <Swiper spaceBetween={5} slidesPerView={1} className="">
      {banners.map((el, ind) => (
        <SwiperSlide className="px-4" key={ind}>
          <BannerSlide banner={el} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
