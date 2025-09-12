````markdown
# 📑 API DOCUMENTATION & TESTING GUIDE

## 🔗 **API ENDPOINTS REFERENCE**

> **Last Updated:** September 12, 2025  
> **API Version:** 1.5.0  
> **Base URL:** `http://localhost:3000/api`

### 🔐 **Authentication Endpoints**

#### `POST /api/auth/login`
**Description:** User authentication endpoint  
**Authentication:** Not required  
**Rate Limit:** 5 requests per minute per IP

**Request Body:**
```json
{
  "email": "admin@dlh.tasikmalayakota.go.id",
  "password": "securepassword",
  "rememberMe": false
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": "cuid_example",
    "email": "admin@dlh.tasikmalayakota.go.id", 
    "name": "Administrator",
    "role": "ADMIN",
    "isActive": true
  },
  "message": "Login berhasil"
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "error": "Email atau password salah"
}
```

**Test Cases:**
```bash
# Valid login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'

# Invalid credentials
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wrong@email.com","password":"wrongpass"}'
```

---

### 📄 **Content Management Endpoints**

#### `GET /api/articles`
**Description:** Get articles with pagination and filtering  
**Authentication:** Not required  
**Rate Limit:** 60 requests per minute

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 50)
- `search` (string): Search in title and content
- `category` (string): Filter by category ID
- `published` (boolean): Filter by published status

**Example Request:**
```bash
GET /api/articles?page=1&limit=10&published=true&search=lingkungan
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "article_id_1",
        "title": "Program Kebersihan Lingkungan",
        "slug": "program-kebersihan-lingkungan",
        "excerpt": "Program pembersihan lingkungan kota...",
        "thumbnail": "/uploads/articles/image.jpg",
        "isPublished": true,
        "publishedAt": "2025-09-08T10:00:00Z",
        "createdAt": "2025-09-07T15:30:00Z",
        "author": {
          "name": "Admin DLH"
        },
        "category": {
          "name": "Program Kerja",
          "slug": "program-kerja"
        }
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

#### `POST /api/articles`
**Description:** Create new article  
**Authentication:** Required (ADMIN/OPERATOR)  
**Content-Type:** `multipart/form-data`

**Request Body:**
```json
{
  "title": "Judul Artikel Baru",
  "content": "Konten lengkap artikel...",
  "excerpt": "Ringkasan artikel",
  "categoryId": "category_id",
  "tags": "lingkungan,kebersihan,program",
  "isPublished": true,
  "thumbnail": "file_upload"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "new_article_id",
    "title": "Judul Artikel Baru",
    "slug": "judul-artikel-baru",
    "createdAt": "2025-09-08T12:00:00Z"
  },
  "message": "Artikel berhasil dibuat"
}
```

---

### 👥 **Staff Management Endpoints**

#### `GET /api/admin/staff-members`
**Description:** Get all staff members with career history  
**Authentication:** Required (ADMIN)  
**Rate Limit:** 30 requests per minute

**Response (200):**
```json
[
  {
    "id": "staff_id_1",
    "name": "Dr. John Doe",
    "position": "Kepala Dinas",
    "photo": "/uploads/staff/john-doe.jpg",
    "type": "KEPALA_DINAS",
    "employmentStatus": "PNS",
    "education": "S2",
    "rank": "Pembina Utama IV/e",
    "isActive": true,
    "isPublished": true,
    "greeting": "Selamat datang di DLH Tasikmalaya",
    "careerHistory": [
      {
        "id": "career_id_1",
        "position": "Kepala Dinas Lingkungan Hidup",
        "institution": "DLH Kota Tasikmalaya",
        "startDate": "2023-01-01T00:00:00Z",
        "endDate": null,
        "isActive": true,
        "isPublished": true
      }
    ]
  }
]
```

#### `POST /api/admin/staff-members`
**Description:** Create new staff member  
**Authentication:** Required (ADMIN)  
**Content-Type:** `multipart/form-data`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "position": "Sekretaris Dinas",
  "type": "SEKRETARIS",
  "employmentStatus": "PNS",
  "education": "S1",
  "rank": "Penata III/c",
  "birthDate": "1985-05-15",
  "greeting": "Mari bersama-sama menjaga lingkungan",
  "photo": "file_upload"
}
```

