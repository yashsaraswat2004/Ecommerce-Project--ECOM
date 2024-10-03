export const color = ["White", "Blue", "Black", "Brown", "Purple"];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "blue", label: "Blue" },
      { value: "black", label: "Black" },
      { value: "brown", label: "Brown" },
      { value: "purple", label: "Purple" },
      //more to add
    ],
  },

  {
    id: "size",
    name: "Size",
    options: [
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
    ],
  },
];

export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "100-200", label: "₹100 To ₹200" },
      { value: "400-600", label: "₹400 To ₹600" },
      { value: "800-1000", label: "₹800 To ₹1000" },
      { value: "1100-1500", label: "₹1100 To ₹1500" },
      { value: "1500-2000", label: "₹1500 To ₹2000" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out of Stock" },
    ],
  },
];

export const sortOptions = [
  { name: "Price: Low to High", query: "price_low", current: false },
  { name: "Price: High to Low", query: "price_high", current: false },
];
