import React, { useEffect, useState } from "react";
import { GiReturnArrow } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn: React.FC = () => {
  const [bin, setBin] = useState("");
  const [numeroAccount, setnumeroAccount] = useState("");
  let navigate = useNavigate();
  const body = {
    pin: bin,
    numeroAccount: numeroAccount,
  };

  const auth = () => {
    axios
      .post("http://localhost:5000/api/user/check-user-account", body)
      .then((res) => {
        if (res.status === 200) {
          navigate("/home", { replace: true });
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.warn(err));
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black/50">
      <div className="bg-gradient-to-b from-slate-300/50 via-slate-200/50 to-slate-100/50 h-4/5 lg:h-3/6 w-3/5 lg:w-1/4 rounded-3xl flex flex-col justify-center items-center">
        <div className="w-full flex justify-center">
          <h1 className="text-xl lg:text-3xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-200 font-extrabold">
            Code Pin
          </h1>
        </div>

        <div className="w-full h-5/6 rounded-3xl flex flex-col justify-around items-center justify-items-center">
          <div className="w-4/5 h-64 rounded-xl bg-gray-900 flex flex-col justify-around items-center text-white">
            <input
              type="text"
              onChange={(e) => {
                setBin(e.target.value);
              }}
              className="w-4/5 bg-slate-100/5 text-2xl rounded-lg text-center"
            />
            <div className="w-full flex justify-between px-10 mb-6">
              <span className="uppercase">Code Pin</span>
            </div>
          </div>

          <div className="flex flex-col w-full items-center">
            <input
              type="text"
              placeholder="Numero de compte"
              className=" w-5/6 rounded-lg p-4"
              onChange={(e) => {
                setnumeroAccount(e.target.value);
              }}
            />
            <button
              onClick={auth}
              className="bg-slate-100 rounded-lg px-4 py-1 text-xl my-2 w-1/4 text-center"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
