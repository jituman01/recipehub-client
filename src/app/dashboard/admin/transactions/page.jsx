'use client';

import React, { useState, useEffect } from 'react';
import { Card, Chip } from '@heroui/react';
import { getAllTransactionsAction } from '@/lib/action/admin/transaction';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await getAllTransactionsAction();
      if (result.success) {
        setTransactions(result.data);
      }
      setLoading(false);
    };
    fetchTransactions();
  }, []);


  return (
    <div className="space-y-6 pb-10 mt-6 max-w-7xl mx-auto ">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          Transactions
        </h1>
        <p className="text-sm text-default-400">
          All payment records on the platform
        </p>
      </div>

      <Card className="border border-default-200/60 bg-white dark:bg-black backdrop-blur-md shadow-sm overflow-hidden" radius="xl">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            
            <thead>
              <tr className="border-b border-default-100 bg-default-50/50">
                <th className="p-4 text-xs font-bold text-default-500 uppercase tracking-wider">User</th>
                <th className="p-4 text-xs font-bold text-default-500 uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-bold text-default-500 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-xs font-bold text-default-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-default-500 uppercase tracking-wider">Transaction ID</th>
                <th className="p-4 text-xs font-bold text-default-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-sm text-default-400">
                    No transactions recorded yet.
                  </td>
                </tr>
              ) : (
                transactions.map((item) => (
                  <tr 
                    key={item._id} 
                    className="border-b border-default-100 last:border-none hover:bg-default-50/40 transition-colors"
                  >
                    <td className="p-4 text-sm font-medium text-default-700">
                      {item.userEmail}
                    </td>

                    {/* (Premium  Recipe) */}
                    <td className="p-4">
                      <Chip
                        className="capitalize border-none font-bold text-xs px-2"
                        color={item.type === 'Premium' ? 'danger' : 'secondary'}
                        size="sm"
                        variant="accent"
                      >
                        {item.type}
                      </Chip>
                    </td>

                    <td className="p-4 text-sm font-black text-emerald-600 dark:text-emerald-400">
                      ${Number(item.amount).toFixed(2)}
                    </td>

                    <td className="p-4">
                      <Chip
                        className="capitalize border-none font-black text-xs px-2 text-white shadow-sm"
                        color="success"
                        size="sm"
                        variant="primary"
                      >
                        {item.status}
                      </Chip>
                    </td>

                    <td className="p-4 font-mono text-xs text-default-500" title={item.transactionId}>
                      {item.transactionId && item.transactionId.length > 15 
                        ? `${item.transactionId.substring(0, 14)}...` 
                        : item.transactionId}
                    </td>

                    {/*(DD/MM/YYYY) */}
                    <td className="p-4 text-sm text-default-500">
                      {new Date(item.date).toLocaleDateString('en-GB')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </Card>
    </div>
  );
};

export default TransactionsPage;