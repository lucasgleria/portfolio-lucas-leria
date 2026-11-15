import { professionalProfile } from '../data/professional-profile'

export const certifications = () =>
  [
    'Training and Certifications:',
    'No completed certifications were verified in this profile update.',
    `${professionalProfile.learning.provider} — in progress`,
    professionalProfile.learning.description.en,
    ...professionalProfile.learning.topics.map((topic) => `  • ${topic}`),
  ].join('\n\n')
