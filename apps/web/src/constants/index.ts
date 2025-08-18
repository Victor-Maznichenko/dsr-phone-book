export const DEPARTMENTS = {
  HR: 'hr',
  Sales: 'sales',
  Support: 'support',
  Marketing: 'marketing',
  Development: 'development',
} as const;

export const POSITIONS = {
  Intern: 'intern',
  Junior: 'junior',
  Middle: 'middle',
  Senior: 'senior',
  Lead: 'lead',
  Architect: 'architect',
} as const;

export const USER_ROLES = {
  Default: 'default',
  Admin: 'admin',
} as const;

export const phoneMask = {
  mask: '+7 (___) ___-__-__',
  replacement: { _: /\d/ },
};
