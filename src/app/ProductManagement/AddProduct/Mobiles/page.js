"use client";

import React, { useState } from "react";
import { databases } from "@/Appwrite/appwriteLoginConfig";
import { ID } from "appwrite";

const AddMobile = () => {
  const [mobileName, setmobileName] = useState("");
  const [mobileId, setmobileId] = useState(ID.unique());
  const [Brand, setBrand] = useState("");
  const [Model_Number, setModel_Number] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobileData = {
      product_name: mobileName,
      id: mobileId,
      Brand,
      Model_Number,
      Description,
      Price: parseFloat(Price),
    };

    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_MOBILES_COLLECTION_ID,
        mobileId,
        mobileData
      );
      alert("mobile added successfully!");
      setmobileName("");
      setmobileId(ID.unique());
      setBrand("");
      setModel_Number("");
      setDescription("");
      setPrice("");
    } catch (error) {
      alert("Error adding mobile details: " + error.message);
      console.error("Error adding mobile details:", error);
    }
  };

  return (
    <div className=" h-screen  p-4 m-auto w-full overflow-auto">
      <div className="bg-white drop-shadow-2xl rounded-lg p-6 w-full max-w-md m-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add New mobile Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={mobileName}
              onChange={(e) => setmobileName(e.target.value)}
              placeholder="Product Name (e.g., iPhone 14 Pro)"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Unique ID
            </label>
            <input
              type="text"
              value={mobileId}
              readOnly
              placeholder="Generated Unique mobile ID"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* from Here */}

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Brand
            </label>
            <input
              type="text"
              value={Brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand (e.g., Apple)"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Model_Number
            </label>
            <input
              type="text"
              value={Model_Number}
              onChange={(e) => setModel_Number(e.target.value)}
              placeholder="(e.g., A2633)"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              type="text"
              rows="5"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="999.99"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {/* to here */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Add mobile
            </button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default AddMobile;
