"use client";

import { useState } from "react";
import Taxes from '@/data/taxes.json';

type Country = "Canada" | "USA" | "";
type ProvinceOrState = string;

interface TaxesData {
  Canada: Record<string, { tax: number }>;
  USA: Record<string, { tax: number }>;
}

export default function TaxesForm() {
  const [country, setCountry] = useState<Country>("");
  const [stateOrProvince, setStateOrProvince] = useState<ProvinceOrState>("");

  // Define the Taxes object (adjusted based on the correct structure)
  const { Canada, USA }: TaxesData = Taxes;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value as Country);
    setStateOrProvince(""); // Reset state or province on country change
  };

  const provincesOrStates = country === "Canada" ? Object.keys(Canada) : Object.keys(USA);

  return (
    <div className="flex flex-col space-y-4 mt-2">
      <h1 className="font-bold">Select Shipping Info</h1>
      <select
        id="country"
        name="shippingAddress"
        className="p-2 border rounded-md"
        required
        value={country}
        onChange={handleCountryChange}
      >
        <option value="" disabled>Select Country</option>
        {["Canada", "USA"].map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      {country && (
        <select
          id="stateOrProvince"
          name="shippingAddress"
          className="p-2 border rounded-md"
          required
          value={stateOrProvince}
          onChange={(e) => setStateOrProvince(e.target.value)}
        >
          <option value="" disabled>Select State/Province</option>
          {provincesOrStates.map((stateOrProvince) => (
            <option key={stateOrProvince} value={stateOrProvince}>
              {stateOrProvince}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
