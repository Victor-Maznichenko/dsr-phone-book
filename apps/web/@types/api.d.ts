interface UserDTO {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  officePhone: string;
  department: string;
  position: Position;
  officeAddress: string;
  personalPhones?: string[];
  about?: string;
  avatar?: Nullable<string>;
}

interface PostRegisterParams extends UserDTO {
  password: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

type UserPersonalInfo = Omit<PostRegisterParams, keyof UserCredentials>;

interface UserResponse extends UserDTO {
  id: number;
  hasPersonalAccess?: boolean;
}

interface ProfileResponse extends Omit<UserDTO, 'hasPersonalAccess'> {
  id: number;
  role: string;
}

interface UpdateProfileRequest extends Omit<UserDTO, 'hasPersonalAccess'> {
  password: string;
}
