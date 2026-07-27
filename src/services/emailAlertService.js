const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendHealthAlertEmail = async (formData, selectedConditions = []) => {
  const alertConditions = selectedConditions.filter((condition) => condition !== 'None');

  if (alertConditions.length === 0) {
    return { skipped: true };
  }

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS alert skipped: missing EmailJS environment variables.');
    return { skipped: true };
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: "service_fxg6cre",
      template_id: "template_62bvfw2",
      user_id: "iNunRdDMtxu81iqBl",
      template_params: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        address: formData.address,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        medicalConditions: alertConditions.join(', '),
        additionalInfo: formData.additionalInfo,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send health alert email.');
  }

  return { skipped: false };
};
