import dayjs from 'dayjs';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Title, Text, ActionIcon, Stack, Flex, Checkbox, Box, UnstyledButton } from '@mantine/core';
import { DateInput, ImageDropzone, InputPhone, Select, Textarea, TextInput } from '@/shared/ui';
import { personalFormSchema, StepContentType } from '../lib';
import { useRegisterStore } from '@/shared/store';
import { DEPARTMENTS, POSITIONS, unmaskPhone } from '@/shared/lib';

export const PersonalStepContent = ({ handlePrev, handleNext }: Omit<StepContentType, 'handleComplete'>) => {
  const {
    registerFields: {
      firstName,
      lastName,
      birthday,
      email,
      officePhone,
      personalPhones,
      department,
      position,
      officeAddress,
      about,
      avatar,
    },
    setPersonalInfo,
  } = useRegisterStore();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      firstName,
      lastName,
      birthday,
      email,
      officePhone,
      personalPhones: personalPhones ?? [''],
      department,
      position,
      officeAddress,
      about,
      avatar,
    },
    validate: zod4Resolver(personalFormSchema),
  });

  const handleSubmit = (formData: UserPersonalInfo) => {
    setPersonalInfo({
      ...formData,
      officePhone: unmaskPhone(formData.officePhone),
      personalPhones: formData.personalPhones?.map((phone) => unmaskPhone(phone)),
    });
    handleNext();
  };

  const handleAddPersonalNumber = () => {
    const phonesAmount = form.getValues().personalPhones?.length;
    if (phonesAmount < 3) {
      form.insertListItem('personalPhones', '');
    }
  };

  return (
    <>
      <Title c="indigo" mb={6}>
        Personal Details
      </Title>
      <Text fw={500} mb={50}>
        Tell us a bit about yourself to help teammates know you better
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
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack ta="left" gap="xl" mb={50}>
          <TextInput
            placeholder="First Name"
            key={form.key('firstName')}
            {...form.getInputProps('firstName')}
            error={form.errors.firstName}
          />
          <TextInput
            placeholder="Last Name"
            key={form.key('lastName')}
            {...form.getInputProps('lastName')}
            error={form.errors.lastName}
          />
          <DateInput
            placeholder="Birthday"
            key={form.key('birthday')}
            {...form.getInputProps('birthday')}
            error={form.errors.birthday}
            maxDate={dayjs().format('YYYY-MM-DD')}
            minDate={dayjs('1901-01-01').format('YYYY-MM-DD')}
          />
          <InputPhone
            placeholder="Office phone"
            key={form.key('officePhone')}
            {...form.getInputProps('officePhone')}
            error={form.errors.officePhone}
          />
          <Box>
            <Stack gap="xl" mb={12}>
              {form
                .getValues()
                .personalPhones?.map((_, index) => (
                  <InputPhone
                    placeholder={`Personal phone №${index + 1}`}
                    key={form.key(`personalPhones.${index}`)}
                    {...form.getInputProps(`personalPhones.${index}`)}
                    error={form.errors[`personalPhones.${index}`]}
                  />
                ))}
            </Stack>
            <Flex justify="space-between" align="center">
              <Checkbox label="Hide the numbers" color="teal" />
              <Flex component={UnstyledButton} onClick={handleAddPersonalNumber} align="center" columnGap={5}>
                <IconPlus color="var(--mantine-color-gray-2)" size={20} />
                <Text size="sm">Add personal number</Text>
              </Flex>
            </Flex>
          </Box>
          <Select
            placeholder="Department"
            data={Object.values(DEPARTMENTS)}
            key={form.key('department')}
            error={form.errors.department}
            {...form.getInputProps('department')}
            styles={{ options: { textTransform: 'uppercase' }, input: { textTransform: 'uppercase' } }}
          />
          <Select
            placeholder="Position"
            data={Object.values(POSITIONS)}
            key={form.key('position')}
            error={form.errors.position}
            {...form.getInputProps('position')}
            styles={{ options: { textTransform: 'uppercase' }, input: { textTransform: 'uppercase' } }}
          />
          <TextInput
            placeholder="Office address"
            key={form.key('officeAddress')}
            {...form.getInputProps('officeAddress')}
            error={form.errors.officeAddress}
          />
          <Textarea
            h={124}
            placeholder="Tell us about yourself..."
            styles={{ wrapper: { height: '100%' }, input: { height: '100%' } }}
            key={form.key('about')}
            {...form.getInputProps('about')}
            error={form.errors.about}
          />
          <ImageDropzone
            onDrop={([avatarFile]) => form.setFieldValue('avatar', avatarFile)}
            key={form.key('avatar')}
            {...form.getInputProps('avatar')}
          />
        </Stack>
        <Button type="submit" variant="filled" fullWidth color="indigo" size="xl" radius="lg">
          Next
        </Button>
      </form>
    </>
  );
};
