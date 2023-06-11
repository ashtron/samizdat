"use client";

import { useState } from "react";
import Link from "next/link";

import "./image-slider.css";

export default function ImageSlider({ slides, mediaType }) {
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

  console.log("slides:", slides);

  return (
    <div className="slider-container">
      <div className="slider grid">
        <div className="left arrow" onClick={changeSlide}>
          {"<"}
        </div>
        <Link href={`/${mediaType}/${slides[currentSlide].id}`}>
          <div
            className="slide"
            style={{ backgroundImage: `url(${slides[currentSlide].imageUrl})` }}
          ></div>
        </Link>
        <Link href={`/${mediaType}/${slides[(currentSlide + 1) % slides.length].id}`}>
          <div
            className="slide"
            style={{
              backgroundImage: `url(${
                slides[(currentSlide + 1) % slides.length].imageUrl
              })`,
            }}
          ></div>
        </Link>
        <Link href={`/${mediaType}/${slides[(currentSlide + 2) % slides.length].id}`}>
          <div
            className="slide"
            style={{
              backgroundImage: `url(${
                slides[(currentSlide + 2) % slides.length].imageUrl
              })`,
            }}
          ></div>
        </Link>
        <div className="right arrow" onClick={changeSlide}>
          {">"}
        </div>
      </div>
    </div>
  );
}
