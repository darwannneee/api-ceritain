import { BlobServiceClient } from "@azure/storage-blob";

// Konfigurasi Blob Azure Service
const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=ceritainimage;AccountKey=CV/na++9tNjMIaYJJloWSu1wukIINImEBi6nJuxQMB2pruHivDchtR40MkIvB1o5t8ZSO757QraN+AStGvm5EQ==;EndpointSuffix=core.windows.net';
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerName = 'dokterimage';
const containerClient = blobServiceClient.getContainerClient(containerName);