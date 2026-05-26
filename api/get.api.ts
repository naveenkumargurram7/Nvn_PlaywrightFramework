import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './base.api';

/**
 * GET API Class
 * Handles all GET request operations
 */
export class GetAPI extends BaseAPI {
  /**
   * Constructor
   * @param context - Playwright's APIRequestContext
   */
  constructor(context: APIRequestContext) {
    super(context);
  }

  /**
   * Perform a GET request
   * @param endpoint - API endpoint
   * @param headers - Additional headers (optional)
   * @returns Response object with status and body
   */
  async get(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<{ status: number; body: any; headers: Record<string, string> }> {
    const url = this.getFullUrl(endpoint);
    const requestHeaders = headers ? { ...this.getHeaders(), ...headers } : this.getHeaders();

    this.logRequest('GET', url);

    try {
      const response = await this.context.get(url, {
        headers: requestHeaders,
        timeout: this.timeout,
      });

      const status = response.status();
      const body = await response.json().catch(() => null);
      const responseHeaders = response.headers();

      this.logResponse(status, body);

      return {
        status,
        body,
        headers: responseHeaders,
      };
    } catch (error) {
      console.error(`GET request failed for ${url}:`, error);
      throw error;
    }
  }

  /**
   * Perform a GET request with query parameters
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @param headers - Additional headers (optional)
   * @returns Response object with status and body
   */
  async getWithParams(
    endpoint: string,
    params: Record<string, string | number | boolean>,
    headers?: Record<string, string>
  ): Promise<{ status: number; body: any; headers: Record<string, string> }> {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryString.append(key, String(value));
    });

    const url = `${endpoint}?${queryString.toString()}`;
    return this.get(url, headers);
  }

  /**
   * Perform a GET request with retry logic
   * @param endpoint - API endpoint
   * @param headers - Additional headers (optional)
   * @returns Response object with status and body
   */
  async getWithRetry(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<{ status: number; body: any; headers: Record<string, string> }> {
    return this.executeWithRetry(() => this.get(endpoint, headers));
  }

  /**
   * Perform a GET request and return only the body
   * @param endpoint - API endpoint
   * @param headers - Additional headers (optional)
   * @returns Response body
   */
  async getBody(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<any> {
    const response = await this.get(endpoint, headers);
    return response.body;
  }

  /**
   * Perform a GET request and return only the status
   * @param endpoint - API endpoint
   * @param headers - Additional headers (optional)
   * @returns HTTP status code
   */
  async getStatus(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<number> {
    const response = await this.get(endpoint, headers);
    return response.status;
  }

  /**
   * Get single resource by ID
   * @param endpoint - Base endpoint
   * @param id - Resource ID
   * @param headers - Additional headers (optional)
   * @returns Response object with status and body
   */
  async getById(
    endpoint: string,
    id: string | number,
    headers?: Record<string, string>
  ): Promise<{ status: number; body: any; headers: Record<string, string> }> {
    const url = `${endpoint}/${id}`;
    return this.get(url, headers);
  }
}

export default GetAPI;
