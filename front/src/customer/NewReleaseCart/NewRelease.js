import { useState } from "react";

function CrazyDeals({ title }) {
  // State to manage the current slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dealcard.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dealcard.length - 1 : prevIndex - 1
    );
  };

  const dealcard = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCUOCRQe5HYmMRyCQBXG0erQIuPF-TWACFKg&s",
      Heading: "Ecom Special Products",
      discount: "buy 1, get 1 Free",
      Brand: "",
    },
    {
      img: "https://brownliving.in/cdn/shop/products/dark-blue-ajrakh-printed-cotton-shirt-verified-sustainable-mens-shirt-on-brown-living-422525_600x.jpg?v=1703916409",
      Heading: "Ecom Special Products",
      discount: "MIN 80% OFF",
      Brand: "",
    },
    {
      img: "https://www.tbsnews.net/sites/default/files/styles/big_3/public/images/2023/06/24/dsc00208e.jpg",
      Heading: "Ecom Special Products",
      discount: "MIN 75% OFF",
      Brand: "",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtGqax7M6k4VhxdwkMsFKvnqxM-DkBfmc2Vg&s",
      Heading: "Ecom Special Products",
      discount: "MIN 60% OFF",
      Brand: "",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEAGvkuegFjwjTj-Z12_66MXJ9WmKfKm_zpg&s",
      Heading: "Ecom Special Products",
      discount: "MIN 60% OFF",
    },
    {
      img: "https://i.pinimg.com/236x/40/69/75/40697595b937f470b14e3b0a1a743007.jpg",
      Heading: "Ecom Special Products",
      discount: "MIN 55% OFF",
    },
    {
      img: "https://assets.myntassets.com/f_auto,q_auto:eco,dpr_1.3,w_412,c_limit,fl_progressive/assets/images/2024/1/12/96961bda-3d89-4739-9a08-3dd0a2c5450e1705074492700-compressed_62152_0.jpg",
      Heading: "Ecom Special Products",
      discount: "MIN 50% OFF",
    },
    {
      img: "https://static.magicpin.com/storage/blog/images/myntra-online-shopping-for-mens_Casual_Sweatshirt.jpg",
      Heading: "Ecom Special Products",
      discount: "MIN 45% OFF",
    },
    {
      img: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/14224886/2021/8/4/32fba6a6-e177-4825-8314-079159b5372f1628056487310-Inddus-Women-Mauve-Embellished-Gown-3501628056486570-1.jpg",
      Heading: "Ecom Special Products",
      discount: "MIN 30% OFF",
    },
  ];

  return (
    <div className="grid bg-white overflow-hidden h-auto w-full mt-5">
      <h1 className="bg-white font-semibold md:font-bold text-2xl md:text-3xl text-zinc-600 py-10 align-middle  tracking-widest px-5 uppercase">
        {title}
      </h1>

      {/* cards are wrapped here */}

      <div className="relative w-full flex justify-center items-center cursor-pointer">
        <div
          className="flex flex-row gap-6 align-middle my-1  w-full h-72 transition-transform duration-500"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / dealcard.length)
            }%)`,
            width: `${dealcard.length * 100}%`, // Set container width based on number of cards
          }}
        >
          {/* single card starts from here */}

          {dealcard.map((card, indx) => (
            <div
              className="h-80 w-56 flex-shrink-0 rounded-sm flex flex-col gap-1"
              style={{ width: "calc(100% / 6)" }} // Show 6 cards at a time key={indx}
              key={indx}
            >
              <img
                src={card.img}
                alt={card.Heading}
                className="h-52 w-full shrink-0"
              ></img>
              <div className="mx-2 md:text-lg font-bold  text-sm  tracking-tighte">
                {card.Heading}
              </div>
              <div className=" mx-2 font-extrabold text-teal-950 md:text-base text-sm uppercase tracking-tighter">
                {card.discount}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-5 w-full h-7 mt-2 mb-14 text-black  justify-center ">
        {/* Previous Button */}
        <div className="h-fit w-fit ">
          <button
            className="absolute align-middle p-0 text-black  rounded-full"
            onClick={prevSlide}
          >
            ○
          </button>
        </div>

        {/* Next Button */}
        <div className="h-fit w-fit">
          <button
            className="absolute align-middle  text-black  rounded-full"
            onClick={nextSlide}
          >
            ○
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrazyDeals;
