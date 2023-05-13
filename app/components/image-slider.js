"use client";

import { useState } from "react";
import "./image-slider.css";

export default function ImageSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const changeSlide = (event) => {
    let newIndex;

    if (event.target.className === "left arrow") {
      const isFirstSlide = currentSlide === 0;
      newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    } else if (event.target.className === "right arrow") {
      const isLastSlide = currentSlide === slides.length - 1;
      newIndex = isLastSlide ? 0 : currentSlide + 1;
    }

    setCurrentSlide(newIndex);
  };

  return (
    <div className="slider-container">
      <div className="slider grid">
        <div className="left arrow" onClick={changeSlide}>
          {"<"}
        </div>

        <div
          className="slide"
          style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
        ></div>
        <div
          className="slide"
          style={{
            backgroundImage: `url(${
              slides[(currentSlide + 1) % slides.length].url
            })`,
          }}
        ></div>
        <div
          className="slide"
          style={{
            backgroundImage: `url(${
              slides[(currentSlide + 2) % slides.length].url
            })`,
          }}
        ></div>

        <div className="right arrow" onClick={changeSlide}>
          {">"}
        </div>
      </div>
    </div>
  );
}
