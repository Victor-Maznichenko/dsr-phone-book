import { Link } from 'react-router';
import { ActionIcon } from '@mantine/core';
import { IconPencil, IconTrash, IconExternalLink } from '@tabler/icons-react';
import { useProfileStore } from '@/shared/store';
import styles from './styles.module.scss';

export const ActionsCell = ({ id }: Pick<UserResponse, 'id'>) => {
  const { isAdmin } = useProfileStore();

  return (
    <div className={styles.actions}>
      {isAdmin && (
        <>
          <ActionIcon variant="subtle" color="gray">
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </>
      )}
      <ActionIcon component={Link} to={`/users/${id}`} variant="subtle" color="blue">
        <IconExternalLink size={16} stroke={1.5} />
      </ActionIcon>
    </div>
  );
};
