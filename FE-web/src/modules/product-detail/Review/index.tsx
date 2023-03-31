import { CircularProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import Stars from "src/components/stars";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { ReviewProductType } from "types/api-response-type";
import NoReview from "./no-review";
import OneReview from "./one-review";

interface ReviewProductContainerType {
  rating?: number;
  productCode: string;
}

export default function ReviewProduct({ rating = 0, productCode }: ReviewProductContainerType) {
  const { t } = useTranslation("common");
  const [reviews, setReviews] = useState<ReviewProductType[]>([]);
  const [numberRates, setNumberRates] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [firstSeeMore, setfirstSeeMore] = useState(false);

  // get reviews
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${apiRoute.products.getReviews}?page=${page}&pageSize=10&productCode=${productCode}`,
        );
        if (res.data?.data) {
          if (page === 1 && res.data.data.length > 3) {
            setfirstSeeMore(true);
          }
          setReviews((pre) => [...pre, ...res.data?.data]);
        }

        setNumberRates(res.data?.total || 0);
      } catch (e) {}
      setLoading(false);
    };

    getData();
  }, [productCode, page]);

  useEffect(() => {
    setReviews([]);
    setNumberRates(0);
  }, [productCode]);

  const handleSeeMore = () => {
    if (firstSeeMore) {
      return setfirstSeeMore(false);
    }
    setPage((pre) => pre + 1);
  };

  const reviewsShow = firstSeeMore ? reviews.slice(0, 3) : reviews;

  return (
    <div className="mt-6 mx-4 sm:mx-0">
      <div className="flex items-center">
        <span className="font-medium mr-1">{t`reviews`}</span>
        {/* <NumberFormat
          className="text-lighterGray text-sm"
          value={numberRates}
          prefix="("
          suffix=")"
        /> */}
        <div className="text-lighterGray text-sm">({numberRates})</div>
      </div>

      <div className="flex items-center">
        <Stars numberOfStars={rating} />
        <span className="text-sm text-black-dark">{rating}/5</span>
      </div>

      {reviews.length > 0 && (
        <div>
          <div>
            {reviewsShow.map((item, i) => (
              <OneReview key={i} review={item} />
            ))}
          </div>

          {(reviews.length < numberRates || (firstSeeMore && reviews.length <= 10)) && !loading && (
            <div className="flex justify-center mt-6">
              <span
                className="text-blue cursor-pointer"
                onClick={handleSeeMore}
              >{t`see_more`}</span>
            </div>
          )}

          {loading && (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          )}
        </div>
      )}

      {(!reviews || reviews.length === 0) && <NoReview />}
    </div>
  );
}
