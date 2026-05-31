import emailjs from '@emailjs/browser';

export function isEmailJsConfigured() {
  return Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}

export async function sendContactEmail({ name, email, message }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured. Add VITE_EMAILJS_* variables to your .env file.');
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: name,
      from_email: email,
      message,
      reply_to: email,
    },
    { publicKey }
  );
}
