import { useState } from 'react';
import { AppShell, Container, Stepper } from '@mantine/core';
import { PersonalStepContent } from './components/personal-step-content';
import { CompleteStepContent } from './components/complete-step-content';
import { MainStepContent } from './components/main-step-content';
import { useRegisterStore } from '@/store';

// TODO 1: Если все данные уже были заполнены должна быть возможность вернуться на следующие этапы через цифры
// TODO 2: Местоположение через GOOGLE API или YANDEX API
export const RegisterPage = () => {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((current) => (current < 3 ? current + 1 : current));
  const handlePrev = () => setActive((current) => (current > 0 ? current - 1 : current));
  const { submitRegistration } = useRegisterStore();

  return (
    <AppShell.Main py={100} ta="center">
      <Container maw={550}>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
          contentPadding={36}
          color="indigo"
        >
          <Stepper.Step>
            <MainStepContent handleNext={handleNext} />
          </Stepper.Step>
          <Stepper.Step>
            <PersonalStepContent handlePrev={handlePrev} handleNext={handleNext} />
          </Stepper.Step>
          <Stepper.Step>
            <CompleteStepContent handlePrev={handlePrev} handleComplete={submitRegistration} />
          </Stepper.Step>
        </Stepper>
      </Container>
    </AppShell.Main>
  );
};
