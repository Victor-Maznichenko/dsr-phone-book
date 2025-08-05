import { Button, Title, Text } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const VerificationStep = ({ handlePrev, handleComplete }: any) => (
  <>
    <Title>Finish Up</Title>
    <Text>Review and save your info to complete the registration process</Text>
    <Button fullWidth variant="filled" color="indigo" size="xl" radius="lg" onClick={handlePrev}>
      Back
    </Button>
    <Button fullWidth variant="filled" color="indigo" size="xl" radius="lg" onClick={handleComplete}>
      Sign up
    </Button>
  </>
);
