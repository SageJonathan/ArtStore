# 🎨 Art Store Application

Welcome to the Art Store—a powerful web platform built for artists to easily display, sell, and manage their artwork, all with minimal effort. Designed with simplicity and automation in mind, this application handles the entire sales flow from browsing to shipping—allowing artists to focus on their craft while the platform takes care of the rest. 🖼️🚚

## 🔑 Features

- **Dynamic Gallery**: Browse and display a wide range of artworks with detailed descriptions and high-resolution images, making it easy for customers to explore and purchase pieces. 🖌️🎨

- **Interactive Modals**: Enhance customer engagement with modals that offer toggle options for front and back views, ensuring a polished and consistent user experience across all devices. 🔄👁️

- **Automated Sales Flow**: From order receipt to payment processing, the entire sales flow is automated. Artists can manage inventory and view orders effortlessly, without the need for manual intervention. 🔄💳

- **Secure Authentication**: Protect user data and transactions with robust security measures, ensuring a safe experience for both buyers and sellers. 🔒🛡️

- **Shipping Automation**: After a sale, simply print the shipping label—everything else, from customer notifications to tracking updates, is handled automatically. Artists can stay home and let the platform take care of the logistics. 📦✂️

## 🛠️ Technical Highlights

- **Integrated Webhooks**: The platform utilizes seamless webhook integrations to handle real-time events and notifications:  
  - **Resend API**: Manage email events and notifications for order confirmations, shipping updates, and more. 📧🔔
  - **Stripe**: Securely process payments and handle financial transactions. 💳💸
  - **Shippo**: Automatically generate and print shipping labels, and track shipments. 🚚📦

- **Server Actions with Next.js**: The app leverages Next.js Server Actions to handle all data mutations and form submissions directly on the server, providing a clean separation of concerns for optimal performance. ⚙️🌐

- **Serverless Database with Neon**: By using Neon for PostgreSQL, the application benefits from serverless, scalable databases that support rapid provisioning, auto-scaling, and branchable environments—ensuring your data is always available and performant. 📊⚡

## 🧰 Tech Stack

- **Next.js** – A React framework for building fast, optimized, and scalable web applications. ⚛️🚀
- **TypeScript** – A statically typed superset of JavaScript for enhanced development productivity. 🖥️✨
- **TailwindCSS** – A utility-first CSS framework for creating responsive and customizable user interfaces. 🎨⚡
- **Neon** – A serverless PostgreSQL solution that offers instant provisioning, auto-scaling, and efficient data management. 💾🔋
- **Resend API** – Provides email and event notification handling. 📧🔔
- **Stripe** – Securely handles payment processing and financial transactions. 💳💸
- **Shippo** – A logistics platform for generating shipping labels and managing shipments. 🚚📦
- **Next.js Server Actions** – Allows direct handling of data mutations and form submissions on the server, promoting a separation of concerns for cleaner code. ⚙️🔧

