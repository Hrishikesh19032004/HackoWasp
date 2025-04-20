import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import front_world from "../Images/Hero1.jpg";
import Image1 from "../Images/Hero2.jpg";
import Image2 from "../Images/Hero3.jpg";

export default function Front() {
  const [searchBar, setSearchBar] = useState(false);
  const [currentImage, setCurrentImage] = useState(front_world);
  const images = [front_world, Image1, Image2]; 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    setCurrentImage(images[currentIndex]); 
  }, [currentIndex]);

  return (
    <section className="z-10">
      <div className="sm:w-11/12 mx-auto">
        <div
          className={`py-8 sm:rounded-3xl relative w-full h-[620px] bg-cover lg:bg-center bg-no-repeat bg-left transition-opacity duration-1000`}
          style={{
            backgroundImage: `url(${currentImage})`,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <div className="absolute bottom-[24%] sm:left-[6%] left-[5%] flex flex-col items-start gap-4">
            {!searchBar && (
              <>
                <h1
                  className="text-2xl font-bold text-white mb-6"
                  style={{
                    fontSize: "7rem",
                    fontWeight: "500",
                    marginBottom: "5rem",
                  }}
                >
                  Feed More, Waste
                </h1>
                <h1
                  className="text-2xl font-bold text-white mb-6"
                  style={{
                    fontSize: "7rem",
                    fontWeight: "500",
                    marginBottom: "5rem",
                  }}
                >
                  Less.
                </h1>
              </>
            )}

            {searchBar && (
              <form className="flex items-end gap-4 flex-wrap">
                <SearchBar />
                <button className="bg-white px-2 py-3 w-24 font-bold uppercase text-sm text-black hover:text-white hover:bg-black hover:bg-opacity-50 rounded-md">
                  Find
                </button>
              </form>
            )}

            {!searchBar && (
              <div className="flex gap-4">
                <button className="sm:text-[20px] bg-button-primary text-[#6C6252] hover:bg-button-primary-hover transition-colors sm:px-10 px-3 py-3 rounded-md capitalize sm:w-auto w-full font-bold">
                  Start Discovery
                </button>
                <button
                  onClick={() => setSearchBar(!searchBar)}
                  className="sm:text-[20px] text-white sm:px-10 px-3 py-3 rounded-md border-[1px] border-white capitalize sm:w-auto w-full font-bold"
                >
                  Reduce Food Waste
                </button>
              </div>
            )}
          </div>
          <article className="lg:flex hidden items-end absolute top-[30%] right-0 w-[30%] border-l-2 h-1/2 px-2 border-l-white">
            <div className="bg-black bg-opacity-25 p-2 rounded">
              <div className="text-white text-[26px] w-[80%] font-bold">
                Support sustainable living:{" "}
                <div style={{ fontWeight: "400" }}>
                  Reduce waste, connect with eco-partners, and make a greener
                  impact
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
