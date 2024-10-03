import { useState, useEffect } from "react";
import { crateProduct, deleteProduct, findProducts } from "../../state/Product/Action";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const initialProducts = [
    {
        id: "1",
        name: "Premium Headphones",
        category: "Electronics",
        price: 1999,
        stock: 50,
        status: "In Stock",
    },
    {
        id: "2",
        name: "Ergonomic Office Chair",
        category: "Furniture",
        price: 24999,
        stock: 30,
        status: "Low Stock",
    },
    {
        id: "3",
        name: "Organic Green Tea",
        category: "Food & Beverage",
        price: 159,
        stock: 100,
        status: "In Stock",
    },
    {
        id: "4",
        name: "Smartphone Case",
        category: "Accessories",
        price: 249,
        stock: 200,
        status: "In Stock",
    },
    {
        id: "5",
        name: "Yoga Mat",
        category: "Sports & Fitness",
        price: 399,
        stock: 75,
        status: "In Stock",
    },
    {
        id: "6",
        name: "Wireless Mouse",
        category: "Electronics",
        price: 299,
        stock: 5,
        status: "Low Stock",
    },
    {
        id: "7",
        name: "Stainless Steel Water Bottle",
        category: "Accessories",
        price: 1999,
        stock: 150,
        status: "In Stock",
    },
    {
        id: "8",
        name: "Leather Wallet",
        category: "Fashion",
        price: 499,
        stock: 0,
        status: "Out of Stock",
    },
];

const statusColors = {
    "In Stock": "bg-green-100 text-green-800",
    "Low Stock": "bg-yellow-100 text-yellow-800",
    "Out of Stock": "bg-red-100 text-red-800",
};

export default function ProductsSection() {
    const [productss, setProducts] = useState(initialProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showAddForm, setShowAddForm] = useState(false);

    const dispatch = useDispatch();
    const { products } = useSelector(store => store)
    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId))
    }
    useEffect(() => {
        dispatch(findProducts({
            // category: "top",
            colors: [],
            sizes: [],
            miniPrice: 0,
            maxPrice: 1000000000,
            sort: "price_low",
            stock: "",
            pageNumber: 1,
            pageSize: 10
        }));
    }, [products.deltedProduct]);

    const [editingProduct, setEditingProduct] = useState(null);

    const productsPerPage = 5;

    const filteredProducts = productss.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter === "All" || product.category === categoryFilter) &&
            (statusFilter === "All" || product.status === statusFilter)
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEdit = (product) => {
        setEditingProduct({ ...product });
    };

    const handleSave = () => {
        setProducts(
            products.map((product) =>
                product.id === editingProduct.id ? editingProduct : product
            )
        );
        setEditingProduct(null);
    };

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct({ ...editingProduct, [name]: value });
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, statusFilter]);

    const initialSizes = [
        { name: "S", quantity: 0 },
        { name: "M", quantity: 0 },
        { name: "L", quantity: 0 },
        { name: "XL", quantity: 0 },
        { name: "7", quantity: 0 },
        { name: "8", quantity: 0 },
        { name: "9", quantity: 0 },
        { name: "10", quantity: 0 },
    ];

    const [productsData, setProductsData] = useState({
        imageUrl: "",
        brand: "",
        title: "",
        color: "",
        price: "",
        size: initialSizes,
        quantity: "",
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
        description: ""
    });

    const jwt = localStorage.getItem("jwt");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductsData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSizeChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSizes = [...productsData.size];
        updatedSizes[index][name] = value; // Update the size based on the input name (name or quantity)
        setProductsData((prevState) => ({
            ...prevState,
            size: updatedSizes
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(crateProduct(productsData))
        console.log("productsData", productsData)
    }
    const clothingSizes = productsData.size.filter(size => ["S", "M", "L", "XL"].includes(size.name));
    const shoeSizes = productsData.size.filter(size => ["7", "8", "9", "10"].includes(size.name));

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    {showAddForm ? "Cancel" : "+ Add Product"}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="title"
                            value={productsData.title}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                        <input
                            type="text"
                            name="brand"
                            value={productsData.brand}
                            onChange={handleChange}
                            placeholder="Brand Name"
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                        <input
                            type="text"
                            name="color"
                            value={productsData.color}
                            onChange={handleChange}
                            placeholder="Color"
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={productsData.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            value={productsData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                        <select
                            name="topLevelCategory"
                            value={productsData.topLevelCategory}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="toplevelcategory">Top level Category</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                        </select>

                        <input
                            type="text"
                            name="description"
                            value={productsData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />

                        <select
                            name="secondLevelCategory"
                            value={productsData.secondLevelCategory}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="toplevelcategory">Second level Category</option>
                            <option value="clothing">Clothing</option>
                            <option value="shoes">Shoes</option>
                        </select>

                        <h2>Clothing Sizes</h2>
                        <select
                            name="thirdLevelCategory"
                            value={productsData.thirdLevelCategory}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="men">Third level Categpry</option>
                            <option value="tshirt">Tshirt</option>
                            <option value="tops">Tops</option>
                            <option value="jeans">Jeans</option>
                            <option value="shoes">Shoes</option>
                        </select>


                        {clothingSizes.map((size, index) => (
                            <div key={index} className="flex items-center gap-4">
                                {/* Size name input */}
                                <input
                                    type="text"
                                    name="name"
                                    value={size.name}
                                    onChange={(e) => handleSizeChange(e, index)}
                                    placeholder="Size Name"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />

                                {/* Quantity input */}
                                <input
                                    type="number"
                                    name="quantity"
                                    value={size.quantity}
                                    onChange={(e) => handleSizeChange(e, index)}
                                    placeholder="Quantity"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                        ))}

                        <h2>Shoe Sizes</h2>
                        {shoeSizes.map((size, index) => (
                            <div key={index} className="flex items-center gap-4">
                                {/* Size name input */}
                                <input
                                    type="text"
                                    name="name"
                                    value={size.name}
                                    onChange={(e) => handleSizeChange(e, index)}
                                    placeholder="Size Name"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />

                                {/* Quantity input */}
                                <input
                                    type="number"
                                    name="quantity"
                                    value={size.quantity}
                                    onChange={(e) => handleSizeChange(e, index)}
                                    placeholder="Quantity"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                        ))}



                        <input
                            type="url"
                            name="imageUrl"
                            value={productsData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Image URL"
                        // accept="image/*"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Product
                    </button>
                </form>
            )}

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="relative w-full md:w-64 mb-4 md:mb-0">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-4 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
                    <select
                        className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Food & Beverage">Food & Beverage</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Sports & Fitness">Sports & Fitness</option>
                        <option value="Fashion">Fashion</option>
                    </select>
                    <select
                        className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products?.products?.map((customer) => (
                            <tr key={customer.id}>
                                <>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <Avatar src={customer.imageUrl} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {customer.title}

                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {customer.category.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ₹ {customer.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {customer.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(customer)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleProductDelete(customer._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastProduct >= filteredProducts.length}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing{" "}
                            <span className="font-medium">{indexOfFirstProduct + 1}</span> to{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastProduct, filteredProducts.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredProducts.length}</span>{" "}
                            results
                        </p>
                    </div>
                    <div>
                        <nav
                            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                            aria-label="Pagination"
                        >
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            {Array.from(
                                {
                                    length: Math.ceil(filteredProducts.length / productsPerPage),
                                },
                                (_, i) => i + 1
                            ).map((number) => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === number
                                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                        : ""
                                        }`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={indexOfLastProduct >= filteredProducts.length}
                                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
