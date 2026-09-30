require("dotenv").config();
const mongoose = require("mongoose");

const Product = require("./models/Product");

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const products = [
            // ==================== SHOES ====================
            {
                name: "Nike Air Max",
                price: 4999,
                category: "Shoes",
                rating: 4.5,
                description: "Comfortable running shoes designed for everyday performance.",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                stock: 20
            },
            {
                name: "Adidas Ultraboost",
                price: 8999,
                category: "Shoes",
                rating: 4.7,
                description: "Lightweight running shoes with responsive cushioning.",
                image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
                stock: 15
            },
            {
                name: "Puma Running Shoes",
                price: 4499,
                category: "Shoes",
                rating: 4.4,
                description: "Lightweight athletic shoes built for comfortable daily runs.",
                image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
                stock: 25
            },
            {
                name: "Nike Revolution 7",
                price: 3499,
                category: "Shoes",
                rating: 4.3,
                description: "Everyday running shoes with a lightweight and breathable design.",
                image: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
                stock: 18
            },
            {
                name: "Adidas Forum Low",
                price: 6999,
                category: "Shoes",
                rating: 4.6,
                description: "Classic low-top sneakers with a stylish streetwear design.",
                image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
                stock: 12
            },
            {
                name: "Converse Chuck Taylor",
                price: 3999,
                category: "Shoes",
                rating: 4.5,
                description: "Iconic canvas sneakers suitable for casual everyday outfits.",
                image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3",
                stock: 22
            },
            {
                name: "New Balance 574",
                price: 7499,
                category: "Shoes",
                rating: 4.7,
                description: "Classic lifestyle sneakers combining comfort and timeless style.",
                image: "https://images.unsplash.com/photo-1539185441755-769473a23570",
                stock: 16
            },
            {
                name: "Reebok Classic",
                price: 4299,
                category: "Shoes",
                rating: 4.4,
                description: "Classic casual sneakers with a clean and comfortable design.",
                image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
                stock: 19
            },

            // ==================== ELECTRONICS ====================
            {
                name: "Apple AirPods Pro",
                price: 24999,
                category: "Electronics",
                rating: 4.8,
                description: "Wireless earbuds with active noise cancellation and premium sound.",
                image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
                stock: 12
            },
            {
                name: "Sony WH-1000XM5",
                price: 29999,
                category: "Electronics",
                rating: 4.9,
                description: "Premium wireless headphones with advanced noise cancellation.",
                image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
                stock: 10
            },
            {
                name: "JBL Portable Speaker",
                price: 5999,
                category: "Electronics",
                rating: 4.7,
                description: "Portable Bluetooth speaker delivering powerful sound anywhere.",
                image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
                stock: 16
            },
            {
                name: "Apple Magic Mouse",
                price: 7499,
                category: "Electronics",
                rating: 4.5,
                description: "Slim wireless mouse with a smooth multi-touch surface.",
                image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
                stock: 14
            },
            {
                name: "Logitech MX Master 3S",
                price: 8999,
                category: "Electronics",
                rating: 4.8,
                description: "Advanced wireless mouse designed for productivity and comfort.",
                image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
                stock: 11
            },
            {
                name: "Samsung Galaxy Buds",
                price: 8999,
                category: "Electronics",
                rating: 4.4,
                description: "Compact wireless earbuds with clear audio and comfortable fit.",
                image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
                stock: 17
            },
            {
                name: "Kindle Paperwhite",
                price: 13999,
                category: "Electronics",
                rating: 4.7,
                description: "Compact e-reader with a glare-free display for comfortable reading.",
                image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
                stock: 9
            },
            {
                name: "Anker Power Bank",
                price: 2999,
                category: "Electronics",
                rating: 4.6,
                description: "High-capacity portable charger for smartphones and other devices.",
                image: "https://images.unsplash.com/photo-1564286027179-588f75ac4ef2?auto=format&fit=crop&fm=jpg&q=80&w=800",
                stock:15
            },
            {
                name: "Logitech K380 Keyboard",
                price: 3499,
                category: "Electronics",
                rating: 4.5,
                description: "Compact wireless keyboard designed for comfortable everyday typing.",
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
                stock: 20
            },
            {
                name: "Sony Wireless Speaker",
                price: 7999,
                category: "Electronics",
                rating: 4.6,
                description: "Portable wireless speaker with rich audio and modern design.",
                image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
                stock: 13
            },

            // ==================== CLOTHING ====================
            {
                name: "Levi's Denim Jacket",
                price: 4999,
                category: "Clothing",
                rating: 4.4,
                description: "Classic denim jacket with a timeless casual design.",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
                stock: 25
            },
            {
                name: "Puma Hoodie",
                price: 3499,
                category: "Clothing",
                rating: 4.3,
                description: "Comfortable cotton hoodie designed for casual everyday wear.",
                image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
                stock: 30
            },
            {
                name: "Levi's Classic Jeans",
                price: 3299,
                category: "Clothing",
                rating: 4.5,
                description: "Classic fit jeans designed for comfort and everyday style.",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
                stock: 28
            },
            {
                name: "Adidas Running T-Shirt",
                price: 1999,
                category: "Clothing",
                rating: 4.4,
                description: "Lightweight sports t-shirt designed for workouts and running.",
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
                stock: 35
            },
            {
                name: "Nike Sports Jacket",
                price: 5999,
                category: "Clothing",
                rating: 4.6,
                description: "Modern sports jacket offering comfort and protection during outdoor activities.",
              image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
                stock: 15
            },
            {
                name: "H&M Casual Shirt",
                price: 2299,
                category: "Clothing",
                rating: 4.2,
                description: "Simple casual shirt suitable for everyday outfits.",
                image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
                stock: 32
            },
            {
                name: "Uniqlo Cotton T-Shirt",
                price: 1499,
                category: "Clothing",
                rating: 4.5,
                description: "Soft cotton t-shirt with a clean and comfortable everyday fit.",
                image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
                stock: 40
            },
            {
                name: "Puma Track Pants",
                price: 2499,
                category: "Clothing",
                rating: 4.4,
                description: "Comfortable track pants designed for workouts and casual wear.",
                image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
                stock: 27
            },

            // ==================== WATCHES ====================
            {
                name: "Casio G-Shock",
                price: 7999,
                category: "Watches",
                rating: 4.6,
                description: "Durable digital watch designed for everyday adventures.",
                image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
                stock: 18
            },
            {
                name: "Samsung Galaxy Watch",
                price: 18999,
                category: "Watches",
                rating: 4.5,
                description: "Smartwatch with fitness tracking and useful everyday features.",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                stock: 14
            },
            {
                name: "Fossil Analog Watch",
                price: 9499,
                category: "Watches",
                rating: 4.5,
                description: "Elegant analog watch combining classic design with modern style.",
                image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
                stock: 12
            },
            {
                name: "Casio Vintage Digital",
                price: 2999,
                category: "Watches",
                rating: 4.4,
                description: "Retro-inspired digital watch with a classic vintage appearance.",
                image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
                stock: 21
            },
            {
                name: "Titan Analog Watch",
                price: 6999,
                category: "Watches",
                rating: 4.6,
                description: "Elegant everyday watch with a refined and timeless design.",
                image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8",
                stock: 15
            },
            {
                name: "Noise Smart Watch",
                price: 3999,
                category: "Watches",
                rating: 4.3,
                description: "Affordable smartwatch with fitness tracking and notifications.",
                image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1",
                stock: 24
            },

            // ==================== ACCESSORIES ====================
            {
                name: "Wildcraft Backpack",
                price: 2499,
                category: "Accessories",
                rating: 4.5,
                description: "Spacious everyday backpack suitable for college and travel.",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
                stock: 22
            },
            {
                name: "American Tourister Backpack",
                price: 3999,
                category: "Accessories",
                rating: 4.6,
                description: "Durable backpack designed for travel, college and everyday use.",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
                stock: 18
            },
            {
                name: "Ray-Ban Sunglasses",
                price: 12999,
                category: "Accessories",
                rating: 4.7,
                description: "Classic sunglasses combining timeless style with everyday comfort.",
                image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
                stock: 10
            },
            {
                name: "Leather Wallet",
                price: 1999,
                category: "Accessories",
                rating: 4.4,
                description: "Compact leather wallet with a classic design and multiple card slots.",
                image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
                stock: 26
            },
            {
                name: "Travel Duffel Bag",
                price: 2999,
                category: "Accessories",
                rating: 4.5,
                description: "Spacious duffel bag designed for short trips and weekend travel.",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
                stock: 17
            },
            {
                name: "Laptop Sleeve",
                price: 1499,
                category: "Accessories",
                rating: 4.3,
                description: "Protective laptop sleeve with a lightweight and minimal design.",
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
                stock: 30
            },
            {
                name: "Sports Cap",
                price: 999,
                category: "Accessories",
                rating: 4.2,
                description: "Lightweight sports cap suitable for outdoor activities and casual wear.",
                image: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
                stock: 35
            },
            {
                name: "Crossbody Bag",
                price: 2299,
                category: "Accessories",
                rating: 4.4,
                description: "Compact crossbody bag designed for convenient everyday carrying.",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
                stock: 20
            }
        ];

        await Product.deleteMany();
        await Product.insertMany(products);

        console.log(`${products.length} products inserted`);

        await mongoose.disconnect();
        console.log("Database disconnected");

    } catch (error) {
        console.error("Seeding failed:", error);
        await mongoose.disconnect();
    }
}

seedProducts();