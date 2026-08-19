## Furnispace
FurniSpace is a modern full-stack furniture e-commerce web application built using the MERN Stack. It provides users with a seamless shopping experience while giving administrators complete control over products, orders, and inventory.

### Features

#### User
- User Authentication (JWT)
- Register & Login
- Browse Products
- Search & Filter Products
- Product Details Page
- Add to Cart
- Update Cart Quantity
- Wishlist
- Secure Checkout
- Order History
- User Profile Management

#### Admin
- Admin Dashboard
- Add/Edit/Delete Products
- Upload Multiple Product Images (Cloudinary)
- Manage Categories
- Manage Orders
- Manage Users
- Inventory Management

---

### Tech Stack

#### Frontend
- React.js
- React Router
- Axios
- Context API / Redux
- CSS / Tailwind CSS

#### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary

---

###  Project Structure

```
FurniSpace
│
├── client/
│   ├── src/
│   ├── public/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
└── README.md
```
---

###  Installation

#### Clone Repository

```bash
git clone https://github.com/Keerthana-webdev/FurniSpace.git
```

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm start
```

---

### Future Enhancements

- AI Furniture Recommendation
- AR Room Preview
- Voice Search
- Real-time Order Tracking
- Product Reviews & Ratings
- Coupons & Discounts
- Online Payments (Stripe/Razorpay)
- Dark Mode

---

 🤝 Contributing

Contributions are welcome.

Fork the repository and create your feature branch.

```bash
git checkout -b feature/NewFeature
```

Commit your changes.

```bash
git commit -m "Added new feature"
```

Push to GitHub.

```bash
git push origin feature/NewFeature
```

Open a Pull Request.
