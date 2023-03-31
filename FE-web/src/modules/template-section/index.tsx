import { Fragment, useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";

import { Banner, ProductsCarousel, ProductsSkeleton, SeeAll } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { BannersType, ProductsType, TemplateSections } from "types/api-response-type";

export function TemplateSection({ section }: { section: TemplateSections }) {
  const [sectionBanners, setSectionBanners] = useState<BannersType>([]);
  const [sectionProducts, setSectionProducts] = useState<ProductsType>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const cookies = new Cookies();
  const memberCookies = cookies.get("member");
  const memberId = memberCookies?.memberId;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url = memberId
        ? `${apiRoute.templateSections.sectionItem}/${section.sectionSlideId}?memberId=${memberId}`
        : `${apiRoute.templateSections.sectionItem}/${section.sectionSlideId}`;
      const response = await axios.get(url);
      if (section.type.toLocaleUpperCase() === "BANNER") {
        setSectionBanners(response.data.data);
      } else if (section.type.toLocaleUpperCase() === "PRODUCT") {
        setSectionProducts(response.data.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [section, memberId]);

  const isExpiry = useMemo(() => {
    const now = new Date();
    const endDate = new Date(section.endDate);
    const startDate = new Date(section.startDate);
    const isExpiry = endDate.getTime() - now.getTime();
    const isFuture = startDate.getTime() - now.getTime();
    return isExpiry >= 0 && isFuture <= 0;
  }, [section]);

  const isFlashSale = useMemo(() => {
    if (section.type.toLocaleUpperCase() === "BANNER") {
      return false;
    }
    return section.countdown;
  }, [section]);

  if (section.type.toLocaleUpperCase() === "BANNER" && setSectionBanners.length > 0) {
    return <Banner height={400} banners={sectionBanners || []} />;
  }
  if (!isExpiry && isFlashSale) {
    return null;
  }
  return (
    <>
      {sectionProducts.length > 0 && (
        <Fragment>
          <SeeAll
            iconSrc={section.icon}
            isFlashSale={isFlashSale}
            endDate={section.endDate}
            titleText={section.name}
            link={`/sections-item/${section.sectionSlideId}`}
          />
          {sectionProducts.length !== 0 && <ProductsCarousel products={sectionProducts} />}
          {isloading && <ProductsSkeleton />}
        </Fragment>
      )}
    </>
  );
}
