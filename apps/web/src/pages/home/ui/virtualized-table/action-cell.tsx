import { Link } from 'react-router';
import { Flex, ActionIcon } from '@mantine/core';
import { IconPencil, IconTrash, IconExternalLink } from '@tabler/icons-react';
import { useProfileStore } from '@/shared/store';

export const ActionsCell = ({ id }: Pick<UserResponse, 'id'>) => {
  const { isAdmin } = useProfileStore();

  return (
    <Flex justify="flex-end">
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
    </Flex>
  );
};
