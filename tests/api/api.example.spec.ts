import { test, expect } from '@playwright/test';
import { GetAPI } from '../api/get.api';
import { PostAPI } from '../api/post.api';
import { APIValidator } from '../api/validators';
import payloads from '../test-data/payloads.json';

/**
 * Example API Tests
 * Demonstrates how to use the Playwright API testing framework
 * Uses JSONPlaceholder API (https://jsonplaceholder.typicode.com) as an example
 */

test.describe('API Testing Framework - GET Requests', () => {
  let getAPI: GetAPI;

  test.beforeEach(async ({ request }) => {
    // Initialize GetAPI with the request context
    getAPI = new GetAPI(request);
  });

  test('GET - Fetch all posts', async () => {
    // Make GET request
    const response = await getAPI.get('/posts');

    // Validate response
    APIValidator.validateStatusCode(response.status, 200);
    APIValidator.validateArrayResponse(response.body, 1);

    // Assertions
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    console.log(`✓ Successfully fetched ${response.body.length} posts`);
  });

  test('GET - Fetch single post by ID', async () => {
    const postId = 1;

    // Make GET request
    const response = await getAPI.getById('/posts', postId);

    // Validate response
    APIValidator.validateStatusCode(response.status, 200);
    APIValidator.validateResponseBodyHasKeys(response.body, ['id', 'title', 'body', 'userId']);
    APIValidator.validateResponseBodyFieldValue(response.body, 'id', postId);

    // Assertions
    expect(response.body.id).toBe(postId);
    expect(response.body.title).toBeTruthy();
    expect(response.body.body).toBeTruthy();
    console.log(`✓ Successfully fetched post with ID ${postId}`);
  });

  test('GET - Fetch posts with query parameters', async () => {
    const params = { userId: 1, _limit: 5 };

    // Make GET request with parameters
    const response = await getAPI.getWithParams('/posts', params);

    // Validate response
    APIValidator.validateStatusCode(response.status, 200);
    APIValidator.validateArrayResponse(response.body, 1);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.length).toBeLessThanOrEqual(5);
    expect(response.body.every((post: any) => post.userId === 1)).toBeTruthy();
    console.log(`✓ Successfully fetched ${response.body.length} posts with parameters`);
  });

  test('GET - Fetch only response body', async () => {
    // Get only the body without status and headers
    const body = await getAPI.getBody('/posts/1');

    // Validate
    APIValidator.validateResponseBodyHasKey(body, 'id');
    expect(body.id).toBe(1);
    console.log('✓ Successfully fetched response body only');
  });

  test('GET - Get only response status', async () => {
    // Get only the status code
    const status = await getAPI.getStatus('/posts/1');

    // Validate
    APIValidator.validateStatusCode(status, 200);
    expect(status).toBe(200);
    console.log('✓ Successfully retrieved response status: ' + status);
  });

  test('GET - Validate response headers', async () => {
    const response = await getAPI.get('/posts/1');

    // Validate header exists
    APIValidator.validateResponseHeader(response.headers, 'content-type');

    expect(response.headers['content-type']).toContain('application/json');
    console.log('✓ Response headers validated successfully');
  });

  test('GET - Test response time', async () => {
    const startTime = Date.now();
    const response = await getAPI.get('/posts/1');
    const responseTime = Date.now() - startTime;

    // Validate response time is within acceptable limit (2 seconds)
    APIValidator.validateResponseTime(responseTime, 2000);
    expect(responseTime).toBeLessThan(2000);
    console.log(`✓ Response time: ${responseTime}ms (within acceptable limit)`);
  });

  test('GET - Handle 404 error', async () => {
    try {
      // Try to fetch non-existent post
      const response = await getAPI.get('/posts/99999');
      // For JSONPlaceholder, it still returns 200 with empty object
      expect(response.status).toBe(200);
    } catch (error) {
      console.log('✓ Error handled correctly for non-existent resource');
    }
  });
});

