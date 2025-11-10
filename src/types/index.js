export const Product= {
  id: String,
  name: String,
  slug: String,
  description: String,
  price: Number,
  discount_price: Number,
  image_url: String,
  images: [String],
  category_id: String,
  stock: Number,
  is_featured: Boolean,
  is_available: Boolean,
  created_at: String,
  updated_at: String,
}

export const Category ={
  id: String,
  name: String,
  slug: String,
  description: String,
  image_url: String,
  created_at: String,
}

export const CartItem ={
  id: String,
  user_id: String,
  product_id: String,
  quantity: Number,
  product: Product,
  created_at: String,
  updated_at: String,
}

export const Order ={
  id: String,
  user_id: String,
  Number: String,
  total_amount: Number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  payment_status: 'pending' | 'completed' | 'failed',
  payment_id: String,
  delivery_address: {
    full_name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  created_at: String,
  updated_at: String,
}

export const OrderItem ={
  id: String,
  order_id: String,
  product_id: String,
  quantity: Number,
  price: Number,
  product: Product,
  created_at: String,
}

export const Profile= {
  id: String,
  full_name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  created_at: String,
  updated_at: String,
}

export const FAQ ={
  id: String,
  question: String,
  answer: String,
  order_position: Number,
  created_at: String,
}

export const BlogPost ={
  id: String,
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  image_url: String,
  author_id: String,
  published: Boolean,
  created_at: String,
  updated_at: String,
}

export const ContactMessage= {
  name: String,
  email: String,
  subject: String,
  message: String,
}
