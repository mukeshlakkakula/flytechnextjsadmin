// src/appwriteConfig.js
import { Client, Account, Databases, Storage } from "appwrite"; // Ensure Storage is imported

// Initialize the Appwrite Client
const client = new Client();

// Log environment variables to ensure they're set correctly
console.log(
  "Appwrite URL:",
  process.env.NEXT_PUBLIC_APPWRITE_URL,
  "Project ID:",
  process.env.NEXT_PUBLIC_PROJECT_ID
);

// Configure the client
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL) // Your Appwrite endpoint (e.g., http://localhost/v1)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Your Appwrite project ID

// If you're using API Key for authentication, set the key
// Your Appwrite project ID

// Export the necessary objects for your app
export const account = new Account(client);
export const storage = new Storage(client); // For file storage
export const databases = new Databases(client); // For database operations
