import React from "react";

const Footer = () => {
  return (
    <div className=" mt-20 ">
      <div className="bg-slate-300 py-5 ">
        <div className=" max-w-[1000px] m-auto flex justify-between items-center text-center ">
          <h1 className="text-xl font-bold text-wrap">
            For better experience,download the Swiggy app now
          </h1>
          <div className="flex">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
              className="w-48"
              alt=""
            />
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
              className="w-48"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className=" bg-black text-white">
        <div className="flex max-w-[1200px] m-auto py-10 justify-center">
          <div className="w-56">
            <h1 className="font-bold text-lg py-2">Swiggy</h1>
            <p>© 2024 Bundl Technologies Pvt. Ltd</p>
          </div>
          <div className="w-56">
            <h1 className="font-bold text-lg py-2">Company</h1>
            <p>About</p>
            <p>Careers</p>
            <p>Team</p>
            <p>Swiggy One </p>
            <p>Swiggy Instamart</p>
            <p>Swiggy Genie</p>
          </div>
          <div className="w-56">
            <h1 className="font-bold text-lg py-2">Contact us</h1>
            <p>Help & Support</p>
            <p>Partner with us</p>
            <p> Ride with us</p>
            <div className="w-56 mt-10">
              <h1 className="font-bold text-lg py-2">Legal</h1>
              <p>Terms & Condition</p>
              <p>Cookie Policy</p>
              <p>Privacy Policy</p>
              <p> Investor Relations</p>
            </div>
          </div>
          <div className="w-56">
            {" "}
            <h1 className="font-bold text-lg py-2">We deliver to:</h1>
            <p>Bangalore</p>
            <p>Gurgaon</p>
            <p>Hyderabad</p>
            <p>Ddelhi</p>
            <p>Mumbai</p>
            <p>Pune</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
