import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import Error from "./Pages/Error";
import ContactUs from "./Pages/ContactUs";
import SignUp from "./Pages/SignUp";
import VerifyEmail from "./Pages/VerifyEmail";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import Settings from "./Components/Core/Dashboard/Settings";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./Utils/Constants";
import CreateItems from "./Components/Core/Dashboard/Items/CreateItems";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import SellerItems from "./Components/Core/Dashboard/SellerItems";
import ShopPage from "./Pages/ShopPage";
import AllCategoryProducts from "./Components/Core/Shop/AllCategoryProducts";
import CategoryPages from "./Components/Core/Shop/CategoryPages";
import ProductDetails from "./Components/Core/ProductDetails/ProductDetails";
import Cart from "./Components/Core/Cart/Cart";
import PurchasedItems from "./Components/Core/Dashboard/PurchasedItems/PurchasedItems";
import CustomerEnrolled from "./Components/Core/Dashboard/CustomerEnrolled/CustomerEnrolled";

function App() {
  const {user} = useSelector((state)=> state.profile)
  return (
    <div className=" bg-black ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route element={<ShopPage/>}>
        <Route path="/shop/all" element={<AllCategoryProducts/>} />
        <Route path="/shop/category/:categoryId" element={<CategoryPages/>} />
        </Route>
        <Route path="/shop/category/:categoryId/:productId" element={<ProductDetails/>} />
        <Route
        element={<Dashboard/>}
        >
        <Route path="/dashboard/my-profile" element={<MyProfile/>} />
        <Route path="/dashboard/cart" element={<Cart/>} />
        <Route path="/dashboard/settings" element={<Settings/>} />
        <Route path="dashboard/purchasedItem" element={<PurchasedItems/>} />
        <Route path="/dashboard/customerEnrolled" element={<CustomerEnrolled/>} />
        {
          user?.accountType === ACCOUNT_TYPE.SELLER && (
            <>
        <Route path="/dashboard/createItem" element={<CreateItems/>} />
        <Route path="dashboard/your-items" element={<SellerItems/>} />
            </>
          )
        }
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
