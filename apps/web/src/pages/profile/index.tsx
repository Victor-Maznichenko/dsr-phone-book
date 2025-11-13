import { useState } from 'react';
import { Button, Text, Container, Group, Paper, SimpleGrid } from '@mantine/core';
import { AvatarUploader, InputPhone, Select, TextInput, Textarea } from '@/shared/ui';
import { DEPARTMENTS, POSITIONS } from '@/shared/lib';
import { useProfilePage } from './use-profile-form';
import styles from './styles.module.scss';

export const ProfilePage = () => {
  const { form, profile } = useProfilePage();
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <main className={styles.root}>
      <Container size="lg">
        <Group className={styles.inner}>
          <Paper className={styles.preview}>
            <Text fz="h2" fw={500}>
              {profile?.firstName} {profile?.lastName}
            </Text>
            <AvatarUploader src={profile?.avatar} />
          </Paper>
          <Paper className={styles.formPaper}>
            <div className={styles.formHeader}>
              <Text fz="h2" fw={500}>
                Bio & other details
              </Text>
              <Button onClick={() => setIsDisabled((prev) => !prev)}>Edit</Button>
            </div>

            <SimpleGrid cols={2} component="form">
              <TextInput
                size="md"
                disabled={isDisabled}
                label="First Name"
                key={form.key('firstName')}
                {...form.getInputProps('firstName')}
                error={form.errors.firstName}
              />

              <TextInput
                size="md"
                disabled={isDisabled}
                label="Last Name"
                key={form.key('lastName')}
                {...form.getInputProps('lastName')}
                error={form.errors.lastName}
              />

              <TextInput
                size="md"
                disabled={isDisabled}
                label="Email"
                key={form.key('email')}
                {...form.getInputProps('email')}
                error={form.errors.email}
              />

              <TextInput
                size="md"
                disabled={isDisabled}
                label="Office Address"
                key={form.key('officeAddress')}
                {...form.getInputProps('officeAddress')}
                error={form.errors.officeAddress}
              />

              <Select
                size="md"
                disabled={isDisabled}
                label="Department"
                data={Object.values(DEPARTMENTS)}
                key={form.key('department')}
                error={form.errors.department}
                {...form.getInputProps('department')}
                className={styles.selectUppercase}
              />

              <Select
                size="md"
                disabled={isDisabled}
                label="Position"
                data={Object.values(POSITIONS)}
                key={form.key('position')}
                error={form.errors.position}
                {...form.getInputProps('position')}
                className={styles.selectUppercase}
              />

              <InputPhone
                size="md"
                disabled={isDisabled}
                label="Office phone"
                key={form.key('officePhone')}
                {...form.getInputProps('officePhone')}
                error={form.errors.officePhone}
              />

              <Textarea
                size="md"
                disabled={isDisabled}
                label="About"
                key={form.key('about')}
                {...form.getInputProps('about')}
                className={styles.textareaField}
                error={form.errors.about}
              />

              <Button
                className={styles.submitButton}
                disabled={isDisabled}
                type="submit"
                variant="filled"
                color="indigo"
                radius="lg"
                size="md"
              >
                Save
              </Button>
            </SimpleGrid>
          </Paper>
        </Group>
      </Container>
    </main>
  );
};
// Добавить isLoading prop в UserProfile