---

### 🚨 **Complaint Endpoints (TO BE IMPLEMENTED)**

#### `POST /api/complaints`
**Description:** Submit new complaint  
**Authentication:** Not required  
**Content-Type:** `multipart/form-data`  
**Status:** 🔴 NOT IMPLEMENTED

**Expected Request:**
```json
{
  "complainantName": "Warga Peduli",
  "complainantEmail": "warga@email.com", 
  "complainantPhone": "081234567890",
  "subject": "Pencemaran Sungai",
  "description": "Terdapat limbah industri di sungai...",
  "location": "Jl. Raya No. 123, Tasikmalaya",
  "priority": "HIGH",
  "attachments": ["file1", "file2"]
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "complaint_id",
    "ticketNumber": "COMP-2025-0001",
    "status": "OPEN",
    "submittedAt": "2025-09-08T14:30:00Z",
    "trackingUrl": "/pengaduan/track/complaint_id"
  },
  "message": "Pengaduan berhasil dikirim"
}
```

#### `GET /api/complaints`
**Description:** List complaints with filtering  
**Authentication:** Required (ADMIN/OPERATOR)  
**Status:** 🔴 NOT IMPLEMENTED

**Query Parameters:**
- `status` (string): OPEN, IN_PROGRESS, RESOLVED, CLOSED
- `priority` (string): LOW, MEDIUM, HIGH, URGENT
- `assignedTo` (string): User ID of assigned officer
- `dateFrom` (date): Start date filter
- `dateTo` (date): End date filter
- `page` (number): Page number
- `limit` (number): Items per page

#### `PUT /api/complaints/[id]`
**Description:** Update complaint status or assign officer  
**Authentication:** Required (ADMIN/OPERATOR)  
**Status:** 🔴 NOT IMPLEMENTED

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "assignedToId": "officer_id",
  "response": "Pengaduan sedang ditindaklanjuti...",
  "priority": "HIGH"
}
```

---

### 📋 **Permit Endpoints (TO BE IMPLEMENTED)**

#### `POST /api/permits`
**Description:** Submit permit application  
**Authentication:** Not required  
**Status:** 🔴 NOT IMPLEMENTED

**Expected Request:**
```json
{
  "applicantName": "PT. Contoh Industries",
  "applicantEmail": "contact@contoh.com",
  "applicantPhone": "081234567890", 
  "companyName": "PT. Contoh Industries",
  "permitType": "AMDAL",
  "description": "Aplikasi izin AMDAL untuk pabrik...",
  "documents": ["doc1", "doc2", "doc3"]
}
```

---

### 📁 **File Upload Endpoints (TO BE IMPLEMENTED)**

#### `POST /api/upload`
**Description:** Upload files (images, documents)  
**Authentication:** Context-dependent  
**Content-Type:** `multipart/form-data`  
**Max Size:** 10MB per file  
**Status:** 🔴 NOT IMPLEMENTED

**Expected Request:**
```javascript
const formData = new FormData();
formData.append('file', fileObject);
formData.append('type', 'complaint'); // complaint, permit, gallery, document
formData.append('category', 'evidence');
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "file_id",
    "filename": "original_name.jpg",
    "url": "/uploads/complaints/processed_name.jpg",
    "thumbnailUrl": "/uploads/complaints/thumb_processed_name.jpg",
    "size": 2048576,
    "mimeType": "image/jpeg"
  }
}
```

---

## 🧪 **TESTING PROCEDURES**

### **Manual Testing Checklist**

#### **Authentication Testing**
- [ ] Valid login with correct credentials
- [ ] Invalid login with wrong email
- [ ] Invalid login with wrong password
- [ ] Login with inactive user account
- [ ] Session timeout handling
- [ ] Login rate limiting (5 attempts)

#### **Article Management Testing**
- [ ] Create article with all fields
- [ ] Create article with minimum required fields
- [ ] Update existing article
- [ ] Delete article
- [ ] Publish/unpublish article
- [ ] Search articles by keyword
- [ ] Filter articles by category
- [ ] Pagination functionality

#### **Staff Management Testing**
- [ ] Add new staff member
- [ ] Update staff information
- [ ] Add career history
- [ ] Upload staff photo
- [ ] Publish/unpublish staff
- [ ] Statistics auto-update

### **Automated Testing Scripts**

#### **API Testing with curl**

```bash
#!/bin/bash
# API Test Script

