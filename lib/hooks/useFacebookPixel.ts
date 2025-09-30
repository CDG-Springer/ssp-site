declare global {
  interface Window {
    fbq: any;
  }
}

interface FacebookPixelParams {
  content_name?: string;
  content_category?: string;
  content_type?: string;
  value?: number;
  currency?: string;
  platform?: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  [key: string]: unknown;
}

export const FB_PIXEL_ID = '655541226894618';

export const pageview = () => {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'PageView');
  console.log('Facebook Pixel PageView tracked');
};

export const useFacebookPixel = () => {
  const trackCompleteRegistration = (params?: FacebookPixelParams) => {
    if (typeof window === 'undefined' || !window.fbq) return;
    
    console.log('Tracking CompleteRegistration:', params);
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'User Registration',
      content_category: 'Registration',
      ...params
    });
  };

  const trackContact = (params?: FacebookPixelParams) => {
    if (typeof window === 'undefined' || !window.fbq) return;
    
    console.log('Tracking Contact:', params);
    window.fbq('track', 'Contact', {
      content_name: 'Contact Form',
      content_category: 'Contact',
      ...params
    });
  };

  const trackLead = (params?: FacebookPixelParams) => {
    if (typeof window === 'undefined' || !window.fbq) return;
    
    console.log('Tracking Lead:', params);
    window.fbq('track', 'Lead', {
      content_name: 'Show Shop Landing Form',
      content_category: 'Form Submission',
      value: 1.00,
      currency: 'BRL',
      ...params
    });
  };

  const trackSubmitApplication = (params?: FacebookPixelParams) => {
    if (typeof window === 'undefined' || !window.fbq) return;
    
    console.log('Tracking SubmitApplication:', params);
    window.fbq('track', 'SubmitApplication', {
      content_name: 'Application Submission',
      content_category: 'Application',
      ...params
    });
  };

  const trackViewContent = (params?: FacebookPixelParams) => {
    if (typeof window === 'undefined' || !window.fbq) return;
    
    console.log('Tracking ViewContent:', params);
    window.fbq('track', 'ViewContent', {
      content_name: 'Content View',
      content_category: 'Content',
      content_type: 'product',
      ...params
    });
  };

  return {
    trackCompleteRegistration,
    trackContact,
    trackLead,
    trackSubmitApplication,
    trackViewContent
  };
}; 