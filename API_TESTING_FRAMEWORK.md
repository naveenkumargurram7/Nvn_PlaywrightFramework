# API Testing Framework Documentation

## Overview
This is a comprehensive Playwright API testing framework in TypeScript that provides a clean, maintainable, and reusable structure for API testing with support for GET, POST requests, validation, and configuration management.

## Project Structure

```
├── api/
│   ├── base.api.ts           # Base API class with common functionality
│   ├── get.api.ts            # GET request methods
│   ├── post.api.ts           # POST request methods
│   └── validators.ts         # API response validators
├── config/
│   ├── apiConfig.ts          # API configuration using dotenv
│   └── envConfig.ts          # Application environment config
├── test-data/
│   └── payloads.json         # Sample request payloads
├── tests/
│   └── api/
│       └── api.example.spec.ts  # Example test cases
├── playwright.config.ts      # Playwright configuration
├── .env                      # Environment variables (create this file)
└── package.json              # Dependencies
```

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:

```env
# API Configuration
API_BASE_URL=https://jsonplaceholder.typicode.com
API_VERSION=v1
API_TIMEOUT=30000

# Authentication (if needed)
BEARER_TOKEN=your_bearer_token_here
API_KEY=your_api_key_here

# Environment
ENVIRONMENT=staging

# Retry Configuration
RETRY_COUNT=2
RETRY_DELAY=1000

# Application Configuration (existing)
USERNAME=your_username
PASSWORD=your_password
BASE_URL=https://ctcorphyd.com/SureshIT/login.php
```

### 3. Run Tests
```bash
# Run all API tests
npx playwright test tests/api/

# Run specific test file
npx playwright test tests/api/api.example.spec.ts

# Run with specific browser
npx playwright test --project=chromium tests/api/

# Run in debug mode
npx playwright test --debug tests/api/

# Run with HTML report
npx playwright test tests/api/ && npx playwright show-report
```

## Usage Examples

### GET Requests

#### Simple GET Request
```typescript
import { GetAPI } from '../api/get.api';

test('GET request example', async ({ request }) => {
  const getAPI = new GetAPI(request);
  
  const response = await getAPI.get('/posts/1');
  
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(1);
});
```

#### GET with Query Parameters
```typescript
const response = await getAPI.getWithParams('/posts', {
  userId: 1,
  _limit: 5
});
```

#### GET with Retry Logic
```typescript
const response = await getAPI.getWithRetry('/posts/1');
```

#### GET Specific Parts
```typescript
// Get only body
const body = await getAPI.getBody('/posts/1');

// Get only status
const status = await getAPI.getStatus('/posts/1');

// Get by ID
const response = await getAPI.getById('/posts', 1);
```

### POST Requests

#### Simple POST Request
```typescript
import { PostAPI } from '../api/post.api';

test('POST request example', async ({ request }) => {
  const postAPI = new PostAPI(request);
  
  const payload = {
    title: 'Test Post',
    body: 'This is a test',
    userId: 1
  };
  
  const response = await postAPI.post('/posts', payload);
  
  expect(response.status).toBe(201);
});
```

#### POST with Payloads from JSON
```typescript
import payloads from '../test-data/payloads.json';

const response = await postAPI.post('/posts', payloads.post.createPost);
```

#### POST with Retry Logic
```typescript
const response = await postAPI.postWithRetry('/posts', payload);
```

#### POST Form Data
```typescript
const response = await postAPI.postFormData('/endpoint', {
  username: 'user',
  password: 'pass'
});
```

#### POST Multipart Data
```typescript
const response = await postAPI.postMultipart('/upload', {
  file: fs.readFileSync('file.txt'),
  name: 'John'
});
```

### Validation Methods

#### Status Code Validation
```typescript
APIValidator.validateStatusCode(response.status, 200);
```

#### Response Body Validation
```typescript
// Check not empty
APIValidator.validateResponseBodyNotEmpty(response.body);

// Check specific key exists
APIValidator.validateResponseBodyHasKey(response.body, 'id');

// Check multiple keys
APIValidator.validateResponseBodyHasKeys(response.body, ['id', 'name', 'email']);

// Check field value
APIValidator.validateResponseBodyFieldValue(response.body, 'id', 1);
```

#### Array Response Validation
```typescript
// Validate array with minimum length
APIValidator.validateArrayResponse(response.body, 1);
```

