# MongoDB Atlas Connection Debugging Guide

## Current Configuration Analysis

### ✅ What's Fixed:
1. **Connection String** - Added database name `digihap` and required parameters
2. **Error Logging** - Enhanced to show full error details
3. **Connection Options** - Added timeouts for better error handling

## Systematic Debugging Steps

### **STEP 1: Verify dotenv is Loading Correctly**

Add this to the top of `server.js` to verify:

```javascript
require('dotenv').config();

// Add this verification
console.log('Environment Variables Loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ Not Found');
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
```

**What to check:**
- If MONGODB_URI shows "Not Found", your .env file is not being loaded
- Ensure `.env` is in the `backend/` directory (not root)
- Ensure there's no `.env.example` or `.env.sample` being used instead

---

### **STEP 2: Verify MongoDB Atlas Connection String Format**

**Correct Format:**
```
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

**Your Current String:**
```
mongodb+srv://rjtechtop5_db_user:KROLdnFlwYSFZt2H@cluster0.zdwqrln.mongodb.net/digihap?retryWrites=true&w=majority
```

**Checklist:**
- ✅ Username: `rjtechtop5_db_user`
- ✅ Password: `KROLdnFlwYSFZt2H`
- ✅ Cluster URL: `cluster0.zdwqrln.mongodb.net`
- ✅ Database Name: `digihap`
- ✅ Parameters: `retryWrites=true&w=majority`

**⚠️ CRITICAL: Check for Special Characters in Password**

Your password `KROLdnFlwYSFZt2H` appears to be URL-safe, but if your actual password contains any of these characters, they MUST be URL-encoded:

| Character | URL Encoded |
|-----------|-------------|
| @ | %40 |
| # | %23 |
| $ | %24 |
| % | %25 |
| & | %26 |
| + | %2B |
| = | %3D |

**Example:** If your password is `Pass@123`, it should be `Pass%40123` in the connection string.

---

### **STEP 3: Verify MongoDB Atlas Database User**

1. **Login to MongoDB Atlas** (https://cloud.mongodb.com/)
2. **Go to Database Access** (left sidebar)
3. **Find user:** `rjtechtop5_db_user`
4. **Verify:**
   - User exists ✅
   - Password is correct ✅
   - User has `Read and write to any database` or at least `Read and write to digihap database` ✅
   - Authentication Method is `Password` ✅

**Common Issues:**
- User was deleted
- Password was changed but not updated in .env
- User has insufficient permissions

---

### **STEP 4: Verify Network Access (IP Whitelist)**

1. **In MongoDB Atlas, go to Network Access** (left sidebar)
2. **Check IP Access List:**
   - ✅ `0.0.0.0/0` is added (allows all IPs)
   - ✅ Status is "Active" (not "Pending")
   - ✅ No typos in the IP address

**Alternative for Testing:**
Temporarily add your current IP address:
```bash
# Get your IP address
curl https://api.ipify.org
```

Then add that specific IP to MongoDB Atlas Network Access.

---

### **STEP 5: Verify Cluster Status**

1. **In MongoDB Atlas, go to Database** (left sidebar)
2. **Check cluster status:**
   - ✅ Cluster is not paused (free tier clusters pause after inactivity)
   - ✅ Cluster name matches: `Cluster0`
   - ✅ Cluster is not deleted
   - ✅ Cluster is not being modified

**To resume a paused cluster:**
- Click "Resume" button on the cluster
- Wait 1-2 minutes for it to fully start

---

### **STEP 6: Check Mongoose Version Compatibility**

Your `package.json` shows:
```json
"mongoose": "^8.0.0"
```

**Mongoose 8.x** requires **MongoDB Node.js Driver 6.x** and is compatible with MongoDB Atlas.

**To verify installed version:**
```bash
cd backend
npm list mongoose
```

**Expected output:**
```
digihap-backend@1.0.0 /path/to/backend
└── mongoose@8.x.x
```

---

### **STEP 7: Test DNS Resolution**

Run these commands in your terminal:

```bash
# Test DNS resolution
nslookup cluster0.zdwqrln.mongodb.net

# Test connectivity to MongoDB Atlas
telnet cluster0.zdwqrln.mongodb.net 27017

