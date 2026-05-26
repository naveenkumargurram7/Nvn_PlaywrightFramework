import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */
export const apiConfig = {
  // Base URLs for different environments
  baseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  
  // API version
  apiVersion: process.env.API_VERSION || 'v1',
  
  // Timeout settings (in milliseconds)
  timeout: parseInt(process.env.API_TIMEOUT || '30000'),
  
  // API Keys and Headers
  apiKey: process.env.API_KEY || '',
  bearerToken: process.env.BEARER_TOKEN || '',
  
  // Environment
  environment: process.env.ENVIRONMENT || 'staging',
  
  // Retry configuration
  retryCount: parseInt(process.env.RETRY_COUNT || '2'),
  retryDelay: parseInt(process.env.RETRY_DELAY || '1000'),
};

export default apiConfig;
