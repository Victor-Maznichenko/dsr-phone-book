enum Department {
  HR = 'hr',
  Sales = 'sales',
  Support = 'support',
  Marketing = 'marketing',
  Development = 'development',
}

enum Position {
  Intern = 'intern',
  Junior = 'junior',
  Middle = 'middle',
  Senior = 'senior',
  Lead = 'lead',
  Architect = 'architect',
}

enum UserRole {
  Default = 'default',
  Admin = 'admin',
}

interface UserDTO {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  officePhone: string;
  department: Department;
  position: Position;
  officeAddress: string;
  personalPhones?: string[];
  about?: string;
  avatar?: string;
}

interface PostRegisterParams extends UserDTO {
  password: string;
}

interface PostLoginParams {
  email: string;
  password: string;
}

interface UserResponse extends UserDTO {
  id: number;
  hasPersonalAccess?: boolean;
}

interface ProfileResponse extends Omit<UserDTO, 'hasPersonalAccess'> {
  role: UserRole;
}

interface UpdateProfileRequest extends Omit<UserDTO, 'hasPersonalAccess'> {
  password: string;
}
