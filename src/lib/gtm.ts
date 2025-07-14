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
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_pricing'
      });
    }
  };
  
  /**
   * دالة لإرسال حدث view_home إلى dataLayer
   */
  export const trackViewHome = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_home'
      });
    }
  };
  
  /**
   * دالة لإرسال حدث view_privacy إلى dataLayer
   */
  export const trackViewPrivacy = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_privacy'
      });
    }
  };
  
  /**
   * دالة لإرسال حدث view_terms إلى dataLayer
   */
  export const trackViewTerms = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_terms'
      });
    }
  };
  
  /**
   * دالة لإرسال حدث click_signup إلى dataLayer
   * @param location - اسم القسم أو المكان الذي يوجد به زر CTA
   */
  export const trackClickSignup = (location: string) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_signup',
        location
      });
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
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_plan',
        plan_name,
        billing_period,
        location
      });
    }
  };