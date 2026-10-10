/**
 * Bandhanu WhatsApp Direct-to-Chat Routing Utility
 * Directly opens the chat section, completely bypassing the api.whatsapp.com landing page.
 */

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;
  return mobileRegex.test(ua) || (navigator.maxTouchPoints > 0 && window.innerWidth <= 768);
};

/**
 * Builds the direct-to-chat URL based on the device platform.
 * - Mobile: Uses 'whatsapp://send' to launch native WhatsApp directly into the chat thread.
 * - Desktop: Uses 'https://web.whatsapp.com/send' to load the chat section directly in WhatsApp Web.
 */
export const getWhatsAppDirectUrl = (phone: string, message: string = '', desktopMode: 'web' | 'app' = 'web'): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = message ? encodeURIComponent(message) : '';

  if (isMobileDevice()) {
    return encodedText
      ? `whatsapp://send?phone=${cleanPhone}&text=${encodedText}`
      : `whatsapp://send?phone=${cleanPhone}`;
  }

  if (desktopMode === 'app') {
    return encodedText
      ? `whatsapp://send?phone=${cleanPhone}&text=${encodedText}`
      : `whatsapp://send?phone=${cleanPhone}`;
  }

  // Desktop Web: Direct chat screen without intermediate api.whatsapp.com landing page
  return encodedText
    ? `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`
    : `https://web.whatsapp.com/send?phone=${cleanPhone}`;
};

/**
 * Triggers direct navigation to the WhatsApp chat section.
 */
export const openWhatsAppDirect = (phone: string, message: string = '', desktopMode: 'web' | 'app' = 'web'): void => {
  if (typeof window === 'undefined') return;

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = message ? encodeURIComponent(message) : '';
  const isMobile = isMobileDevice();

  if (isMobile) {
    const appUrl = encodedText
      ? `whatsapp://send?phone=${cleanPhone}&text=${encodedText}`
      : `whatsapp://send?phone=${cleanPhone}`;

    let appOpened = false;

    const onVisibilityChange = () => {
      if (document.hidden) {
        appOpened = true;
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange, { once: true });

    // Fallback if WhatsApp is not installed on mobile
    const fallbackTimer = setTimeout(() => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (!appOpened && !document.hidden) {
        window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`, '_blank');
      }
    }, 1500);

    window.location.href = appUrl;
  } else {
    // Desktop: Direct to chat section
    if (desktopMode === 'app') {
      window.location.href = encodedText
        ? `whatsapp://send?phone=${cleanPhone}&text=${encodedText}`
        : `whatsapp://send?phone=${cleanPhone}`;
    } else {
      const webUrl = encodedText
        ? `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`
        : `https://web.whatsapp.com/send?phone=${cleanPhone}`;
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  }
};
