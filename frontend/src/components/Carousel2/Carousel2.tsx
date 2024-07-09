import React from "react";
import Slider from "react-slick";
import "./Carousel2.css";

const cardData = [
  { title: "Card 1", content: "This is the first card." },
  { title: "Card 2", content: "This is the second card." },
  { title: "Card 3", content: "This is the third card." },
];

const Thumbnail = ({
  card,
  onClick,
  isActive,
}: {
  card: { title: string };
  onClick: () => void;
  isActive: boolean;
}) => (
  <div className={`thumbnail ${isActive ? "active" : ""}`} onClick={onClick}>
    {card.title}
  </div>
);

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    customPaging: function (i) {
      return <button>{i + 1}</button>;
    },
    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {cardData.map((card, index) => (
          <div key={index} className="carousel-card">
            <h2>{card.title}</h2>
            <p>{card.content}</p>
          </div>
        ))}
      </Slider>
      <div className="thumbnails">
        {cardData.map((card, index) => (
          <Thumbnail
            key={index}
            card={card}
            onClick={() => setCurrentSlide(index)}
            isActive={currentSlide === index}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
