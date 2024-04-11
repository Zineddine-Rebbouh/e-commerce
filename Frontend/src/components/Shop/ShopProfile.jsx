import React, { useEffect, useState } from "react";
import Container from "../../layout/Container";
import ShopSidebar from "./ShopSidebar";
import ShopSections from "./ShopSections";
import { useSelector, useDispatch } from "react-redux";
import { getShopDetails } from "../../redux/actions/shop";
import { Loader } from "../Loader/Loader";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const ShopProfile = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("Shop informations");

  // Assuming your user state has a isLoading flag
  // Adjust according to your actual Redux state structure
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.shopId) {
      dispatch(getShopDetails(user.shopId));
    }
  }, [dispatch, user?.shopId]); // Safely access shopId

  // Conditional rendering based on isLoading state
  if (isLoading || !user?.shopId) {
    // Checking isLoading and if shopId exists
    return <Loader />;
  }

  return (
    <div className="p-8">
      <div className="min-h-screen grid grid-cols-6 space-x-2">
        {/* ProfileSideBar will take 1 fraction of space */}
        <div className="col-span-1 h-full">
          <ShopSidebar active={active} setActive={setActive} />
        </div>
        {/* ProfileSections will take the rest */}
        <div className="col-span-5 h-full">
          <ShopSections active={active} />
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
