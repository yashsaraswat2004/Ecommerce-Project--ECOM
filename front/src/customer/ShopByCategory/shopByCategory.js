import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "./data";
import { CartContext } from "../context/CartContext";

function Card({ category }) {
  return (
    <>
      <div className="flex flex-col">
        {/* Use category.thumbnail dynamically */}
        <img
          src={category.thumbnail}
          alt={category.name}
          className="h-52 w-48 border-t-4 border-l-4 border-r-4 border-orange-700"
        />

        {/* Card Content */}
        <div
          className="flex-col text-center bg-gradient-to-r from-purple-500 to-pink-500 text-black py-2"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/6985003/pexels-photo-6985003.jpeg?cs=srgb&dl=pexels-codioful-6985003.jpg&fm=jpg")',
          }}
        >
          <div className="text-base font-medium tracking-normal">
            {category.name}
          </div>
          {/* Remove category.discount if it doesn't exist */}
          {category.discount && (
            <div className="text-xl font-bold tracking-wider">
              {category.discount}
            </div>
          )}
          <div className="text-base font-medium tracking-normal">Shop Now</div>
        </div>
      </div>
    </>
  );
}

function ShopByCategory(TypeofCategory) {
  // const { ShowproductList } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCategoryClick = (category, subcategory) => {
    navigate(`/${category.id}/${subcategory.id}`);
    console.log("category and subcategory", category.id, subcategory.id);
  };

  return (
    <div className="bg-white my-6">
      <div className="flex justify-between items-center py-5">
        <h1 className="bg-white font-semibold md:font-bold text-2xl md:text-3xl text-zinc-600 py-10 align-middle mt-6 mb-2 tracking-widest px-14 uppercase">
          Shop by Category
        </h1>
      </div>
      <div className="flex flex-wrap gap-6 px-10 pb-6 justify-center cursor-pointer">
        {/* Iterate through categories and subcategories */}
        {data.categories.map((category) =>
          category.subcategories.map((subcategory) => (
            <p
              key={subcategory.id}
              onClick={() => handleCategoryClick(category, subcategory)}
            >
              <Card category={subcategory} />
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default ShopByCategory;
export { Card };
