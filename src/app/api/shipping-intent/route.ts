// Code for POST to get shipping label & tracking number

import { Shippo } from "shippo";


// Call Shippo API for tracking and label

// On success, Call server actions to email label & tracking 


const shippo = new Shippo({apiKeyHeader: 'shippo_test_6d7446e7282b2ac58ead2627d96cf218c5c75036'});
const addressFrom = await shippo.addresses.create({
    name: "Shawn Ippotle",
    company: "Shippo",
    street1: "215 Clayton St.",
    city: "San Francisco",
    state: "CA",
    zip: "94117",
    country: "US", // iso2 country code
    phone: "+1 555 341 9393",
    email: "shippotle@shippo.com",
});
