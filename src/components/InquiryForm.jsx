import React, { useState } from 'react';
import { createInquiry } from '../services/inquiryService';

export default function InquiryForm({ listingId, onSuccess, onCancel }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const MAX_LENGTH = 5000;
  const MIN_LENGTH = 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (message.trim().length < MIN_LENGTH) {
      setError(`Message must be at least ${MIN_LENGTH} characters.`);
      return;
    }

    setLoading(true);

    try {
      const response = await createInquiry({
        listing_id: listingId,
        message: message.trim(),
      });

      if (response.success) {
        setSuccess(true);
        setMessage('');
        // Notify parent component
        if (onSuccess) onSuccess(response.data);
      } else {
        setError(response.message || 'Failed to send inquiry.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Success state — show confirmation instead of form
  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-green-900">Inquiry Sent!</h3>
        <p className="text-sm text-green-700 mt-1">
          The provider will get back to you soon.
        </p>
        <button
          onClick={onCancel}
          className="mt-4 text-sm text-green-700 underline hover:text-green-800"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Contact Provider</h2>
        <p className="text-sm text-gray-500">
          Send a message about this service listing.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Message textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi, I'm interested in your service. Are you available this weekend?"
          className="
            w-full px-3 py-2 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            resize-none text-sm
          "
          disabled={loading}
        />
        {/* Character counter */}
        <div className="flex justify-between mt-1">
          <span className={`text-xs ${message.length > MAX_LENGTH ? 'text-red-500' : 'text-gray-400'}`}>
            {message.length > MAX_LENGTH ? 'Too long' : `${message.length}/${MAX_LENGTH}`}
          </span>
          {message.length > 0 && message.length < MIN_LENGTH && (
            <span className="text-xs text-orange-500">
              Minimum {MIN_LENGTH} characters
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="
            px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300
            rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50
          "
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || message.trim().length < MIN_LENGTH}
          className="
            px-4 py-2 text-sm font-medium text-white bg-blue-600
            rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center
          "
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            'Send Inquiry'
          )}
        </button>
      </div>
    </form>
  );
}