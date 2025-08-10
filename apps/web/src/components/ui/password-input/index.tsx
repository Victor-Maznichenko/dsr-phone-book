import { PasswordInput as UnstyledPasswordInput, PasswordInputProps } from '@mantine/core';

export const PasswordInput = (props: PasswordInputProps) => (
  <UnstyledPasswordInput variant="filled" radius="md" size="xl" {...props} />
);
