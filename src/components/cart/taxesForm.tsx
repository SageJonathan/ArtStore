"use client";

import Taxes from "@/data/taxes.json";

interface TaxesData {
  Canada: Record<string, { tax: number }>;
  USA: Record<string, { tax: number }>;
}
interface TaxesFormProps {
  onTaxChange: (tax: number) => void;
  onShippingChange: (
    country: string,
    stateOrProvince: string,
    postalCode: string
  ) => void;
  country: string;
  stateOrProvince: string;
  postalCode: string;
  isError: boolean;
}

export default function TaxesForm({
  onTaxChange,
  onShippingChange,
  country,
  stateOrProvince,
  postalCode,
  isError,
}: TaxesFormProps) {
  const { Canada, USA }: TaxesData = Taxes;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    onShippingChange(newCountry, "", postalCode);
  };

  const handleStateOrProvinceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedStateOrProvince = e.target.value;
    let tax = 0;
    if (country === "Canada" && selectedStateOrProvince) {
      tax = Canada[selectedStateOrProvince]?.tax || 0;
    } else if (country === "USA" && selectedStateOrProvince) {
      tax = USA[selectedStateOrProvince]?.tax || 0;
    }
    onTaxChange(tax);
    onShippingChange(country, selectedStateOrProvince, postalCode);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPostalCode = e.target.value;
    onShippingChange(country, stateOrProvince, selectedPostalCode);
  };

  const provincesOrStates =
    country === "Canada" ? Object.keys(Canada) : Object.keys(USA);

  return (
    <div className="flex flex-col space-y-4 px-4 pt-4">
      <h1 className="font-bold text-indigo-600 text-xl font-playfair pb-3 border-b border-gray-200">
        Shipping Estimator
      </h1>
      <div className="space-y-3">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            id="country"
            name="shippingAddress"
            className={`w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
              isError ? "border-red-500 ring-2 ring-red-200" : "border-gray-300"
            }`}
            required
            value={country}
            onChange={handleCountryChange}
          >
            <option value="" disabled>
              Select Country
            </option>
            {["Canada", "USA"].map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {country && (
          <div>
            <label htmlFor="stateOrProvince" className="block text-sm font-medium text-gray-700 mb-1">
              State/Province
            </label>
            <select
              id="stateOrProvince"
              name="shippingAddress"
              className={`w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                isError ? "border-red-500 ring-2 ring-red-200" : "border-gray-300"
              }`}
              required
              value={stateOrProvince}
              onChange={handleStateOrProvinceChange}
            >
              <option value="" disabled>
                Select State/Province
              </option>
              {provincesOrStates.map((stateOrProvince) => (
                <option key={stateOrProvince} value={stateOrProvince}>
                  {stateOrProvince}
                </option>
              ))}
            </select>
          </div>
        )}
        {country && stateOrProvince && (
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className={`w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                isError ? "border-red-500 ring-2 ring-red-200" : "border-gray-300"
              }`}
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={handlePostalCodeChange}
              required
            />
          </div>
        )}
      </div>
    </div>
  );
}
