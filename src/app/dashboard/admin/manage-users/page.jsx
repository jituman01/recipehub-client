'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableScrollContainer,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Chip,
  Button,
  Card,
} from '@heroui/react';
import {
  getAllUsersAction,
  toggleUserStatusAction,
} from '@/lib/action/admin/ManageUser';
import toast from 'react-hot-toast';

const ManageUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const result = await getAllUsersAction();
    if (result.success) {
      setUsers(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, currentBlockStatus) => {
    const newStatus = !currentBlockStatus;
    const result = await toggleUserStatusAction(userId, newStatus);

    if (result.success) {
      toast.success(result.message);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, isBlocked: newStatus } : user
        )
      );
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="space-y-6 pb-10 mt-6 max-w-7xl mx-auto">
      {/* header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          Manage Users
        </h1>
        <p className="text-sm text-default-400">
          Block/unblock users and manage account statuses
        </p>
      </div>

      <Card
        className="border border-default-200/60 bg-background/60 backdrop-blur-md shadow-sm p-2"
        radius="xl"
      >
        <Table className="p-0 bg-transparent shadow-none">
          <TableScrollContainer>
            <TableContent
              aria-label="User management table"
              className="min-w-[600px]"
            >
              <TableHeader>
                <TableColumn isRowHeader className="font-bold text-default-500">
                  USER
                </TableColumn>
                <TableColumn className="font-bold text-default-500">
                  STATUS
                </TableColumn>
                <TableColumn className="font-bold text-default-500 text-right">
                  ACTIONS
                </TableColumn>
              </TableHeader>

              <TableBody emptyContent={'No users found'}>
                {users.map(user => (
                  <TableRow
                    key={user._id}
                    className="border-b border-default-100 last:border-none"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3 py-1">
                        <Avatar
                          radius="full"
                          size="md"
                          className="w-10 h-10 min-w-10 border border-default-200 overflow-hidden"
                        >
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-foreground">
                            {user.name}
                          </span>
                          <span className="text-xs text-default-400">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Chip
                        className="capitalize border-none font-bold text-xs px-2"
                        color={user.isBlocked ? 'danger' : 'success'}
                        size="sm"
                        variant="solid"
                      >
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </Chip>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        radius="md"
                        className={`font-bold px-4 ${
                          user.isBlocked
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400'
                        }`}
                        onClick={() =>
                          handleToggleStatus(user._id, user.isBlocked)
                        }
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContent>
          </TableScrollContainer>
        </Table>
      </Card>
    </div>
  );
};

export default ManageUserPage;