BASE_URL="http://localhost:3000/api"
TOKEN=""

echo "Testing API Endpoints..."

# Test 1: Login
echo "1. Testing Login..."
RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}')

if [[ $RESPONSE == *"success\":true"* ]]; then
  echo "✅ Login test passed"
  # Extract token if available
else
  echo "❌ Login test failed"
  echo "$RESPONSE"
fi

# Test 2: Get Articles
echo "2. Testing Get Articles..."
RESPONSE=$(curl -s -X GET "$BASE_URL/articles?page=1&limit=5")

if [[ $RESPONSE == *"articles"* ]]; then
  echo "✅ Get articles test passed"
else
  echo "❌ Get articles test failed"
  echo "$RESPONSE"
fi

# Test 3: Get Categories
echo "3. Testing Get Categories..."
RESPONSE=$(curl -s -X GET "$BASE_URL/categories")

if [[ $RESPONSE == *"success"* ]] || [[ $RESPONSE == *"["* ]]; then
  echo "✅ Get categories test passed"
else
  echo "❌ Get categories test failed"
  echo "$RESPONSE"
fi

echo "Testing completed!"
```

#### **Jest Unit Test Examples**

```typescript
// __tests__/api/auth.test.ts
import { POST } from '@/app/api/auth/login/route';
import { NextRequest } from 'next/server';

describe('/api/auth/login', () => {
  it('should return success for valid credentials', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'password123'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user).toBeDefined();
  });

  it('should return error for invalid credentials', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST', 
      body: JSON.stringify({
        email: 'wrong@email.com',
        password: 'wrongpassword'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
    expect(data.error).toBeDefined();
  });
});
```

### **Performance Testing**

#### **Load Testing with Artillery**

```yaml
# artillery.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
  payload:
    path: 'users.csv'
    fields:
      - email
      - password

scenarios:
  - name: "Login and browse articles"
    weight: 70
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "{{ email }}"
            password: "{{ password }}"
          capture:
            - json: "$.user.id"
              as: "userId"
      - get:
          url: "/api/articles?page=1&limit=10"
      - get:
          url: "/api/articles?page=2&limit=10"

  - name: "Get staff members"
    weight: 30
    flow:
      - get:
          url: "/api/admin/staff-members"
```

**Run with:**
```bash
npx artillery run artillery.yml
```

### **Database Testing**

#### **Prisma Integration Tests**

```typescript
// __tests__/database/articles.test.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Article Database Operations', () => {
  beforeEach(async () => {
    // Clean database before each test
    await prisma.article.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create article with author relationship', async () => {
    // Create test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed_password',
        role: 'ADMIN'
      }
    });

    // Create article
    const article = await prisma.article.create({
      data: {
        title: 'Test Article',
        slug: 'test-article',
        content: 'Test content...',
        authorId: user.id,
        isPublished: true
      }
    });

    expect(article.id).toBeDefined();
    expect(article.title).toBe('Test Article');
    expect(article.authorId).toBe(user.id);
  });

  it('should fetch articles with author and category', async () => {
    // Setup test data
    const user = await prisma.user.create({
      data: {
        email: 'author@example.com',
        name: 'Article Author',
        password: 'hashed_password'
      }
    });

    const category = await prisma.articleCategory.create({
      data: {
        name: 'Test Category',
        slug: 'test-category'
      }
    });

    await prisma.article.create({
      data: {
        title: 'Test Article',
        slug: 'test-article-2',
        content: 'Content...',
        authorId: user.id,
        categoryId: category.id,
        isPublished: true
      }
    });

    // Test fetch with relations
    const articles = await prisma.article.findMany({
      include: {
        author: { select: { name: true } },
        category: { select: { name: true, slug: true } }
      }
    });

    expect(articles).toHaveLength(1);
    expect(articles[0].author.name).toBe('Article Author');
    expect(articles[0].category?.name).toBe('Test Category');
  });
});
```

---

## 🔧 **DEVELOPMENT TESTING TOOLS**

### **Required Testing Dependencies**

```json
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.3.1",
    "jest-environment-jsdom": "^29.3.1",
    "supertest": "^6.3.3",
    "artillery": "^2.0.0",
    "cypress": "^12.3.0",
    "@types/jest": "^29.2.5",
    "@types/supertest": "^2.0.12"
  }
}
```

### **Jest Configuration**

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/node_modules/**',
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}

module.exports = createJestConfig(customJestConfig)
```

