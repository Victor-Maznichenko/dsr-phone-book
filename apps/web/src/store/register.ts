import { format } from 'date-fns';
import { create } from 'zustand';
import { postRegister } from '../api/requests';
import { unmaskPhone } from '../utils';

interface RegisterFields extends PostRegisterParams {
  confirmPassword: string;
}

interface RegisterState {
  registerFields: RegisterFields;
  setCredentials: (payload: UserCredentials) => void;
  setPersonalInfo: (payload: UserPersonalInfo) => void;
  submitRegistration: () => void;
}

export const useRegisterStore = create<RegisterState>()((set, get) => ({
  registerFields: {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthday: format(new Date(), 'yyyy-MM-dd'),
    officePhone: '',
    department: '',
    position: '',
    officeAddress: '',
    personalPhones: [''],
    about: '',
    avatar: null,
  },
  isLoading: false,
  setCredentials: (payload) => set((state) => ({ ...state, ...payload })),
  setPersonalInfo: (payload) => set((state) => ({ ...state, ...payload })),
  submitRegistration: async () => {
    try {
      const {
        registerFields: { confirmPassword, ...userData },
      } = get();
      const response = await postRegister({
        ...userData,
        officePhone: unmaskPhone(userData.officePhone),
        personalPhones: userData.personalPhones?.map((phone) => unmaskPhone(phone)),
      });
      localStorage.setItem('access_token', await response.text());
    } catch (error) {
      // TODO: заменить на toast
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },
}));
