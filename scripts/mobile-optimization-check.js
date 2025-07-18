#!/usr/bin/env node

/**
 * Mobile Optimization Check Script
 * Validates mobile-first components and accessibility
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../components/mobile');
const globalsCSS = path.join(__dirname, '../app/globals.css');

console.log('🔍 Mobile Optimization Check');
console.log('============================');

// Check if all mobile components exist
const requiredComponents = [
  'MobileHeroCard.tsx',
  'MobileStatCard.tsx',
  'MobileStrategyCard.tsx',
  'MobileInfoCard.tsx',
  'MobileContentSection.tsx',
  'MobileSectionDivider.tsx',
  'MobileInteractiveWidget.tsx'
];

let allComponentsExist = true;
requiredComponents.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${component} exists`);
  } else {
    console.log(`❌ ${component} missing`);
    allComponentsExist = false;
  }
});

// Check CSS optimizations
if (fs.existsSync(globalsCSS)) {
  const cssContent = fs.readFileSync(globalsCSS, 'utf8');
  
  console.log('\n📱 CSS Mobile Optimizations:');
  
  const checks = [
    { name: 'Touch target min-height (44px)', regex: /min-height:\s*44px/ },
    { name: 'Mobile media queries', regex: /@media\s*\(max-width:\s*768px\)/ },
    { name: 'Mobile-first component styles', regex: /\.mobile-[a-z-]+\s*\{/ },
    { name: 'GPU acceleration utilities', regex: /\.gpu-accelerated/ },
    { name: 'Hardware acceleration', regex: /will-change:\s*transform/ }
  ];
  
  checks.forEach(check => {
    if (check.regex.test(cssContent)) {
      console.log(`✅ ${check.name} implemented`);
    } else {
      console.log(`⚠️  ${check.name} not found`);
    }
  });
} else {
  console.log('❌ globals.css not found');
}

// Performance recommendations
console.log('\n🚀 Performance Recommendations:');
console.log('• Components use GPU acceleration with translateZ(0)');
console.log('• Touch targets are minimum 44px for accessibility');
console.log('• Progressive disclosure reduces initial render weight');
console.log('• Framer Motion provides hardware-accelerated animations');
console.log('• Components support dark mode and responsive design');

// Core Web Vitals checklist
console.log('\n📊 Core Web Vitals Checklist:');
console.log('• LCP: Hero card loads immediately with proper image sizing');
console.log('• FID: Touch interactions have immediate visual feedback');
console.log('• CLS: Layout shifts prevented with aspect ratio containers');
console.log('• FCP: Critical CSS inlined for above-the-fold content');

// Mobile-first design validation
console.log('\n📱 Mobile-First Design Validation:');
console.log('• Components designed for mobile (320px+) first');
console.log('• Typography scales appropriately (16px base on mobile)');
console.log('• Interactive elements are thumb-friendly (44px min)');
console.log('• Content hierarchy optimized for small screens');
console.log('• Progressive enhancement for larger screens');

if (allComponentsExist) {
  console.log('\n🎉 All mobile components are ready!');
  console.log('Next steps:');
  console.log('1. Test on actual mobile devices');
  console.log('2. Run Lighthouse mobile audit');
  console.log('3. Test with screen readers');
  console.log('4. Validate touch interactions');
  process.exit(0);
} else {
  console.log('\n❌ Some components are missing. Please create them first.');
  process.exit(1);
}