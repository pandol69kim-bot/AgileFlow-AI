export const DEFAULT_AI_PROFILE = 'claude';

export const AI_PROFILES = [
  {
    id: 'claude',
    label: 'Claude',
    description: 'Anthropic Claude Sonnet 4.6 + Haiku 4.5',
    provider: 'anthropic',
    isDefault: true,
  },
  {
    id: 'openai',
    label: 'GPT-4.1',
    description: 'OpenAI GPT-4.1 + GPT-4.1 mini',
    provider: 'openai',
    isDefault: false,
  },
  {
    id: 'gemini',
    label: 'Gemini 2.5',
    description: 'Google Gemini 2.5 Pro + Flash',
    provider: 'gemini',
    isDefault: false,
  },
];

export const AI_PROFILE_IDS = AI_PROFILES.map((profile) => profile.id);

export function getAiProfile(profileId = DEFAULT_AI_PROFILE) {
  return AI_PROFILES.find((profile) => profile.id === profileId) ?? null;
}

export function ensureAiProfile(profileId) {
  const profile = getAiProfile(profileId ?? DEFAULT_AI_PROFILE);
  if (!profile) {
    throw new Error(`Unsupported ai profile: ${profileId}`);
  }
  return profile.id;
}