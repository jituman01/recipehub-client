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
  Chip, 
  Button, 
  Card 
} from '@heroui/react'; 
import toast from 'react-hot-toast';
import { getAllReportsAction, removeRecipeAndReportAction, dismissReportAction } from '@/lib/action/admin/ReportRecipe';

const RecipeReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    const result = await getAllReportsAction();
    if (result.success) {
      setReports(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleRemoveRecipe = async (recipeId, reportId) => {
    const result = await removeRecipeAndReportAction(recipeId, reportId);
    if (result.success) {
      toast.success("Recipe and report removed successfully!");
      setReports((prev) => prev.filter((report) => report._id !== reportId));
    } else {
      toast.error(result.message || "Something went wrong");
    }
  };

  const handleDismissReport = async (reportId) => {
    const result = await dismissReportAction(reportId);
    if (result.success) {
      toast.success("Report dismissed successfully");
      setReports((prev) => prev.filter((report) => report._id !== reportId));
    } else {
      toast.error(result.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6 pb-10 mt-6 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          Recipe Reports 
        </h1>
        <p className="text-sm text-default-400">
          Review reported content from users, take down recipes, or dismiss false alerts.
        </p>
      </div>

      <Card className="border border-default-200/60 bg-background/60 backdrop-blur-md shadow-sm p-2" radius="xl">
        <Table className="p-0 bg-transparent shadow-none">
          <TableScrollContainer>
            <TableContent aria-label="Recipe reports management table" className="min-w-[800px]">
              
              <TableHeader>
                <TableColumn isRowHeader className="font-bold text-default-500">Recipe NAME</TableColumn>
                <TableColumn className="font-bold text-default-500">Reporter</TableColumn>
                <TableColumn className="font-bold text-default-500">Reason</TableColumn>
                <TableColumn className="font-bold text-default-500">Description</TableColumn>
                <TableColumn className="font-bold text-default-500">Reported</TableColumn>
                <TableColumn className="font-bold text-default-500 text-right">Actions</TableColumn>
              </TableHeader>

              <TableBody emptyContent={"No pending reports found"}>
                {reports.map((recipe) => (
                  <TableRow key={recipe._id} className="border-b border-default-100 last:border-none">
                    
                    <TableCell className="font-mono text-bold dark:text-white text-black">
                      {recipe.recipeName}
                    </TableCell>

                    <TableCell className="font-medium text-sm text-default-700">
                      {recipe.reporterEmail}
                    </TableCell>

                    <TableCell>
                      <Chip
                        className="capitalize border-none font-black text-xs text-white px-2  shadow-sm"
                        color={recipe.reason?.toLowerCase() === 'spam' ? 'danger' : 'danger'}
                        size="sm"
                        variant="primary"
                      >
                        {recipe.reason}
                      </Chip>
                    </TableCell>

                    <TableCell className="text-sm text-default-500 max-w-[150px] truncate">
                      {recipe.details || '—'}
                    </TableCell>

                    <TableCell className="text-sm text-default-500">
                      {recipe.reportedAt ? new Date(recipe.reportedAt).toLocaleDateString('en-GB') : '16/06/2026'}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          radius="md"
                          className="bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold px-3"
                          onClick={() => handleRemoveRecipe(recipe.recipeId, recipe._id)}
                        >
                          Remove Recipe
                        </Button>

                        <Button
                          size="sm"
                          radius="md"
                          className="bg-default-100 text-default-700 dark:bg-default-800 dark:text-default-300 font-bold px-3 border border-default-200/60"
                          onClick={() => handleDismissReport(recipe._id)}
                        >
                          Dismiss
                        </Button>
                      </div>
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

export default RecipeReportsPage;