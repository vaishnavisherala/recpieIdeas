import React from "react";
import { Container } from "react-bootstrap";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "37vh",
        display: "flex",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container>
        <h1 className="fw-bold display-3">🍲 Discover Delicious Recipes</h1>
        <p className="lead mt-3">
          Explore hundreds of easy-to-cook meals and inspire your inner chef!
        </p>
        
      </Container>
    </div>
  );
};

export default Banner;
