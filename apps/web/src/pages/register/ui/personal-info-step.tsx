import { Button, Title, Text } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PersonalInfoStep = ({ handlePrev, handleNext }: any) => (
  <>
    <Title>Personal Details</Title>
    <Text>Tell us a bit about yourself to help teammates know you better</Text>
    <Button fullWidth variant="filled" color="indigo" size="xl" radius="lg" onClick={handlePrev}>
      Back
    </Button>
    <Button fullWidth variant="filled" color="indigo" size="xl" radius="lg" onClick={handleNext}>
      Next
    </Button>
  </>
);