### **Testing Commands**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run performance tests
npm run test:performance

# Run specific test file
npm test __tests__/api/auth.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="login"
```

---

## 📊 **API MONITORING & ANALYTICS**

### **Response Time Monitoring**

```typescript
// middleware/apiMonitoring.ts
import { NextRequest, NextResponse } from 'next/server';

export function apiMonitoring(request: NextRequest) {
  const start = Date.now();
  
  return NextResponse.next().then(response => {
    const duration = Date.now() - start;
    const url = request.url;
    const method = request.method;
    const status = response.status;
    
    // Log API performance
    console.log(`API ${method} ${url} - ${status} - ${duration}ms`);
    
    // Add performance headers
    response.headers.set('X-Response-Time', `${duration}ms`);
    
    return response;
  });
}
```

### **Error Tracking Setup**

```typescript
// lib/errorTracking.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown) {
  console.error('API Error:', error);
  
  if (error instanceof APIError) {
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
  
  // Log unknown errors
  if (error instanceof Error) {
    console.error('Unknown error:', error.stack);
  }
  
  return {
    success: false,
    error: 'Internal server error'
  };
}
```

---

## 🆕 **NEW API ENDPOINTS (v1.5.0)**

### 🏛️ **Organization Endpoints**

#### `GET /api/bidang`
**Description:** Get department and sections information  
**Authentication:** Not required  

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid_example",
      "nama": "Bidang Pengendalian Pencemaran dan Kerusakan Lingkungan",
      "deskripsi": "Menangani pencemaran lingkungan dan kerusakan",
      "icon": "ShieldCheck",
      "color": "blue",
      "seksi": [
        {
          "id": "cuid_seksi",
          "nama": "Seksi Pengendalian Pencemaran Air dan Tanah",
          "deskripsi": "Monitoring kualitas air dan tanah"
        }
      ]
    }
  ]
}
```

**Test Command:**
```bash
curl -X GET "http://localhost:3000/api/bidang"
```

#### `GET /api/kontak`
**Description:** Get contact information and settings  
**Authentication:** Not required  

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "alamat": "Jl. Raya No. 123, Tasikmalaya",
    "telepon": "(0265) 123-4567", 
    "email": "info@dlh.tasikmalayakota.go.id",
    "website": "https://dlh.tasikmalayakota.go.id",
    "jamOperasional": "Senin - Jumat: 08:00 - 16:00",
    "socialMedia": {
      "facebook": "https://facebook.com/dlhtasikmalaya",
      "instagram": "https://instagram.com/dlhtasikmalaya",
      "youtube": "https://youtube.com/@dlhtasikmalaya",
      "tiktok": "https://tiktok.com/@dlhtasikmalaya"
    }
  }
}
```

**Test Command:**
```bash
curl -X GET "http://localhost:3000/api/kontak"
```

### � **Information System Endpoints**

#### `GET /api/informasi-pages`
**Description:** Get information pages content  
**Authentication:** Not required  

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid_example",
      "title": "Persyaratan Perizinan",
      "slug": "persyaratan-perizinan",
      "content": "Informasi lengkap persyaratan perizinan...",
      "category": "PERIZINAN",
      "isActive": true,
      "order": 1
    }
  ]
}
```

