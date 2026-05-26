/**
 * API Validators
 * Helper class for validating API responses
 */
export class APIValidator {
  /**
   * Validate HTTP status code
   * @param actualStatus - The actual status code from the response
   * @param expectedStatus - The expected status code
   * @throws Error if status codes don't match
   */
  static validateStatusCode(actualStatus: number, expectedStatus: number): boolean {
    if (actualStatus !== expectedStatus) {
      throw new Error(
        `Status Code Mismatch: Expected ${expectedStatus}, but got ${actualStatus}`
      );
    }
    return true;
  }

  /**
   * Validate response body is not empty
   * @param body - The response body
   * @throws Error if body is empty
   */
  static validateResponseBodyNotEmpty(body: any): boolean {
    if (!body || Object.keys(body).length === 0) {
      throw new Error('Response body is empty');
    }
    return true;
  }

  /**
   * Validate response body contains expected key
   * @param body - The response body
   * @param key - The key to check
   * @throws Error if key is missing
   */
  static validateResponseBodyHasKey(body: any, key: string): boolean {
    if (!(key in body)) {
      throw new Error(`Response body does not contain key: ${key}`);
    }
    return true;
  }

  /**
   * Validate multiple keys exist in response body
   * @param body - The response body
   * @param keys - Array of keys to check
   * @throws Error if any key is missing
   */
  static validateResponseBodyHasKeys(body: any, keys: string[]): boolean {
    const missingKeys = keys.filter(key => !(key in body));
    if (missingKeys.length > 0) {
      throw new Error(`Response body missing keys: ${missingKeys.join(', ')}`);
    }
    return true;
  }

  /**
   * Validate response body field value
   * @param body - The response body
   * @param key - The field key
   * @param expectedValue - The expected value
   * @throws Error if value doesn't match
   */
  static validateResponseBodyFieldValue(
    body: any,
    key: string,
    expectedValue: any
  ): boolean {
    if (!(key in body)) {
      throw new Error(`Response body does not contain key: ${key}`);
    }
    if (body[key] !== expectedValue) {
      throw new Error(
        `Field '${key}' has value '${body[key]}', expected '${expectedValue}'`
      );
    }
    return true;
  }

  /**
   * Validate array response
   * @param body - The response body
   * @param minLength - Minimum array length
   * @throws Error if validation fails
   */
  static validateArrayResponse(body: any, minLength: number = 1): boolean {
    if (!Array.isArray(body)) {
      throw new Error('Response body is not an array');
    }
    if (body.length < minLength) {
      throw new Error(
        `Array length ${body.length} is less than minimum ${minLength}`
      );
    }
    return true;
  }

  /**
   * Validate response header
   * @param headers - Response headers
   * @param headerName - Name of the header
   * @param expectedValue - Expected header value (optional)
   * @throws Error if header is missing or value doesn't match
   */
  static validateResponseHeader(
    headers: Record<string, string>,
    headerName: string,
    expectedValue?: string
  ): boolean {
    const headerKey = Object.keys(headers).find(
      key => key.toLowerCase() === headerName.toLowerCase()
    );

    if (!headerKey) {
      throw new Error(`Response header '${headerName}' not found`);
    }

    if (expectedValue && headers[headerKey] !== expectedValue) {
      throw new Error(
        `Header '${headerName}' has value '${headers[headerKey]}', expected '${expectedValue}'`
      );
    }

    return true;
  }

  /**
   * Validate response time
   * @param responseTime - Response time in milliseconds
   * @param maxTime - Maximum acceptable time in milliseconds
   * @throws Error if response time exceeds limit
   */
  static validateResponseTime(responseTime: number, maxTime: number): boolean {
    if (responseTime > maxTime) {
      throw new Error(
        `Response time ${responseTime}ms exceeded maximum ${maxTime}ms`
      );
    }
    return true;
  }

  /**
   * Validate JSON schema (basic validation)
   * @param body - The response body
   * @param schema - Schema object with field names and types
   * @throws Error if validation fails
   */
  static validateJSONSchema(
    body: any,
    schema: Record<string, string>
  ): boolean {
    for (const [key, type] of Object.entries(schema)) {
      if (!(key in body)) {
        throw new Error(`Missing required field: ${key}`);
      }
      if (typeof body[key] !== type) {
        throw new Error(
          `Field '${key}' should be of type ${type}, but got ${typeof body[key]}`
        );
      }
    }
    return true;
  }
}

export default APIValidator;
