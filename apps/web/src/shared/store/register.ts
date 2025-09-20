import { format } from 'date-fns';
import { create } from 'zustand';
import { postRegister } from '@/shared/api/requests';
import { unmaskPhone } from '@/shared/lib';

interface RegisterFields extends PostRegisterParams {
  confirmPassword: string;
}

interface RegisterState {
  isLoading: boolean;
  registerFields: RegisterFields;
  setCredentials: (payload: UserCredentials) => void;
  setPersonalInfo: (payload: UserPersonalInfo) => void;
  submitRegistration: () => Promise<void>;
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
  setCredentials: (payload) => set((state) => ({ ...state, registerFields: { ...state.registerFields, ...payload } })),
  setPersonalInfo: (payload) => set((state) => ({ ...state, registerFields: { ...state.registerFields, ...payload } })),
  submitRegistration: async () => {
    set(({ isLoading, ...state }) => ({ ...state, isLoading: true }));
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
    } finally {
      set(({ isLoading, ...state }) => ({ isLoading: false, ...state }));
    }
  },
}));
