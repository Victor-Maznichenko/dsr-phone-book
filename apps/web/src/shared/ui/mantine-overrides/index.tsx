import { DateInput as UnstyledDateInput, DateInputProps } from '@mantine/dates';
import {
  PasswordInput as UnstyledPasswordInput,
  PasswordInputProps,
  Select as UnstyledSelect,
  SelectProps,
  Textarea as UnstyledTextarea,
  TextareaProps,
  TextInput as UnstyledTextInput,
  TextInputProps,
  MantineSize,
  InputBaseProps,
  InputBase,
} from '@mantine/core';
import { InputMask, InputMaskProps } from '@react-input/mask';
import { phoneMask } from '@/shared/lib';

const defaultStyleProps = {
  variant: 'filled',
  radius: 'md',
  size: 'xl' as MantineSize,
};

type InputPhoneProps = InputBaseProps & Omit<InputMaskProps, 'size'>;

const DateInput = (props: DateInputProps) => (
  <UnstyledDateInput valueFormat="DD.MM.YYYY" {...defaultStyleProps} {...props} />
);

const Select = (props: SelectProps) => <UnstyledSelect {...defaultStyleProps} {...props} />;
const Textarea = (props: TextareaProps) => <UnstyledTextarea {...defaultStyleProps} {...props} />;
const TextInput = (props: TextInputProps) => <UnstyledTextInput {...defaultStyleProps} {...props} />;
const PasswordInput = (props: PasswordInputProps) => <UnstyledPasswordInput {...defaultStyleProps} {...props} />;

const InputPhone = ({ mask = phoneMask.mask, replacement = phoneMask.replacement, ...props }: InputPhoneProps) => (
  <InputBase mask={mask} component={InputMask} replacement={replacement} {...defaultStyleProps} {...props} />
);

export { DateInput, Select, Textarea, TextInput, PasswordInput, InputPhone };
