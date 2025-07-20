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
    console.log('🔍 [GTM Debug] Attempting to track view_pricing event...');
    
    try {
      if (typeof window === 'undefined') {
        console.warn('⚠️ [GTM Debug] Window is undefined - running on server side');
        return;
      }
      
      console.log('✅ [GTM Debug] Window is available, checking dataLayer...');
      
      if (!window.dataLayer) {
        console.warn('⚠️ [GTM Debug] DataLayer not found, initializing...');
        window.dataLayer = [];
      }
      
      window.dataLayer.push({
        event: 'view_pricing'
      });
      
      console.log('✅ [GTM Debug] Successfully pushed view_pricing event to dataLayer');
      console.log('📊 [GTM Debug] Current dataLayer:', window.dataLayer);
      
    } catch (error) {
      console.error('❌ [GTM Debug] Error in trackViewPricing:', error);
      console.error('📋 [GTM Debug] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        windowAvailable: typeof window !== 'undefined',
        dataLayerExists: typeof window !== 'undefined' && !!window.dataLayer
      });
    }
  };
  
  /**
   * دالة لإرسال حدث view_home إلى dataLayer
   */
  export const trackViewHome = () => {
    console.log('🔍 [GTM Debug] Attempting to track view_home event...');
    
    try {
      if (typeof window === 'undefined') {
        console.warn('⚠️ [GTM Debug] Window is undefined - running on server side');
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_home'
      });
      
      console.log('✅ [GTM Debug] Successfully pushed view_home event to dataLayer');
      
    } catch (error) {
      console.error('❌ [GTM Debug] Error in trackViewHome:', error);
    }
  };
  
  /**
   * دالة لإرسال حدث view_privacy إلى dataLayer
   */
  export const trackViewPrivacy = () => {
    console.log('🔍 [GTM Debug] Attempting to track view_privacy event...');
    
    try {
      if (typeof window === 'undefined') {
        console.warn('⚠️ [GTM Debug] Window is undefined - running on server side');
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_privacy'
      });
      
      console.log('✅ [GTM Debug] Successfully pushed view_privacy event to dataLayer');
      
    } catch (error) {
      console.error('❌ [GTM Debug] Error in trackViewPrivacy:', error);
    }
  };
  
  /**
   * دالة لإرسال حدث view_terms إلى dataLayer
   */
  export const trackViewTerms = () => {
    console.log('🔍 [GTM Debug] Attempting to track view_terms event...');
    
    try {
      if (typeof window === 'undefined') {
        console.warn('⚠️ [GTM Debug] Window is undefined - running on server side');
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_terms'
      });
      
      console.log('✅ [GTM Debug] Successfully pushed view_terms event to dataLayer');
      
    } catch (error) {
      console.error('❌ [GTM Debug] Error in trackViewTerms:', error);
    }
  };
  
  /**
   * دالة لإرسال حدث click_signup إلى dataLayer
   * @param location - اسم القسم أو المكان الذي يوجد به زر CTA
   */
  export const trackClickSignup = (location: string) => {
    console.log(`🔍 [GTM Debug] Attempting to track click_signup event for location: ${location}`);
    
    try {
      if (typeof window === 'undefined') {
        console.warn('⚠️ [GTM Debug] Window is undefined - running on server side');
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_signup',
        location
      });
      
      console.log(`✅ [GTM Debug] Successfully pushed click_signup event for location: ${location}`);
      
    } catch (error) {
      console.error('❌ [GTM Debug] Error in trackClickSignup:', error);
      console.error('📋 [GTM Debug] Location was:', location);
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
    console.log(`🔍 [GTM Debug] Attempting to track click_plan event for plan: ${plan_name}, period: ${billing_period}, location: ${location}`);
    
    try {
      if (typeof window === 'undefined') {
        console.warn('⚠️ [GTM Debug] Window is undefined - running on server side');
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_plan',
        plan_name,
        billing_period,
        location
      });
      
      console.log(`✅ [GTM Debug] Successfully pushed click_plan event for plan: ${plan_name}`);
      
    } catch (error) {
      console.error('❌ [GTM Debug] Error in trackClickPlan:', error);
      console.error('📋 [GTM Debug] Plan details were:', { plan_name, billing_period, location });
    }
  };