import dayjs from 'dayjs';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Title, Text, ActionIcon, Stack, Checkbox, Box } from '@mantine/core';
import { DateInput, ImageDropzone, InputPhone, Select, Textarea, TextInput } from '@/shared/ui';
import { StepContentType } from '../lib';
import { useRegisterStore } from '@/shared/store';
import { DEPARTMENTS, POSITIONS, personalFormSchema, unmaskPhone } from '@/shared/lib';
import styles from './styles.module.scss';

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
        className={styles.prevStepBtn}
        onClick={handlePrev}
        aria-label="Back"
        variant="outline"
        color="dark.8"
        radius="md"
        size="xl"
      >
        <IconChevronLeft size="70%" />
      </ActionIcon>
      <form className={styles.personalForm} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          {...form.getInputProps('firstName')}
          error={form.errors.firstName}
          key={form.key('firstName')}
          placeholder="First Name"
        />
        <TextInput
          {...form.getInputProps('lastName')}
          error={form.errors.lastName}
          key={form.key('lastName')}
          placeholder="Last Name"
        />
        <DateInput
          {...form.getInputProps('birthday')}
          error={form.errors.birthday}
          key={form.key('birthday')}
          placeholder="Birthday"
          maxDate={dayjs().format('YYYY-MM-DD')}
          minDate={dayjs('1901-01-01').format('YYYY-MM-DD')}
        />
        <InputPhone
          {...form.getInputProps('officePhone')}
          error={form.errors.officePhone}
          key={form.key('officePhone')}
          placeholder="Office phone"
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
          <div className={styles.flexBetweenCenter}>
            <Checkbox label="Hide the numbers" color="teal" />
            <div className={styles.flexCenter} onClick={handleAddPersonalNumber}>
              <IconPlus color="var(--mantine-color-gray-2)" size={20} />
              <Text size="sm">Add personal number</Text>
            </div>
          </div>
        </Box>
        <Select
          placeholder="Department"
          data={Object.values(DEPARTMENTS)}
          key={form.key('department')}
          error={form.errors.department}
          {...form.getInputProps('department')}
          className={styles.selectUppercase}
        />
        <Select
          placeholder="Position"
          data={Object.values(POSITIONS)}
          key={form.key('position')}
          error={form.errors.position}
          {...form.getInputProps('position')}
          className={styles.selectUppercase}
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
          className={styles.textareaFullHeight}
          key={form.key('about')}
          {...form.getInputProps('about')}
          error={form.errors.about}
        />
        <ImageDropzone
          onDrop={([avatarFile]) => form.setFieldValue('avatar', avatarFile)}
          key={form.key('avatar')}
          {...form.getInputProps('avatar')}
        />
        <Button type="submit" variant="filled" color="indigo" size="xl" radius="lg">
          Next
        </Button>
      </form>
    </>
  );
};
