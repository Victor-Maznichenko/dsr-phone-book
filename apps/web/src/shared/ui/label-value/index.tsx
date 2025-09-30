import { Box, GroupProps, Text } from '@mantine/core';

interface LabelValueProps extends GroupProps {
  label?: string;
  value?: string;
}

export const LabelValue = ({ label, value, ...props }: LabelValueProps) => {
  if (!value && !label) {
    return null;
  }

  return (
    <Box align="flex-start" {...props}>
      <Text size="sm">{label}</Text>
      <Text size="md">{value}</Text>
    </Box>
  );
};
