import { TextInput as UnstyledTextInput, TextInputProps } from '@mantine/core';

export const TextInput = (props: TextInputProps) => (
  <UnstyledTextInput variant="filled" radius="md" size="xl" {...props} />
);
