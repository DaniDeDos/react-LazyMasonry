// Card.js
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Card = ({ item }) => {
  return (
    <LazyLoadImage src={item.urls.small} alt={item.description} effect="blur" />
  );
};

export default Card;
