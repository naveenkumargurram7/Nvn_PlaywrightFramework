import { APIRequestContext } from '@playwright/test';
import apiConfig from '../config/apiConfig';

/**
 * Base API Class
 * Provides core functionality for API requests with APIRequestContext
 */
export class BaseAPI {
  protected context: APIRequestContext;
  protected baseUrl: string;
  protected timeout: number;
  protected headers: Record<string, string>;

  /**
   * Constructor
   * @param context - Playwright's APIRequestContext
   */
  constructor(context: APIRequestContext) {
    this.context = context;
    this.baseUrl = apiConfig.baseUrl;
    this.timeout = apiConfig.timeout;
    this.headers = this.initializeHeaders();
  }

  /**
   * Initialize default headers
   * @returns Headers object
   */
  private initializeHeaders(): Record<string, string> {
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // Add Authorization header if token is available
    if (apiConfig.bearerToken) {
      defaultHeaders['Authorization'] = `Bearer ${apiConfig.bearerToken}`;
    }

    // Add API Key if available
    if (apiConfig.apiKey) {
      defaultHeaders['X-API-Key'] = apiConfig.apiKey;
    }

    return defaultHeaders;
  }

  /**
   * Get the full URL
   * @param endpoint - API endpoint
   * @returns Full URL
   */
  protected getFullUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${cleanEndpoint}`;
  }

  /**
   * Set additional headers
   * @param headers - Additional headers to merge
   */
  protected setHeaders(headers: Record<string, string>): void {
    this.headers = { ...this.headers, ...headers };
  }

  /**
   * Get headers
   * @returns Current headers
   */
  protected getHeaders(): Record<string, string> {
    return this.headers;
  }

  /**
   * Handle request with retry logic
   * @param requestFn - Request function to execute
   * @param retryCount - Number of retries
   * @returns Response
   */
  protected async executeWithRetry<T>(
    requestFn: () => Promise<T>,
    retryCount: number = apiConfig.retryCount
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;
        if (attempt < retryCount) {
          console.log(
            `Request failed (attempt ${attempt + 1}/${retryCount}), retrying in ${apiConfig.retryDelay}ms...`
          );
          await this.delay(apiConfig.retryDelay);
        }
      }
    }

    throw lastError;
  }

  /**
   * Delay execution
   * @param ms - Milliseconds to delay
   */
  protected delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Log API request
   * @param method - HTTP method
   * @param url - Request URL
   * @param body - Request body (optional)
   */
  protected logRequest(
    method: string,
    url: string,
    body?: any
  ): void {
    console.log(`\n[${method}] ${url}`);
    if (body) {
      console.log('Body:', JSON.stringify(body, null, 2));
    }
  }

  /**
   * Log API response
   * @param status - HTTP status code
   * @param body - Response body
   */
  protected logResponse(status: number, body: any): void {
    console.log(`Response Status: ${status}`);
    console.log('Response Body:', JSON.stringify(body, null, 2));
  }
}

export default BaseAPI;
