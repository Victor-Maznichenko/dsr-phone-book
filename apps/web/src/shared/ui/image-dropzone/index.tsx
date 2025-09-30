import { clsx } from 'clsx';
import { useState } from 'react';
import { Image, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX, IconPlus } from '@tabler/icons-react';
import styles from './styles.module.css';

export const ImageDropzone = ({ onDrop, className, ...props }: DropzoneProps) => {
  const [imageSrc, setImageSrc] = useState('');

  const handleDrop = ([file]: FileWithPath[]) => {
    setImageSrc(URL.createObjectURL(file));
    onDrop([file]);
  };

  return (
    <Dropzone
      className={clsx(styles.dropzone, className)}
      onDrop={handleDrop}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      variant="filled"
      w={260}
      h={200}
      {...props}
    >
      {imageSrc ? (
        <div className={styles.attachedImageBox}>
          <Image className={styles.attachedImage} src={imageSrc} />
          <IconPlus className={styles.attachedImagePlus} color="var(--mantine-color-gray-2)" size={52} />
        </div>
      ) : (
        <div className={styles.dropzoneContent}>
          <Dropzone.Accept>
            <IconUpload size={52} color="var(--mantine-color-blue-6)" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={52} color="var(--mantine-color-dimmed)" />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </div>
      )}
    </Dropzone>
  );
};
