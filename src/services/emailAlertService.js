const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const DEFAULT_EMAILJS_SERVICE_ID = 'service_fxg6cre';
const DEFAULT_EMAILJS_TEMPLATE_ID = 'template_62bvfw2';
const DEFAULT_EMAILJS_PUBLIC_KEY = 'iNunRdDMtxu81iqBl';

const getValue = (value) => {
  if (value === undefined || value === null || value === '') {
    return 'Not provided';
  }

  return value;
};

export const sendHealthAlertEmail = async (formData, selectedConditions = []) => {
  const alertConditions = selectedConditions.filter((condition) => condition !== 'None');
  const serviceId = EMAILJS_SERVICE_ID || DEFAULT_EMAILJS_SERVICE_ID;
  const templateId = EMAILJS_TEMPLATE_ID || DEFAULT_EMAILJS_TEMPLATE_ID;
  const publicKey = EMAILJS_PUBLIC_KEY || DEFAULT_EMAILJS_PUBLIC_KEY;

  if (alertConditions.length === 0) {
    return { skipped: true };
  }

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS alert skipped: missing EmailJS environment variables.');
    return { skipped: true };
  }

  const templateParams = {
    name: getValue(formData.fullName),
    time: new Date().toLocaleString('en-IN'),
    patient_name: getValue(formData.fullName),
    gender: getValue(formData.gender),
    date_of_birth: formData.dateOfBirth || formData.date_of_birth || `Age: ${getValue(formData.age)}`,
    blood_group: getValue(formData.bloodGroup || formData.blood_group),
    medical_conditions: alertConditions.join(', '),
    mobile_number: getValue(formData.phone),
    email: getValue(formData.email),
    address: getValue(formData.address),
    ward_number: getValue(formData.wardNumber || formData.ward_number || formData.ward),
    emergency_contact_name: getValue(formData.emergencyContactName),
    emergency_contact_number: getValue(formData.emergencyContactPhone),
    additional_info: getValue(formData.additionalInfo),
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send health alert email.');
  }

  return { skipped: false, templateParams };
};
