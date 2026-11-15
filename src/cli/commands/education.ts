import { professionalProfile } from '../data/professional-profile'

export const education = () =>
  [
    'Academic Background:',
    ...professionalProfile.education.map(
      (item) => `${item.program.en}\n  ${item.institution} — completed`,
    ),
    'Current studies:',
    `${professionalProfile.learning.provider}\n  ${professionalProfile.learning.description.en}`,
  ].join('\n\n')
