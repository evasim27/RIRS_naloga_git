# CI/CD Pipeline Documentation

## Overview

This project implements a comprehensive CI/CD pipeline using GitHub Actions that automates testing and code coverage reporting for both frontend and backend microservices.

## Pipeline Architecture

### Jobs Overview

The CI/CD pipeline consists of the following independent jobs:

1. **Frontend Tests** - React/Jest testing for the web application
2. **User Service Tests** - Node.js/Express backend testing
3. **Payment Service Tests** - Node.js/Express backend testing
4. **Merchant Service Tests** - Python/FastAPI backend testing
5. **Test Summary** - Aggregates results and generates reports

### Trigger Events

The pipeline is triggered on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual workflow dispatch

## Test Coverage

### Frontend Tests (10 tests)

Located in: `frontend/src/__tests__/`

**Test Files:**
- `App.test.js` - 5 tests for main application component
- `Dashboard.test.js` - 5 tests for dashboard page
- `Users.test.js` - 7 tests for users management
- `Offers.test.js` - 6 tests for offers management
- `Payments.test.js` - 6 tests for payments management
- `api.test.js` - 6 tests for API configuration

**Total Frontend Tests: 35 tests**

Tests cover:
- Component rendering
- API integration (with mocks)
- Form submissions
- Error handling
- Loading states
- API client configuration

### Backend Tests - User Service (5 tests)

Located in: `user-service/src/__tests__/`

**Test Files:**
- `user_services.test.js` - Service layer testing
- `user_controller.test.js` - Controller endpoint testing
- `user_routes.test.js` - Route definition testing
- `app.test.js` - App setup and middleware testing

**Total User Service Tests: 18 tests**

Tests cover:
- User registration validation
- User login validation
- Route definitions
- Middleware setup
- Error handling

### Backend Tests - Payment Service (5 tests)

Located in: `payment-service/src/__tests__/`

**Test Files:**
- `luhn_algorithm.test.js` - Card validation algorithm
- `payment_service.test.js` - Payment service logic
- `payment_controller.test.js` - Payment controller endpoints
- `payment_routes.test.js` - Route definitions

**Total Payment Service Tests: 19 tests**

Tests cover:
- Luhn algorithm card validation
- Payment processing logic
- Error handling
- Route endpoints
- Service methods

### Backend Tests - Merchant Service (5 tests)

Located in: `merchant-service/tests/`

**Test Files:**
- `test_merchant_service.py` - Service layer testing
- `test_merchant_controllers.py` - Controller endpoint testing
- `test_merchant_models.py` - Data model testing

**Total Merchant Service Tests: 22 tests**

Tests cover:
- Merchant creation with validation
- Database interaction mocking
- Controller functionality
- Model data validation
- Error handling

## Coverage Reporting

### Code Coverage Metrics

Each service generates code coverage reports:

**Frontend (Jest):**
- Coverage files: `frontend/coverage/`
- Report format: HTML, LCOV, JSON
- Includes: Statements, Branches, Functions, Lines

**User Service (Jest):**
- Coverage files: `user-service/coverage/`
- Report format: HTML, LCOV, JSON

**Payment Service (Jest):**
- Coverage files: `payment-service/coverage/`
- Report format: HTML, LCOV, JSON

**Merchant Service (Pytest):**
- Coverage files: `merchant-service/htmlcov/`, `merchant-service/coverage.xml`
- Report format: HTML, XML

### Artifact Storage

All coverage reports are automatically uploaded as GitHub Actions artifacts:

**Available Artifacts:**
1. `frontend-coverage-report` - Frontend React tests coverage
2. `user-service-coverage-report` - User service tests coverage
3. `payment-service-coverage-report` - Payment service tests coverage
4. `merchant-service-coverage-report` - Merchant service tests coverage
5. `all-coverage-reports` - Combined archive of all reports

**Retention:** 30 days

### Accessing Coverage Reports

1. Navigate to your GitHub repository
2. Go to **Actions** tab
3. Click on the completed workflow run
4. Scroll to the bottom to find **Artifacts** section
5. Download the desired coverage report
6. Extract and open `index.html` in a browser to view the detailed coverage report

## Running Tests Locally

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run tests in watch mode
npm test

# Run tests with coverage (non-watch)
npm run test:coverage
```

### User Service

```bash
cd user-service

# Install dependencies
npm install

# Run tests with coverage
npm test

# Run tests in watch mode
npm run test:watch
```

### Payment Service

```bash
cd payment-service

# Install dependencies
npm install

# Run tests with coverage
npm test

