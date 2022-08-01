import React from "react";
import { useState, useEffect } from "react";
import { Loader } from "monday-ui-react-core";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";

import Header from "./components/Header";
import TableView from "./components/Table View/TableView";

const monday = mondaySdk();
monday.setToken(
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2ODYwNzk4NiwidWlkIjozMTY5Njk3MCwiaWFkIjoiMjAyMi0wNy0wNFQxMToxMTozMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTE0MTA1MTIsInJnbiI6InVzZTEifQ.AQ0i2OQeXqru5sMmRx6h-CCKf6d-CMJ_a1sp8tFJp38"
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
  }, [isLoading]);

  // loadState ? return null : (
  return (
    <div>
      {isLoading ? (
        <Loader size={Loader.sizes.MEDIUM} color={Loader.colors.PRIMARY} />
      ) : (
        <>
          <div className="App">
            <Header />
            <TableView />
            {/* <Content /> */}
            {/* <Attention /> */}
          </div>
        </>
      )}
    </div>
  );
}
