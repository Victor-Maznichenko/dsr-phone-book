import { Textarea as UnstyledTextarea, TextareaProps } from '@mantine/core';

export const Textarea = (props: TextareaProps) => (
  <UnstyledTextarea variant="filled" radius="md" size="xl" {...props} />
);
