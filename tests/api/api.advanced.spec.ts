import { test, expect } from '@playwright/test';
import { APIClientFactory } from '../api/client.factory';
import { GetAPI } from '../api/get.api';
import { PostAPI } from '../api/post.api';
import { APIValidator } from '../api/validators';
import payloads from '../test-data/payloads.json';

/**
 * Advanced API Testing Examples
 * Demonstrates complex scenarios and workflow patterns
 * Using JSONPlaceholder API
 */

test.describe('Advanced API Scenarios - API Client Factory', () => {
  test('Complete workflow: Create and verify resource', async ({ request }) => {
    const factory = new APIClientFactory(request);
    
    // Create post and automatically verify it was created
    const createdPost = await factory.createAndValidate('/posts', payloads.post.createPost);
    
    expect(createdPost.title).toBe(payloads.post.createPost.title);
    expect(createdPost.id).toBeTruthy();
    console.log(`✓ Post created and verified with ID: ${createdPost.id}`);
  });

  test('Batch create multiple resources', async ({ request }) => {
    const factory = new APIClientFactory(request);
    
    // Create multiple users at once
    const createdUsers = await factory.batchCreate(
      '/users',
      payloads.user.createMultipleUsers
    );
    
    expect(createdUsers.length).toBe(payloads.user.createMultipleUsers.length);
    createdUsers.forEach((user, index) => {
      expect(user.name).toBe(payloads.user.createMultipleUsers[index].name);
    });
    console.log(`✓ Successfully created ${createdUsers.length} users`);
  });

  test('Batch fetch multiple resources', async ({ request }) => {
    const factory = new APIClientFactory(request);
    
    // Fetch multiple posts by ID
    const posts = await factory.batchGet('/posts', [1, 2, 3, 4, 5]);
    
    expect(posts.length).toBe(5);
    posts.forEach((post, index) => {
      expect(post.id).toBe(index + 1);
    });
    console.log(`✓ Successfully fetched ${posts.length} posts`);
  });
});

test.describe('Advanced API Scenarios - Complex Workflows', () => {
  let getAPI: GetAPI;
  let postAPI: PostAPI;

  test.beforeEach(async ({ request }) => {
    getAPI = new GetAPI(request);
    postAPI = new PostAPI(request);
  });

  test('Create post, add comment, verify relationship', async () => {
    // Step 1: Create a post
    const postResponse = await postAPI.post('/posts', payloads.post.createPost);
    APIValidator.validateStatusCode(postResponse.status, 201);
    const postId = postResponse.body.id;
    console.log(`✓ Created post with ID: ${postId}`);

    // Step 2: Add a comment to the post
    const commentPayload = { ...payloads.post.createComment, postId };
    const commentResponse = await postAPI.post('/comments', commentPayload);
    APIValidator.validateStatusCode(commentResponse.status, 201);
    const commentId = commentResponse.body.id;
    console.log(`✓ Created comment with ID: ${commentId}`);

    // Step 3: Verify the comment is associated with the post
    const fetchedComment = await getAPI.getById('/comments', commentId);
    APIValidator.validateResponseBodyFieldValue(fetchedComment.body, 'postId', postId);
    expect(fetchedComment.body.postId).toBe(postId);
    console.log(`✓ Verified comment is associated with post ${postId}`);
  });

  test('Fetch paginated data and process', async () => {
    // Fetch posts with pagination parameters
    const response = await getAPI.getWithParams('/posts', {
      _page: 1,
      _limit: 10,
    });

    APIValidator.validateStatusCode(response.status, 200);
    APIValidator.validateArrayResponse(response.body, 1);

    // Process results
    const postIds = response.body.map((post: any) => post.id);
    expect(postIds.length).toBeLessThanOrEqual(10);
    console.log(`✓ Fetched paginated data: ${postIds.length} posts on page 1`);
  });

  test('Chain dependent requests', async () => {
    // Get first post
    const postsResponse = await getAPI.get('/posts');
    APIValidator.validateArrayResponse(postsResponse.body, 1);
    const firstPost = postsResponse.body[0];

    // Get comments for that post
    const commentsResponse = await getAPI.getWithParams('/comments', {
      postId: firstPost.id,
    });

    APIValidator.validateStatusCode(commentsResponse.status, 200);
    expect(commentsResponse.body.length).toBeGreaterThan(0);

    // Get first commenter
    const firstComment = commentsResponse.body[0];
    const commenterResponse = await getAPI.getById('/users', firstComment.email.split('@')[0]);

    expect(commenterResponse.status).toBe(200);
    console.log(`✓ Successfully chained requests through post → comments → user`);
  });

  test('Parallel request execution', async () => {
    // Execute multiple requests in parallel
    const startTime = Date.now();

    const [posts, users, comments] = await Promise.all([
      getAPI.getBody('/posts'),
      getAPI.getBody('/users'),
      getAPI.getBody('/comments'),
    ]);

    const responseTime = Date.now() - startTime;

    expect(Array.isArray(posts)).toBeTruthy();
    expect(Array.isArray(users)).toBeTruthy();
    expect(Array.isArray(comments)).toBeTruthy();

    console.log(`✓ Fetched 3 endpoints in parallel in ${responseTime}ms`);
  });

  test('Search and filter data from response', async () => {
    // Fetch all users
    const usersResponse = await getAPI.getBody('/users');

    // Filter users
    const userWithId3 = usersResponse.find((user: any) => user.id === 3);
    expect(userWithId3).toBeTruthy();
    expect(userWithId3.id).toBe(3);

    // Get posts for this user
    const postsResponse = await getAPI.getWithParams('/posts', {
      userId: userWithId3.id,
    });

    APIValidator.validateArrayResponse(postsResponse.body, 1);
    expect(postsResponse.body.every((post: any) => post.userId === 3)).toBeTruthy();
    console.log(`✓ Successfully searched and filtered data`);
  });

  test('Data transformation and assertion', async () => {
    const response = await getAPI.getBody('/posts');

    // Transform data
    const postsByUser = response.reduce((acc: any, post: any) => {
      if (!acc[post.userId]) acc[post.userId] = [];
      acc[post.userId].push(post);
      return acc;
    }, {});

    // Assertions
    Object.values(postsByUser).forEach((userPosts: any) => {
      expect(Array.isArray(userPosts)).toBeTruthy();
      expect(userPosts.length).toBeGreaterThan(0);
    });

    console.log(`✓ Transformed and grouped ${response.length} posts by user`);
  });
});

