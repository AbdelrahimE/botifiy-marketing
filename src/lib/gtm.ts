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
   * دالة لإرسال حدث view_pricing إلى dataLayer
   */
  export const trackViewPricing = () => {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      
      window.dataLayer.push({
        event: 'view_pricing'
      });
      
    } catch {
      // Silent error handling
    }
  };
  
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
   * دالة لإرسال حدث click_signup إلى dataLayer
   * @param location - اسم القسم أو المكان الذي يوجد به زر CTA
   */
  export const trackClickSignup = (location: string) => {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_signup',
        location
      });
      
    } catch {
      // Silent error handling
    }
  };
  
  /**
   * دالة لإرسال حدث click_plan إلى dataLayer
   * @param plan_name - اسم الخطة
   * @param billing_period - فترة الفوترة (شهري/سنوي)
   * @param location - اسم القسم أو المكان الذي يوجد به زر الخطة
   */
  export const trackClickPlan = (
    plan_name: string,
    billing_period: 'monthly' | 'yearly',
    location: string
  ) => {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_plan',
        plan_name,
        billing_period,
        location
      });
      
    } catch {
      // Silent error handling
    }
  };