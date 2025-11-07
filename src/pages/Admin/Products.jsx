const Products = () => {
    return (
        <div>

            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="mb-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Add Product</button>
            </div>
            
            <table className="min-w-full border-collapse border border-gray-500 mb-4">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Stock</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border border-gray-300">
                        <td className="border border-gray-300 px-4 py-2">Product 1</td>
                        <td className="border border-gray-300 px-4 py-2">$10</td>
                        <td className="border border-gray-300 px-4 py-2">10</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div className="flex justify-between mb-4">
                <button>Previous</button>
                <button>Next</button>
            </div>
            <div className="flex justify-between mb-4">
                <button>Export</button>
            </div>
            <div className="flex justify-between mb-4">
                <button>Import</button>
            </div>
            <div className="flex justify-between mb-4">
                <button>Refresh</button>
            </div>
            <div className="flex justify-between mb-4">
                <button>Search</button>
            </div>
            <div className="flex justify-between mb-4">
                <button>Filter</button>
            </div>
            <div className="flex justify-between mb-4">
                <button>Sort</button>
            </div>
            <div className="flex justify-between mb-4 ">
                <button>Print</button>
            </div>
        </div>
    );
};

export default Products;