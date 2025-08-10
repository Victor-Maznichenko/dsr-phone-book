import { InputBase, InputBaseProps } from '@mantine/core';
import { InputMask, InputMaskProps } from '@react-input/mask';

type InputPhoneProps = InputBaseProps & Omit<InputMaskProps, 'size'>;

export const InputPhone = ({
  mask = '+7 (___) ___-__-__',
  replacement = { _: /\d/ },
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
