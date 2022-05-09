import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {GiReturnArrow} from "react-icons/gi";
import axios from "axios";
import swal from 'sweetalert';




const Bills: React.FC = () => {
    const [show, setShow] = useState<any>(false)
    const [numFacture, setnumFacture] = useState("");
    const [tele, setTele] = useState("");
    const [typeSociete, setTypeSociete] = useState("");

   
    const PayeFacture = () => {

        // setShow(!show);
        
        const body = {
          numeroContrat: numFacture,
          telephone: tele,
          type: typeSociete,
        };

        axios
        .post("http://localhost:5000/api/facture/pay-facture-telecom", body)
        .then((res) => {
          if(res.status === 200){
            swal({
              title: "Success",
              text: "Facture was payed successfully!",
              icon: "success",
              button: "Ok",
            });
          }else{
            swal({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            });
          }
        })
        .catch((err) => console.warn(err));

    };
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-black/50">
        <div className="bg-gradient-to-b from-cyan-500/50 via-cyan-400/50 to-cyan-300/50 h-5/6 w-5/6 rounded-3xl flex flex-col justify-center items-center">
          <div className="w-full flex justify-between">
            <span></span>
            <h1 className="text-3xl lg:text-5xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-200 font-extrabold">
              Sélectionner Le Solde
            </h1>
            <Link to="/home">
              <GiReturnArrow className="text-3xl lg:text-5xl text-cyan-100 mr-10" />
            </Link>
          </div>
          <div className="w-full h-5/6 rounded-3xl grid grid-cols-1 justify-items-center items-center">
            <button className="w-4/5 btn h-1/3 rounded-l-full">
              <span className="text-cyan-900 text-3xl lg:text-5xl font-extrabold">
                Facture Electricité
              </span>
            </button>
            <button className="w-4/5 btn h-1/3 rounded-l-full">
              <span className="text-cyan-900 text-3xl lg:text-5xl font-extrabold">
                Facture Eau
              </span>
            </button>
            <button
              className="w-4/5 btn h-1/3 rounded-l-full"
              onClick={() => setShow(!show)}
            >
              <span className="text-cyan-900 text-3xl lg:text-5xl font-extrabold">
                Facture Télécome
              </span>
            </button>
          </div>
        </div>

        {/* Modal */}

        {show && (
          <section className="w-full h-full absolute z-10 bg-black/50 flex justify-center items-center">
            <div className="p-4 text-center w-96 h-96 bg-slate-300 rounded-md sm:p-4">
              <p className="text-3xl mt-2 font-semibold tracking-widest text-cyan-700 uppercase h-1/4">
                Enter Informations
              </p>

              <div className="w-full px-4 h-1/2 flex flex-col items-center justify-around mt-2 ">
                <input
                  type="text"
                  placeholder="N° de facture"
                  className="w-full p-2 rounded-lg"
                  onChange={(e) => {
                    setnumFacture(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="N° de telephone"
                  className="w-full p-2 rounded-lg"
                  onChange={(e) => {
                    setTele(e.target.value);
                  }}
                />
                <select name="" id="" className="w-full p-2 rounded-lg"
                 onChange={(e) => {
                  setTypeSociete(e.target.value);
                }}
                >
                  <option value="">Société</option>
                  <option value="telecom">Maroc Telecom</option>
                  <option value="">Orange</option>
                  <option value="">Inwi</option>
                </select>
              </div>

              <button
                 onClick={PayeFacture}
                className="inline-block w-4/5 h-16 py-1 mt-2 font-bold text-white bg-cyan-600 rounded-full shadow-xl"
              >
                Submit
              </button>
            </div>
          </section>
        )}
      </div>
    );
};

export default Bills;