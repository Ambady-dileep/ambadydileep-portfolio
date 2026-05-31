import { siteConfig } from '../data/site';

export const portfolioWhatsAppMessage = `Hello Ambady,

I recently visited your portfolio and would like to connect regarding a potential project, collaboration, or opportunity.

Looking forward to speaking with you.

Best regards.`;

export const portfolioGmailSubject = 'Portfolio Inquiry / Professional Discussion';

export const portfolioGmailBody = `Hello Ambady,

I recently visited your portfolio and would like to connect regarding a project, collaboration, or professional opportunity.

Looking forward to hearing from you.

Best regards.`;

export function buildPortfolioWhatsAppUrl() {
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(portfolioWhatsAppMessage)}`;
}

export function buildPortfolioGmailUrl() {
  const subject = encodeURIComponent(portfolioGmailSubject);
  const body = encodeURIComponent(portfolioGmailBody);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}&su=${subject}&body=${body}`;
}
