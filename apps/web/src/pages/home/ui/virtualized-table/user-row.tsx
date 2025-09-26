import { Avatar, Badge, Flex, Table, Text } from '@mantine/core';
import { format as formatPhone } from '@react-input/mask';
import { format, parseISO } from 'date-fns';
import { ComponentProps } from 'react';
import { departmentsColors, phoneMask } from '@/shared/lib';
import { ActionsCell } from './action-cell';

interface UserRowProps extends ComponentProps<typeof Table.Tr> {
  data: UserResponse;
}

export const UserRow = ({ data, ...props }: UserRowProps) => (
  <Table.Tr {...props}>
    <Table.Td w={65}>{data.id}</Table.Td>
    <Table.Td w={230}>
      <Flex align="center" gap="sm">
        <Avatar size={30} src={data.avatar} radius={30} />
        <Text truncate="end" fz="sm" fw={500}>
          {data.firstName} {data.lastName}
        </Text>
      </Flex>
    </Table.Td>
    <Table.Td w={130}>
      <Badge color={departmentsColors[data.department]} variant="light">
        {data.department}
      </Badge>
    </Table.Td>
    <Table.Td w={100}>{data.position}</Table.Td>
    <Table.Td w={90}>{format(parseISO(data.birthday), 'dd.MM.yyyy')}</Table.Td>
    <Table.Td w={145}>{formatPhone(data.officePhone, phoneMask)}</Table.Td>
    <Table.Td w={240}>
      <Text truncate="end" fz="sm">
        {data.email}
      </Text>
    </Table.Td>
    <Table.Td w={108}>
      <ActionsCell id={data.id} />
    </Table.Td>
  </Table.Tr>
);
