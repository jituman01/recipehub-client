'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, AlertOctagon, Copyright } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitRecipeReportAction } from '@/lib/action/report';

const reportReasons = [
  { id: 'spam', label: 'Spam', icon: AlertTriangle },
  { id: 'offensive', label: 'Offensive Content', icon: AlertOctagon },
  { id: 'copyright', label: 'Copyright Issue', icon: Copyright },
];

export default function RecipeReportModal({
  isOpen,
  onClose,
  recipeId,
  recipeName,
  userEmail,
}) {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleReportSubmit = async e => {
    e.preventDefault();
    if (!selectedReason) {
      return toast.error('Please select a reason for reporting.');
    }

    setIsSubmitting(true);
    const reportData = {
      recipeId,
      recipeName,
      reporterEmail: userEmail,
      reason: selectedReason,
      details: details,
    };

    const result = await submitRecipeReportAction(reportData);

    if (result.success) {
      toast.success(result.msg);
      setSelectedReason('');
      setDetails('');
      onClose();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl transition-opacity duration-300">
      <div className="bg-transparent text-red-500 dark:text-slate-100 w-full max-w-md rounded-3xl shadow-2xl p-7 space-y-6 relative border border-default-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2.5">
            Report Recipe
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleReportSubmit} className="space-y-6">
          {/* name */}
          <div>
            <p className="text-xs text-white dark:text-slate-500 font-medium tracking-wide">
              Reporting:
            </p>
            <p className="text-sm font-semibold truncate text-yellow-500 dark:text-slate-200">
              {recipeName}
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300 dark:text-white">
              Reason *
            </label>
            <div className="space-y-3">
              {reportReasons.map(item => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                    selectedReason === item.id
                      ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-950/30 shadow-inner'
                      : 'border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:border-orange-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={item.id}
                    checked={selectedReason === item.id}
                    onChange={e => setSelectedReason(e.target.value)}
                    className="form-radio h-4 w-4 text-orange-500 focus:ring-orange-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800 cursor-pointer"
                    required
                  />
                  <item.icon
                    size={18}
                    className={`${
                      selectedReason === item.id
                        ? 'text-orange-500'
                        : 'text-white dark:text-slate-500'
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      selectedReason === item.id
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-white dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-300 dark:text-white">
              Additional Details (optional)
            </label>
            <textarea
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="Provide more context..."
              className="w-full h-24 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-transparent text-slate-400 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
            />
          </div>

          <div className="flex gap-4 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 bg-[#e64c4c] hover:bg-[#e13636] text-white rounded-xl text-sm font-bold cursor-pointer transition-all ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