#### Header Validation
```typescript
// Check header exists
APIValidator.validateResponseHeader(response.headers, 'content-type');

// Check header value
APIValidator.validateResponseHeader(response.headers, 'content-type', 'application/json');
```

#### Response Time Validation
```typescript
APIValidator.validateResponseTime(responseTime, 2000); // max 2 seconds
```

#### JSON Schema Validation
```typescript
const schema = {
  id: 'number',
  title: 'string',
  body: 'string'
};

APIValidator.validateJSONSchema(response.body, schema);
```

## Key Features

### 1. **BaseAPI Class**
   - Centralized request handling
   - Automatic header management
   - Retry logic with configurable delays
   - Request/response logging
   - Timeout configuration

### 2. **GetAPI Class**
   - Simple GET requests
   - Query parameter support
   - Retry functionality
   - Get specific response parts (body, status)
   - Get by ID convenience method

### 3. **PostAPI Class**
   - Standard JSON POST requests
   - Form data POST requests
   - Multipart data support
   - Retry functionality
   - Get specific response parts

### 4. **APIValidator Class**
   - 11+ validation methods
   - Status code validation
   - Response body validation
   - Header validation
   - Array validation
   - JSON schema validation
   - Response time validation
   - Comprehensive error messages

### 5. **Configuration Management**
   - Dotenv integration
   - Centralized API config
   - Environment-specific settings
   - Customizable timeouts and retries

### 6. **Sample Payloads**
   - Well-organized JSON structure
   - Multiple payload examples
   - Easy to extend and modify
   - Covers various scenarios (valid, invalid, bulk operations)

## Best Practices

1. **Use Separate Files for Different Request Types**
   - GetAPI for all GET requests
   - PostAPI for all POST requests
   - Keeps code organized and maintainable

2. **Leverage Configuration**
   - All settings in .env file
   - Easy to change across environments
   - No hardcoded values

3. **Use Payloads from JSON**
   - Keep test data separate from test code
   - Easier to maintain and update
   - Reusable across multiple tests

4. **Validate Responses Comprehensively**
   - Always check status codes
   - Validate response structure
   - Verify critical fields
   - Check response times

5. **Use Helper Methods**
   - `getBody()` when you only need body
   - `getStatus()` when you only need status
   - `getWithRetry()` for unstable APIs
   - `getWithParams()` for query parameters

6. **Organize Tests Logically**
   - Group related tests in `describe` blocks
   - Use `beforeEach` to initialize API instances
   - One assertion focus per test
   - Clear, descriptive test names

## Advanced Usage

### Custom Headers
```typescript
const customHeaders = {
  'X-Custom-Header': 'value'
};

const response = await getAPI.get('/endpoint', customHeaders);
```

### Chaining Requests
```typescript
// Create a post, then fetch it
const createResponse = await postAPI.post('/posts', payload);
const postId = createResponse.body.id;

const fetchResponse = await getAPI.getById('/posts', postId);
expect(fetchResponse.body.id).toBe(postId);
```

### Parallel Requests
```typescript
// Fetch multiple posts in parallel
const [post1, post2, post3] = await Promise.all([
  getAPI.get('/posts/1'),
  getAPI.get('/posts/2'),
  getAPI.get('/posts/3')
]);
```

### Dynamic Payloads
```typescript
const createDynamicPayload = (name: string, email: string) => ({
  name,
  email,
  timestamp: Date.now()
});

const response = await postAPI.post(
  '/users',
  createDynamicPayload('John', 'john@example.com')
);
```

## Troubleshooting

### Issue: Timeout errors
**Solution:** Increase `API_TIMEOUT` in .env file or specific request

### Issue: 401/403 Unauthorized errors
**Solution:** Check `BEARER_TOKEN` or `API_KEY` in .env file

### Issue: Validation errors not specific
**Solution:** Use specific validators like `validateResponseBodyHasKey()` instead of generic ones

### Issue: Tests running slowly
**Solution:** 
- Disable retry with `retryCount: 0`
- Use parallel execution
- Reduce timeout value for faster failures

## Contributing

When adding new features:
1. Add methods to BaseAPI for common functionality
2. Add specific methods to GetAPI or PostAPI
3. Add validators to APIValidator class
4. Create example tests in api.example.spec.ts
5. Update this documentation

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Testing](https://playwright.dev/docs/test-api-testing)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com)

## License

This framework is part of the NVN Automation Testing Project.
