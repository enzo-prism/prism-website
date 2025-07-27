#!/usr/bin/env node

const fetch = require('node-fetch');
const { spawn } = require('child_process');

async function testFormSubmission() {
  console.log('🧪 Testing Form Submission System\n');

  // Check if the server is running
  try {
    const response = await fetch('http://localhost:3000');
    if (!response.ok) {
      throw new Error('Server not responding');
    }
  } catch (error) {
    console.log('❌ Development server is not running');
    console.log('Please start the server with: pnpm dev\n');
    return;
  }

  // Test data
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    website: 'https://test.com',
    message: 'This is a test submission to verify the form functionality',
    whyPrismExcites: 'Testing the email notification system',
    source: 'exclusive-waitlist',
    timestamp: new Date().toISOString()
  };

  console.log('📤 Sending test submission...\n');
  console.log('Test Data:', JSON.stringify(testData, null, 2), '\n');

  try {
    const response = await fetch('http://localhost:3000/api/prism-leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Form submission successful!');
      console.log('Response:', JSON.stringify(result, null, 2), '\n');
      
      if (result.id) {
        console.log('📊 Database record created with ID:', result.id);
      }
      
      console.log('📧 Check your email at enzo@design-prism.com for the notification\n');
      
      console.log('🔍 To verify in Supabase:');
      console.log('1. Go to https://supabase.com/dashboard');
      console.log('2. Select your project');
      console.log('3. Navigate to Table Editor → form_submissions');
      console.log('4. Look for the test submission\n');
    } else {
      console.log('❌ Form submission failed');
      console.log('Status:', response.status);
      console.log('Error:', JSON.stringify(result, null, 2), '\n');
    }
  } catch (error) {
    console.log('❌ Error making request:', error.message);
    console.log('\nPossible issues:');
    console.log('- Development server not running');
    console.log('- Network connection issues');
    console.log('- Invalid API endpoint\n');
  }
}

// Run the test
testFormSubmission(); 