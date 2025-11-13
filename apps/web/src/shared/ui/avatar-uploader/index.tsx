import { clsx } from 'clsx';
import { Dropzone } from '@mantine/dropzone';
import { Box, Avatar, ActionIcon, BoxProps } from '@mantine/core';
import { IconCameraPlus } from '@tabler/icons-react';
import styles from './styles.module.scss';

interface AvatarUploaderProps extends BoxProps {
  src?: Nullable<string>;
}

export const AvatarUploader = ({ src, className, ...props }: AvatarUploaderProps) => (
  <Box className={clsx(styles.avatarUploader, className)} {...props}>
    <Avatar className={styles.avatar} src={src} radius="md" />
    <Dropzone className={styles.dropzone} onDrop={() => console.log(123)} />
    <ActionIcon
      className={styles.actionIcon}
      variant="filled"
      size="xl"
      color="violet"
      radius="xl"
      aria-label="Settings"
    >
      <IconCameraPlus className={styles.cameraIcon} />
    </ActionIcon>
  </Box>
);
