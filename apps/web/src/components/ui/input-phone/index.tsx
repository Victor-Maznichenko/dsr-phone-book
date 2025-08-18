import { InputBase, InputBaseProps } from '@mantine/core';
import { InputMask, InputMaskProps } from '@react-input/mask';
import { phoneMask } from '@/constants';

type InputPhoneProps = InputBaseProps & Omit<InputMaskProps, 'size'>;

export const InputPhone = ({
  mask = phoneMask.mask,
  replacement = phoneMask.replacement,
  variant = 'filled',
  radius = 'md',
  size = 'xl',
  ...props
}: InputPhoneProps) => (
  <InputBase
    component={InputMask}
    mask={mask}
    replacement={replacement}
    variant={variant}
    radius={radius}
    size={size}
    {...props}
  />
);
