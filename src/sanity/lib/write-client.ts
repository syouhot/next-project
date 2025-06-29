import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    token,
})
console.log("writeClient", writeClient.config());

if (!writeClient.config().token) {
    throw new Error("write token not found")
}
