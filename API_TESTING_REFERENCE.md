# API Testing Framework - File Reference Guide

## Complete File Listing

### 🔧 Core API Framework Files

#### `api/base.api.ts` (235 lines)
**Purpose**: Core API class with common functionality
**Key Methods**:
- `constructor(context: APIRequestContext)`
- `protected getFullUrl(endpoint: string)`
- `protected setHeaders(headers: Record<string, string>)`
- `protected executeWithRetry<T>(requestFn, retryCount)`
- `protected logRequest(method, url, body)`
- `protected logResponse(status, body)`

**Usage**: Extended by GetAPI and PostAPI, not used directly

---

#### `api/get.api.ts` (108 lines)
**Purpose**: GET request operations
**Public Methods**:
- `get(endpoint, headers?)` → Response object
- `getWithParams(endpoint, params, headers?)` → Response with query parameters
- `getWithRetry(endpoint, headers?)` → Response with automatic retry
- `getBody(endpoint, headers?)` → Response body only
- `getStatus(endpoint, headers?)` → Status code only
- `getById(endpoint, id, headers?)` → Get by ID

**Example**:
```typescript
const api = new GetAPI(request);
const response = await api.get('/users/1');
```

---

#### `api/post.api.ts` (162 lines)
**Purpose**: POST request operations
**Public Methods**:
- `post(endpoint, payload, headers?)` → Response object
- `postWithRetry(endpoint, payload, headers?)` → Response with automatic retry
- `postBody(endpoint, payload, headers?)` → Response body only
- `postStatus(endpoint, payload, headers?)` → Status code only
- `postFormData(endpoint, formData, headers?)` → Form data POST
- `postMultipart(endpoint, multipartData, headers?)` → Multipart/file upload

**Example**:
```typescript
const api = new PostAPI(request);
const response = await api.post('/users', payload);
```

---

#### `api/validators.ts` (248 lines)
**Purpose**: Response validation methods
**Validation Methods** (11+):
1. `validateStatusCode(actual, expected)`
2. `validateResponseBodyNotEmpty(body)`
3. `validateResponseBodyHasKey(body, key)`
4. `validateResponseBodyHasKeys(body, keys[])`
5. `validateResponseBodyFieldValue(body, key, expectedValue)`
6. `validateArrayResponse(body, minLength)`
7. `validateResponseHeader(headers, name, expectedValue?)`
8. `validateResponseTime(responseTime, maxTime)`
9. `validateJSONSchema(body, schema)`
10. Plus utility methods for different scenarios

**Example**:
```typescript
APIValidator.validateStatusCode(response.status, 200);
APIValidator.validateResponseBodyHasKey(response.body, 'id');
```

---

#### `api/client.factory.ts` (112 lines)
**Purpose**: Factory for managing multiple API instances
**Public Methods**:
- `constructor(context: APIRequestContext)`
- `getGetAPI()` → GetAPI instance
- `getPostAPI()` → PostAPI instance
- `createAndValidate(endpoint, payload)` → Create & verify workflow
- `batchCreate(endpoint, payloads[])` → Create multiple resources
- `batchGet(endpoint, ids[])` → Fetch multiple resources

**Example**:
```typescript
const factory = new APIClientFactory(request);
const created = await factory.createAndValidate('/users', payload);
```

---

### ⚙️ Configuration Files

#### `config/apiConfig.ts` (37 lines)
**Purpose**: Load API configuration from environment
**Exported Properties**:
- `baseUrl` - API base URL
- `apiVersion` - API version
- `timeout` - Request timeout in ms
- `apiKey` - API key for authentication
- `bearerToken` - Bearer token for authentication
- `environment` - Current environment
- `retryCount` - Number of retries
- `retryDelay` - Delay between retries

**Usage**: Imported by BaseAPI automatically

---

#### `.env.example` (77 lines)
**Purpose**: Environment variable template
**Copy to**: `.env` (in project root)
**Key Variables**:
```
API_BASE_URL=...
API_TIMEOUT=30000
BEARER_TOKEN=...
API_KEY=...
RETRY_COUNT=2
RETRY_DELAY=1000
ENVIRONMENT=staging
```

