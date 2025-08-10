import { DateInput as UnstyledDateInput, DateInputProps } from '@mantine/dates';

export const DateInput = (props: DateInputProps) => (
  <UnstyledDateInput valueFormat="DD.MM.YYYY" variant="filled" radius="md" size="xl" {...props} />
);
