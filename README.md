# Shopping Cart

A modern, fully-functional e-commerce shopping cart application built with React. This project showcases a clean, intuitive interface where users can browse products, add items to their cart, and manage their shopping experience seamlessly.

## 🚀 Features

- **Dynamic Product Catalog** – Browse through a collection of products with detailed information and pricing
- **Shopping Cart Management** – Add, remove, and update quantities of items in your cart
- **Responsive Navigation** – Easy-to-use navbar for seamless navigation between Home, Shop, and Cart pages
- **Context-Based State Management** – Utilizes React Context API for efficient cart state management across components
- **Modern Component Architecture** – Built with reusable React components for maintainable and scalable code
- **API Integration** – Fetches real product data from FakeStore API
- **Comprehensive Testing** – Includes unit tests for React components using Vitest

## 🛠️ Tech Stack

| Technology       | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| React 19         | Core framework for building the user interface |
| React Router DOM | Client-side routing and navigation             |
| Vanilla CSS      | Styling with custom CSS modules                |
| FakeStore API    | External API for fetching product data         |
| Vitest           | Unit testing framework for React components    |
| Vite             | Fast build tool and development server         |
| Lucide React     | Modern icon library                            |
| ESLint           | Code quality and linting                       |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm

## ⚡ Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd shopping-cart
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## 📁 Project Structure

```
src/
├── App Components/          # Main app component and logic
├── HomePage Components/      # Home page component
├── ShopPage Components/      # Shop/Products page component
├── Cart Components/          # Shopping cart component
├── assets/                   # Static assets
├── ItemContext.jsx          # React Context for cart state
├── routes.jsx               # Route configuration
└── main.jsx                 # Application entry point

public/                       # Static files and fonts
tests/                        # Test configuration and utilities
```

## 💡 Key Components

- **App.jsx** – Main application component with navigation and routing
- **ItemContext.jsx** – Global cart state management using React Context API
- **HomePage.jsx** – Landing page with featured products
- **Shop.jsx** – Product catalog with filtering and display options
- **Cart.jsx** – Shopping cart with quantity management and checkout

## 🎓 What I Learned

- **React Router Implementation** – Mastered declarative routing in React, including route configuration, navigation, and handling dynamic routes for product pages
- **Testing with Vitest** – Gained experience in writing and running tests for React components using modern testing practices
- **Context API** – Implemented global state management using React Context for the shopping cart functionality without external state libraries
- **API Integration** – Implemented API calls to fetch product data from FakeStore API, handling async operations and error states gracefully
- **Component Architecture** – Developed scalable, reusable React components with proper separation of concerns
- **Responsive Design** – Created a responsive layout that works across different screen sizes

## 📝 Available Scripts

- `npm run dev` – Start development server with hot reload
- `npm run build` – Create production-optimized build
- `npm run preview` – Preview the production build locally
- `npm test` – Run the test suite
- `npm run lint` – Check code quality with ESLint

## 🔗 API Reference

This project uses the **FakeStore API** for product data:

- **API Base URL**: https://fakestoreapi.com
- **Products Endpoint**: `/api/products`
- **Categories Endpoint**: `/api/products/categories`

## 👤 Author

**FORSAKANG CHOFOR JUNIOR**

Feel free to reach out with questions or feedback!

- [GitHub](https://github.com/ChoforJr)
- [LinkedIn](https://www.linkedin.com/in/choforforsakang/)
