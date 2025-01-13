'use server'

import {Shippo,AddressCreateRequest, ParcelCreateRequest, WeightUnitEnum, DistanceUnitEnum,ServiceLevelUPSEnum,LabelFileTypeEnum} from 'shippo'; 


// On success, Call server actions to email label & tracking 

const apiKeyHeader = process.env.SHIPPO_API_TOKEN;
const shippo = new Shippo({apiKeyHeader});

export async function createLabel() {
    const addressFrom: AddressCreateRequest = {
        name: "Louise Guay",
        company: "Louise Guay",
        street1: "123 Sample St", // Add valid address
        city: "Coaticook",
        state: "QC",
        zip: "J1A 1R4",
        country: "CA",
        phone: "+ 888 888 8888", // Add ? number
        email: "shippotle@shippo.com", // Add ? number
    };


    // Add Dynamic Data
    const addressTo: AddressCreateRequest = {
        name: "Mr Hippo",
        company: "",
        street1: "618 2Ave NW",
        street2: "205",
        city: "Calgary",
        state: "AB",
        zip: "T2N0E1",
        country: "CA",
        phone: "+1 555 341 9393",
        email: "mrhippo@shippo.com",
        metadata: "Hippos don't lie",
    };

    const parcel: ParcelCreateRequest = {
        length: "5",
        width: "5",
        height: "5",
        distanceUnit: DistanceUnitEnum.In,
        weight: "2",
        massUnit: WeightUnitEnum.Lb
    };

    const shipment = await shippo.shipments.create({
        addressFrom: addressFrom,
        addressTo: addressTo,
        parcels: [parcel],
        async: false
    });

            // Added logic to reduce multiples created by shippo
    if (shipment.rates && shipment.rates.length > 0) {
        const uniqueRates = shipment.rates.filter((rate, index, self) =>
            index === self.findIndex((r) => (
                r.amount === rate.amount && r.provider === rate.provider
            ))
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
        });
    

        // Refractor conosole to extracing data. Then pass data to 2 server calls (Email client & Email Jess & Me)
        console.log(`Tracking URL: ${transaction.trackingUrlProvider}`);
        console.log(`Tracking Number: ${transaction.trackingNumber}`);
        console.log(`Label URL: ${transaction.labelUrl}`);
    } else {
        console.error('No rates available for this shipment.');
    }
}
createLabel()

