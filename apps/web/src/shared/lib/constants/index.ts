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

export const departmentsColors: Record<string, string> = {
  [DEPARTMENTS.HR]: 'pink.5',
  [DEPARTMENTS.Sales]: 'yellow.4',
  [DEPARTMENTS.Support]: 'blue.5',
  [DEPARTMENTS.Marketing]: 'violet.8',
  [DEPARTMENTS.Development]: 'teal.5',
};
