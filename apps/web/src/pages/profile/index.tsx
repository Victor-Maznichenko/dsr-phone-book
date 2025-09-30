import { useForm } from '@mantine/form';
import { pick } from 'es-toolkit/compat';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useEffect, useState } from 'react';
import { AppShell, Button, Text, Container, Flex, Group, Paper, SimpleGrid } from '@mantine/core';
import { useProfileStore } from '@/shared/store';
import { DEPARTMENTS, POSITIONS, credentialsFormSchema, personalFormSchema } from '@/shared/lib';
import { AvatarUploader, InputPhone, Select, TextInput, Textarea } from '@/shared/ui';

export const ProfilePage = () => {
  const { profile, getProfile, isLoading } = useProfileStore();
  const [isDisabled, setIsDisabled] = useState(true);
  const personalFormValues = pick(profile, [
    'email',
    'firstName',
    'lastName',
    'officePhone',
    'department',
    'position',
    'officeAddress',
    'about',
  ]);

  const form = useForm({
    mode: 'controlled',
    initialValues: personalFormValues,
    validate: zod4Resolver(personalFormSchema.extend(credentialsFormSchema.shape)),
  });

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    form.setValues(personalFormValues);
  }, [isLoading]);

  console.log('isLoading', isLoading);

  return (
    <AppShell.Main py={100} ta="center">
      <Container size="lg">
        <Group align="flex-start" wrap="nowrap">
          <Paper
            maw="calc(18.75rem * var(--mantine-scale) + var(--mantine-spacing-md) * 2)"
            radius="md"
            ta="center"
            withBorder
            p="md"
          >
            <Text fz="h2" fw={500}>
              {profile?.firstName} {profile?.lastName}
            </Text>
            <AvatarUploader src={profile?.avatar} />
          </Paper>
          <Paper flex="1 0 auto" radius="md" ta="left" withBorder p="md" style={{ alignSelf: 'stretch' }}>
            <Flex mb="xl" align="center" justify="space-between">
              <Text fz="h2" fw={500}>
                Bio & other details
              </Text>
              <Button onClick={() => setIsDisabled((prev) => !prev)}>Edit</Button>
            </Flex>

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
                styles={{ options: { textTransform: 'uppercase' }, input: { textTransform: 'uppercase' } }}
              />

              <Select
                size="md"
                disabled={isDisabled}
                label="Position"
                data={Object.values(POSITIONS)}
                key={form.key('position')}
                error={form.errors.position}
                {...form.getInputProps('position')}
                styles={{ options: { textTransform: 'uppercase' }, input: { textTransform: 'uppercase' } }}
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
                style={{ gridColumn: 'span 2' }}
                error={form.errors.about}
              />

              <Button
                size="md"
                disabled={isDisabled}
                style={{ gridColumn: 'span 2' }}
                type="submit"
                variant="filled"
                fullWidth
                color="indigo"
                radius="lg"
              >
                Save
              </Button>
            </SimpleGrid>
          </Paper>
        </Group>
      </Container>
    </AppShell.Main>
  );
};
// Добавить isLoading prop в UserProfile
