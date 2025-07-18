"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'

interface MobileAccessibilityOptions {
  enableHapticFeedback?: boolean
  enableVoiceOver?: boolean
  enableHighContrast?: boolean
  enableReducedMotion?: boolean
  enableLargeText?: boolean
}

interface MobileAccessibilityState {
  isScreenReaderActive: boolean
  prefersReducedMotion: boolean
  prefersHighContrast: boolean
  prefersLargeText: boolean
  deviceHasVibration: boolean
  touchDevice: boolean
  screenSize: 'small' | 'medium' | 'large'
}

export function useMobileAccessibility(options: MobileAccessibilityOptions = {}) {
  const [state, setState] = useState<MobileAccessibilityState>({
    isScreenReaderActive: false,
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersLargeText: false,
    deviceHasVibration: false,
    touchDevice: false,
    screenSize: 'medium'
  })

  const announcementRef = useRef<HTMLDivElement>(null)

  // Initialize accessibility state
  useEffect(() => {
    const checkAccessibilityPreferences = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches
      const prefersLargeText = window.matchMedia('(prefers-font-size: large)').matches
      const deviceHasVibration = 'vibrate' in navigator
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // Detect screen reader (rough approximation)
      const isScreenReaderActive = !!(
        window.speechSynthesis || 
        (window as any).navigator?.userAgent?.includes('NVDA') ||
        (window as any).navigator?.userAgent?.includes('JAWS') ||
        (window as any).navigator?.userAgent?.includes('VoiceOver')
      )

      // Determine screen size
      const screenSize = window.innerWidth < 375 ? 'small' : 
                        window.innerWidth < 768 ? 'medium' : 'large'

      setState({
        isScreenReaderActive,
        prefersReducedMotion,
        prefersHighContrast,
        prefersLargeText,
        deviceHasVibration,
        touchDevice,
        screenSize
      })
    }

    checkAccessibilityPreferences()

    // Listen for preference changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
    const largeTextQuery = window.matchMedia('(prefers-font-size: large)')

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, prefersReducedMotion: e.matches }))
    }

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, prefersHighContrast: e.matches }))
    }

    const handleLargeTextChange = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, prefersLargeText: e.matches }))
    }

    const handleResize = () => {
      const screenSize = window.innerWidth < 375 ? 'small' : 
                        window.innerWidth < 768 ? 'medium' : 'large'
      setState(prev => ({ ...prev, screenSize }))
    }

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    highContrastQuery.addEventListener('change', handleHighContrastChange)
    largeTextQuery.addEventListener('change', handleLargeTextChange)
    window.addEventListener('resize', handleResize)

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
      highContrastQuery.removeEventListener('change', handleHighContrastChange)
      largeTextQuery.removeEventListener('change', handleLargeTextChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Haptic feedback function
  const triggerHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!options.enableHapticFeedback || !state.deviceHasVibration) return

    const vibrationPattern = {
      light: 30,
      medium: 50,
      heavy: 100
    }

    navigator.vibrate(vibrationPattern[type])
  }, [options.enableHapticFeedback, state.deviceHasVibration])

  // Screen reader announcement
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!options.enableVoiceOver || !state.isScreenReaderActive) return

    if (announcementRef.current) {
      announcementRef.current.setAttribute('aria-live', priority)
      announcementRef.current.textContent = message
      
      // Clear after a delay to allow for re-announcements
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = ''
        }
      }, 1000)
    }
  }, [options.enableVoiceOver, state.isScreenReaderActive])

  // Focus management
  const manageFocus = useCallback((element: HTMLElement | null) => {
    if (!element) return

    // Ensure element is focusable
    if (element.tabIndex === -1) {
      element.tabIndex = 0
    }

    // Focus with a small delay to ensure proper timing
    setTimeout(() => {
      element.focus()
    }, 100)
  }, [])

  // Touch target validation
  const validateTouchTarget = useCallback((element: HTMLElement) => {
    if (!state.touchDevice) return true

    const rect = element.getBoundingClientRect()
    const minSize = 44 // 44px minimum touch target size
    
    return rect.width >= minSize && rect.height >= minSize
  }, [state.touchDevice])

  // Get appropriate animation settings
  const getAnimationSettings = useCallback(() => {
    if (state.prefersReducedMotion) {
      return {
        duration: 0.01,
        ease: 'linear' as const,
        reduce: true
      }
    }

    return {
      duration: state.screenSize === 'small' ? 0.3 : 0.5,
      ease: 'easeOut' as const,
      reduce: false
    }
  }, [state.prefersReducedMotion, state.screenSize])

  // Get color scheme settings
  const getColorScheme = useCallback(() => {
    return {
      highContrast: state.prefersHighContrast,
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      contrastRatio: state.prefersHighContrast ? 7 : 4.5 // WCAG AA vs AAA
    }
  }, [state.prefersHighContrast])

  // Get typography settings
  const getTypographySettings = useCallback(() => {
    const baseSize = state.prefersLargeText ? 18 : 16
    const scale = state.screenSize === 'small' ? 0.9 : 1

    return {
      baseFontSize: baseSize * scale,
      lineHeight: state.prefersLargeText ? 1.6 : 1.5,
      letterSpacing: state.prefersLargeText ? '0.02em' : 'normal'
    }
  }, [state.prefersLargeText, state.screenSize])

  // Create screen reader announcement element
  const ScreenReaderAnnouncement = useCallback(() => (
    <div
      ref={announcementRef}
      className="mobile-screen-reader-only"
      aria-live="polite"
      aria-atomic="true"
    />
  ), [])

  return {
    // State
    ...state,
    
    // Functions
    triggerHapticFeedback,
    announceToScreenReader,
    manageFocus,
    validateTouchTarget,
    getAnimationSettings,
    getColorScheme,
    getTypographySettings,
    
    // Components
    ScreenReaderAnnouncement,
    
    // Utility functions
    isSmallScreen: state.screenSize === 'small',
    isMediumScreen: state.screenSize === 'medium',
    isLargeScreen: state.screenSize === 'large',
    shouldReduceMotion: state.prefersReducedMotion,
    shouldUseHighContrast: state.prefersHighContrast,
    shouldUseLargeText: state.prefersLargeText,
    canUseHaptics: state.deviceHasVibration && options.enableHapticFeedback,
    canUseVoiceOver: state.isScreenReaderActive && options.enableVoiceOver,
    isTouchDevice: state.touchDevice
  }
}