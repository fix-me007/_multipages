import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const intTap = "home";


function Navbar({ products, carts, setToken, role }) {
  const [tab, setTab] = useState("");
  useEffect(() => {
    setTab(intTap);
  }, []); // first load
  return (
    <div className="d-flex justify-content-center gap-3 mb-4">
      {role === '' ? (
        <Link to={'/home'}>
          <button
            className={
              "btn " + (tab === 'home' ? "btn-primary" : "btn-outline-primary")
            }
            onClick={() => setTab('home')}
          >
            home
          </button>
        </Link>
      ) : null}
      <Link to={'/calculator'}>
        <button
          className={
            "btn " + (tab === 'calculator' ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab('calculator')}
        >
          calculator
        </button>
      </Link>
      <Link to={'/animation'}>
        <button
          className={
            "btn " + (tab === 'animation' ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab('animation')}
        >
          animation
        </button>
      </Link>
      <Link to={'/components'}>
        <button
          className={
            "btn " + (tab === 'components' ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab('components')}
        >
          components
        </button>
      </Link>
      <Link to={'/todo'}>
        <button
          className={
            "btn " + (tab === 'todo' ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab('todo')}
        >
          todo
        </button>
      </Link>
      <Link to={'/products'}>
        <button
          className={
            "btn " + (tab === 'products' ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab('products')}
        >
          product
        </button>
      </Link>
      <Link to={'/carts'}>
        <button
          style={{ position: 'relative' }}
          className={
            "btn " + (tab === 'carts' ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab('carts')}
        >
          carts
          {carts.length > 0 && (
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {carts.length < 10 ? carts.length : '9+'}
              <span class="visually-hidden">unread messages</span>
            </span>
          )}
        </button>
      </Link>
      <button className="btn btn-outline-danger" onClick={() => {
        setToken('')
      }}>
        logout
      </button>
    </div>
  );
}

export default Navbar;
