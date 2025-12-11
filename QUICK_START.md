# Quick Setup Guide - CI/CD Pipeline

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x
- Python 3.10
- Git
- GitHub repository

### Steps to Activate CI/CD Pipeline

#### 1. Push Changes to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "feat: Add CI/CD pipeline with comprehensive tests"

# Push to main/develop
git push origin main
```

#### 2. Monitor Workflow Execution

1. Go to your GitHub repository
2. Click **Actions** tab
3. You'll see "CI/CD Pipeline - Testing and Coverage" workflow running
4. Watch jobs execute in real-time

#### 3. View Test Results

The workflow will show:
- ✅ Frontend tests status
- ✅ User Service tests status
- ✅ Payment Service tests status
- ✅ Merchant Service tests status
- ✅ Overall summary

#### 4. Download Coverage Reports

1. Scroll to bottom of completed workflow run
2. Look for **Artifacts** section
3. Download desired coverage reports:
   - `frontend-coverage-report`
   - `user-service-coverage-report`
   - `payment-service-coverage-report`
   - `merchant-service-coverage-report`
   - `all-coverage-reports`

#### 5. View Coverage Details

1. Extract downloaded artifact
2. Open `index.html` in web browser
3. Browse coverage details:
   - Overall coverage percentage
   - Coverage by file
   - Uncovered lines
   - Branch coverage

---

## 📊 Test Breakdown

### Total Tests: **94**

| Component | Tests | Type |
|-----------|-------|------|
| Frontend | 35 | React/Jest |
| User Service | 18 | Node.js/Jest |
| Payment Service | 19 | Node.js/Jest |
| Merchant Service | 22 | Python/Pytest |

---

## 🧪 Running Tests Locally

### Frontend
```bash
cd frontend
npm install
npm test                    # Run in watch mode
npm run test:coverage       # Generate coverage report
```

### User Service
```bash
cd user-service
npm install
npm test                    # Run with coverage
```

### Payment Service
```bash
cd payment-service
npm install
npm test                    # Run with coverage
```

### Merchant Service
```bash
cd merchant-service
pip install -r requirements.txt
pytest --cov=src tests/     # Run with coverage
```

---

## 📁 Test Files Location

### Frontend Tests
```
frontend/src/__tests__/
├── App.test.js
├── Dashboard.test.js
├── Users.test.js
├── Offers.test.js
├── Payments.test.js
└── api.test.js
```

### User Service Tests
```
user-service/src/__tests__/
├── user_services.test.js
├── user_controller.test.js
├── user_routes.test.js
└── app.test.js
```

### Payment Service Tests
```
payment-service/src/__tests__/
├── luhn_algorithm.test.js
├── payment_service.test.js
├── payment_controller.test.js
└── payment_routes.test.js
```

### Merchant Service Tests
```
merchant-service/tests/
├── test_merchant_service.py
├── test_merchant_controllers.py
└── test_merchant_models.py
```

---

## 🔧 Configuration Files

### Jest Configuration
- `user-service/jest.config.js`
- `payment-service/jest.config.js`

### Pytest Configuration
- `merchant-service/pytest.ini`

### Workflow Configuration
- `.github/workflows/ci-cd-pipeline.yml`

---

## 📚 Documentation Files

1. **CI_CD_PIPELINE.md** - Comprehensive pipeline documentation
2. **TEST_SUMMARY_REPORT.md** - Detailed test statistics and assessment
3. **This file** - Quick setup guide

---

## ✅ Workflow Triggers

The CI/CD pipeline automatically runs on:

- ✅ Push to `main` branch
- ✅ Push to `develop` branch
- ✅ Pull requests to `main` or `develop`
- ✅ Manual workflow dispatch (from Actions tab)

---

## 🎯 What Gets Tested

### Frontend
- ✅ Component rendering
- ✅ Form submissions
- ✅ API integration
- ✅ Error handling
- ✅ Loading states

### User Service
- ✅ User registration validation
- ✅ Login validation
- ✅ Route definitions
- ✅ Error handling

### Payment Service
- ✅ Card validation (Luhn algorithm)
- ✅ Payment processing
- ✅ Payment history
- ✅ Route validation

### Merchant Service
- ✅ Merchant creation
- ✅ Business logic validation
- ✅ Data model validation
- ✅ Error handling

---

## 📊 Coverage Statistics

- **Total Tests:** 94
- **Frontend Coverage:** 35 tests (37%)
- **Backend Coverage:** 59 tests (63%)
- **Coverage Artifacts:** 4+ report formats
- **Retention:** 30 days

---

## 🚨 Troubleshooting

### Workflow Not Running
1. Verify files are pushed to GitHub
2. Check branch name (should be main/develop)
3. Go to Actions tab to see any errors

### Tests Failing
1. Check test output in workflow logs
2. Run tests locally to debug
3. Review test files in `__tests__` directories

### Artifacts Not Available
1. Wait for workflow to complete
2. Check that upload step succeeded
3. Artifacts expire after 30 days

---

## 📖 Next Steps

1. ✅ Push code to GitHub
2. ✅ Monitor Actions workflow
3. ✅ Review coverage reports
4. ✅ Identify uncovered code
5. ✅ Add more tests as needed

---

## 🎓 Key Features

✅ **Parallel Execution** - All services test simultaneously  
✅ **Comprehensive Coverage** - 94 tests across all components  
✅ **Multiple Formats** - HTML, LCOV, XML, JSON reports  
✅ **Artifact Storage** - 30-day retention  
✅ **Error Resilience** - Pipeline completes even if tests fail  
✅ **Codecov Integration** - Optional codecov.io support  

---

## 📞 Support

For detailed information, see:
- **CI_CD_PIPELINE.md** - Full documentation
- **TEST_SUMMARY_REPORT.md** - Test statistics and assessment

---

**Last Updated:** December 2025  
**Status:** ✅ Ready for Use
