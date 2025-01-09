"use client";

import { useState} from "react";
import Taxes from '@/data/taxes.json';

type Country = "Canada" | "USA" | "";
type ProvinceOrState = string;

interface TaxesData {
  Canada: Record<string, { tax: number }>;
  USA: Record<string, { tax: number }>;
}

interface TaxesFormProps {
  onTaxChange: (tax: number) => void; 
}

export default function TaxesForm({ onTaxChange }: TaxesFormProps) {
  const [country, setCountry] = useState<Country>("");
  const [stateOrProvince, setStateOrProvince] = useState<ProvinceOrState>("");

  const { Canada, USA }: TaxesData = Taxes;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value as Country);
    setStateOrProvince(""); 
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
    </div>
  );
}
