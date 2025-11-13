import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useLoginStore } from '@/shared/store';
import { schema } from './schema';

export const useLoginForm = ({ isAdmin }: { isAdmin: boolean }) => {
  const navigate = useNavigate();
  const { isLoading, submitLogin } = useLoginStore();
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zod4Resolver(schema),
  });

  const handleSubmit = async (formData: UserCredentials) => {
    await submitLogin(formData, isAdmin);
    navigate('/');
  };

  return { form, isLoading, handleSubmit };
};
