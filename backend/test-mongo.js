require('dotenv').config();
const mongoose = require('mongoose');

console.log('=== MongoDB Connection Test ===\n');
console.log('Environment Variables:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI ? '✅ Loaded' : '❌ Not Found');
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);

if (!process.env.MONGO_URI) {
  console.error('\n❌ ERROR: MONGO_URI not found in .env file');
  process.exit(1);
}

console.log('\nAttempting to connect with URI:', process.env.MONGO_URI.replace(/\/\/.*@/, '//***@'));

async function testConnection() {
  try {
    // Test 1: Basic connection
    console.log('\n📡 Test 1: Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🖥️  Host:', mongoose.connection.host);
    
    // Test 2: List collections
    console.log('\n📋 Test 2: Listing collections...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections found:', collections.length);
    if (collections.length > 0) {
      collections.forEach(col => console.log('  -', col.name));
    } else {
      console.log('  (No collections yet - this is normal for a new database)');
    }
    
    // Test 3: Create a test document
    console.log('\n✍️  Test 3: Creating test document...');
    const testCollection = mongoose.connection.db.collection('test');
    const result = await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('✅ Test document created with ID:', result.insertedId);
    
    // Clean up
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('🧹 Test document cleaned up');
    
    await mongoose.disconnect();
    console.log('\n✅ All tests passed! MongoDB connection is working correctly.');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    
    // Provide specific solutions based on error type
    if (error.message.includes('IP')) {
      console.error('\n💡 SOLUTION: IP Whitelist Issue');
      console.error('1. Go to MongoDB Atlas → Network Access');
      console.error('2. Add IP: 0.0.0.0/0 (allows all IPs)');
      console.error('3. Wait 1-2 minutes for changes to take effect');
    } else if (error.message.includes('Authentication')) {
      console.error('\n💡 SOLUTION: Authentication Issue');
      console.error('1. Verify username and password in MongoDB Atlas');
      console.error('2. Check Database Access settings');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('\n💡 SOLUTION: DNS Resolution Issue');
      console.error('1. Check internet connection');
      console.error('2. Try: ipconfig /flushdns');
      console.error('3. Disable VPN if using');
    } else if (error.message.includes('ETIMEDOUT') || error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 SOLUTION: Network/Firewall Issue');
      console.error('1. Temporarily disable Windows Defender Firewall');
      console.error('2. Disable antivirus software');
      console.error('3. Disable VPN');
      console.error('4. Check if cluster is running in MongoDB Atlas');
    }
    
    console.error('\nFull Error Object:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

testConnection();