# Or using PowerShell
Test-NetConnection cluster0.zdwqrln.mongodb.net -Port 27017
```

**Expected Results:**
- DNS should resolve to IP addresses
- Connection should succeed (or timeout gracefully)

**If DNS fails:**
- Check your internet connection
- Try using a different DNS server (Google DNS: 8.8.8.8)
- Check if VPN/antivirus is blocking

---

### **STEP 8: Check for Firewall/VPN/Antivirus Issues**

**Temporarily disable:**
- Windows Defender Firewall
- Antivirus software
- VPN connections

**Then test the connection again.**

**If it works after disabling:**
- Add an exception for Node.js in your firewall/antivirus
- Configure VPN to allow MongoDB Atlas connections (ports 27015-27017)

---

### **STEP 9: Verify Node.js and npm Versions**

```bash
node -v
npm -v
```

**Recommended versions:**
- Node.js: v18.x or higher (LTS)
- npm: v9.x or higher

**To update Node.js:**
- Download from https://nodejs.org/
- Or use nvm (Node Version Manager)

---

### **STEP 10: Test Connection with MongoDB Compass**

1. **Download MongoDB Compass** (https://www.mongodb.com/try/download/compass)
2. **Create new connection with:**
   - **Hostname:** `cluster0.zdwqrln.mongodb.net`
   - **Port:** `27017`
   - **Username:** `rjtechtop5_db_user`
   - **Password:** `KROLdnFlwYSFZt2H`
   - **Authentication Database:** `admin`
   - **SRV Record:** ✅ Checked

3. **Click "Connect"**

**If Compass connects successfully:**
- Issue is in your Node.js code
- Check error logs more carefully

**If Compass fails:**
- Issue is with MongoDB Atlas configuration
- Double-check user credentials and network access

---

### **STEP 11: Run Enhanced Debugging**

Start your server with:
```bash
cd backend
npm run dev
```

**Look for these logs:**
```
Attempting to connect to MongoDB...
Connection String: mongodb+srv://***@cluster0.zdwqrln.mongodb.net/digihap?retryWrites=true&w=majority
```

**If connection fails, you'll now see:**
```
❌ Error connecting to MongoDB:
Error Name: MongooseServerSelectionError
Error Message: Could not connect to any servers in your MongoDB Atlas cluster...
Full Error Object: {
  "name": "MongooseServerSelectionError",
  "message": "Could not connect to any servers in your MongoDB Atlas cluster...",
  "reason": {
    "type": "unknown",
    "servers": {
      "cluster0-shard-00-00.zdwqrln.mongodb.net:27017": {
        "error": {
          "name": "error",
          "message": "getaddrinfo ENOTFOUND cluster0-shard-00-00.zdwqrln.mongodb.net"
        }
      }
    }
  }
}
```

**Key things to look for in the error:**
- `ENOTFOUND` = DNS resolution issue
- `ETIMEDOUT` = Network/firewall issue
- `ECONNREFUSED` = Server not accepting connections
- `Authentication failed` = Wrong credentials

---

### **STEP 12: Common Solutions Based on Error Type**

#### **Error: `ENOTFOUND`**
**Solution:**
```bash
# Flush DNS cache
ipconfig /flushdns

# Try using MongoDB Compass to verify DNS works
# If Compass works, the issue is in your code
```

#### **Error: `ETIMEDOUT` or `ECONNREFUSED`**
**Solution:**
1. Check firewall/antivirus
2. Disable VPN
3. Try different network (mobile hotspot)
4. Verify cluster is running in Atlas

#### **Error: `Authentication failed`**
**Solution:**
1. Verify username and password in MongoDB Atlas
2. Check if password has special characters (URL encode them)
3. Ensure user has correct permissions

#### **Error: `Database name is required`**
**Solution:**
- Make sure database name is in connection string
- Format: `mongodb+srv://...@cluster.net/DATABASE_NAME?params`

---

### **STEP 13: Minimal Connection Test**

Create a test file `backend/test-connection.js`:

```javascript
require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Testing MongoDB Atlas Connection...');
    console.log('URI:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//***@'));
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas');
    console.log('Database:', mongoose.connection.db.databaseName);
    
    await mongoose.disconnect();
    console.log('Disconnected successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ CONNECTION FAILED:');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('\nFull Error:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

testConnection();
```

Run it:
```bash
node test-connection.js
```

---

### **STEP 14: Information Needed for Further Help**

If the issue persists, please provide:

1. **Full error output** from the enhanced logging
2. **Output of these commands:**
   ```bash
   node -v
   npm -v
   npm list mongoose
   ```
3. **MongoDB Atlas details:**
   - Cluster name
   - Database user username (not password)
   - Region where cluster is hosted
4. **Result of DNS test:**
   ```bash
   nslookup cluster0.zdwqrln.mongodb.net
   ```

---

## Quick Fix Checklist

- [ ] Updated connection string with database name and parameters
- [ ] Verified .env file is in backend/ directory
- [ ] Verified MongoDB Atlas user exists and has correct permissions
- [ ] Verified IP 0.0.0.0/0 is added and active in Network Access
- [ ] Verified cluster is running (not paused)
- [ ] Checked for special characters in password (URL encoded if needed)
- [ ] Tested connection with MongoDB Compass
- [ ] Disabled firewall/antivirus temporarily for testing
- [ ] Verified Node.js version is v18+

## Next Steps

1. **Update your .env** with the corrected connection string (already done above)
2. **Restart your server:** `npm run dev`
3. **Check the enhanced error logs** for detailed error information
4. **Follow the debugging steps** above based on the error you see

The enhanced error logging will now show you the exact root cause of the connection failure.