import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Stepper } from '@mantine/core';
import { PersonalStepContent } from './personal-step-content';
import { CompleteStepContent } from './complete-step-content';
import { MainStepContent } from './main-step-content';
import { useRegisterStore } from '@/shared/store';
import styles from './styles.module.scss'

// TODO 1: Если все данные уже были заполнены должна быть возможность вернуться на следующие этапы через цифры
// TODO 2: Местоположение через GOOGLE API или YANDEX API
export const RegisterPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const { submitRegistration } = useRegisterStore();

  const handleNext = () => setActive((current) => (current < 3 ? current + 1 : current));
  const handlePrev = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    await submitRegistration();
    navigate('/');
  };

  return (
    <main className={styles.root}>
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
            <CompleteStepContent handlePrev={handlePrev} handleComplete={handleSubmit} />
          </Stepper.Step>
        </Stepper>
      </Container>
    </main>
  );
};
