# 🌱 Website Dinas Lingkungan Hidup Kota Tasikmalaya

Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya yang dibangun dengan Next.js 15, Prisma ORM, dan PostgreSQL.

## 🚀 Fitur Utama

### 🏠 **Halaman Public**
- **Beranda** - Dashboard utama dengan statistik dan informasi terkini
- **Profil Instansi** - Informasi tentang DLH Kota Tasikmalaya
- **Berita & Artikel** - Konten informatif tentang lingkungan hidup
- **Layanan Publik** - Informasi perizinan dan layanan masyarakat
- **Galeri Foto & Video** - Dokumentasi kegiatan DLH
- **Kontak** - Informasi kontak dan lokasi

### 🔧 **Panel Admin**
- **Dashboard Admin** - Statistik dan monitoring
- **Manajemen Konten** - CRUD berita, artikel, dan galeri
- **Manajemen Pengguna** - User management system
- **Pengaturan Website** - Konfigurasi logo, profil, dan settings
- **Manajemen Kepala Dinas** - Update sambutan dan foto pimpinan

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL dengan Prisma ORM
- **Authentication**: JWT-based auth
- **State Management**: React Context API
- **Image Handling**: Next.js Image Optimization
- **Development**: Prisma Dev (local PostgreSQL)

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
   npx prisma db push
   npx prisma generate
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

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

## 🗄️ Database Schema

### Core Models
- **User** - User management dengan role-based access
- **Article** - Artikel blog dengan kategori
- **News** - Berita dan pengumuman
- **Leader** - Data kepala dinas dan sambutan
- **SiteSetting** - Konfigurasi website
- **Event** - Agenda dan kegiatan

### Service Models
- **PermitApplication** - Aplikasi perizinan
- **Complaint** - Pengaduan masyarakat
- **Document** - Dokumen dan file download
- **GalleryPhoto/Video** - Media galeri

## 🔧 Development

### Running Development Server
```bash
npm run dev
```

### Database Operations
```bash
# Update database schema
npx prisma db push

# Generate Prisma client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma db push --force-reset
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
DATABASE_URL="your_postgresql_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="your_domain"
```

### Deployment Platforms
- **Vercel** (Recommended)
- **Railway**
- **DigitalOcean**
- **AWS**

## 📞 Support

Untuk pertanyaan dan dukungan:
- **Email**: admin@dlhtasik.go.id
- **GitHub Issues**: [Repository Issues](https://github.com/famss-star/dhl_kota_tasikmalaya/issues)

## 📄 License

This project is licensed under the MIT License.

---

**Dinas Lingkungan Hidup Kota Tasikmalaya** 🌿
*Bersama Menjaga Lingkungan untuk Masa Depan yang Berkelanjutan*
