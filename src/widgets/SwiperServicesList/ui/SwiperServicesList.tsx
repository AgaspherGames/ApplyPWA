import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bookOutline, newspaperOutline, person } from "ionicons/icons";
import SwiperServicesListItem from "./SwiperServicesListItem";
import { routerLink } from "@/shared/utils/RouterLinkUtil";
import { Card } from "@agaspher/apply.ui-kit";

interface SwiperServicesListProps {}

const SwiperServicesList: React.FC<SwiperServicesListProps> = () => {
  return (
    <Card className="m-4 px-0">
      <Swiper spaceBetween={8} slidesPerView={3}>
        <SwiperSlide className="px-4">
          <SwiperServicesListItem
            icon={newspaperOutline}
            link={routerLink("practice", "home")}
            text="Стажировки"
          />
        </SwiperSlide>
        <SwiperSlide className="px-4">
          <SwiperServicesListItem
            icon={bookOutline}
            link={routerLink("practice", "home")}
            text="Курсы"
          />
        </SwiperSlide>
        <SwiperSlide className="px-4">
          <SwiperServicesListItem
            icon={person}
            link={routerLink("main", "profile")}
            text="Профиль"
          />
        </SwiperSlide>
      </Swiper>
    </Card>
  );
};

export default SwiperServicesList;
