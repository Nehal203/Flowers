<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        rating: '',
        status: 'in-stock',
        image: 'https://via.placeholder.com/150'
    });

    useEffect(() => {
        const initialProducts = [
            {
                id: 1,
                name: 'Red Roses Bouquet',
                description: 'A beautiful bouquet of 12 fresh red roses',
                image: 'https://via.placeholder.com/150',
                category: 'Roses',
                price: 59.99,
                stock: 45,
                rating: 4.8,
                status: 'in-stock'
            },
            {
                id: 2,
                name: 'White Lilies',
                description: 'Elegant white lilies arrangement',
                image: 'https://via.placeholder.com/150',
                category: 'Lilies',
                price: 69.99,
                stock: 12,
                rating: 4.5,
                status: 'low-stock'
            },
            {
                id: 3,
                name: 'Chocolates Bouquet',
                description: 'Delicious assortment of premium chocolates arranged in a bouquet',
                image: 'https://via.placeholder.com/150',
                category: 'Chocolates Bouquet',
                price: 49.99,
                stock: 0,
                rating: 4.2,
                status: 'out-of-stock'
            }
        ];
        setProducts(initialProducts);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            ...formData,
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            rating: parseFloat(formData.rating)
        };
        
        setProducts([...products, newProduct]);
        setIsAddModalOpen(false);
        resetForm();
    };

    const handleEditProduct = (e) => {
        e.preventDefault();
        const updatedProducts = products.map(product => 
            product.id === currentProduct.id 
                ? { ...formData, 
                    id: currentProduct.id, 
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    rating: parseFloat(formData.rating)
                  } 
                : product
        );
        setProducts(updatedProducts);
        setIsEditModalOpen(false);
        resetForm();
    };

    const handleDelete = () => {
        const filteredProducts = products.filter(product => product.id !== currentProduct.id);
        setProducts(filteredProducts);
        setIsDeleteModalOpen(false);
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            description: product.description || '',
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            rating: product.rating.toString(),
            status: product.status,
            image: product.image
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (product) => {
        setCurrentProduct(product);
        setIsDeleteModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category: '',
            price: '',
            stock: '',
            rating: '',
            status: 'in-stock',
            image: 'https://via.placeholder.com/150'
        });
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
        const matchesStatus = statusFilter === 'All' || product.status === statusFilter;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
                >
                    <FiPlus className="mr-2" /> Add Product
                </button>
            </div>
 
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                <option value="Lilies">Lilies</option>
                                <option value="Roses">Roses</option>
                                <option value="Orchids">Orchids</option>
                                <option value="Carnations">Carnations</option>
                                <option value="Chocolates Bouquet">Chocolates Bouquet</option>
                                <option value="Gerberas">Gerberas</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <FiFilter />
                            </div>
                        </div>
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="in-stock">In Stock</option>
                                <option value="low-stock">Low Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <FiFilter />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-md" src={product.image} alt={product.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500 truncate w-40">{product.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-2 bg-yellow-400 rounded-full w-20">
                                                <div
                                                    className="h-2 bg-yellow-500 rounded-full"
                                                    style={{ width: `${(product.rating / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="ml-2 text-xs text-gray-500">{product.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'in-stock' ? 'bg-green-100 text-green-800' :
                                            product.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {product.status.replace('-', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => openEditModal(product)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <FiEdit className="inline" />
                                        </button>
                                        <button 
                                            onClick={() => openDeleteModal(product)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <FiTrash2 className="inline" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                <span className="font-medium">20</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    1
                                </button>
                                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    2
                                </button>
                                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    3
                                </button>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-medium">Add New Product</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <FiX size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddProduct} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Roses">Roses</option>
                                    <option value="Lilies">Lilies</option>
                                    <option value="Orchids">Orchids</option>
                                    <option value="Carnations">Carnations</option>
                                    <option value="Chocolates Bouquet">Chocolates Bouquet</option>
                                    <option value="Gerberas">Gerberas</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="in-stock">In Stock</option>
                                        <option value="low-stock">Low Stock</option>
                                        <option value="out-of-stock">Out of Stock</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditModalOpen && currentProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-medium">Edit Product</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <FiX size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleEditProduct} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Roses">Roses</option>
                                    <option value="Lilies">Lilies</option>
                                    <option value="Orchids">Orchids</option>
                                    <option value="Carnations">Carnations</option>
                                    <option value="Chocolates Bouquet">Chocolates Bouquet</option>
                                    <option value="Gerberas">Gerberas</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="in-stock">In Stock</option>
                                        <option value="low-stock">Low Stock</option>
                                        <option value="out-of-stock">Out of Stock</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                                {formData.image && (
                                    <div className="mt-2">
                                        <img src={formData.image} alt="Preview" className="h-20 w-20 object-cover rounded-md" />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && currentProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Product</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete <span className="font-semibold">{currentProduct.name}</span>? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
>>>>>>> 6e4d586 (any message)
        </div>
    );
};

<<<<<<< HEAD
=======

>>>>>>> 6e4d586 (any message)
export default Products;