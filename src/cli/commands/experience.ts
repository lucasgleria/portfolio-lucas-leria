import { professionalProfile } from '../data/professional-profile'

export const experience = () =>
  [
    'Professional Experience:',
    ...professionalProfile.roles.map((role) => `${role.title.en}\n  ${role.description.en}`),
    'Documented work:',
    ...professionalProfile.workHighlights.map(
      (work) => `${work.title.en}\n  ${work.status.en}\n  ${work.summary.en}`,
    ),
  ].join('\n\n')
