"use client";

import { useState } from "react";
import Taxes from '@/data/taxes.json';

type Country = "Canada" | "USA" | "";
type ProvinceOrState = string;

interface TaxesData {
  Canada: Record<string, { tax: number }>;
  USA: Record<string, { tax: number }>;
}

interface TaxesFormProps {
  onTaxChange: (tax: number) => void;
  onShippingChange: (country: string, stateOrProvince: string, postalCode: string) => void;
}

export default function TaxesForm({ onTaxChange, onShippingChange }: TaxesFormProps) {
  const [country, setCountry] = useState<Country>("");
  const [stateOrProvince, setStateOrProvince] = useState<ProvinceOrState>("");
  const [postalCode, setPostalCode] = useState<string>("");

  const { Canada, USA }: TaxesData = Taxes;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value as Country;
    setCountry(newCountry);
    setStateOrProvince(""); // Reset state/province when country changes
    onShippingChange(newCountry, "", postalCode); // Raise shipping info change
  };

  const handleStateOrProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStateOrProvince = e.target.value;
    setStateOrProvince(selectedStateOrProvince);

    let tax = 0;
    if (country === "Canada" && selectedStateOrProvince) {
      tax = Canada[selectedStateOrProvince]?.tax || 0;
    } else if (country === "USA" && selectedStateOrProvince) {
      tax = USA[selectedStateOrProvince]?.tax || 0;
    }

    onTaxChange(tax);
    onShippingChange(country, selectedStateOrProvince, postalCode); // Raise shipping info change
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPostalCode = e.target.value;
    setPostalCode(selectedPostalCode);
    onShippingChange(country, stateOrProvince, selectedPostalCode); // Raise shipping info change
  };

  const provincesOrStates = country === "Canada" ? Object.keys(Canada) : Object.keys(USA);

  return (
  <div className="flex flex-col space-y-4 mt-2">
    <h1 className="font-bold">Shipping Info</h1>
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
        onChange={handleStateOrProvinceChange}
      >
        <option value="" disabled>Select State/Province</option>
        {provincesOrStates.map((stateOrProvince) => (
          <option key={stateOrProvince} value={stateOrProvince}>
            {stateOrProvince}
          </option>
        ))}
      </select>
    )}
    {country && stateOrProvince && (
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        className="p-2 border rounded-md"
        placeholder="Enter Postal Code"
        value={postalCode} 
        onChange={handlePostalCodeChange}
        required
      />
    )}
  </div>
)};
