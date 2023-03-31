import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { ClockBlack, FaceBook, Instagram, Line, PhoneBlackIcon, Youtube } from "src/components/svg";
import { CountryPhoneCodeType } from "src/constants/country_phone_code";
import SmallCart from "src/modules/shopping-cart/small_cart";
import {
  routeProductDetailBase,
  routeProductsBase,
  routeProductsListing,
} from "../constants/routes";
import useGetScreenWidth from "../hooks/useGetScreenWidth";
import { GetAppFooter } from "./GetAppFooter";
import CountryFooter from "./select/country-footer";
const cookies = new Cookies();
const ITEM_CLASS = "block sm:w-1/5 pl-0 item";

export function Footer({ hasSmallCart }: { hasSmallCart: boolean }) {
  const { t } = useTranslation("common");
  const [country, setCountry] = useState("Thailand");
  const screen = useGetScreenWidth();
  const router = useRouter();
  const LocationBase = cookies.get("LocationBase");
  const member = cookies.get("member");
  useEffect(() => {
    if (member) {
      setCountry(member.locationBase);
    }
  }, [member]);
  const displaySmallCart = useMemo(() => {
    if (
      hasSmallCart &&
      router.pathname === (routeProductDetailBase || routeProductsBase || routeProductsListing) &&
      screen !== "Desktop"
    ) {
      return false;
    }
    if (hasSmallCart) {
      return true;
    }
  }, [hasSmallCart, router.pathname, screen]);
  return (
    <div>
      <div className="sm:w-1216 mx-auto w-screen mb-6">
        <div className="sm:flex-row flex-col flex w-full pt-8 sm:pt-14 border-t">
          <div className="w-4/5 text-center sm:text-left sm:w-2/5 mx-auto sm:mx-0 block">
            <div className="sm:w-80">
              <div className="mb-6">
                <Image
                  src="/assets/images/SCM_Company_Logo.png"
                  alt="image delivery"
                  width={230}
                  height={50}
                />
              </div>
              <ul>
                <li className="text-base mb-5">{t`successmore-being-public-company-limited`}</li>
                <li className="text-base mb-5">{t`address-footer`}</li>
                <li className="flex justify-center sm:justify-start flex-wrap mb-5 text-sm">
                  <PhoneBlackIcon className="mr-2.5 w-[20px] sm:w-auto" />
                  <img
                    className="mr-1.5"
                    alt="thailand flag"
                    src="/assets/images/thailand_flag_icon.svg"
                  />{" "}
                  <span className="mt-1">+66 (0) 2 - 511 - 5951</span>
                </li>
                <li className="mb-5 text-sm">
                  <div className="items-center flex sm:justify-start justify-center">
                    <ClockBlack className="mr-2.5  w-[20px] sm:w-auto" />
                    <p>{t`open`}</p>
                  </div>
                  <div className="items-center flex sm:justify-start justify-center">
                    <div style={{ width: "34px" }}></div>
                    <p>{t`wed`}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={ITEM_CLASS}>
            <div className="w-48 mx-auto sm:mx-0 text-center sm:text-left">
              <div className="text-lg mb-4 sm:mb-6 text-orange">{t`customer-services`}</div>
              <ul>
                <li
                  className="mb-4 sm:mb-6 text-base"
                  role="button"
                  onClick={() => {
                    router.push("/help-center-1");
                  }}
                >{t`help-center`}</li>
                <Link href="https://scmconnext.com/help-center-3/61b18342c39242c05d523541">
                  <a>
                    <li className="mb-4 sm:mb-6 text-base">{t`how-to-buy`}</li>
                  </a>
                </Link>

                <Link href="https://scmconnext.com/help-center-3/61b1836cc39242a2b4523556">
                  <a>
                    <li className="mb-4 sm:mb-6 text-base">{t`shipping-delivery`}</li>
                  </a>
                </Link>

                <Link href="https://scmconnext.com/help-center-3/61b18399133b463e07c54462">
                  <a>
                    <li className="mb-4 sm:mb-6 text-base">{t`return-refund`}</li>
                  </a>
                </Link>
                <li
                  className="mb-4 sm:mb-6 text-base"
                  role="button"
                  onClick={() => {
                    router.push("/help-center-1");
                  }}
                >{t`contact-us`}</li>
              </ul>
            </div>
          </div>
          <div className={ITEM_CLASS}>
            <div className="mx-auto text-center sm:text-left">
              <div className="text-lg mb-4 sm:mb-6 text-orange">{t`about-success-more`}</div>
              <ul>
                <li
                  className="mb-4 sm:mb-6 text-base"
                  role="button"
                  onClick={() => {
                    router.push("/help-center-3/61b183cdc392422094523575");
                  }}
                >{t`about-us`}</li>
                {/* <li className="mb-6">{t`careers`}</li> */}
                <Link href="https://scmconnext.com/help-center-3/61b09e84e49b5a2cfdf1b5cc">
                  <a>
                    <li className="mb-4 sm:mb-6 text-base">{t`terms_codition`}</li>
                  </a>
                </Link>
                <Link href="https://scmconnext.com/help-center-3/61b0a00816657045a987b643">
                  <a>
                    <li className="mb-4 sm:mb-6 text-base">{t`privacy_policy`}</li>
                  </a>
                </Link>
                <li className="justify-center flex sm:block">
                  <span className="text-base float-left">{t`location_base`}:</span>
                  <CountryFooter
                    disabled={!!member}
                    country={LocationBase || country}
                    onSelect={({ name }: CountryPhoneCodeType) => {
                      cookies.set("LocationBase", name);
                      window.location.reload();
                      window.scrollTo(0, 0);
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className={ITEM_CLASS}>
            <div className="sm:text-center mt-7 sm:mt-0 text-center">
              <div className="text-lg mb-6 text-orange">{t`follow-us`}</div>
              <ul className="mx-auto sm:w-28 w-1/3">
                <Link href="https://www.facebook.com/SuccessmoreBeing">
                  <a target="_blank">
                    <li className="mb-6 flex cursor-pointer">
                      <FaceBook className="mr-2.5" />
                      {t`facebook`}
                    </li>
                  </a>
                </Link>
                <Link href="https://www.instagram.com/successmorethailand/">
                  <a target="_blank">
                    <li className="mb-6 flex cursor-pointer">
                      <Instagram className="mr-2.5" />
                      {t`insta`}
                    </li>
                  </a>
                </Link>
                <Link href="https://page.line.me/ros0356v?openQrModal=true">
                  <a target="_blank">
                    <li className="mb-6 flex">
                      <Line className="mr-2.5" />
                      {t`line`}
                    </li>
                  </a>
                </Link>
                <Link href="https://www.youtube.com/user/SuccessmoreBeing">
                  <a target="_blank">
                    <li className="mb-6 flex">
                      <Youtube className="mr-2.5" />
                      {t`youtube`}
                    </li>
                  </a>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        {displaySmallCart && <SmallCart />}
      </div>
      <GetAppFooter />
      <div>
        <div className="text-center text-base sm:text-lg mb-[44px] sm:mb-8 mt-[40px] sm:mt-2.5">{t`footer`}</div>
      </div>
    </div>
  );
}
