import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Book from '../models/Book.js';
import Borrow from '../models/Borrow.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Book.deleteMany();
    await Borrow.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@library.com',
      password: 'admin123',
      role: 'admin',
    });

    // Create regular users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'user',
    });

    console.log('✅ Created users');

    // Create books
    const books = await Book.insertMany([
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '978-0-7432-7356-5',
        category: 'Fiction',
        publishedYear: 1925,
        publisher: 'Scribner',
        pages: 180,
        description: 'A classic American novel set in the Jazz Age.',
        totalCopies: 5,
        availableCopies: 3,
        rating: 4.5,
        ratingCount: 1250,
      },
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '978-0-452-28423-4',
        category: 'Fiction',
        publishedYear: 1949,
        publisher: 'Secker & Warburg',
        pages: 328,
        description: 'A dystopian social science fiction novel.',
        totalCopies: 4,
        availableCopies: 0,
        rating: 4.8,
        ratingCount: 2100,
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '978-0-06-112008-4',
        category: 'Fiction',
        publishedYear: 1960,
        publisher: 'J. B. Lippincott & Co.',
        pages: 324,
        description: 'A novel about racial injustice in the American South.',
        totalCopies: 3,
        availableCopies: 2,
        rating: 4.7,
        ratingCount: 1800,
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        isbn: '978-0-14-143951-8',
        category: 'Romance',
        publishedYear: 1813,
        publisher: 'T. Egerton',
        pages: 432,
        description: 'A romantic novel of manners.',
        totalCopies: 2,
        availableCopies: 1,
        rating: 4.6,
        ratingCount: 1500,
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        isbn: '978-0-316-76948-0',
        category: 'Fiction',
        publishedYear: 1951,
        publisher: 'Little, Brown and Company',
        pages: 277,
        description: 'A story about teenage rebellion and alienation.',
        totalCopies: 6,
        availableCopies: 4,
        rating: 4.2,
        ratingCount: 980,
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K. Rowling',
        isbn: '978-0-439-70818-8',
        category: 'Fantasy',
        publishedYear: 1997,
        publisher: 'Bloomsbury',
        pages: 223,
        description: 'The first novel in the Harry Potter series.',
        totalCopies: 8,
        availableCopies: 5,
        rating: 4.9,
        ratingCount: 3500,
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        isbn: '978-0-547-92822-7',
        category: 'Fantasy',
        publishedYear: 1937,
        publisher: 'George Allen & Unwin',
        pages: 310,
        description: 'A fantasy novel about the adventures of Bilbo Baggins.',
        totalCopies: 4,
        availableCopies: 2,
        rating: 4.7,
        ratingCount: 2200,
      },
      {
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        isbn: '978-0-307-47427-1',
        category: 'Mystery',
        publishedYear: 2003,
        publisher: 'Doubleday',
        pages: 454,
        description: 'A mystery thriller novel.',
        totalCopies: 3,
        availableCopies: 0,
        rating: 4.3,
        ratingCount: 1600,
      },
      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        isbn: '978-0-553-38016-3',
        category: 'Science',
        publishedYear: 1988,
        publisher: 'Bantam Dell Publishing Group',
        pages: 256,
        description: 'A landmark volume in science writing.',
        totalCopies: 3,
        availableCopies: 3,
        rating: 4.4,
        ratingCount: 890,
      },
      {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        isbn: '978-0-062-31609-7',
        category: 'History',
        publishedYear: 2011,
        publisher: 'Harper',
        pages: 443,
        description: 'An exploration of the history of the human species.',
        totalCopies: 5,
        availableCopies: 4,
        rating: 4.6,
        ratingCount: 1200,
      },
    ]);

    console.log('✅ Created books');

    // Create some borrow records
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const borrow1 = await Borrow.create({
      user: user1._id,
      book: books[0]._id,
      dueDate: dueDate,
      status: 'borrowed',
    });

    const borrow2 = await Borrow.create({
      user: user2._id,
      book: books[1]._id,
      dueDate: dueDate,
      status: 'borrowed',
    });

    // Update users with borrowed books
    user1.borrowedBooks.push(borrow1._id);
    await user1.save();

    user2.borrowedBooks.push(borrow2._id);
    await user2.save();

    console.log('✅ Created borrow records');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin - Email: admin@library.com, Password: admin123');
    console.log('User 1 - Email: john@example.com, Password: password123');
    console.log('User 2 - Email: jane@example.com, Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
