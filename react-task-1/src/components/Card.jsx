import React from "react";

function Card() {
  return (
    <>
      <div className="flex h-screen  items-center justify-center">
        <div className="p-5 bg-white rounded shadow-md w-96 max-w-md">
          <h1 className="bg-blue-400  text-center p-3 rounded">Card</h1>
          <p className=" bg-slate-50 rounded p-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
