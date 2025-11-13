import { Button, Title, Text, ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRegisterStore } from '@/shared/store';
import { StepContentType } from '../lib';

export const CompleteStepContent = ({ handlePrev, handleComplete }: Omit<StepContentType, 'handleNext'>) => {
  const { isLoading } = useRegisterStore();

  return (
    <>
      <Title c="indigo" mb={6}>
        Finish Up
      </Title>
      <Text fw={500} mb={50}>
        Review and save your info to complete the registration process
      </Text>
      <ActionIcon
        onClick={handlePrev}
        aria-label="Back"
        variant="outline"
        color="dark.8"
        radius="md"
        size="xl"
        pos="absolute"
        left={30}
        top={30}
      >
        <IconChevronLeft size="70%" />
      </ActionIcon>
      <Button
        fullWidth
        variant="filled"
        color="indigo"
        radius="lg"
        size="xl"
        onClick={handleComplete}
        loading={isLoading}
      >
        Sign up
      </Button>
    </>
  );
};
