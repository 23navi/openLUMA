export type ClassroomLanguageEntry = {
  code: string;
  label: string;
  shortLabel: string;
  promptLabel: string;
  previewText: string;
  noImagesAvailableText: string;
  noneText: string;
  quizFallbackComment: string;
};

export const supportedClassroomLanguages = [
  {
    code: 'en-US',
    label: 'English',
    shortLabel: 'EN',
    promptLabel: 'English',
    previewText: 'Welcome to AI Classroom',
    noImagesAvailableText: 'No images available',
    noneText: 'None',
    quizFallbackComment: 'Answer received. Please refer to the standard answer.',
  },
  {
    code: 'hi-IN',
    label: 'हिन्दी',
    shortLabel: 'HI',
    promptLabel: 'Hindi',
    previewText: 'AI कक्षा में आपका स्वागत है',
    noImagesAvailableText: 'कोई चित्र उपलब्ध नहीं है',
    noneText: 'कोई नहीं',
    quizFallbackComment: 'उत्तर प्राप्त हुआ। कृपया मानक उत्तर देखें।',
  },
  {
    code: 'gu-IN',
    label: 'ગુજરાતી',
    shortLabel: 'GU',
    promptLabel: 'Gujarati',
    previewText: 'AI વર્ગમાં આપનું સ્વાગત છે',
    noImagesAvailableText: 'કોઈ છબીઓ ઉપલબ્ધ નથી',
    noneText: 'કોઈ નહીં',
    quizFallbackComment: 'જવાબ પ્રાપ્ત થયો. કૃપા કરીને માનક જવાબ જુઓ.',
  },
  {
    code: 'mr-IN',
    label: 'मराठी',
    shortLabel: 'MR',
    promptLabel: 'Marathi',
    previewText: 'AI वर्गात तुमचे स्वागत आहे',
    noImagesAvailableText: 'कोणतीही चित्रे उपलब्ध नाहीत',
    noneText: 'काहीही नाही',
    quizFallbackComment: 'उत्तर मिळाले. कृपया मानक उत्तर पाहा.',
  },
] as const satisfies readonly ClassroomLanguageEntry[];

export type ClassroomLanguage = (typeof supportedClassroomLanguages)[number]['code'];

export const defaultClassroomLanguage: ClassroomLanguage = 'en-US';

function getClassroomLanguageEntry(language?: string | null) {
  if (!language) return undefined;
  return supportedClassroomLanguages.find(
    (entry) => entry.code.toLowerCase() === language.toLowerCase(),
  );
}

export function isClassroomLanguage(language?: string | null): language is ClassroomLanguage {
  return !!getClassroomLanguageEntry(language);
}

export function normalizeClassroomLanguage(language?: string | null): ClassroomLanguage {
  const exact = getClassroomLanguageEntry(language);
  if (exact) return exact.code;

  const prefix = language?.split('-')[0]?.toLowerCase();
  switch (prefix) {
    case 'hi':
      return 'hi-IN';
    case 'gu':
      return 'gu-IN';
    case 'mr':
      return 'mr-IN';
    case 'en':
      return 'en-US';
    default:
      return defaultClassroomLanguage;
  }
}

export function getClassroomLanguageLabel(language?: string | null): string {
  return (
    getClassroomLanguageEntry(language)?.label ??
    getClassroomLanguageEntry(defaultClassroomLanguage)!.label
  );
}

export function getClassroomLanguageShortLabel(language?: string | null): string {
  return (
    getClassroomLanguageEntry(language)?.shortLabel ??
    getClassroomLanguageEntry(defaultClassroomLanguage)!.shortLabel
  );
}

export function getClassroomLanguagePromptName(language?: string | null): string {
  return (
    getClassroomLanguageEntry(language)?.promptLabel ??
    getClassroomLanguageEntry(defaultClassroomLanguage)!.promptLabel
  );
}

export function getClassroomLanguagePreviewText(language?: string | null): string {
  return (
    getClassroomLanguageEntry(language)?.previewText ??
    getClassroomLanguageEntry(defaultClassroomLanguage)!.previewText
  );
}

export function getNoImagesAvailableText(language?: string | null): string {
  return (
    getClassroomLanguageEntry(language)?.noImagesAvailableText ??
    getClassroomLanguageEntry(defaultClassroomLanguage)!.noImagesAvailableText
  );
}

export function getNoneText(language?: string | null): string {
  return (
    getClassroomLanguageEntry(language)?.noneText ??
    getClassroomLanguageEntry(defaultClassroomLanguage)!.noneText
  );
}

export function getQuizFallbackComment(language?: string | null): string {
  return (
    getClassroomLanguageEntry(language)?.quizFallbackComment ??
    getClassroomLanguageEntry(defaultClassroomLanguage)!.quizFallbackComment
  );
}

export function getPblWelcomeMessage(
  language: string | null | undefined,
  title: string,
  questions: string,
): string {
  switch (normalizeClassroomLanguage(language)) {
    case 'hi-IN':
      return `नमस्ते! मैं इस कार्य के लिए आपका प्रश्न एजेंट हूँ: "${title}"\n\nआपके काम में मदद के लिए मैंने कुछ मार्गदर्शक प्रश्न तैयार किए हैं:\n\n${questions}\n\nजब भी मदद या स्पष्टता चाहिए, मुझे @question करें!`;
    case 'gu-IN':
      return `નમસ્તે! હું આ કાર્ય માટે તમારો પ્રશ્ન સહાયક છું: "${title}"\n\nતમારા કાર્યને માર્ગદર્શન આપવા માટે મેં કેટલાક પ્રશ્નો તૈયાર કર્યા છે:\n\n${questions}\n\nજ્યારે પણ મદદ કે સ્પષ્ટતા જોઈએ, મને @question કરો!`;
    case 'mr-IN':
      return `नमस्कार! मी या कामासाठी तुमचा प्रश्न सहाय्यक आहे: "${title}"\n\nतुमच्या कामाला दिशा देण्यासाठी मी काही मार्गदर्शक प्रश्न तयार केले आहेत:\n\n${questions}\n\nमदत किंवा स्पष्टीकरण हवे असल्यास मला केव्हाही @question करा!`;
    case 'en-US':
    default:
      return `Hello! I'm your Question Agent for this issue: "${title}"\n\nTo help guide your work, I've prepared some questions for you:\n\n${questions}\n\nFeel free to @question me anytime if you need help or clarification!`;
  }
}

export function isChineseLanguage(language?: string | null): boolean {
  const prefix = language?.split('-')[0]?.toLowerCase();
  return prefix === 'zh' || prefix === 'yue';
}

export function inferSpeechLanguageFromText(text: string): ClassroomLanguage {
  if (/[\u0A80-\u0AFF]/u.test(text)) {
    return 'gu-IN';
  }
  if (/[\u0900-\u097F]/u.test(text)) {
    return 'hi-IN';
  }
  return defaultClassroomLanguage;
}
