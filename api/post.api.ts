import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './base.api';

/**
 * POST API Class
 * Handles all POST request operations
 */
export class PostAPI extends BaseAPI {
  /**
   * Constructor
   * @param context - Playwright's APIRequestContext
   */
  constructor(context: APIRequestContext) {
    super(context);
  }

  /**
   * Perform a POST request
   * @param endpoint - API endpoint
   * @param payload - Request body/payload
   * @param headers - Additional headers (optional)
   * @returns Response object with status and body
   */
  async post(
    endpoint: string,
    payload: any,
    headers?: Record<string, string>
  ): Promise<{ status: number; body: any; headers: Record<string, string> }> {
    const url = this.getFullUrl(endpoint);
    const requestHeaders = headers ? { ...this.getHeaders(), ...headers } : this.getHeaders();

    this.logRequest('POST', url, payload);

    try {
      const response = await this.context.post(url, {
        headers: requestHeaders,
        data: payload,
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
      console.error(`POST request failed for ${url}:`, error);
      throw error;
    }
  }

  /**
   * Perform a POST request with retry logic
   * @param endpoint - API endpoint
   * @param payload - Request body/payload
   * @param headers - Additional headers (optional)
   * @returns Response object with status and body
   */
  async postWithRetry(
    endpoint: string,
    payload: any,
    headers?: Record<string, string>
  ): Promise<{ status: number; body: any; headers: Record<string, string> }> {
    return this.executeWithRetry(() => this.post(endpoint, payload, headers));
  }

  /**
   * Perform a POST request and return only the body
   * @param endpoint - API endpoint
   * @param payload - Request body/payload
   * @param headers - Additional headers (optional)
   * @returns Response body
   */
  async postBody(
    endpoint: string,
    payload: any,
    headers?: Record<string, string>
  ): Promise<any> {
    const response = await this.post(endpoint, payload, headers);
    return response.body;
  }

  /**
   * Perform a POST request and return only the status
   * @param endpoint - API endpoint
   * @param payload - Request body/payload
   * @param headers - Additional headers (optional)
   * @returns HTTP status code
   */
  async postStatus(
    endpoint: string,
    payload: any,
    headers?: Record<string, string>
  ): Promise<number> {
    const response = await this.post(endpoint, payload, headers);
    return response.status;
  }

  /**
   * Perform a POST request with form data
   * @param endpoint - API endpoint
   * @param formData - Form data object
   * @param headers - Additional headers (optional)
   * @returns Response object with status and body
   */
  async postFormData(
    endpoint: string,
    formData: Record<string, string>,
    headers?: Record<string, string>
  ): Promise<{ status: number; body: any; headers: Record<string, string> }> {
    const url = this.getFullUrl(endpoint);
    
    // Remove Content-Type header for form data (will be set automatically)
    const requestHeaders = headers ? { ...this.getHeaders(), ...headers } : { ...this.getHeaders() };
    delete requestHeaders['Content-Type'];

    this.logRequest('POST', url, formData);

    try {
      const response = await this.context.post(url, {
        headers: requestHeaders,
        form: formData,
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
      console.error(`POST form data request failed for ${url}:`, error);
      throw error;
    }
  }

  /**
   * Perform a POST request with multipart data
   * @param endpoint - API endpoint
   * @param multipartData - Multipart data object
   * @param headers - Additional headers (optional)
   * @returns Response object with status and body
   */
  async postMultipart(
    endpoint: string,
    multipartData: Record<string, string | Buffer>,
    headers?: Record<string, string>
  ): Promise<{ status: number; body: any; headers: Record<string, string> }> {
    const url = this.getFullUrl(endpoint);
    
    // Remove Content-Type header for multipart (will be set automatically)
    const requestHeaders = headers ? { ...this.getHeaders(), ...headers } : { ...this.getHeaders() };
    delete requestHeaders['Content-Type'];

    this.logRequest('POST', url, 'multipart data');

    try {
      const response = await this.context.post(url, {
        headers: requestHeaders,
        multipart: multipartData,
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
      console.error(`POST multipart request failed for ${url}:`, error);
      throw error;
    }
  }
}

export default PostAPI;
