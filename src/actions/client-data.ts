'use server'

import { createClient,updateClient,checkClient } from '@/app/db/queries/client';
import { newClientData,existingClientData,clientEmail } from '@/app/db/queries/client';


export async function verifyClientData (data:clientEmail){
    const doesExist = await checkClient(data);
    return doesExist;
}

export async function handleClientData(data: newClientData) {
    const newClient = await createClient(data);
    return newClient;
}

export async function updateClientData(data:existingClientData){
    const updatedClient = await updateClient(data);
    return updateClient;
}


