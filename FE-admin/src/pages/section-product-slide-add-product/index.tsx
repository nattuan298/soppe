import { AddSlideProduct } from "src/modules/product-slide";

export default function AddSlideProductList() {
  // const { selectedBanner } = useSelector((state: RootState) => state.internalBanners);
  // const id = useMemo(() => selectedBanner?.bannerLoop, [selectedBanner]);
  // const url =
  //   id &&
  //   `/admin-dashboard/appearance-management/home-banner-management/banner-loop-list/banner-list/${id}`;
  return (
    <div className="p-5">
      <AddSlideProduct />
    </div>
  );
}
