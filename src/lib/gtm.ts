// Google Tag Manager utilities

declare global {
    interface Window {
      dataLayer: Array<{
        event: string;
        [key: string]: unknown;
      }>;
    }
  }
  
  /**
   * دالة لإرسال حدث view_home إلى dataLayer
   */
  export const trackViewHome = () => {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_home'
      });
      
    } catch {
      // Silent error handling
    }
  };
  
  /**
   * دالة لإرسال حدث view_privacy إلى dataLayer
   */
  export const trackViewPrivacy = () => {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_privacy'
      });
      
    } catch {
      // Silent error handling
    }
  };
  
  /**
   * دالة لإرسال حدث view_terms إلى dataLayer
   */
  export const trackViewTerms = () => {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_terms'
      });
      
    } catch {
      // Silent error handling
    }
  };
  
  /**
   * تسجيل الضغط على زر التفعيل الموجود داخل قائمة الموبايل.
   */
  export const trackActivationClick = () => {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_activation',
        location: 'header-mobile'
      });
      
    } catch {
      // Silent error handling
    }
  };
