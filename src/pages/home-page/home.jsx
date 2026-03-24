import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/component-index";
import { useProduct } from "../../context/ecom-context";
import {
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  Smartphone,
  Watch,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { state } = useProduct();

  const categoryItems = [
    { name: "Laptop", icon: Laptop },
    { name: "Phone", icon: Smartphone },
    { name: "Watch", icon: Watch },
    { name: "Camera", icon: Camera },
    { name: "Headphones", icon: Headphones },
    { name: "Gaming", icon: Gamepad2 },
  ];

  const featuredProducts = state.initialProduct.slice(0, 8);

  return (
    <section className="home-page page-home">
      <div className="home-wrapper home-showcase-shell container-home">
        <section className="home-hero-panel section-home-hero">
          <div className="home-content content-home-hero">
            <p className="home-eyebrow">Top products of this month</p>
            <div className="home-text text-home-hero">
              <h1>Curated picks for your everyday tech and lifestyle.</h1>
              <p>
                Discover premium essentials with clean design, trusted quality,
                and fast checkout.
              </p>
            </div>
            <div className="home-actions actions-home-hero">
              <Button
                onClick={() => navigate("/shop")}
                className="button-getting-started"
                size="lg"
              >
                Shop Now
              </Button>
              <Button
                onClick={() => navigate("/wishlist")}
                className="button-browse-wishlist"
                variant="secondary"
                size="lg"
              >
                View Wishlist
              </Button>
            </div>
            <div className="home-metrics metrics-home-hero">
              <p>
                <strong>1K+</strong> active users
              </p>
              <p>
                <strong>300+</strong> curated products
              </p>
              <p>
                <strong>4.8/5</strong> average customer rating
              </p>
            </div>
          </div>
          <div className="home-image media-home-hero">
            <img
              className="image-responsive"
              src="/image/empty-cart.svg"
              alt="home-hero"
            />
          </div>
        </section>

        <section className="home-categories-panel section-home-categories">
          <div className="home-section-head header-home header-home-categories">
            <h2 className="title-home-categories">Browse by Category</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/shop")}
              className="home-view-all button-home-view-all"
            >
              View All
            </Button>
          </div>
          <div className="category-grid grid-home-categories">
            {categoryItems.map(({ name, icon: IconComponent }) => (
              <article key={name} className="category-card">
                <div className="category-icon-wrap">
                  <IconComponent size={20} />
                </div>
                <p>{name}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-products-panel section-home-products">
          <div className="home-section-head header-home header-home-products">
            <h2 className="title-home-products">Featured Products</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/shop")}
              className="home-view-all button-home-view-all button-home-view-products"
            >
              View All Products
            </Button>
          </div>
          <div className="home-featured-grid grid-home-products">
            {featuredProducts.map((item) => (
              <article className="home-feature-card" key={item.id}>
                <button
                  type="button"
                  className="home-feature-image-wrap"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img src={item.image} alt={item.name} />
                </button>
                <p className="home-feature-name">{item.name}</p>
                <p className="home-feature-price">Rs {item.price}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export { Home };