# Run tests in watch mode
npm run test:watch
```

### Merchant Service

```bash
cd merchant-service

# Install dependencies
pip install -r requirements.txt

# Run tests with coverage
pytest --cov=src --cov-report=html --cov-report=term-missing tests/

# Run specific test file
pytest tests/test_merchant_service.py -v
```

## Test Statistics

### Total Test Count

- **Frontend:** 35 tests
- **User Service:** 18 tests
- **Payment Service:** 19 tests
- **Merchant Service:** 22 tests
- **Total:** 94 tests

### Test Distribution

| Service | Unit Tests | Integration Tests | Total |
|---------|------------|------------------|-------|
| Frontend | 35 | 0 | 35 |
| User Service | 18 | 0 | 18 |
| Payment Service | 19 | 0 | 19 |
| Merchant Service | 22 | 0 | 22 |
| **Total** | **94** | **0** | **94** |

## GitHub Actions Workflow Structure

### Job Configuration

Each test job follows this structure:

```yaml
steps:
  - Checkout code
  - Setup runtime (Node.js / Python)
  - Install dependencies
  - Run tests with coverage
  - Upload coverage artifacts
  - Upload to codecov
```

### Step Details

1. **Checkout** - Fetches the latest code from the branch
2. **Setup** - Installs Node.js 18.x or Python 3.10
3. **Cache** - Uses dependency caching for faster runs
4. **Install** - Installs project dependencies
5. **Test** - Runs test suite with coverage flags
6. **Upload Artifacts** - Stores coverage reports for 30 days
7. **Codecov** - Optional: Uploads to codecov.io

### Error Handling

- Tests use `continue-on-error: true` to allow the pipeline to complete even if individual tests fail
- Failures are visible in the workflow logs and summary
- Artifacts are still generated for analysis

## Coverage Standards

### Target Coverage Metrics

Current thresholds (configurable in jest.config.js and pytest.ini):

- **Statements:** No minimum (0%)
- **Branches:** No minimum (0%)
- **Functions:** No minimum (0%)
- **Lines:** No minimum (0%)

To increase thresholds, update configuration files:

**Frontend/Services (Jest):**
```javascript
// jest.config.js
coverageThreshold: {
  global: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50,
  },
}
```

**Merchant Service (Pytest):**
```ini
# pytest.ini
# Configure as needed
```

## Best Practices

### Writing Tests

1. **Use descriptive names** - Test names should clearly describe what they test
2. **Test one thing** - Each test should focus on a single behavior
3. **Mock external dependencies** - Isolate the code under test
4. **Use setup/teardown** - Clean state between tests
5. **Avoid flaky tests** - Don't depend on timing or external services

### Test Organization

```
src/
├── __tests__/           # Test files
│   ├── component.test.js
│   └── service.test.js
├── components/          # Source code
└── services/
```

### Coverage Goals

- Aim for >80% overall code coverage
- Critical paths should have 100% coverage
- Complex business logic should have multiple test cases
- Edge cases should be tested

## Troubleshooting

### Tests Failing in Pipeline but Passing Locally

1. **Node version mismatch** - Ensure local Node.js matches workflow (18.x)
2. **Python version mismatch** - Ensure local Python matches workflow (3.10)
3. **Environment variables** - Pipeline may not have the same env vars
4. **Dependency versions** - Check for package-lock.json / requirements.txt differences

### Coverage Reports Not Generated

1. Check that tests actually ran - look for test output in logs
2. Verify coverage tools are installed - check package.json / requirements.txt
3. Ensure correct working directories in workflow steps
4. Check file permissions and path configurations

### Artifacts Not Available

1. Verify the workflow completed successfully
2. Check artifact retention settings (default 30 days)
3. Ensure output paths match upload paths
4. Look for errors in the "Upload artifacts" step

## Improving Coverage

### Adding New Tests

1. Create test file in appropriate `__tests__` directory
2. Follow naming convention: `component.test.js` or `test_module.py`
3. Run tests locally to verify
4. Push to branch - pipeline will automatically run

### Analyzing Coverage

1. Download coverage report from artifacts
2. Open `index.html` in the coverage report directory
3. Review uncovered lines
4. Add tests for critical uncovered code
5. Verify coverage improves in next pipeline run

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Pytest Documentation](https://docs.pytest.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Codecov Integration](https://codecov.io/)

## Support

For issues or questions about the CI/CD pipeline:

1. Check the workflow logs in GitHub Actions
2. Review test output in pipeline runs
3. Consult the testing documentation above
4. Check individual service README files

---

**Last Updated:** December 2025
**Maintained by:** Development Team
