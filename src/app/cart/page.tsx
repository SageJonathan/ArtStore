// This is checkout
//  Do we make a cart? Do we need one?

//logic below from components/actions
//  Get painting id && Display ---> Get through browser
// Get Tax through API && Display
// Get shipping through API && Display

import Image from "next/image";
import PaypalIcon from "@/app/assets/icons/paypal.png";
import StripeIcon from "@/app/assets/icons/stripe.png";

export default function CartPage() {
  // Toggle img for middle
  return (
    //Checkout-container
    <div className="flex flex-col m-10">
      <div className="md:flex md:flex-row">

        {/* Left Side: Two smaller images in a column */}
        <div className="relative flex flex-row w-full md:w-1/2 lg:w-3/4 justify-center">
          <div className="absolute top-0 left-0">
            <div className="">
              <Image src="/art1.png" alt="front side" 
              width={45} height={45}/>
            </div>
            <div className="pt-5">
              <Image src="/artback1.png" alt="back side" 
               width={45} height={45}/>
            </div>
          </div>
          {/* Middle: Large image */}
          {/* Result of toggle- front is default */}
          <div className="ml-12 lg:ml-0 ">
            <Image src="/art1.png" alt="Main Img" 
             width={350} height={350}/>
          </div>
        </div>

        {/* Right Side: Image details, tax, shipping, and payment */}
        {/* Dynamic data. need to drill in paintings && 2 seprate api calls && add total */}
        <div className="flex flex-col border w-full md:w-1/2 lg:w-1/4 p-5">
          <div className="">
            <div className="">
              <h1>Title: {}</h1>
              <p>Size: {}</p>
              <p>Price: {}CAD</p>
            </div>
            {/* Use this data for api call for above */}
            <div className="">
              <form action="submit">
                <label htmlFor="">Enter Shipping Adress:</label>
                <input
                  id="shipping-address"
                  type="text"
                  name="shippingAddress"
                //   Place holder must match API requirments
                  placeholder="123 Main St, City, Country"
                  className="p-2 border rounded-md flex flex-col"
                  required
                ></input>
              </form>
            </div>
            <div className="">
              <h1>Estimated Cost:</h1>
              <p>Tax: {}CAD</p>
              <p>Shipping Cost: {}CAD</p>
              <p>Total Cost: {}CAD</p>
            </div>
          </div>
          {/* We need to get some info from payment processing to get cleint info */}
          <div className="">
            {/* <h1>Payment</h1> */}
            <form action="submit" className="flex flex-row gap-4">
              <button
                className="flex flex-row items-center justify-center bg-blue-200 border rounded-md px-2 text-lg"
                id="stripe-payment"
              >
                Pay with
                <Image
                  src={PaypalIcon}
                  alt="PaypalIcon"
                  width={80}
                  height={80}
                  className="pl-2"
                />
              </button>
              <button
                className="flex flex-row items-center justify-center bg-purple-200 border rounded-md px-2 text-lg"
                id="paypal-payment"
              >
                Pay with
                <Image
                  src={StripeIcon}
                  alt="Stripe Icon"
                  width={60}
                  height={60}
                  className="pl-2"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Description below */}
      <div className="">
        <p>
          This is the description of the product, providing details and any
          other relevant information about the item being purchased. **
          Certificate of authenticity ** All sies include frames ** All shipping
          is through FedEx ** Canada/USA shipping
        </p>
      </div>
    </div>
  );
}
