import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Products.css'
export default function Products({ products, setProduct, carts, setCarts }) {
  return (
    <div className='container'>
      <div className='custom-grid'>
        {products.map((product) => {
          return (
            <Card className='w-75 mx-auto' key={(Math.random() * 100)}>
              <Card.Img variant="top" src={product.thumbnailUrl} />
              <Card.Body>
                <Card.Title>
                  <div className='bg-danger'>
                    {product.title}
                  </div>
                </Card.Title>
                <Card.Text>
                  <b>
                    ${product.price.toFixed(2)}
                  </b>
                </Card.Text>
                {carts.find((cart) => {
                  return cart.id === product.id
                }) ? (
                  <span className='badge bg-danger'>Added</span>
                ) : (
                  <Button variant="outline-primary" onClick={() => {
                    setCarts([...carts, product])
                  }} >add to cart</Button>
                )}
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
