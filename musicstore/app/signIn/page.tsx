import React from "react";
import SignUpComp from "../components/signUpComp";

export default function SignIn() {
  return (
      <div className="overflow-y-auto h-auto w-2/3 userFormBackground my-6 rounded-lg shadow-md mx-auto text-white">
        <div className="pt-7 text-center font-bold text-6xl p-1">Sign In</div>
        <form action="submit" className="flex flex-col items-center justify-center rounded-lg p-8">
            <label htmlFor="">Email:</label>
            <input type="text" placeholder="Email" className="w-1/2 rounded-sm p-1 text-black"/>
            <label htmlFor="" className="pt-9">Password:</label>
            <input type="text" placeholder="Password" className="w-1/2 rounded-sm p-1 text-black"/>
        </form>
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4">
            If you don't have an account, click <a href="/signUp" className="text-purple-800">here</a> to sign up
          </p>
          <div className="mb-7">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
          </div>
        </div>
      </div>
  );
}