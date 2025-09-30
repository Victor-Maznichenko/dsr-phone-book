import { clsx } from 'clsx';
import { Dropzone } from '@mantine/dropzone';
import { Box, Avatar, ActionIcon, BoxProps } from '@mantine/core';
import { IconCameraPlus } from '@tabler/icons-react';
import styles from './styles.module.css';

interface AvatarUploaderProps extends BoxProps {
  src?: Nullable<string>;
}

export const AvatarUploader = ({ src, className, ...props }: AvatarUploaderProps) => (
  <Box className={clsx(styles.avatarUploader, className)} w={300} h={300} {...props}>
    <Avatar className={styles.avatar} src={src} radius="md" />
    <Dropzone className={styles.dropzone} onDrop={() => console.log(123)} />
    <ActionIcon
      className={styles.actionIcon}
      style={{ zIndex: 1 }}
      variant="filled"
      size="xl"
      color="violet"
      radius="xl"
      aria-label="Settings"
    >
      <IconCameraPlus style={{ width: '70%', height: '70%' }} />
    </ActionIcon>
  </Box>
);
