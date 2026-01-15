import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image1 from "../../assets/sliderpage/mernstack.png";
import Image2 from "../../assets/sliderpage/2.png";
import Image3 from "../../assets/sliderpage/3.png";
const SliderPage = () => {
  const sliderRef = useRef(null);

  // Array of images
  const images = [
    Image1, // Replace with your actual image paths
    Image2,
    Image3,
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth;
    const numImages = images.length;

    gsap.to(slider, {
      x: `-${totalWidth / numImages}px`, // Scroll one full slide to the left
      duration: 5,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`, // Loop the slides seamlessly
      },
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        height: "400px", // Adjust height as needed
      }}
    >
      <div
        ref={sliderRef}
        style={{
          display: "flex",
          height: "100%",
          width: "max-content",
          position: "absolute",
          whiteSpace: "nowrap",
        }}
      >
        {images.concat(images).map((src, index) => (
          <div
            key={index}
            style={{
              flexShrink: 0,
              width: "100vw", // Full width for each image
              height: "100%",
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SliderPage;
