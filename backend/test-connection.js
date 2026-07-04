// Test script to diagnose connectivity issues with Gemini API
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testConnection() {
  console.log("🔍 Testing connection to Gemini API...\n");
  
  // Test 1: Check API Key
  if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is not set in .env file");
    return;
  }
  console.log("✅ API Key found");
  
  // Test 2: Simple connectivity test
  console.log("\n📡 Testing network connectivity...");
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    
    console.log("Attempting to connect to generativelanguage.googleapis.com...");
    const startTime = Date.now();
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "Say 'Connection successful'" }] }],
        }),
        signal: controller.signal,
      }
    );
    
    clearTimeout(timeout);
    const duration = Date.now() - startTime;
    
    console.log(`⏱️  Response time: ${duration}ms`);
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Connection successful!");
      console.log("📝 Response:", data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text");
    } else {
      console.error(`❌ API returned error: ${response.status}`);
      const errorData = await response.json();
      console.error("Error details:", JSON.stringify(errorData, null, 2));
    }
  } catch (error) {
    console.error("\n❌ Connection failed!");
    console.error(`Error type: ${error.name}`);
    console.error(`Error message: ${error.message}`);
    
    if (error.cause) {
      console.error(`Error cause: ${error.cause.code || error.cause}`);
    }
    
    console.log("\n🔧 Troubleshooting steps:");
    console.log("1. Check your internet connection");
    console.log("2. Disable firewall/antivirus temporarily to test");
    console.log("3. If on corporate network, check proxy settings");
    console.log("4. Try: ping generativelanguage.googleapis.com");
    console.log("5. Verify API key is correct in .env file");
  }
}

testConnection();
