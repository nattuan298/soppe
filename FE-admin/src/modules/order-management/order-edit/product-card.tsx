import "./styles.css";
import dummyImg from "src/assets/img/dummy-img.png";

interface ProductCardProps {
  image: string;
  name: string;
}

export default function ProductCard({ image, name }: ProductCardProps) {
  return (
    <div className="flex">
      <img className="product-image" src={image ? image : dummyImg} alt="product" />
      <p className="text-lg">{name}</p>
    </div>
  );
}
