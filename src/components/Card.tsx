import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

interface CardProps {
  item: {
    urls: {
      small: string;
    };
    description: string;
  };
}

const Card = ({ item }: CardProps) => {
  return (
    <LazyLoadImage src={item.urls.small} alt={item.description} effect="blur" />
  );
};
export default Card;