**Security**: 
- Never commit `.env` to git
- Add to .gitignore (already done)
- Use different values for each environment

---

### 📊 Test Data

#### `test-data/payloads.json` (178 lines)
**Purpose**: Sample request/response payloads
**Sections**:
- `user.createUser` - Single user creation
- `user.updateUser` - User update
- `user.createMultipleUsers` - Batch user creation
- `post.createPost` - Blog post creation
- `post.updatePost` - Post update
- `post.createComment` - Comment creation
- `product.createProduct` - Product CRUD examples
- `product.bulkCreateProducts` - Batch products
- `order.createOrder` - Order management
- `authentication.login` - Login payload
- `authentication.register` - Registration payload
- `invalidData.*` - Negative test cases

**Usage**:
```typescript
import payloads from '../test-data/payloads.json';
await api.post('/users', payloads.user.createUser);
```

---

### 📝 Test Files

#### `tests/api/api.example.spec.ts` (418 lines)
**Purpose**: Basic API testing examples
**Test Suites** (5):
1. **GET Requests** (8 tests)
   - Fetch all posts
   - Fetch by ID
   - With query parameters
   - Body/status only
   - Header validation
   - Response time
   - Error handling

2. **POST Requests** (7 tests)
   - Create resources
   - From JSON payloads
   - Batch operations
   - Invalid data
   - Response body/status only

3. **Validation Examples** (4 tests)
   - Schema validation
   - Required fields
   - Field values
   - Array validation

4. **Error Handling** (3 tests)
   - Status mismatch
   - Missing keys
   - Invalid schema

**Total**: 16+ test cases

---

#### `tests/api/api.advanced.spec.ts` (546 lines)
**Purpose**: Advanced API testing patterns
**Test Suites** (5):
1. **API Client Factory** (3 tests)
   - Create and validate workflow
   - Batch create
   - Batch fetch

2. **Complex Workflows** (5 tests)
   - Dependent requests (post → comments → users)
   - Paginated data handling
   - Request chaining
   - Parallel execution
   - Data filtering

3. **Error Handling & Resilience** (3 tests)
   - Graceful error handling
   - Automatic retry
   - Multiple validations

4. **Performance Testing** (2 tests)
   - Response time measurement
   - Load testing with concurrent requests

5. **Data Integrity** (3 tests)
   - Consistency across fetches
   - Schema validation
   - Array structure validation

**Total**: 20+ test cases

---

### 📚 Documentation Files

#### `API_QUICK_START.md` (154 lines)
**Best For**: Getting started quickly
**Contains**:
- 5-minute setup steps
- Quick code examples
- Common issues table
- File locations
- Next steps checklist

**Read This First**: If you want to start immediately

---

#### `API_TESTING_FRAMEWORK.md` (573 lines)
**Best For**: Complete reference
**Contains**:
- Overview and structure
- Setup instructions
- Usage examples for each method
- Validation methods reference
- Key features explanation
- Best practices (6 items)
- Advanced usage patterns
- Troubleshooting guide
- Contributing guidelines

**Read This**: For detailed understanding

---

#### `IMPLEMENTATION_SUMMARY.md` (285 lines)
**Best For**: Understanding what was created
**Contains**:
- Overview of the framework
- All created files listing
- Quick start guide
- Key features summary
- Usage examples
- File statistics
- Configuration reference
- Learning path
- Support resources

**Read This**: To understand the complete implementation

---

#### `API_TESTING_REFERENCE.md` (This file)
**Best For**: File-by-file breakdown
**Contains**:
- Complete file reference
- Method signatures
- Usage examples
- File locations
- Cross-references

---

## 📂 Directory Structure

