# Safari Desktop Scrolling Fix

> **Status (July 2026): historical fix log.** The CSS portion (section 2 below) was
> **removed** from `app/globals.css`: its `@supports (-webkit-appearance: none) and
> (not (-webkit-touch-callout: none))` condition is actually true in **all non-iOS
> browsers** (Chromium, Firefox), so the "Safari-only" `!important` overflow overrides
> applied everywhere and defeated every modal scroll lock (the mobile nav panel and the
> `/websites` order dialog lock `overflow: hidden` on `html`+`body`). The JavaScript
> portions (sections 1, 3, 4) remain live in `utils/scroll-optimization.ts` and
> `components/scroll-manager.tsx`. The global `overscroll-behavior: none` was also
> removed to restore pull-to-refresh; only scoped utilities remain.

## Issue Summary
Safari desktop browsers were experiencing scrolling issues due to a combination of CSS properties and JavaScript scroll optimizations that were primarily designed for mobile devices.

## Root Causes

1. **Height conflicts**: Setting `height: 100%` on both html and body elements caused Safari to miscalculate the scrollable area.

2. **Smooth scrolling**: The `scroll-smooth` class on the html element can cause performance issues and jerky scrolling in Safari desktop.

3. **Mobile optimizations applied to desktop**: Functions like `preventScrollBounce()` and `-webkit-overflow-scrolling: touch` were being applied to desktop Safari, causing unexpected behavior.

4. **Overscroll behavior**: Safari doesn't fully support `overscroll-behavior` property, which was being set universally.

## Fixes Applied

### 1. HTML/CSS Structure
- Removed `h-full` (height: 100%) from the html element in `layout.tsx`
- Updated body CSS to use `min-height: 100vh` instead of `height: 100%`
- Added `position: relative` and `overflow-y: auto` to body

### 2. Safari-Specific CSS (REMOVED July 2026)
Previously added "Safari desktop" CSS rules that disabled smooth scrolling and forced
overflow properties via `@supports` feature detection. The detection condition matched
every non-iOS engine, so these `!important` rules ran site-wide and broke dialog/menu
scroll locks. The block has been deleted from `app/globals.css`; do not reintroduce it.

### 3. JavaScript Optimizations
- Modified `scroll-optimization.ts` to only apply mobile optimizations on actual touch devices
- Updated `preventScrollBounce()` to only run on iOS devices
- Added Safari desktop detection in `ScrollManager`

### 4. Conditional Smooth Scrolling
- Smooth scrolling is now disabled on Safari desktop but retained for other browsers
- Mobile devices still get smooth scrolling for better UX

## Testing

To test the fixes:

1. Open the website in Safari on macOS
2. Try scrolling with:
   - Trackpad/mouse wheel
   - Scrollbar
   - Page Up/Down keys
   - Space bar

All methods should now work smoothly without:
- Jerky or stuck scrolling
- Page jumping
- Inability to scroll
- Rubber-band effects on desktop

## Browser Compatibility

The fixes maintain compatibility with:
- ✅ Safari (macOS) - Fixed
- ✅ Chrome (all platforms)
- ✅ Firefox (all platforms)
- ✅ Edge (all platforms)
- ✅ Safari (iOS) - Mobile optimizations preserved 