"use server";
import * as action from "@/actions";
import { error } from "console";
import {
  Shippo,
  AddressCreateRequest,
  ParcelCreateRequest,
  WeightUnitEnum,
  DistanceUnitEnum,
  ServiceLevelUPSEnum,
  LabelFileTypeEnum,
} from "shippo";

interface CustomerAdress {
  fullName: string;
  email: string;
  mobileNumber: string | undefined;
  city: string;
  country: string;
  line1: string;
  line2: string | undefined;
  postalCode: string;
  stateOrProvince: string;
  artId?: number;
}

interface CartRate {
  country: string;
  postalCode: string;
  stateOrProvince: string;
  shippingLength: string;
  shippingHeight: string;
  shippingWidth: string;
  shippingWeight: string;
}

const apiKeyHeader = process.env.SHIPPO_API_TOKEN;
const shippo = new Shippo({ apiKeyHeader });

export async function createLabel(cutomeradress: CustomerAdress) {
  const {
    fullName,
    email,
    mobileNumber,
    city,
    country,
    line1,
    line2,
    postalCode,
    stateOrProvince,
    artId,
  } = cutomeradress;

  const artPiece = await action.getPaintingShippingData({
    artPieceId: artId!,
    email: email,
  });
  // Prevent TS errors from returnd object
  if (!artPiece) {
    console.error("Art piece not found or invalid for the given client.");
    return;
  }

  const { shippingLength, shippingHeight, shippingWeight, shippingWidth } = artPiece;

  const addressFrom: AddressCreateRequest = {
    name: "Louise Guay",
    street1: "72 Gerin-lajoie",
    city: "Coaticook",
    state: "QC",
    zip: "J1A 1R4",
    country: "CA",
    email: "dev@sagecodes.tech",
  };

  const addressTo: AddressCreateRequest = {
    name: fullName,
    street1: line1,
    street2: line2,
    city: city,
    state: stateOrProvince,
    zip: postalCode,
    country: country,
    phone: mobileNumber,
    email: email,
  };

  const parcel: ParcelCreateRequest = {
    length: shippingLength,
    width: shippingWidth,
    height: shippingHeight,
    distanceUnit: DistanceUnitEnum.In,
    weight: shippingWeight,
    massUnit: WeightUnitEnum.Lb,
  };

  const shipment = await shippo.shipments.create({
    addressFrom: addressFrom,
    addressTo: addressTo,
    parcels: [parcel],
    async: false,
  });

  // Added logic to reduce multiples created by shippo
  if (shipment.rates && shipment.rates.length > 0) {
    const uniqueRates = shipment.rates.filter(
      (rate, index, self) =>
        index ===
        self.findIndex(
          (r) => r.amount === rate.amount && r.provider === rate.provider
        )
    );
    const cheapestRate = uniqueRates.reduce((prev, curr) => {
      return parseFloat(prev.amount) < parseFloat(curr.amount) ? prev : curr;
    });

    const transaction = await shippo.transactions.create({
      rate: cheapestRate.objectId,
      carrierAccount: "16e4230205f14fb0a4878145a67e0125",
      servicelevelToken: ServiceLevelUPSEnum.UpsStandard.valueOf(),
      labelFileType: LabelFileTypeEnum.Pdf,
      async: false,
      metadata: JSON.stringify({
        email: email,
        name: fullName,
      }),
    });
    if (!transaction) {
      console.error("Transaction Failed");
      return;
    }
  } else {
    console.error(error);
  }
}

export async function shippingRate(
  estimateData: CartRate
): Promise<number | null> {
  const {
    country,
    postalCode,
    stateOrProvince,
    shippingLength,
    shippingHeight,
    shippingWeight,
    shippingWidth,
  } = estimateData;

  const addressFrom: AddressCreateRequest = {
    name: "Louise Guay",
    street1: "72 Gerin-lajoie",
    city: "Coaticook",
    state: "QC",
    zip: "J1A 1R4",
    country: "CA",
    email: "dev@sagecodes.tech",
  };

  const addressTo: AddressCreateRequest = {
    name: "John Doe",
    state: stateOrProvince,
    zip: postalCode,
    country: country,
  };

  const parcel: ParcelCreateRequest = {
    length: shippingLength,
    width: shippingWidth,
    height: shippingHeight,
    distanceUnit: DistanceUnitEnum.In,
    weight: shippingWeight,
    massUnit: WeightUnitEnum.Lb,
  };

  try {
    const shipment = await shippo.shipments.create({
      addressFrom: addressFrom,
      addressTo: addressTo,
      parcels: [parcel],
      async: false,
    });

    if (shipment.rates && shipment.rates.length > 0) {
      const uniqueRates = shipment.rates.filter(
        (rate, index, self) =>
          index ===
          self.findIndex(
            (r) => r.amount === rate.amount && r.provider === rate.provider
          )
      );

      const sortedRates = uniqueRates.sort(
        (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
      );

      if (sortedRates.length > 1) {
        const secondCheapestRate = sortedRates[1];
        console.log(secondCheapestRate);
        return parseFloat(secondCheapestRate.amount);
      } else {
        console.log(sortedRates[0]);
        return parseFloat(sortedRates[0].amount);
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching shipping rate:", error);
    return null;
  }
}
