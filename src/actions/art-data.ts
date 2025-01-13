'use server'

import { displayArt, updateInventory} from '@/app/db/queries/art';
import { ArtSold } from '@/app/db/queries/art';

export async function paintingsData (){
    return await displayArt ();
}

export async function paintingsUpdate(data:ArtSold) {
    return await updateInventory(data);
}

// export async function getPaintingShippingData(){

// }