import "./styles.css";

interface ProductCardProps {
  quantity: number;
}

export default function ProductQuantity({ quantity }: ProductCardProps) {
  return (
    <div className="flex justify-center">
      <div className="product-quantity bg-white flex items-center">
        <button disabled className="w-1/4">
          -
        </button>
        <p className="w-1/2 text-center text-black-primary text-base">{quantity}</p>
        <button disabled className="w-1/4">
          +
        </button>
      </div>
    </div>
  );
}
