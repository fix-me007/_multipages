import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Carts.css";

export default function Carts({ carts, setCart }) {
  return (
    <div className="container">
      <div className="custom-grid">
        {carts.map((cart) => {
          return (
            <Card className='w-75 mx-auto h-75' key={Math.random() * 100}>
              <Card.Img variant="top" src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>
                  <b>${cart.price.toFixed(2)}</b>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setCart(carts.filter((c) => c.id !== cart.id)); //cart
                  }}
                >
                  remove from cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <div className="d-flex align-items-center gap-3 mt-1">
        <h4>
          {carts.length} item - total Price: $
          {carts.reduce((prev, cart) => {
            return prev + cart.price;
          }, 0).toFixed(2)}
        </h4>
        <button className="btn btn-success">
          check out
        </button>
      </div>
    </div>
  );
}
