# Environment Configuration Guide

## Overview
This project uses environment variables to manage application credentials securely. Credentials are stored in a `.env` file and loaded at runtime.

## Setup Instructions

### 1. Environment File (.env)
The `.env` file is already created in the root directory with the following variables:

```
USERNAME=sureshit
PASSWORD=sureshit
BASE_URL=https://ctcorphyd.com/SureshIT/login.php
```

**Update these with your actual credentials:**
- Replace `sureshit` with your actual username
- Replace `sureshit` with your actual password
- Update BASE_URL if needed

### 2. How It Works

#### Configuration Module (`config/envConfig.ts`)
This module loads environment variables using the `dotenv` package:

```typescript
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || '',
  baseUrl: process.env.BASE_URL || 'https://ctcorphyd.com/SureshIT/login.php',
};
```

#### Using in LoginPage (`pages/LoginPage.ts`)
The LoginPage now imports the config and uses environment variables:

```typescript
import config from '../config/envConfig';

async applicationLogin(username?: string, password?: string) {
  await this.gotoURL();
  // Use provided credentials or fall back to environment variables
  const user = username || config.username;
  const pass = password || config.password;
  await this.login(user, pass);
}
```

#### Using in Tests
Call `applicationLogin()` without parameters to use environment variables:

```typescript
const loginpage = new LoginPage(page);
await loginpage.applicationLogin(); // Uses credentials from .env
```

Or pass credentials explicitly if needed:

```typescript
await loginpage.applicationLogin('customUser', 'customPass');
```

### 3. Security Best Practices

- **Never commit .env file**: The `.env` file is added to `.gitignore` to prevent credentials from being committed to version control
- **Keep credentials secure**: Store actual passwords in a password manager
- **Environment-specific files**: Use `.env.local` for local development, `.env.staging`, `.env.prod` for different environments
- **Rotate credentials regularly**: Update credentials periodically for security

### 4. Multiple Environments (Optional)

You can create environment-specific files:

- `.env` - Default/example credentials
- `.env.local` - Local development (added to .gitignore)
- `.env.staging` - Staging environment
- `.env.prod` - Production environment

Update `config/envConfig.ts` to load the appropriate file based on an environment variable if needed.

### 5. Dependencies

The project includes:
- `dotenv` (^16.0.3) - For loading environment variables from .env file

## Testing

Run tests with environment variables:

```bash
npm test
# or
npx playwright test storageSession.spec.ts --headed --project=chromium
```

The credentials from `.env` will be automatically loaded and used.
