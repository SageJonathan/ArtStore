'use server'
import { displayArt} from '@/app/db/queries/art';

export async function paintingsData (){
    return await displayArt ();
}
