import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AppDispatch, RootState } from '../../store';
import {
  createCase,
  updateCase,
  fetchCaseById,
  clearError,
} from '../../store/slices/caseSlice';

interface CaseFormProps {
  caseId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CaseForm: React.FC<CaseFormProps> = ({ caseId, onClose, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentCase, loading, error } = useSelector(
    (state: RootState) => state.cases
  );

  const formik = useFormik({
    initialValues: {
      title: '',
      case_number: '',
      client: '',
      status: 'pending',
      description: '',
      assigned_to: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      case_number: Yup.string().required('Case number is required'),
      client: Yup.string().required('Client is required'),
      status: Yup.string().required('Status is required'),
      description: Yup.string().required('Description is required'),
      assigned_to: Yup.string().required('Assigned to is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (caseId) {
          await dispatch(updateCase({ id: caseId, data: values }));
        } else {
          await dispatch(createCase(values));
        }
        onSuccess();
      } catch (err) {
        console.error('Error submitting form:', err);
      }
    },
  });

  useEffect(() => {
    if (caseId) {
      dispatch(fetchCaseById(caseId));
    }
  }, [dispatch, caseId]);

  useEffect(() => {
    if (currentCase && caseId) {
      formik.setValues({
        title: currentCase.title,
        case_number: currentCase.case_number,
        client: currentCase.client.toString(),
        status: currentCase.status,
        description: currentCase.description,
        assigned_to: currentCase.assigned_to.toString(),
      });
    }
  }, [currentCase, caseId]);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
            {caseId ? 'Edit Case' : 'Create New Case'}
          </Dialog.Title>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                {...formik.getFieldProps('title')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="case_number"
                className="block text-sm font-medium text-gray-700"
              >
                Case Number
              </label>
              <input
                type="text"
                id="case_number"
                {...formik.getFieldProps('case_number')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.case_number && formik.errors.case_number && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.case_number}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="client"
                className="block text-sm font-medium text-gray-700"
              >
                Client
              </label>
              <input
                type="text"
                id="client"
                {...formik.getFieldProps('client')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.client && formik.errors.client && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.client}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                {...formik.getFieldProps('status')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.status}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                {...formik.getFieldProps('description')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="assigned_to"
                className="block text-sm font-medium text-gray-700"
              >
                Assigned To
              </label>
              <input
                type="text"
                id="assigned_to"
                {...formik.getFieldProps('assigned_to')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.assigned_to && formik.errors.assigned_to && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.assigned_to}
                </p>
              )}
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm disabled:opacity-50"
              >
                {loading ? 'Saving...' : caseId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default CaseForm; 