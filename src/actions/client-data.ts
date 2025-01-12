
'use server'
import { createClient } from '@/app/db/queries/client';
import { newClientData } from '@/app/db/queries/client';

export async function handleClientData(data: newClientData) {
    const updatedClient = await createClient(data);
    return updatedClient;
}
