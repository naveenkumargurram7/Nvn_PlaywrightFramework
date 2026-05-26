/**
 * API Client Factory
 * Convenience class for creating and managing API instances
 * Useful for complex test scenarios with multiple API endpoints
 */

import { APIRequestContext } from '@playwright/test';
import { GetAPI } from './get.api';
import { PostAPI } from './post.api';

export class APIClientFactory {
  private getAPI: GetAPI;
  private postAPI: PostAPI;

  /**
   * Constructor
   * @param context - Playwright's APIRequestContext
   */
  constructor(context: APIRequestContext) {
    this.getAPI = new GetAPI(context);
    this.postAPI = new PostAPI(context);
  }

  /**
   * Get GET API instance
   * @returns GetAPI instance
   */
  getGetAPI(): GetAPI {
    return this.getAPI;
  }

  /**
   * Get POST API instance
   * @returns PostAPI instance
   */
  getPostAPI(): PostAPI {
    return this.postAPI;
  }

  /**
   * Execute a complete workflow: Create resource and validate it
   * @param endpoint - API endpoint
   * @param payload - Payload for POST request
   * @returns Created resource data
   */
  async createAndValidate(
    endpoint: string,
    payload: any
  ): Promise<any> {
    // Create resource
    const createResponse = await this.postAPI.post(endpoint, payload);
    
    if (createResponse.status !== 201) {
      throw new Error(`Failed to create resource. Status: ${createResponse.status}`);
    }

    const resourceId = createResponse.body.id;
    
    // Fetch and validate created resource
    const getResponse = await this.getAPI.getById(endpoint, resourceId);
    
    if (getResponse.status !== 200) {
      throw new Error(`Failed to fetch created resource. Status: ${getResponse.status}`);
    }

    return getResponse.body;
  }

  /**
   * Batch create multiple resources
   * @param endpoint - API endpoint
   * @param payloads - Array of payloads
   * @returns Array of created resources
   */
  async batchCreate(endpoint: string, payloads: any[]): Promise<any[]> {
    const results = [];

    for (const payload of payloads) {
      try {
        const response = await this.postAPI.post(endpoint, payload);
        if (response.status === 201) {
          results.push(response.body);
        }
      } catch (error) {
        console.error(`Failed to create resource:`, error);
      }
    }

    return results;
  }

  /**
   * Batch fetch multiple resources
   * @param endpoint - API endpoint
   * @param ids - Array of resource IDs
   * @returns Array of resources
   */
  async batchGet(endpoint: string, ids: (string | number)[]): Promise<any[]> {
    const results = [];

    for (const id of ids) {
      try {
        const response = await this.getAPI.getById(endpoint, id);
        if (response.status === 200) {
          results.push(response.body);
        }
      } catch (error) {
        console.error(`Failed to fetch resource with ID ${id}:`, error);
      }
    }

    return results;
  }
}

export default APIClientFactory;
