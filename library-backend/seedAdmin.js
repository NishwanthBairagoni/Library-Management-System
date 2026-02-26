const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uri = "mongodb+srv://nishwanth2003_db_user:Fp6UcDC5bCdkGBCm@cluster0.q1hkyu9.mongodb.net/library_db?appName=Cluster0";

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    status: { type: String },
    name: { type: String }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

async function seedAdmin() {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = new User({
            email: 'admin@library.com',
            password: hashedPassword,
            role: 'ADMIN',
            status: 'APPROVED',
            name: 'System Admin'
        });

        await adminUser.save();
        console.log('Admin user seeded successfully. You can login with admin@library.com / admin123');
    } catch (err) {
        if (err.code === 11000) {
            console.log('Admin user already exists. Updating status to APPROVED and resetting password...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.updateOne({ email: 'admin@library.com' }, { status: 'APPROVED', password: hashedPassword, role: 'ADMIN' });
            console.log('Admin updated successfully.');
        } else {
            console.error('Error seeding admin user:', err);
        }
    } finally {
        mongoose.disconnect();
    }
}

seedAdmin();
