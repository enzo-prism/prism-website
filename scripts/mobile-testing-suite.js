#!/usr/bin/env node

/**
 * Mobile Testing Suite
 * Comprehensive mobile performance and usability testing
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Mobile Testing Suite');
console.log('=======================');

// Test Results Object
const testResults = {
  components: [],
  performance: [],
  accessibility: [],
  usability: [],
  overall: { passed: 0, failed: 0, warnings: 0 }
};

function addResult(category, test, status, message, details = null) {
  const result = { test, status, message, details, timestamp: new Date().toISOString() };
  testResults[category].push(result);
  testResults.overall[status]++;
  
  const icon = status === 'passed' ? '✅' : status === 'failed' ? '❌' : '⚠️';
  console.log(`${icon} ${test}: ${message}`);
  if (details) console.log(`   Details: ${details}`);
}

// Component Tests
console.log('\n📱 Testing Mobile Components:');

const componentsDir = path.join(__dirname, '../components');
const mobileComponentsDir = path.join(componentsDir, 'mobile');

// Check if mobile components exist
const requiredMobileComponents = [
  'MobileHeroCard.tsx',
  'MobileStatCard.tsx', 
  'MobileStrategyCard.tsx',
  'MobileInfoCard.tsx',
  'MobileContentSection.tsx',
  'MobileSectionDivider.tsx',
  'MobileInteractiveWidget.tsx'
];

const blogMobileComponents = [
  'mobile-blog-grid.tsx',
  'mobile-hero-section.tsx',
  'mobile-filter-buttons.tsx',
  'mobile-blog-post-card.tsx'
];

requiredMobileComponents.forEach(component => {
  const filePath = path.join(mobileComponentsDir, component);
  if (fs.existsSync(filePath)) {
    addResult('components', `Mobile Component: ${component}`, 'passed', 'Component exists');
  } else {
    addResult('components', `Mobile Component: ${component}`, 'failed', 'Component missing');
  }
});

blogMobileComponents.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    addResult('components', `Blog Component: ${component}`, 'passed', 'Component exists');
    
    // Check for mobile-specific patterns
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for useMobile hook
    if (content.includes('useMobile')) {
      addResult('components', `${component} Mobile Detection`, 'passed', 'Uses mobile detection hook');
    } else {
      addResult('components', `${component} Mobile Detection`, 'warnings', 'Missing mobile detection');
    }
    
    // Check for reduced motion support
    if (content.includes('prefers-reduced-motion') || content.includes('reducedMotion')) {
      addResult('components', `${component} Reduced Motion`, 'passed', 'Supports reduced motion preferences');
    } else {
      addResult('components', `${component} Reduced Motion`, 'warnings', 'Missing reduced motion support');
    }
    
    // Check for touch targets
    if (content.includes('44px') || content.includes('mobile-touch-target')) {
      addResult('components', `${component} Touch Targets`, 'passed', 'Includes proper touch target sizing');
    } else {
      addResult('components', `${component} Touch Targets`, 'warnings', 'Missing touch target optimization');
    }
    
  } else {
    addResult('components', `Blog Component: ${component}`, 'failed', 'Component missing');
  }
});

// Performance Tests
console.log('\n🚀 Testing Performance Optimizations:');

const globalsCSS = path.join(__dirname, '../app/globals.css');
if (fs.existsSync(globalsCSS)) {
  const cssContent = fs.readFileSync(globalsCSS, 'utf8');
  
  // Check for GPU acceleration
  if (cssContent.includes('translateZ(0)') && cssContent.includes('will-change')) {
    addResult('performance', 'GPU Acceleration', 'passed', 'CSS includes GPU acceleration utilities');
  } else {
    addResult('performance', 'GPU Acceleration', 'failed', 'Missing GPU acceleration utilities');
  }
  
  // Check for mobile-specific media queries
  if (cssContent.includes('@media (max-width: 768px)')) {
    addResult('performance', 'Mobile Media Queries', 'passed', 'Includes mobile-specific CSS');
  } else {
    addResult('performance', 'Mobile Media Queries', 'failed', 'Missing mobile media queries');
  }
  
  // Check for touch optimizations
  if (cssContent.includes('mobile-touch-target') && cssContent.includes('min-height: 44px')) {
    addResult('performance', 'Touch Target Sizing', 'passed', 'Includes proper touch target sizing');
  } else {
    addResult('performance', 'Touch Target Sizing', 'warnings', 'Missing touch target optimizations');
  }
  
  // Check for zoom prevention
  if (cssContent.includes('touch-action: manipulation') && cssContent.includes('user-scalable=no')) {
    addResult('performance', 'Zoom Prevention', 'passed', 'Includes zoom prevention rules');
  } else {
    addResult('performance', 'Zoom Prevention', 'warnings', 'Missing zoom prevention optimizations');
  }
  
  // Check for scroll optimizations
  if (cssContent.includes('-webkit-overflow-scrolling: touch')) {
    addResult('performance', 'Scroll Optimization', 'passed', 'Includes touch scroll optimization');
  } else {
    addResult('performance', 'Scroll Optimization', 'warnings', 'Missing scroll optimizations');
  }
  
  // Check for scrollbar hiding
  if (cssContent.includes('scrollbar-hide') && cssContent.includes('::-webkit-scrollbar')) {
    addResult('performance', 'Scrollbar Management', 'passed', 'Includes scrollbar hiding utilities');
  } else {
    addResult('performance', 'Scrollbar Management', 'warnings', 'Missing scrollbar management');
  }
  
} else {
  addResult('performance', 'CSS File', 'failed', 'globals.css not found');
}

// Check for performance utilities
const performanceUtilsPath = path.join(__dirname, '../utils/mobile-performance.ts');
if (fs.existsSync(performanceUtilsPath)) {
  addResult('performance', 'Performance Monitoring', 'passed', 'Mobile performance utilities exist');
  
  const perfContent = fs.readFileSync(performanceUtilsPath, 'utf8');
  if (perfContent.includes('Core Web Vitals') || perfContent.includes('PerformanceObserver')) {
    addResult('performance', 'Core Web Vitals', 'passed', 'Includes Core Web Vitals monitoring');
  } else {
    addResult('performance', 'Core Web Vitals', 'warnings', 'Missing Core Web Vitals monitoring');
  }
} else {
  addResult('performance', 'Performance Monitoring', 'failed', 'Mobile performance utilities missing');
}

// Accessibility Tests
console.log('\n♿ Testing Accessibility Features:');

const accessibilityHookPath = path.join(__dirname, '../hooks/use-mobile-accessibility.ts');
if (fs.existsSync(accessibilityHookPath)) {
  addResult('accessibility', 'Accessibility Hook', 'passed', 'Mobile accessibility hook exists');
  
  const accContent = fs.readFileSync(accessibilityHookPath, 'utf8');
  
  // Check for screen reader support
  if (accContent.includes('announceToScreenReader') || accContent.includes('aria-live')) {
    addResult('accessibility', 'Screen Reader Support', 'passed', 'Includes screen reader announcements');
  } else {
    addResult('accessibility', 'Screen Reader Support', 'warnings', 'Missing screen reader support');
  }
  
  // Check for haptic feedback
  if (accContent.includes('vibrate') || accContent.includes('haptic')) {
    addResult('accessibility', 'Haptic Feedback', 'passed', 'Includes haptic feedback support');
  } else {
    addResult('accessibility', 'Haptic Feedback', 'warnings', 'Missing haptic feedback');
  }
  
  // Check for focus management
  if (accContent.includes('manageFocus') || accContent.includes('focus')) {
    addResult('accessibility', 'Focus Management', 'passed', 'Includes focus management utilities');
  } else {
    addResult('accessibility', 'Focus Management', 'warnings', 'Missing focus management');
  }
  
} else {
  addResult('accessibility', 'Accessibility Hook', 'failed', 'Mobile accessibility hook missing');
}

// Check for ARIA attributes in components
const checkAriaInComponents = (dir) => {
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.tsx'));
  let ariaCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('aria-') || content.includes('role=')) {
      ariaCount++;
    }
  });
  
  return ariaCount;
};

const componentsWithAria = checkAriaInComponents(componentsDir);
if (componentsWithAria > 5) {
  addResult('accessibility', 'ARIA Attributes', 'passed', `${componentsWithAria} components include ARIA attributes`);
} else if (componentsWithAria > 0) {
  addResult('accessibility', 'ARIA Attributes', 'warnings', `Only ${componentsWithAria} components include ARIA attributes`);
} else {
  addResult('accessibility', 'ARIA Attributes', 'failed', 'No components include ARIA attributes');
}

// Usability Tests
console.log('\n👆 Testing Mobile Usability:');

// Check for mobile-first approach in main blog files
const blogPagePath = path.join(__dirname, '../app/blog/BlogPage.tsx');
if (fs.existsSync(blogPagePath)) {
  const blogContent = fs.readFileSync(blogPagePath, 'utf8');
  
  if (blogContent.includes('MobileHeroSection') || blogContent.includes('mobile')) {
    addResult('usability', 'Mobile-First Blog Page', 'passed', 'Blog page uses mobile-optimized components');
  } else {
    addResult('usability', 'Mobile-First Blog Page', 'warnings', 'Blog page may not be mobile-optimized');
  }
} else {
  addResult('usability', 'Mobile-First Blog Page', 'failed', 'Blog page not found');
}

const blogPostsListPath = path.join(__dirname, '../app/blog/BlogPostsList.tsx');
if (fs.existsSync(blogPostsListPath)) {
  const listContent = fs.readFileSync(blogPostsListPath, 'utf8');
  
  if (listContent.includes('useMobile') && listContent.includes('MobileBlogGrid')) {
    addResult('usability', 'Responsive Blog Grid', 'passed', 'Blog list uses responsive grid components');
  } else {
    addResult('usability', 'Responsive Blog Grid', 'warnings', 'Blog list may not be fully responsive');
  }
  
  if (listContent.includes('MobileFilterButtons')) {
    addResult('usability', 'Mobile Filter Buttons', 'passed', 'Uses mobile-optimized filter buttons');
  } else {
    addResult('usability', 'Mobile Filter Buttons', 'warnings', 'Missing mobile filter optimization');
  }
} else {
  addResult('usability', 'Responsive Blog Grid', 'failed', 'Blog posts list not found');
}

// Check for viewport meta tag (would be in layout or head)
const layoutFiles = [
  path.join(__dirname, '../app/layout.tsx'),
  path.join(__dirname, '../app/head.tsx')
];

let hasViewportMeta = false;
let hasZoomPrevention = false;
layoutFiles.forEach(layoutPath => {
  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    if (layoutContent.includes('viewport') && layoutContent.includes('width=device-width')) {
      hasViewportMeta = true;
      
      // Check for zoom prevention in viewport meta tag
      if (layoutContent.includes('user-scalable=no') && layoutContent.includes('maximum-scale=1')) {
        hasZoomPrevention = true;
      }
    }
  }
});

if (hasViewportMeta) {
  addResult('usability', 'Viewport Meta Tag', 'passed', 'Includes proper viewport meta tag');
} else {
  addResult('usability', 'Viewport Meta Tag', 'warnings', 'Viewport meta tag not found in layout files');
}

if (hasZoomPrevention) {
  addResult('usability', 'Zoom Prevention Meta Tag', 'passed', 'Viewport meta tag prevents zooming');
} else {
  addResult('usability', 'Zoom Prevention Meta Tag', 'warnings', 'Viewport meta tag allows zooming');
}

// Final Results
console.log('\n📊 Test Summary:');
console.log('================');
console.log(`✅ Passed: ${testResults.overall.passed}`);
console.log(`⚠️  Warnings: ${testResults.overall.warnings}`);
console.log(`❌ Failed: ${testResults.overall.failed}`);

const totalTests = testResults.overall.passed + testResults.overall.warnings + testResults.overall.failed;
const successRate = Math.round((testResults.overall.passed / totalTests) * 100);

console.log(`\n📈 Success Rate: ${successRate}%`);

// Recommendations
console.log('\n💡 Recommendations:');
console.log('===================');

if (testResults.overall.failed > 0) {
  console.log('🔴 Critical Issues:');
  ['components', 'performance', 'accessibility', 'usability'].forEach(category => {
    const failures = testResults[category].filter(r => r.status === 'failed');
    failures.forEach(failure => {
      console.log(`   • ${failure.test}: ${failure.message}`);
    });
  });
}

if (testResults.overall.warnings > 0) {
  console.log('\n🟡 Improvements Needed:');
  ['components', 'performance', 'accessibility', 'usability'].forEach(category => {
    const warnings = testResults[category].filter(r => r.status === 'warnings');
    warnings.forEach(warning => {
      console.log(`   • ${warning.test}: ${warning.message}`);
    });
  });
}

console.log('\n🎯 Next Steps:');
console.log('1. Test on actual mobile devices');
console.log('2. Run Lighthouse mobile audit');
console.log('3. Test with screen readers (VoiceOver, TalkBack)');
console.log('4. Validate touch interactions');
console.log('5. Test on slow network connections');
console.log('6. Verify battery performance impact');

// Save results to file
const resultsPath = path.join(__dirname, '../mobile-test-results.json');
fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2));
console.log(`\n📄 Detailed results saved to: ${resultsPath}`);

// Exit with appropriate code
const exitCode = testResults.overall.failed > 0 ? 1 : 0;
process.exit(exitCode);