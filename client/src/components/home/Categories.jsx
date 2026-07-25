import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import livingRoom from "../../assets/images/categories/living-room.png";
import bedroom from "../../assets/images/categories/bedroom.png";
import diningRoom from "../../assets/images/categories/dining-room.png";
import office from "../../assets/images/categories/office.png";
import "./Categories.css";

function Categories() {
  const categories = [
    {
      id: 1,
      name: "Living Room",
      image: livingRoom,
      description: "Elegant sofas & coffee tables",
    },
    {
      id: 2,
      name: "Bedroom",
      image: bedroom,
      description: "Comfortable beds & wardrobes",
    },
    {
      id: 3,
      name: "Dining Room",
      image: diningRoom,
      description: "Dining sets for every family",
    },
    {
      id: 4,
      name: "Office",
      image: office,
      description: "Modern office furniture",
    },
  ];

  return (
    <section className="categories" id="categories">
      <div className="section-header">
        <h2>Shop By Category</h2>

        <p>Find premium furniture designed for every room in your home.</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="category-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={category.image} alt={category.name} />

            <div className="overlay">
              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <Link to="/products" className="shop-btn">
                Shop Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
