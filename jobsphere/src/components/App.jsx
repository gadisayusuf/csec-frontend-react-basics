import React from "react";
import logo from "../assets/jobsphere.svg";
function App() {
  return (
    <>
      <div className="flex justify-between px-[146px] py-[20px] bg-[#FFFFFF]  max-w-[1728px] h-[102px] shadow-md">
        <div className="bg-[#0034D1] w-[158px] h-[61px] p-[5px] gap-[5px] rounded-[10px]">
          <img src={logo} alt="JobSphere" />
        </div>
        <nav className="">
          <ul className="flex w-[625px] h-[49px] gap-[24px] text-[#2F2F2F] font-['Inter'] font-[400] text-[20px] leading-[24px]">
            <li className="p-[10px] h-[44px] w-fit gap-[10px] ">Job Search</li>
            <li className="p-[10px] h-[44px] w-fit gap-[10px]">
              My Application
            </li>
            <li className="p-[10px] h-[44px] w-fit gap-[10px]">Companies</li>
            <li className="p-[10px] h-[44px] w-fit gap-[10px]">Contact Us</li>
          </ul>
        </nav>
        <div className=" flex w-[370px] h-[48px] gap-[24px] ">
          <button className="w-[167px] h-[48px] bg-[#0034D1] py-[16px] px-[57px] gap-[4px] rounded-[8px] font-[600] font-['Open_Sans'] text-[20px] text-[#FFFFFF] leading-[16px]">
            Login
          </button>
          <button className=" w-[180px] h-[48px]  rounded-[8px] border-[1px] border-[#0034D1] py-[16px] px-[57px] gap-[4px]  font-[500] font-['Open_Sans'] text-[20px] text-[#2F2F2F] leading-[16px]">
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
