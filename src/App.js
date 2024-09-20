import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import { Provider } from "react-redux";
import store from "./utils/store";
import Search from "./component/Search";
// import Body from "./component/Body";
import SubCategories from "./component/SubCategories";
import Footer from "./component/Footer";
import Cart from "./component/Cart";
import { lazy, Suspense } from "react";
import Shimmer from "./component/Shimmer";

const Body = lazy(() => import("./component/Body"));

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div>
                      <Shimmer />
                    </div>
                  }
                >
                  <Body />
                </Suspense>
              }
            />
            <Route path="/category/:id" element={<SubCategories />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