test.describe('Advanced API Scenarios - Error Handling & Resilience', () => {
  let getAPI: GetAPI;

  test.beforeEach(async ({ request }) => {
    getAPI = new GetAPI(request);
  });

  test('Graceful error handling for non-existent resources', async () => {
    try {
      // Try to fetch non-existent post (JSONPlaceholder returns empty, but demonstrating pattern)
      const response = await getAPI.get('/posts/999999');
      
      if (response.status === 200 && Object.keys(response.body).length === 0) {
        console.log('✓ Handled non-existent resource gracefully');
      }
    } catch (error: any) {
      console.log(`✓ Error caught: ${error.message}`);
    }
  });

  test('Request with automatic retry on failure', async () => {
    // This will retry up to RETRY_COUNT times if it fails
    const response = await getAPI.getWithRetry('/posts/1');

    APIValidator.validateStatusCode(response.status, 200);
    expect(response.body.id).toBe(1);
    console.log('✓ Request succeeded (with retry mechanism in place)');
  });

  test('Validate multiple conditions with detailed logging', async () => {
    const response = await getAPI.get('/posts/1');

    try {
      APIValidator.validateStatusCode(response.status, 200);
      APIValidator.validateResponseBodyNotEmpty(response.body);
      APIValidator.validateResponseBodyHasKeys(response.body, ['id', 'title', 'body', 'userId']);
      APIValidator.validateResponseBodyFieldValue(response.body, 'id', 1);

      console.log('✓ All validations passed');
    } catch (error: any) {
      console.error(`✗ Validation failed: ${error.message}`);
      throw error;
    }
  });
});

test.describe('Advanced API Scenarios - Performance Testing', () => {
  let getAPI: GetAPI;

  test.beforeEach(async ({ request }) => {
    getAPI = new GetAPI(request);
  });

  test('Measure and validate response times', async () => {
    const iterations = 5;
    const responseTimes: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = Date.now();
      await getAPI.get(`/posts/${i + 1}`);
      const responseTime = Date.now() - startTime;
      responseTimes.push(responseTime);
    }

    const avgTime = responseTimes.reduce((a, b) => a + b) / iterations;
    const maxTime = Math.max(...responseTimes);
    const minTime = Math.min(...responseTimes);

    console.log(`Performance Stats: Min=${minTime}ms, Max=${maxTime}ms, Avg=${avgTime.toFixed(2)}ms`);

    // Validate all responses were fast
    expect(maxTime).toBeLessThan(2000);
    console.log('✓ Response time performance validated');
  });

  test('Load test with multiple concurrent requests', async () => {
    const concurrentRequests = 10;
    const startTime = Date.now();

    // Create array of promises
    const requests = Array.from({ length: concurrentRequests }, (_, i) =>
      getAPI.get(`/posts/${i + 1}`)
    );

    // Execute all in parallel
    const responses = await Promise.all(requests);
    const totalTime = Date.now() - startTime;

    // Validate results
    expect(responses.length).toBe(concurrentRequests);
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });

    const avgTimePerRequest = totalTime / concurrentRequests;
    console.log(
      `✓ Load test completed: ${concurrentRequests} concurrent requests in ${totalTime}ms (${avgTimePerRequest.toFixed(2)}ms per request)`
    );
  });
});

test.describe('Advanced API Scenarios - Data Integrity', () => {
  let getAPI: GetAPI;
  let postAPI: PostAPI;

  test.beforeEach(async ({ request }) => {
    getAPI = new GetAPI(request);
    postAPI = new PostAPI(request);
  });

  test('Verify data consistency across multiple fetches', async () => {
    const postId = 1;

    // Fetch the same resource multiple times
    const [fetch1, fetch2, fetch3] = await Promise.all([
      getAPI.getById('/posts', postId),
      getAPI.getById('/posts', postId),
      getAPI.getById('/posts', postId),
    ]);

    // All should be identical
    expect(fetch1.body).toEqual(fetch2.body);
    expect(fetch2.body).toEqual(fetch3.body);

    console.log(`✓ Data consistency verified across 3 fetches of post ${postId}`);
  });

  test('Validate response payload structure matches schema', async () => {
    const response = await getAPI.get('/users/1');

    const userSchema = {
      id: 'number',
      name: 'string',
      email: 'string',
      username: 'string',
      phone: 'string',
      website: 'string',
    };

    APIValidator.validateJSONSchema(response.body, userSchema);
    console.log('✓ Response payload matches expected schema');
  });

  test('Validate array items have consistent structure', async () => {
    const response = await getAPI.getBody('/posts');

    const postSchema = {
      userId: 'number',
      id: 'number',
      title: 'string',
      body: 'string',
    };

    // Validate first 5 items
    response.slice(0, 5).forEach((post: any) => {
      APIValidator.validateJSONSchema(post, postSchema);
    });

    console.log(`✓ Validated structure of posts in array`);
  });
});