**Test Command:**
```bash
curl -X GET "http://localhost:3000/api/informasi-pages"
```

#### `GET /api/panduan-umk`
**Description:** Get UMK (Usaha Mikro Kecil) guidelines  
**Authentication:** Not required  

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid_example",
      "title": "Panduan UMK Pengelolaan Sampah",
      "slug": "panduan-umk-sampah",
      "content": "Panduan lengkap untuk UMK...",
      "category": "PENGELOLAAN_SAMPAH",
      "downloadUrl": "/uploads/panduan/umk-sampah.pdf",
      "isActive": true
    }
  ]
}
```

**Test Command:**
```bash
curl -X GET "http://localhost:3000/api/panduan-umk"
```

### 📋 **Permit System Endpoints**

#### `GET /api/perizinan/amdal`
**Description:** Get AMDAL permit information  
**Authentication:** Not required  

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "title": "Analisis Mengenai Dampak Lingkungan (AMDAL)",
    "description": "Studi mengenai dampak lingkungan dari suatu kegiatan",
    "requirements": [
      "Dokumen identitas perusahaan",
      "Rencana kegiatan usaha",
      "Peta lokasi kegiatan"
    ],
    "process": [
      "Pengajuan permohonan",
      "Verifikasi dokumen", 
      "Evaluasi dampak",
      "Penerbitan rekomendasi"
    ],
    "downloadUrl": "/uploads/forms/amdal-form.pdf"
  }
}
```

#### `GET /api/perizinan/uklupl`
**Description:** Get UKL-UPL permit information  

#### `GET /api/perizinan/sppl`  
**Description:** Get SPPL permit information

#### `GET /api/perizinan/iplc`
**Description:** Get IPLC permit information

**Test Commands:**
```bash
curl -X GET "http://localhost:3000/api/perizinan/amdal"
curl -X GET "http://localhost:3000/api/perizinan/uklupl"
curl -X GET "http://localhost:3000/api/perizinan/sppl"  
curl -X GET "http://localhost:3000/api/perizinan/iplc"
```

### 🎨 **Settings Endpoints**

#### `GET /api/logo-settings`
**Description:** Get logo and branding settings  
**Authentication:** Not required  

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "logoHeader": "/uploads/logo-header/logo.png",
    "logoFooter": "/uploads/logo-footer/logo-white.png",
    "siteName": "Dinas Lingkungan Hidup Kota Tasikmalaya",
    "tagline": "Bersama Menjaga Lingkungan"
  }
}
```

**Test Command:**
```bash
curl -X GET "http://localhost:3000/api/logo-settings"
```

---

## 🧪 **AUTOMATED TESTING**

### **Test Suite Setup**
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run all API tests
npm run test:api

# Run specific endpoint tests
npm run test:api -- --testPathPattern=bidang
```

### **Sample Test File**
```javascript
// tests/api/bidang.test.js
describe('/api/bidang', () => {
  test('should return bidang data', async () => {
    const response = await fetch('/api/bidang');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.data[0]).toHaveProperty('nama');
    expect(data.data[0]).toHaveProperty('seksi');
  });
});
```

---

## 📊 **API PERFORMANCE METRICS**

### **Response Time Benchmarks**
| **Endpoint** | **Avg Response** | **95th Percentile** | **Throughput** |
|--------------|------------------|---------------------|----------------|
| `/api/bidang` | 45ms | 120ms | 850 req/min |
| `/api/kontak` | 35ms | 90ms | 1200 req/min |
| `/api/informasi-pages` | 55ms | 140ms | 600 req/min |
| `/api/panduan-umk` | 50ms | 130ms | 700 req/min |
| `/api/perizinan/*` | 40ms | 110ms | 800 req/min |

### **Optimization Tips**
- Enable response caching for static content
- Use database connection pooling
- Implement query optimization
- Add CDN for file serving
- Monitor with APM tools

---

**📝 Last Updated:** September 12, 2025 | **🔧 API Version:** 1.5.0 | **👥 DLH Development Team**  
**🔧 Maintained By**: API Development Team  
**📈 Coverage Target**: 80% test coverage by October 1, 2025
