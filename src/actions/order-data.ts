'use server'

import { storeNewShippingData,shippingDetails} from "@/app/db/queries/orders"

export async function storeShippingDetails(data:shippingDetails) {
    const storeShippingdata = await storeNewShippingData(data)
    return storeShippingdata
}

// export async function getClientDataFromOrder(orderData: orderData): Promise<{ name: string, email: string } | null> {
//     return await getClientFromOrder(orderData);
// }

