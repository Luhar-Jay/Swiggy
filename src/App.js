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
import SearchItem from "./component/SearchItem";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";

const Body = lazy(() => import("./component/Body"));

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div>
                      <h1>Loading.....</h1>
                    </div>
                  }
                >
                  <Body />
                </Suspense>
              }
            />
            <Route path="/category/:id" element={<SubCategories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search/:id" element={<SearchItem />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
