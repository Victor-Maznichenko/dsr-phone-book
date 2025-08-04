import { useState } from 'react';
import { AppShell, Container, Stepper } from '@mantine/core';
import { PersonalInfoStep } from './personal-info-step';
import { VerificationStep } from './verification-step';
import { MainInfoStep } from './main-info-step';

export const RegisterPage = () => {
  const [active, setActive] = useState(0);
  // eslint-disable-next-line no-alert
  const handleComplete = () => alert('Sign up!');
  const handleNext = () => setActive((current) => (current < 3 ? current + 1 : current));
  const handlePrev = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <AppShell.Main>
      <Container>
        <Stepper active={active} onStepClick={setActive} color="indigo">
          <Stepper.Step>
            <MainInfoStep handleNext={handleNext} />
          </Stepper.Step>
          <Stepper.Step>
            <PersonalInfoStep handlePrev={handlePrev} handleNext={handleNext} />
          </Stepper.Step>
          <Stepper.Step>
            <VerificationStep handlePrev={handlePrev} handleComplete={handleComplete} />
          </Stepper.Step>
          <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
        </Stepper>
      </Container>
    </AppShell.Main>
  );
};
