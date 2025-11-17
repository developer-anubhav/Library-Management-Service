import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Testing Backend Structure...\n');

const requiredFiles = [
  'package.json',
  '.env',
  '.gitignore',
  'README.md',
  'API_DOCUMENTATION.md',
  'SETUP_GUIDE.md',
  'src/server.js',
  'src/config/database.js',
  'src/models/User.js',
  'src/models/Book.js',
  'src/models/Borrow.js',
  'src/controllers/authController.js',
  'src/controllers/bookController.js',
  'src/controllers/userController.js',
  'src/controllers/borrowController.js',
  'src/routes/authRoutes.js',
  'src/routes/bookRoutes.js',
  'src/routes/userRoutes.js',
  'src/routes/borrowRoutes.js',
  'src/middleware/auth.js',
  'src/middleware/errorHandler.js',
  'src/middleware/validators.js',
  'src/utils/helpers.js',
  'src/utils/seed.js',
];

let allFilesExist = true;

requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('✅ All required files exist!');
  console.log('\n📦 Backend Structure:');
  console.log('   ├── Configuration files (package.json, .env, .gitignore)');
  console.log('   ├── Documentation (README, API_DOCUMENTATION, SETUP_GUIDE)');
  console.log('   ├── Models (User, Book, Borrow)');
  console.log('   ├── Controllers (auth, book, user, borrow)');
  console.log('   ├── Routes (auth, book, user, borrow)');
  console.log('   ├── Middleware (auth, errorHandler, validators)');
  console.log('   └── Utils (helpers, seed)');
  console.log('\n🎉 Backend setup is complete!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Install MongoDB (see SETUP_GUIDE.md)');
  console.log('   2. Configure .env file with MongoDB URI');
  console.log('   3. Run: npm run seed (to populate database)');
  console.log('   4. Run: npm run dev (to start server)');
  console.log('   5. Test API endpoints (see API_DOCUMENTATION.md)');
} else {
  console.log('❌ Some files are missing!');
  process.exit(1);
}
