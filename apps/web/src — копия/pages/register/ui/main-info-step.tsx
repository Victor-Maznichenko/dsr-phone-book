import { Title, Text, Stack, Input, Button } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MainInfoStep = ({ handleNext }: any) => (
  <>
    <Title>Create Account</Title>
    <Text>Create an account so you can explore all the existing jobs</Text>
    <Stack gap="xl">
      <Input variant="filled" size="xl" radius="md" placeholder="Input component" />
      <Input variant="filled" size="xl" radius="md" placeholder="Input component" />
      <Input variant="filled" size="xl" radius="md" placeholder="Input component" />
    </Stack>
    <Button fullWidth variant="filled" color="indigo" size="xl" radius="lg" onClick={handleNext}>
      Next
    </Button>
  </>
);
