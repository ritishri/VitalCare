import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Doctors() {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  //If speciality is defined, the doctors array is filtered to include only those doctors whose speciality matches the speciality parameter. The result is stored in filterDoc using setFilterDoc.
  // Else...If speciality is not defined (e.g., when visiting a general doctors' page without a specific specialty in the URL), the doctors array is directly set to filterDoc, meaning all doctors are displayed.

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="container mx-auto px-2 ">
      <p className="text-gray-600 text-lg mb-6">
        Browse through the doctors specialist.
      </p>

      <button
        className={`py-1 px-3 mb-3 border rounded text-sm transition-all sm:hidden ${
          showFilter ? "bg-primary text-white" : ""
        }`}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Filter
      </button>

      <div className="flex flex-col sm:flex-row">
        {/* Left section: Specialist Options */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 w-full sm:w-1/4 mb-3 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General Physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
          >
            General Physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatrician"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
          >
            Gastroenterologist
          </p>
        </div>

        {/* Right section: Doctor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full sm:w-3/4 pl-0 sm:pl-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-20px] transition-all duration-500 "
              key={index}
            >
              <img className="bg-blue-50 " src={item.image} />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
