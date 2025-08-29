# 🌱 Website Dinas Lingkungan Hidup Kota Tasikmalaya

Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya yang dibangun dengan Next.js 15, Prisma ORM, dan SQLite.

## 🚀 Fitur Utama

### 🏠 **Halaman Public**
- **Beranda** - Dashboard utama dengan statistik dan informasi terkini
- **Profil Instansi** - Informasi tentang DLH Kota Tasikmalaya
- **Struktur Organisasi** - Hirarki organisasi dan pejabat
- **Berita & Artikel** - Konten informatif tentang lingkungan hidup
- **Layanan Publik** - Informasi perizinan dan layanan masyarakat
- **Galeri Foto & Video** - Dokumentasi kegiatan DLH
- **Kontak** - Informasi kontak dan lokasi

### 🔧 **Panel Admin**
- **Dashboard Admin** - Statistik dan monitoring
- **Manajemen Konten** - CRUD berita, artikel, dan galeri
- **Manajemen Pengguna** - User management system
- **SDM & Organisasi** - Manajemen staff dengan 6-tab system
  - Kepala Dinas, Wakil, Sekretaris, Kabid, Staff, **Preview**
- **Pengaturan Website** - Konfigurasi logo, profil, dan settings

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite dengan Prisma ORM
- **Authentication**: JWT-based auth
- **State Management**: React Context API
- **Image Handling**: Next.js Image Optimization
- **Development**: File-based SQLite database

## 📦 Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/famss-star/dhl_kota_tasikmalaya.git
   cd dhl_kota_tasikmalaya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database URL and other configurations.

4. **Setup database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migration
   npx prisma migrate dev --name init
   
   # Seed database dengan data awal
   npx tsx prisma/seed.ts
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Database Viewer: http://localhost:5555 (Prisma Studio)

## 🎯 **New Features (Latest)**

### 👥 **Advanced Staff Management**
- **6-Tab System**: Kepala Dinas, Wakil, Sekretaris, Kabid, Staff, Preview
- **Quota Management**: Otomatis validasi jumlah maksimal per posisi
- **Career History**: Track riwayat karir dan promosi staff
- **Preview Mode**: Lihat tampilan publik struktur organisasi
- **Role-based Access**: Pembatasan akses berdasarkan level

### 📊 **Enhanced Organization Structure**
- **Dynamic Hierarchy**: Struktur organisasi yang dapat dikustomisasi
- **Employee Statistics**: Dashboard statistik pegawai real-time
- **Photo Management**: Upload dan kelola foto pejabat
- **Public Preview**: Tampilan publik yang responsive

## 🔐 Default Admin Credentials

- **Email**: admin@dlhtasik.go.id
- **Password**: admin123

> ⚠️ **Penting**: Ganti password default setelah login pertama kali!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
└── data/                 # Static data and constants

prisma/
└── schema.prisma         # Database schema

public/                   # Static assets
```

## 🗄️ Database Setup (SQLite)

### Keunggulan SQLite untuk Project Ini
- ✅ **Zero Configuration** - Tidak perlu setup server database
- ✅ **File-based** - Database dalam satu file (`prisma/dev.db`)
- ✅ **Fast Development** - Setup instant, tidak ada dependency
- ✅ **Portable** - Mudah backup dan transfer
- ✅ **Windows Compatible** - Tidak ada path atau permission issues

### Core Models
- **User** - User management dengan role-based access
- **StaffMember** - Data pegawai dengan career history
- **Article** - Artikel blog dengan kategori
- **News** - Berita dan pengumuman
- **Leader** - Data kepala dinas dan sambutan
- **EmployeeStatistics** - Statistik pegawai real-time
- **SiteSetting** - Konfigurasi website
- **Event** - Agenda dan kegiatan

### Service Models
- **PermitApplication** - Aplikasi perizinan
- **Complaint** - Pengaduan masyarakat
- **Document** - Dokumen dan file download
- **GalleryPhoto/Video** - Media galeri

## 🔧 Development Commands

### Database Operations
```bash
# Generate Prisma client (after schema changes)
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name migration_name

# Reset database (CAUTION: deletes all data)
npx prisma migrate reset --force

# Seed database with sample data
npx tsx prisma/seed.ts

# Open database viewer
npx prisma studio
```

### Development Servers
```bash
# Main development (Next.js + SQLite)
npm run dev

# Development + Prisma Studio
npm run dev:studio

# Only Next.js app
npm run dev:app

# Alternative database options
npm run dev:sqlite    # Explicit SQLite mode
npm run dev:neon      # PostgreSQL (if configured)
```

### Building for Production
```bash
npm run build
npm start
```

## 🌟 Key Features

### 🎨 **Modern UI/UX**
- Responsive design untuk semua device
- Dark mode support
- Loading states dan error handling
- Toast notifications

### 📊 **Content Management**
- Rich text editor untuk artikel dan berita
- Image upload dan management
- SEO-friendly URLs dengan slug
- Publish/draft system

### 🖼️ **Media Management**
- Dynamic logo management
- Image optimization
- Video embedding (YouTube, TikTok)
- Fallback images

### 🔒 **Security**
- JWT authentication
- Role-based authorization
- Input validation dan sanitization
- CSRF protection

### 📱 **Performance**
- Server-side rendering (SSR)
- Image optimization
- Lazy loading
- Database query optimization

## 🚀 Deployment

### Environment Variables
```env
# Database (SQLite untuk development)
DATABASE_URL="file:./dev.db"

# Alternative PostgreSQL untuk production
# DATABASE_URL="postgresql://user:password@host:port/database"

# Authentication
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="your_domain"

# Environment
NODE_ENV="production"
```

### Production Setup
```bash
# Build aplikasi
npm run build

# Start production server
npm start
```

### Deployment Platforms
- **Vercel** (Recommended untuk Next.js)
- **Railway** (Support SQLite deployment)
- **DigitalOcean**
- **VPS** dengan SQLite atau PostgreSQL

### Database Migration ke Production
Jika ingin upgrade ke PostgreSQL di production:
1. Update `DATABASE_URL` ke PostgreSQL connection string
2. Update `provider = "postgresql"` di `schema.prisma`
3. Run `npx prisma generate`
4. Run `npx prisma migrate dev`
5. Run `npx tsx prisma/seed.ts`

## 📊 Monitoring & Analytics

### Database Statistics
- **Staff Management**: 11+ sample staff dengan career history
- **Content**: 4 artikel kategori, 2 artikel, 3 berita
- **Configuration**: 7+ site settings
- **Organization**: 3+ bidang struktur

### Performance Metrics
- **Page Load**: < 2s dengan SQLite
- **Database Query**: < 100ms average
- **Image Optimization**: Next.js automatic
- **Bundle Size**: Optimized untuk production

## 📞 Support

Untuk pertanyaan dan dukungan:
- **Email**: admin@dlhtasik.go.id
- **GitHub Issues**: [Repository Issues](https://github.com/famss-star/dhl_kota_tasikmalaya/issues)

## 📄 License

This project is licensed under the MIT License.

---

**Dinas Lingkungan Hidup Kota Tasikmalaya** 🌿
*Bersama Menjaga Lingkungan untuk Masa Depan yang Berkelanjutan*
