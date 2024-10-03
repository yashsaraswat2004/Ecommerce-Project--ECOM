// data.js
const data = {
  categories: [
    {
      id: "men",
      name: "Men",
      thumbnail:
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1lbidzJTIwVG9wJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
      discount: "",
      subcategories: [
        // {
        //   id: "mens_top_wear",
        //   name: "Men's Top wear",
        //   items: [
        //     { name: "Mens Kurtas", id: "mens_kurta" },
        //     { name: "Shirt", id: "shirt" },
        //     { name: "Men Jeans", id: "jeans" },
        //     { name: "Sweaters", id: "#" },
        //     { name: "T-Shirts", id: "t-shirt" },
        //     { name: "Jackets", id: "#" },
        //     { name: "Activewear", id: "#" },
        //   ],
        // },
        {
          id: 1,
          name: "Men's Top wear",
          thumbnail:
            "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1lbidzJTIwVG9wJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
          thirdcategories: [
            {
              id: 1,
              name: "Kurta",
              thumbnail:
                "https://i.pinimg.com/564x/a2/1b/84/a21b847838dea6e40239cb3ceb64ddea.jpg",
            },
            {
              id: 2,
              name: "Blazers",
              thumbnail:
                "https://i.pinimg.com/564x/74/bf/07/74bf076b24be5ecc72741a4cc378f309.jpg",
            },
            {
              id: 3,
              name: "Shirts",
              thumbnail:
                "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1702912490_4738791.jpg?format=webp&w=1080&dpr=1.4",
            },
            {
              id: 4,
              name: "TShirts",
              thumbnail:
                "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719044558_1343356.jpg?format=webp&w=480&dpr=1.4",
            },
          ],
        },
        {
          id: 2,
          name: "Men's Bottom Wear",
          thumbnail:
            "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2024/AUGUST/21/LUghLQJn_df2fbabe2b5f49b89663dc437073452e.jpg",
          discount: "",
          thirdcategories: [
            {
              id: 5,
              name: "Jeans",
              thumbnail: "https://example.com/gaming.jpg",
            },
            {
              id: 6,
              name: "Trowsers",
              thumbnail: "https://example.com/business.jpg",
            },
            {
              id: 7,
              name: "Shorts",
              thumbnail: "https://example.com/business.jpg",
            },
            {
              id: 8,
              name: "TrackPants And Joggers",
              thumbnail: "https://example.com/business.jpg",
            },
          ],
        },
        {
          id: 3,
          name: "Men's Footwear",
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRgYg1vgGPyaQ4aSTrUG2LvXFGbWoS5ekPmw&s",
          discount: "",
          thirdcategories: [
            {
              id: 9,
              name: "casual shoes",
              thumbnail: "https://example.com/gaming.jpg",
            },
            {
              id: 10,
              name: "sport shoes",
              thumbnail: "https://example.com/business.jpg",
            },
            {
              id: 11,
              name: "Sandals",
              thumbnail: "https://example.com/business.jpg",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Women",
      thumbnail: "https://example.com/electronics.jpg",
      subcategories: [
        {
          id: 4,
          name: "Women's Topwear",
          thumbnail:
            "https://images.meesho.com/images/products/361897502/i1j0g_512.webp",
          discount: "",
          thirdcategories: [
            {
              id: 12,
              name: "Kurta",
              thumbnail: "https://example.com/android.jpg",
            },
            { id: 13, name: "Saree", thumbnail: "https://example.com/ios.jpg" },
            { id: 14, name: "Tops", thumbnail: "https://example.com/ios.jpg" },
            {
              id: 15,
              name: "Lehngas",
              thumbnail: "https://example.com/ios.jpg",
            },
          ],
        },
        {
          id: 5,
          name: "Women's Bottom Wear",
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6xMsd_pkWXPOvPy9AgQNyrA_HHn3xd4P3Q&s",
          discount: "",
          thirdcategories: [
            {
              id: 16,
              name: "Jeans",
              thumbnail: "https://example.com/gaming.jpg",
            },
            {
              id: 17,
              name: "Trowsers",
              thumbnail: "https://example.com/business.jpg",
            },
            {
              id: 18,
              name: "Shorts",
              thumbnail: "https://example.com/business.jpg",
            },
            {
              id: 19,
              name: "TrackPants And Joggers",
              thumbnail: "https://example.com/business.jpg",
            },
          ],
        },
        {
          id: 6,
          name: "Womens Footwear",
          thumbnail:
            "https://5.imimg.com/data5/SELLER/Default/2023/9/348414023/FE/DO/JA/198570289/casual-women-shoes-500x500.jpg",
          thirdcategories: [
            {
              id: 20,
              name: "casual shoes",
              thumbnail: "https://example.com/gaming.jpg",
            },
            {
              id: 21,
              name: "sport shoes",
              thumbnail: "https://example.com/business.jpg",
            },
            {
              id: 22,
              name: "Sandals",
              thumbnail: "https://example.com/business.jpg",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Kids",
      thumbnail: "https://example.com/electronics.jpg",
      subcategories: [
        {
          id: 7,
          name: "Boys wear",
          thumbnail:
            "https://www.okboss.co.in/assets/img/home/boysrow1/kids%20dangri%20casual%20wear.jpg",
          thirdcategories: [
            {
              id: 23,
              name: "Kurta",
              thumbnail: "https://example.com/android.jpg",
            },
            { id: 24, name: "jeans", thumbnail: "https://example.com/ios.jpg" },
            {
              id: 25,
              name: "Shirts",
              thumbnail: "https://example.com/ios.jpg",
            },
            {
              id: 26,
              name: "TShirts",
              thumbnail: "https://example.com/ios.jpg",
            },
          ],
        },
        {
          id: 8,
          name: "Girls Wear",
          thumbnail:
            "https://liandli.in/cdn/shop/files/LIDG192_1_-min_800x.jpg?v=1688447887",
          thirdcategories: [
            {
              id: 27,
              name: "Tops",
              thumbnail: "https://example.com/gaming.jpg",
            },
            {
              id: 28,
              name: "Dresses",
              thumbnail: "https://example.com/business.jpg",
            },
            {
              id: 29,
              name: "jeans",
              thumbnail: "https://example.com/business.jpg",
            },
            {
              id: 30,
              name: "Joggers",
              thumbnail: "https://example.com/business.jpg",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Home And Living",
      thumbnail:
        "https://dukaan.b-cdn.net/700x700/webp/upload_file_service/c153799b-2716-4a2d-86a6-e8e4c2efc027/whatsapp-image-2023-02-19-at-11-46-23-pm.jpeg",
      subcategories: [
        {
          id: 9,
          name: "Furniture",
          thumbnail:
            "https://dukaan.b-cdn.net/700x700/webp/upload_file_service/c153799b-2716-4a2d-86a6-e8e4c2efc027/whatsapp-image-2023-02-19-at-11-46-23-pm.jpeg",
        },
        {
          id: 10,
          name: "Decoration",
          thumbnail:
            "https://www.satvikstore.in/cdn/shop/collections/garland_1024x1024.jpg?v=1646480275",
        },
      ],
    },
  ],
  products: [
    // Products can be associated similarly, adjust as needed
    {
      id: 1,
      name: "",
      categoryId: 1,
      subcategoryId: 1,
      thirdcategoryId: 1,
      image: "",
      price: 500,
    },
    {
      id: 4,
      name: "",
      categoryId: 1,
      subcategoryId: 1,
      thirdcategoryId: 2,
      image: "",
      price: 600,
    },
    {
      id: 2,
      name: "",
      categoryId: 1,
      subcategoryId: 2,
      thirdcategoryId: 1,
      image: "",
      price: 400,
    },
    {
      id: 5,
      name: "",
      categoryId: 1,
      subcategoryId: 2,
      thirdcategortId: 3,
      image: "",
      price: 600,
    },
    {
      id: 3,
      name: "",
      categoryId: 1,
      subcategoryId: 3,
      thirdcategoryId: 1,
      image: "",
      price: 100,
    },
    { id: 6, name: "", categoryId: 2, subcategoryId: 3, thirdcategortId: 1 },
    { id: 7, name: "", categoryId: 3, subcategoryId: 5, thirdcategortId: 2 },
  ],

  discountCategory: [
    {
      id: 1,
      name: "discount",
      thumbnail: "https://example.com/electronics.jpg",
      subcategories: [
        {
          id: 1,
          name: "buy 1 get 1",
          discount: "50-70% OFF",
          buttonText: "Shop Now",
          Brands: "",
          image: "https://via.placeholder.com/400/kids-wear", // Placeholder, replace with actual image URL
        },
        {
          id: 2,
          name: "MIN 70% OFF",
          discount: "50-70% OFF",
          buttonText: "Shop Now",
          Brands: "",
          image: "https://via.placeholder.com/400/footwear1",
        },
        {
          id: 3,
          name: "MIN 65% OFF",
          discount: "40-80% OFF",
          buttonText: "Shop Now",
          Brands: "",
          image: "https://via.placeholder.com/400/footwear2",
        },
        {
          id: 4,
          name: "MIN 60% OFF",
          discount: "40-70% OFF",
          buttonText: "Shop Now",
          Brands: "",
          image: "https://via.placeholder.com/400/bags-belts-wallets",
        },
        {
          id: 5,
          name: "MIN 55% OFF",
          discount: "40-70% OFF",
          buttonText: "Shop Now",
          Brands: "",
          image: "https://via.placeholder.com/400/office-wear",
        },
        {
          id: 6,
          name: "MIN 50% OFF",
          discount: "UP TO 60% OFF",
          buttonText: "Shop Now",
          Brands: "",
          image: "https://via.placeholder.com/400/ethnic-wear",
        },
        {
          id: 7,
          name: "MIN 45% OFF",
          discount: "40-70% OFF",
          buttonText: "Shop Now",
          Brands: "",
          image: "https://via.placeholder.com/400/home-decor",
        },
        {
          id: 8,
          name: "MIN 40% OFF",
          discount: "40-80% OFF",
          buttonText: "Shop Now",
          Brands: "",
          image: "https://via.placeholder.com/400/handbags",
        },
      ],
    },
  ],
};

export default data;
