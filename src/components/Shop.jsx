import { useEffect, useState, useCallback } from 'react';
import { Filter, Grid, List, ShoppingCart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ProductGridCard } from '../components/ProductGridCard';
import { ProductListCard } from '../components/ProductListCard';
import { sampleProducts } from '../data/sampleProducts';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { motion } from 'framer-motion';

export const Shop = ({ onNavigate, categorySlug }) => {
    const { cart, addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const isProductInCart = useCallback((productId) => {
        return cart.some(item => item.product.id === productId);
    }, [cart]);

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        toast.success(`${product.name} added to cart!`, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            toast.info(`${product.name} removed from wishlist`);
        } else {
            addToWishlist(product);
            toast.success(`${product.name} added to wishlist!`);
        }
    };
    const handleProductClick = (type, slug) => {
        if (onNavigate) {
            onNavigate(type, slug);
        } else {
            window.location.href = `/${type}/${slug}`;
        }
    };
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([
        { id: 'lilies', name: 'Lilies', slug: 'lilies' },
        { id: 'roses', name: 'Roses', slug: 'roses' },
        { id: 'orchids', name: 'Orchids', slug: 'orchids' },
        { id: 'carnations', name: 'Carnations', slug: 'carnations' },
        { id: 'chocolates', name: 'Chocolates Bouquet', slug: 'chocolates' },
        { id: 'gerberas', name: 'Gerberas', slug: 'gerberas' }

    ]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');

        const savedCategory = localStorage.getItem('selectedCategory');

        const initialCategory = categoryFromUrl || savedCategory || 'all';
        setSelectedCategory(initialCategory);

        localStorage.setItem('selectedCategory', initialCategory);
    }, []);

    const handleCategorySelect = (categorySlug) => {
        setSelectedCategory(categorySlug);
        localStorage.setItem('selectedCategory', categorySlug);

        const url = new URL(window.location);
        url.searchParams.set('category', categorySlug);
        window.history.pushState({}, '', url);
    };

    const [sortBy, setSortBy] = useState('featured');
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');


    useEffect(() => {
        setProducts([]);
        fetchProducts();
    }, [selectedCategory, sortBy]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('products')
                .select(`
                    *,
                    categories (
                        name,
                        slug
                    )
                `)
                .eq('is_available', true);

            if (selectedCategory && selectedCategory !== 'all') {
                query = query.eq('category_slug', selectedCategory);
            }
            const { data, error } = await query;

            if (error) throw error;

            if (data && data.length > 0) {
                setProducts(data);
                return;
            }

            console.log('No products found in Supabase, using sample data');
            const filtered = selectedCategory && selectedCategory !== 'all'
                ? sampleProducts.filter(p => p.category_slug && p.category_slug.toLowerCase() === selectedCategory.toLowerCase())
                : sampleProducts;

            setProducts(filtered);

            if (sortBy === 'price_low') {
                query = query.order('price', { ascending: true });
            } else if (sortBy === 'price_high') {
                query = query.order('price', { ascending: false });
            } else if (sortBy === 'name') {
                query = query.order('name', { ascending: true });
            } else {
                query = query.order('is_featured', { ascending: false });
            }

        } catch (error) {
            console.error('Error fetching products:', error);
            const filtered = selectedCategory && selectedCategory !== 'all'
                ? sampleProducts.filter(p => p.category_slug && p.category_slug.toLowerCase() === selectedCategory.toLowerCase())
                : sampleProducts;
            setProducts(filtered);
        } finally {
            setLoading(false);
        }
    };


    const productsToDisplay = loading ? [] : (products.length > 0 ? products : sampleProducts);

    const filteredProducts = React.useMemo(() => {
        if (selectedCategory === 'all' || !selectedCategory) {
            return productsToDisplay;
        }

        return productsToDisplay.filter(product => {
            if (product.category_slug && product.category_slug.toLowerCase() === selectedCategory.toLowerCase()) {
                return true;
            }

            if (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()) {
                return true;
            }

            if (product.categories) {
                return product.categories.some(cat => {
                    return (cat.slug && cat.slug.toLowerCase() === selectedCategory.toLowerCase()) ||
                        (cat.name && cat.name.toLowerCase() === selectedCategory.toLowerCase());
                });
            }

            return false;
        });
    }, [selectedCategory, productsToDisplay]);

    console.log('Selected category:', selectedCategory);
    console.log('Total products:', productsToDisplay.length);
    console.log('Filtered products:', filteredProducts.length);
    productsToDisplay.forEach(p => {
        console.log(`Product: ${p.name}, Category: ${p.category || p.category_slug || 'N/A'}`);
    });

    const displayProducts = filteredProducts.map(product => {
        const category = product.category || product.categories?.name ||
            (categories.find(cat => cat.slug === product.category_slug)?.name || 'Flowers');

        const categorySlug = product.category_slug ||
            (product.category ? product.category.toLowerCase().replace(/\s+/g, '-') : 'flowers');

        return {
            ...product,
            image_url: product.image_url || product.image,
            slug: product.slug || product.id.toString(),
            name: product.name || 'Unnamed Product',
            price: product.price || 0,
            discount_price: product.discount_price || product.original_price || null,
            category: category,
            category_slug: categorySlug
        };
    });

    const fadeUp = { hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.5 } } };
    const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

    return (
        <motion.div className="min-h-screen bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div
            
                className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-center"
                style={{
                    backgroundImage: 'url(https://websitedemos.net/florist-04/wp-content/uploads/sites/346/2019/03/bg-07-free-img.jpg)',
                    backgroundPosition: 'center 30%',
                    backgroundSize: 'cover',
                    marginTop: '-80px',
                    paddingTop: '80px',
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <motion.div className="relative container mx-auto px-4 " variants={container} initial="hidden" animate="show">
                    <motion.h1 className="text-md mb-4 text-white" variants={fadeUp}>SHOP FLOWERS</motion.h1>
                    <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 text-white" variants={fadeUp}>Discover our beautiful collection of fresh flowers</motion.h1>
                 
                </motion.div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-64 flex-shrink-0">
                        <motion.div className="bg-white rounded-lg shadow-md p-6 sticky top-24" initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                            <div className="flex items-center gap-2 mb-6">
                                <Filter size={20} className="text-rose-600" />
                                <h2 className="text-lg font-semibold">Filters</h2>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-gray-800">Categories</h3>
                                <div className="space-y-2">
                                    

                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategorySelect(category.slug)}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === category.slug
                                                ? 'bg-rose-600 text-white'
                                                : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3 text-gray-800">Sort By</h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price_low">Price: Low to High</option>
                                    <option value="price_high">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                            </div>
                        </motion.div>
                    </aside>

                    <main className="flex-1">
                        <motion.div className="flex items-center justify-between mb-6" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                            <motion.p className="text-gray-600" variants={fadeUp}>
                                {loading ? 'Loading...' : `${displayProducts.length} products found`}
                            </motion.p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 border rounded-lg transition ${viewMode === 'grid'
                                        ? 'bg-rose-600 text-white border-rose-600'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <Grid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 border rounded-lg transition ${viewMode === 'list'
                                        ? 'bg-rose-600 text-white border-rose-600'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </motion.div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <motion.div className={viewMode === 'grid'
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "grid grid-cols-1 gap-6"} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                                {displayProducts.map((product) => (
                                    viewMode === 'grid' ? (
                                        <motion.div key={product.id} variants={fadeUp} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                            <ProductGridCard
                                                product={product}
                                                onAddToCart={handleAddToCart}
                                                onAddToWishlist={handleWishlist}
                                                isWishlisted={isInWishlist(product.id)}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div key={product.id} variants={fadeUp} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                                            <ProductListCard
                                                product={product}
                                                onAddToCart={handleAddToCart}
                                                isInCart={isProductInCart(product.id)}
                                                onAddToWishlist={handleWishlist}
                                                onNavigate={handleProductClick}
                                                isWishlisted={isInWishlist(product.id)}
                                            />
                                        </motion.div>
                                    )
                                ))}
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </motion.div>
    );
};

export default Shop;