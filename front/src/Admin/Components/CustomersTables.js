import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { delteOrder, getAllCustomer } from "../../state/Admin/Customer/Action";

const initialCustomers = [
    {
        id: "1",
        name: "Rajesh",
        email: "rajesh@example.com",
        phone: "9876543210",
        orders: 5,
        totalSpent: 49995,
        status: "Active",
    },
    {
        id: "2",
        name: "Jayesh",
        email: "jayesh@example.com",
        phone: "9876543210",
        orders: 3,
        totalSpent: 29997,
        status: "Active",
    },
    {
        id: "3",
        name: "Suresh",
        email: "suresh@example.com",
        phone: "9876543210",
        orders: 1,
        totalSpent: 9999,
        status: "Inactive",
    },
    {
        id: "4",
        name: "Dinesh",
        email: "dinesh@example.com",
        phone: "9876543210",
        orders: 8,
        totalSpent: 79992,
        status: "Active",
    },
    {
        id: "5",
        name: "Brahmendra",
        email: "brahmendra@example.com",
        phone: "9876543210",
        orders: 2,
        totalSpent: 19998,
        status: "Active",
    },
    {
        id: "6",
        name: "Hridesh",
        email: "hridesh@example.com",
        phone: "9876543210",
        orders: 0,
        totalSpent: 0,
        status: "Inactive",
    },
    {
        id: "7",
        name: "Ajay",
        email: "ajay@example.com",
        phone: "9876543210",
        orders: 4,
        totalSpent: 39996,
        status: "Active",
    },
    {
        id: "8",
        name: "Virendra",
        email: "virendra@example.com",
        phone: "9876543210",
        orders: 6,
        totalSpent: 59994,
        status: "Active",
    },
];

const statusColors = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-red-100 text-red-800",
};

export default function CustomersSection() {
    const [customers, setCustomers] = useState(initialCustomers);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [viewingCustomer, setViewingCustomer] = useState(null);
    const customersPerPage = 5;

    const dispatch = useDispatch();
    const { adminCustomer } = useSelector(store => store)
    useEffect(() => {
        dispatch(getAllCustomer())
    }, [dispatch])





    const filteredCustomers = customers.filter(
        (customer) =>
            (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (statusFilter === "All" || customer.status === statusFilter)
    );

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(
        indexOfFirstCustomer,
        indexOfLastCustomer
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEdit = (customer) => {
        setEditingCustomer({ ...customer });
    };

    const handleSave = () => {
        setCustomers(
            customers.map((customer) =>
                customer.id === editingCustomer.id ? editingCustomer : customer
            )
        );
        setEditingCustomer(null);
    };

    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingCustomer({ ...editingCustomer, [name]: value });
    };

    const handleView = (customer) => {
        setViewingCustomer(customer);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customers</h2>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="relative w-full md:w-64 mb-4 md:mb-0">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="w-full pl-4 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="w-full md:w-auto px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* Customers Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total orders
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Spent
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {adminCustomer.users.map((customer) => (
                            <tr key={customer.id}>
                                {editingCustomer && editingCustomer.id === customer.id ? (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                name="name"
                                                value={editingCustomer.name}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="email"
                                                name="email"
                                                value={editingCustomer.email}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1"
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={editingCustomer.phone}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 mt-1"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer.orders}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₹ {customer.totalSpent}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                name="status"
                                                value={editingCustomer.status}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={handleSave}
                                                className="text-green-600 hover:text-green-900 mr-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingCustomer(null)}
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={`https://ui-avatars.com/api/?name=${customer.name[0]}&background=random`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {customer.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {customer.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer.orderCount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₹ {customer.totalPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(customer)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-2"
                                            >
                                                Edit
                                            </button>
                                            
                                        </td>
                                    </>
                                )}
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
                        disabled={indexOfLastCustomer >= filteredCustomers.length}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing{" "}
                            <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastCustomer, filteredCustomers.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredCustomers.length}</span>{" "}
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
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {Array.from({
                                length: Math.ceil(filteredCustomers.length / customersPerPage),
                            }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === index + 1
                                        ? "z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={indexOfLastCustomer >= filteredCustomers.length}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* View Customer Modal */}
            {viewingCustomer && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                                    Customer Details
                                </h3>
                                <p>
                                    <strong>Name:</strong> {viewingCustomer.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {viewingCustomer.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {viewingCustomer.phone}
                                </p>
                                <p>
                                    <strong>Orders:</strong> {viewingCustomer.orders}
                                </p>
                                <p>
                                    <strong>Total Spent:</strong> $
                                    {viewingCustomer.totalSpent.toFixed(2)}
                                </p>
                                <p>
                                    <strong>Status:</strong> {viewingCustomer.status}
                                </p>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setViewingCustomer(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