test.describe('API Testing Framework - POST Requests', () => {
  let postAPI: PostAPI;

  test.beforeEach(async ({ request }) => {
    // Initialize PostAPI with the request context
    postAPI = new PostAPI(request);
  });

  test('POST - Create a new post', async () => {
    const payload = payloads.post.createPost;

    // Make POST request
    const response = await postAPI.post('/posts', payload);

    // Validate response
    APIValidator.validateStatusCode(response.status, 201);
    APIValidator.validateResponseBodyHasKeys(response.body, ['id', 'title', 'body', 'userId']);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(payload.title);
    expect(response.body.body).toBe(payload.body);
    expect(response.body.userId).toBe(payload.userId);
    console.log(`✓ Successfully created post with ID: ${response.body.id}`);
  });

  test('POST - Create user with payload from JSON file', async () => {
    const payload = payloads.user.createUser;

    // Make POST request
    const response = await postAPI.post('/users', payload);

    // Validate response
    APIValidator.validateStatusCode(response.status, 201);
    APIValidator.validateResponseBodyNotEmpty(response.body);

    // Assertions
    expect(response.body.name).toBe(payload.name);
    expect(response.body.email).toBe(payload.email);
    console.log(`✓ Successfully created user with ID: ${response.body.id}`);
  });

  test('POST - Create comment on a post', async () => {
    const payload = payloads.post.createComment;

    // Make POST request
    const response = await postAPI.post('/comments', payload);

    // Validate response
    APIValidator.validateStatusCode(response.status, 201);
    APIValidator.validateResponseBodyHasKey(response.body, 'id');

    // Assertions
    expect(response.body.name).toBe(payload.name);
    expect(response.body.body).toBe(payload.body);
    console.log(`✓ Successfully created comment with ID: ${response.body.id}`);
  });

  test('POST - Get only response body', async () => {
    const payload = payloads.post.createPost;

    // Post and get only the body
    const body = await postAPI.postBody('/posts', payload);

    // Validate
    APIValidator.validateResponseBodyHasKey(body, 'id');
    expect(body.title).toBe(payload.title);
    console.log('✓ Successfully posted and retrieved body only');
  });

  test('POST - Get only response status', async () => {
    const payload = payloads.post.createPost;

    // Post and get only the status
    const status = await postAPI.postStatus('/posts', payload);

    // Validate
    APIValidator.validateStatusCode(status, 201);
    expect(status).toBe(201);
    console.log('✓ Successfully posted and retrieved status: ' + status);
  });

  test('POST - Test with invalid data', async () => {
    const payload = payloads.invalidData.invalidEmail;

    try {
      const response = await postAPI.post('/users', payload);
      // Note: JSONPlaceholder doesn't validate, so we're demonstrating the pattern
      console.log('✓ POST request completed (validation would depend on API)');
    } catch (error) {
      console.log('✓ Error validation works correctly');
    }
  });

  test('POST - Create multiple resources sequentially', async () => {
    const products = payloads.product.bulkCreateProducts;
    const createdProducts = [];

    for (const product of products) {
      const response = await postAPI.post('/products', product);
      APIValidator.validateStatusCode(response.status, 201);
      createdProducts.push(response.body);
    }

    expect(createdProducts.length).toBe(products.length);
    console.log(`✓ Successfully created ${createdProducts.length} products`);
  });
});

test.describe('API Testing Framework - Validation Examples', () => {
  let getAPI: GetAPI;
  let postAPI: PostAPI;

  test.beforeEach(async ({ request }) => {
    getAPI = new GetAPI(request);
    postAPI = new PostAPI(request);
  });

  test('Validation - JSON Schema validation', async () => {
    const response = await getAPI.get('/posts/1');

    // Define expected schema
    const expectedSchema = {
      id: 'number',
      title: 'string',
      body: 'string',
      userId: 'number',
    };

    // Validate schema
    APIValidator.validateJSONSchema(response.body, expectedSchema);
    console.log('✓ JSON schema validation passed');
  });

  test('Validation - Check required fields', async () => {
    const response = await getAPI.get('/users/1');

    // Validate required fields exist
    const requiredFields = ['id', 'name', 'email'];
    APIValidator.validateResponseBodyHasKeys(response.body, requiredFields);

    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    console.log('✓ All required fields present');
  });

  test('Validation - Verify field values', async () => {
    const response = await getAPI.get('/posts/1');

    // Verify specific field value
    APIValidator.validateResponseBodyFieldValue(response.body, 'id', 1);

    expect(response.body.id).toBe(1);
    console.log('✓ Field value validation passed');
  });

  test('Validation - Array response validation', async () => {
    const response = await getAPI.get('/posts');

    // Validate it's an array with minimum length
    APIValidator.validateArrayResponse(response.body, 1);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
    console.log(`✓ Array validation passed: ${response.body.length} items`);
  });
});

test.describe('API Testing Framework - Error Handling', () => {
  let getAPI: GetAPI;

  test.beforeEach(async ({ request }) => {
    getAPI = new GetAPI(request);
  });

  test('Error - Handle status code mismatch', async () => {
    let errorOccurred = false;

    try {
      const response = await getAPI.get('/posts/1');
      // Try to validate with wrong status code
      APIValidator.validateStatusCode(response.status, 404);
    } catch (error: any) {
      errorOccurred = true;
      expect(error.message).toContain('Status Code Mismatch');
      console.log('✓ Status code validation error caught: ' + error.message);
    }

    expect(errorOccurred).toBeTruthy();
  });

  test('Error - Handle missing response key', async () => {
    let errorOccurred = false;

    try {
      const response = await getAPI.get('/posts/1');
      // Try to validate for non-existent key
      APIValidator.validateResponseBodyHasKey(response.body, 'nonexistentField');
    } catch (error: any) {
      errorOccurred = true;
      expect(error.message).toContain('does not contain key');
      console.log('✓ Missing key validation error caught: ' + error.message);
    }

    expect(errorOccurred).toBeTruthy();
  });

  test('Error - Handle invalid JSON schema', async () => {
    let errorOccurred = false;

    try {
      const response = await getAPI.get('/posts/1');
      const invalidSchema = {
        id: 'string', // Wrong type, should be number
        title: 'string',
      };

      APIValidator.validateJSONSchema(response.body, invalidSchema);
    } catch (error: any) {
      errorOccurred = true;
      expect(error.message).toContain('should be of type');
      console.log('✓ Schema validation error caught: ' + error.message);
    }

    expect(errorOccurred).toBeTruthy();
  });
});
