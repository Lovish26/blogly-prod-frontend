import React from "react";
import { Link } from "react-router-dom";

const Newsletter = () => {
  return (
    <div className="bg-[#f4bf2c] py-16 text-[#000000b3]">
      <div className="max-w-[1320px] mx-auto px-3 flex flex-col justify-center">
        <div className="text-center">
          <h2 className="text-[#111] text-[22px] md:text-[27px] font-medium leading-[1.5]">
            Newsletter - Stay tune and get the latest updates!
          </h2>
          <p>We will not share your email address.</p>
        </div>

        <div className="mx-auto mt-8 md:w-[500px]">
          <form action="#" className="newsletter-form w-full">
            <div className="flex items-center relative border border-[#00000080]">
              <input type="text" placeholder="Enter email address" />
              <Link to="#">Subscribe</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