```
Nvn_Framework/
├── api/
│   ├── base.api.ts              (235 lines) - Core functionality
│   ├── get.api.ts               (108 lines) - GET requests
│   ├── post.api.ts              (162 lines) - POST requests
│   ├── validators.ts            (248 lines) - Validation
│   └── client.factory.ts        (112 lines) - Factory pattern
│
├── config/
│   ├── apiConfig.ts             (37 lines)  - API configuration
│   └── envConfig.ts             (Existing)  - App configuration
│
├── test-data/
│   └── payloads.json            (178 lines) - Test payloads
│
├── tests/api/
│   ├── api.example.spec.ts      (418 lines) - Basic examples
│   └── api.advanced.spec.ts     (546 lines) - Advanced examples
│
├── .env.example                 (77 lines)  - Environment template
│
├── API_QUICK_START.md           (154 lines) - Quick start
├── API_TESTING_FRAMEWORK.md     (573 lines) - Full reference
├── IMPLEMENTATION_SUMMARY.md    (285 lines) - What was created
├── API_TESTING_REFERENCE.md     (This file) - File reference
│
├── playwright.config.ts         (Existing)
├── package.json                 (Existing)
└── .gitignore                   (Existing, .env already listed)

Total New Files: 13
Total New Lines of Code: ~3,533
```

## 🎯 Which File to Read

| Your Goal | Read This |
|-----------|-----------|
| Get started quickly | API_QUICK_START.md |
| Learn how to use | API_TESTING_FRAMEWORK.md |
| See code examples | tests/api/api.example.spec.ts |
| Advanced patterns | tests/api/api.advanced.spec.ts |
| Understand implementation | IMPLEMENTATION_SUMMARY.md |
| API reference | This file (API_TESTING_REFERENCE.md) |
| Configuration details | config/apiConfig.ts + .env.example |
| Test data | test-data/payloads.json |

## 📦 Dependencies

All dependencies are already in package.json:
- `@playwright/test` - Testing framework
- `@types/node` - TypeScript types
- `dotenv` - Environment variables
- `allure-playwright` - Reporting (optional)

## 🚀 Quick Reference - Common Commands

```bash
# Setup
cp .env.example .env
npm install

# Run tests
npx playwright test tests/api/

# Run specific file
npx playwright test tests/api/api.example.spec.ts

# Run with UI
npx playwright test --ui tests/api/

# Run in debug mode
npx playwright test --debug tests/api/

# Generate report
npx playwright test tests/api/ && npx playwright show-report
```

## 🔗 Cross-References

### For Learning GET Requests
1. Start: `API_QUICK_START.md` → Example 1
2. Theory: `API_TESTING_FRAMEWORK.md` → Usage Examples → GET Requests
3. Practice: `tests/api/api.example.spec.ts` → "API Testing Framework - GET Requests"
4. Reference: This file → `api/get.api.ts`

### For Learning POST Requests
1. Start: `API_QUICK_START.md` → Example 2
2. Theory: `API_TESTING_FRAMEWORK.md` → Usage Examples → POST Requests
3. Practice: `tests/api/api.example.spec.ts` → "API Testing Framework - POST Requests"
4. Reference: This file → `api/post.api.ts`

### For Learning Validation
1. Start: `API_QUICK_START.md` → Example 3
2. Theory: `API_TESTING_FRAMEWORK.md` → Validation Methods
3. Practice: `tests/api/api.example.spec.ts` → "API Testing Framework - Validation Examples"
4. Reference: This file → `api/validators.ts`

### For Advanced Workflows
1. Examples: `tests/api/api.advanced.spec.ts`
2. Theory: `API_TESTING_FRAMEWORK.md` → Advanced Usage
3. Reference: This file → `api/client.factory.ts`

## ✨ Implementation Highlights

✅ **Clean Code**: 
- Proper TypeScript with strict mode
- JSDoc comments on all public methods
- Consistent naming conventions
- Single responsibility principle

✅ **Comprehensive**:
- 11+ validation methods
- 6+ API request methods per class
- 36+ example test cases
- 4 documentation files

✅ **Production Ready**:
- Error handling
- Retry logic
- Timeout management
- Logging
- Configuration management

✅ **Well Documented**:
- Inline comments
- JSDoc signatures
- Multiple guides
- Usage examples
- Troubleshooting

## 📞 Getting Help

1. **Setup Issues**: See API_QUICK_START.md → Common Issues
2. **Usage Questions**: Check API_TESTING_FRAMEWORK.md → Usage Examples
3. **Test Examples**: Review tests/api/*.spec.ts files
4. **Method Reference**: This file (API_TESTING_REFERENCE.md)
5. **Configuration**: See config/apiConfig.ts + .env.example

---

**All files ready for use. Start with API_QUICK_START.md! 🚀**
