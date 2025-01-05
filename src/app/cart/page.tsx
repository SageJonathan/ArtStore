
// This is checkout
//  Do we make a cart? Do we need one?

export default function CartPage () {
//  Get painting id && Display 
// Get Tax through API && Display
// Get shipping through API && Display

// Toggle img for middle
return (
//Checkout-container
    <div className="">
    {/* Left Side: Two smaller images in a column */}
    {/* Make these toggle to middle img */}
    <div className="">
        <div className="">
            <img src="small-image-1.jpg" alt="front side" />
        </div>
        <div className="">
            <img src="small-image-2.jpg" alt="back side" />
        </div>
    </div>
    
    {/* Middle: Large image */}
    {/* Result of toggle- front is default */}
    <div className="">
        <img src="" alt="" />
    </div>
    
    {/* Right Side: Image details, tax, shipping, and payment */}
    {/* Dynamic data. need to drill in paintings && 2 seprate api calls && add total */}
    <div className="">
        <div className="">
            <p>Image Name: Example Image</p>
            <p>Size: 1024 x 768</p>
        </div>
        <div className="">
            <p>Tax: $10.00</p>
            <p>Shipping Cost: $5.00</p>
            <p>Total Cost: $115.00</p>
        </div>
        {/* Use this data for api call for above */}
        <div className="">
            <form action="">
                <label htmlFor="">Add Adress</label>
            </form>
        </div>
        {/* We need to get some info from payment processing to get cleint info */}
        <div className="">
            <button id="stripe-payment">Pay with Stripe</button>
            <button id="paypal-payment">Pay with PayPal</button>
        </div>
    </div>
    
    {/* Description below */}
    <div className="">
        <p>This is the description of the product, providing details and any other relevant information about the item being purchased.</p>
    </div>
</div>
);
};