# API Testing Framework - Quick Start Guide

## 5-Minute Setup

### Step 1: Create .env File
Create a `.env` file in the project root directory:

```env
# API Configuration
API_BASE_URL=https://jsonplaceholder.typicode.com
API_VERSION=v1
API_TIMEOUT=30000

# Authentication (optional - use only if your API requires)
BEARER_TOKEN=
API_KEY=

# Environment
ENVIRONMENT=staging

# Retry Configuration
RETRY_COUNT=2
RETRY_DELAY=1000

# Application Configuration
USERNAME=your_username
PASSWORD=your_password
BASE_URL=https://ctcorphyd.com/SureshIT/login.php
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Tests
```bash
# Run all API tests
npx playwright test tests/api/

# Run with HTML report
npx playwright test tests/api/ && npx playwright show-report
```

## File Structure

```
api/
├── base.api.ts              # Core API class (don't modify)
├── get.api.ts               # GET requests
├── post.api.ts              # POST requests
├── validators.ts            # Response validation
└── client.factory.ts        # API client factory (optional)

config/
└── apiConfig.ts             # Configuration loader

test-data/
└── payloads.json            # Sample request/response payloads

tests/api/
└── api.example.spec.ts      # Example tests (reference)
```

## Quick Examples

### Example 1: Simple GET Request
```typescript
import { test } from '@playwright/test';
import { GetAPI } from '../api/get.api';
import { APIValidator } from '../api/validators';

test('Fetch user data', async ({ request }) => {
  const getAPI = new GetAPI(request);
  
  const response = await getAPI.get('/users/1');
  
  APIValidator.validateStatusCode(response.status, 200);
  APIValidator.validateResponseBodyHasKey(response.body, 'id');
});
```

### Example 2: POST Request with Payload
```typescript
import { PostAPI } from '../api/post.api';
import payloads from '../test-data/payloads.json';

test('Create new post', async ({ request }) => {
  const postAPI = new PostAPI(request);
  
  const response = await postAPI.post('/posts', payloads.post.createPost);
  
  expect(response.status).toBe(201);
  expect(response.body.id).toBeTruthy();
});
```

### Example 3: Validation Examples
```typescript
test('Validate response structure', async ({ request }) => {
  const getAPI = new GetAPI(request);
  const response = await getAPI.get('/posts/1');
  
  // Multiple validations
  APIValidator.validateStatusCode(response.status, 200);
  APIValidator.validateResponseBodyHasKeys(response.body, 
    ['id', 'title', 'body', 'userId']
  );
  APIValidator.validateResponseHeader(response.headers, 'content-type');
  
  // Time validation
  const startTime = Date.now();
  const responseTime = Date.now() - startTime;
  APIValidator.validateResponseTime(responseTime, 2000);
});
```

## Common Issues

| Issue | Solution |
|-------|----------|
| 404 Not Found | Check API_BASE_URL and endpoint |
| 401 Unauthorized | Set BEARER_TOKEN in .env |
| Timeout | Increase API_TIMEOUT value |
| CORS errors | Use appropriate headers in .env |
| Failed assertions | Check expected vs actual values |

## File Locations

- **Configuration**: `config/apiConfig.ts`
- **API Classes**: `api/*.api.ts`
- **Test Data**: `test-data/payloads.json`
- **Tests**: `tests/api/api.example.spec.ts`
- **Documentation**: `API_TESTING_FRAMEWORK.md`
- **Environment**: `.env` (create this file)

## What's Included

✅ **BaseAPI** - Core functionality with request context, headers, timeout, retry logic  
✅ **GetAPI** - GET requests with parameters, retry, convenience methods  
✅ **PostAPI** - POST requests with JSON, form data, multipart support  
✅ **APIValidator** - 11+ validation methods for comprehensive testing  
✅ **APIClientFactory** - Batch operations and workflow management  
✅ **Sample Payloads** - Multiple test data examples in JSON  
✅ **Example Tests** - 16+ test cases covering all features  
✅ **Configuration** - Dotenv-based environment configuration  

## Next Steps

1. ✅ Create `.env` file (copy from this guide)
2. ✅ Run `npm install`
3. ✅ Run sample tests: `npx playwright test tests/api/api.example.spec.ts`
4. ✅ Review `API_TESTING_FRAMEWORK.md` for detailed documentation
5. ✅ Create your own tests based on examples
6. ✅ Customize payloads in `test-data/payloads.json`

## Customization

### Add Your Own API Endpoints
Extend GetAPI or PostAPI classes:

```typescript
export class MyCustomAPI extends GetAPI {
  async getCustomEndpoint(): Promise<any> {
    return this.get('/my-endpoint');
  }
}
```

### Add Your Own Payloads
Update `test-data/payloads.json`:

```json
{
  "customData": {
    "key1": "value1",
    "key2": "value2"
  }
}
```

### Add Environment-Specific Config
Update `.env` file:

```env
# Production
API_BASE_URL=https://api.production.com

# or Staging
API_BASE_URL=https://api.staging.com
```

## Support

For detailed information, see:
- [API_TESTING_FRAMEWORK.md](./API_TESTING_FRAMEWORK.md) - Full documentation
- [api/api.example.spec.ts](./tests/api/api.example.spec.ts) - Code examples
- [Playwright Docs](https://playwright.dev/docs/test-api-testing)

---

**Happy Testing! 🎉**
