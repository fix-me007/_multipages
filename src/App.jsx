import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout/Layout";
import Home from "./pages/Home/Home";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Calculator from "./pages/Calculator/Calculator";
import Components from "./pages/Components/Components";
import TodoOpin from "./pages/Todo/Todo.Opin";

import { fetchProduct } from "./data/products";
import Products from "./pages/Products/products";
import Carts from "./pages/Carts/carts";
import Login from "./pages/Login/login";
import Animation from "./pages/Animation/animation";

//



function App() {
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  const [products, setProduct] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    setProduct(fetchProduct());
  }, []); // first load
  useEffect(() => console.log(products), [products]);

  if (token === '') {
    return <Login setToken={setToken} setRole={setRole}  />
  } else {
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout
                  products={products}
                  carts={carts}
                  setToken={setToken}
                  role={role}
                />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/animation" element={<Animation />} />
              <Route path="/components" element={<Components />} />
              <Route path="/todo" element={<TodoOpin />} />
              <Route
                path="/products"
                element={
                  <Products
                    products={products}
                    setProduct={setProduct}
                    carts={carts}
                    setCarts={setCarts}
                  />
                }
              />
              <Route
                path="/carts"
                element={<Carts carts={carts} setCart={setCarts} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }

}

export default App;
