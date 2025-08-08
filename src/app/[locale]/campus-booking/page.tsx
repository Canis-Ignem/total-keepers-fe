'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FaCalendarDays, FaClock, FaMapPin, FaUser, FaCircleCheck } from 'react-icons/fa6';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from 'next-auth/react';

// Types for campus data
interface CampusSession {
  id: string;
  title: string;
  description: string;
  session_type: 'morning' | 'afternoon' | 'evening' | 'full_day';
  start_date: string;
  end_date: string;
  location: string;
  coach_name: string;
  max_participants: number;
  current_participants: number;
  price: number;
  is_featured: boolean;
  status: 'open' | 'full' | 'cancelled' | 'completed';
  is_full: boolean;
  is_past: boolean;
  available_spots: number;
}

interface BookingFormData {
  participant_name: string;
  participant_email: string;
  participant_phone: string;
  participant_age: number | '';
  guardian_name?: string;
  guardian_email?: string;
  guardian_phone?: string;
  notes?: string;
}

interface BookingResponse {
  id: string;
  reference: string;
  participant_email: string;
  session_id: string;
  status: string;
}

export default function CampusBookingPage() {
  const t = useTranslations();
  const { user, isAuthenticated } = useAuth();
  const { data: session } = useSession();
  
  const [sessions, setSessions] = useState<CampusSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<CampusSession | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<BookingResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'featured' | 'available'>('all');

  const [formData, setFormData] = useState<BookingFormData>({
    participant_name: '',
    participant_email: '',
    participant_phone: '',
    participant_age: '',
    guardian_name: '',
    guardian_email: '',
    guardian_phone: '',
    notes: ''
  });

  // Auto-fill user data when authentication state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      // Auto-fill with authenticated user data
      setFormData(prev => ({
        ...prev,
        participant_name: prev.participant_name || `${user.first_name} ${user.last_name}`.trim(),
        participant_email: prev.participant_email || user.email
      }));
    } else if (session?.user && !isAuthenticated) {
      // Auto-fill with NextAuth session data (for Google OAuth users)
      setFormData(prev => ({
        ...prev,
        participant_name: prev.participant_name || session.user?.name || '',
        participant_email: prev.participant_email || session.user?.email || ''
      }));
    }
  }, [isAuthenticated, user, session]);

  // Fetch sessions from API
  useEffect(() => {
    fetchSessions();
  }, [filter]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter === 'featured') params.append('featured_only', 'true');
      if (filter === 'available') params.append('include_past', 'false');
      
      const response = await fetch(`http://127.0.0.1:8000/api/v1/campus/schedule?${params}`);
      if (!response.ok) throw new Error('Failed to fetch sessions');
      
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (err) {
      setError(t('campus_booking.errors.network_error'));
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSessionSelect = (campusSession: CampusSession) => {
    if (campusSession.is_full || campusSession.is_past) return;
    setSelectedSession(campusSession);
    
    // Reset form data and auto-fill with user data
    const baseFormData: BookingFormData = {
      participant_name: '',
      participant_email: '',
      participant_phone: '',
      participant_age: '',
      guardian_name: '',
      guardian_email: '',
      guardian_phone: '',
      notes: ''
    };

    // Auto-fill with user data if available
    if (isAuthenticated && user) {
      baseFormData.participant_name = `${user.first_name} ${user.last_name}`.trim();
      baseFormData.participant_email = user.email;
    } else if (session?.user) {
      // Use NextAuth session data for Google OAuth users
      baseFormData.participant_name = session.user?.name || '';
      baseFormData.participant_email = session.user?.email || '';
    }

    setFormData(baseFormData);
    setShowBookingForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession) return;

    // Validation
    if (!formData.participant_name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!formData.participant_email.trim()) {
      setError(t('campus_booking.errors.invalid_email'));
      return;
    }

    if (formData.participant_age === '' || formData.participant_age < 8 || formData.participant_age > 50) {
      setError(t('campus_booking.errors.invalid_age'));
      return;
    }

    // Guardian info required for under 18
    if (formData.participant_age < 18) {
      if (!formData.guardian_name?.trim() || !formData.guardian_email?.trim()) {
        setError(t('campus_booking.errors.guardian_required'));
        return;
      }
    }

    try {
      setSubmitting(true);
      setError(null);

      const bookingData = {
        session_id: selectedSession.id,
        participant_name: formData.participant_name.trim(),
        participant_email: formData.participant_email.trim(),
        participant_phone: formData.participant_phone.trim(),
        participant_age: Number(formData.participant_age),
        guardian_name: formData.guardian_name?.trim() || null,
        guardian_email: formData.guardian_email?.trim() || null,
        guardian_phone: formData.guardian_phone?.trim() || null,
        notes: formData.notes?.trim() || null
      };

      const response = await fetch('http://127.0.0.1:8000/api/v1/campus/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Booking failed');
      }

      const booking = await response.json();
      setBookingSuccess(booking);
      setShowBookingForm(false);
      
      // Refresh sessions to update availability
      await fetchSessions();
      
    } catch (err: any) {
      setError(err.message || t('campus_booking.errors.booking_failed'));
    } finally {
      setSubmitting(false);
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getSessionTypeLabel = (type: string) => {
    const types = {
      'morning': 'Morning Session',
      'afternoon': 'Afternoon Session',
      'evening': 'Evening Session',
      'full_day': 'Full Day Session'
    };
    return types[type as keyof typeof types] || type;
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCircleCheck className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('campus_booking.booking_success.title')}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('campus_booking.booking_success.subtitle')}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">
                {t('campus_booking.booking_success.reference')}
              </p>
              <p className="text-xl font-mono font-bold text-gray-900 mb-4">
                {bookingSuccess.reference}
              </p>
              <p className="text-sm text-gray-600">
                {t('campus_booking.booking_success.email_sent')} {bookingSuccess.participant_email}
              </p>
            </div>
            
            <div className="text-left bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3">
                {t('campus_booking.booking_success.what_next')}
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li>• {t('campus_booking.booking_success.arrive_early')}</li>
                <li>• {t('campus_booking.booking_success.bring_gear')}</li>
                <li>• {t('campus_booking.booking_success.contact_us')}</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setBookingSuccess(null);
                  setSelectedSession(null);
                  setFormData({
                    participant_name: '',
                    participant_email: '',
                    participant_phone: '',
                    participant_age: '',
                    guardian_name: '',
                    guardian_email: '',
                    guardian_phone: '',
                    notes: ''
                  });
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('campus_booking.booking_success.book_another')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('campus_booking.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('campus_booking.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t('campus_booking.filters.all_sessions')}
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'featured' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t('campus_booking.filters.featured_only')}
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'available' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t('campus_booking.filters.available_only')}
          </button>
        </div>

        {/* Sessions List */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('campus_booking.schedule_title')}
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{t('campus_booking.loading')}</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{t('campus_booking.no_sessions')}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sessions.map((session) => {
                const startTime = formatDateTime(session.start_date);
                const endTime = formatDateTime(session.end_date);
                const isDisabled = session.is_full || session.is_past;
                
                return (
                  <div
                    key={session.id}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                      isDisabled ? 'opacity-60' : 'cursor-pointer'
                    }`}
                    onClick={() => !isDisabled && handleSessionSelect(session)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getSessionTypeLabel(session.session_type)}
                        </span>
                        {session.is_featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {session.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {session.description}
                      </p>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <FaCalendarDays className="w-4 h-4 mr-2" />
                          <span>{startTime.date}</span>
                        </div>
                        <div className="flex items-center">
                          <FaClock className="w-4 h-4 mr-2" />
                          <span>{startTime.time} - {endTime.time}</span>
                        </div>
                        <div className="flex items-center">
                          <FaUser className="w-4 h-4 mr-2" />
                          <span>{t('campus_booking.session_details.coach')}: {session.coach_name}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapPin className="w-4 h-4 mr-2" />
                          <span>{session.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {session.price === 0 ? (
                            <span className="text-lg font-bold text-green-600">
                              {t('campus_booking.booking_form.free_session')}
                            </span>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              €{session.price} {t('campus_booking.booking_form.price_per_person')}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          {session.is_past ? (
                            <span className="text-sm text-gray-500">
                              {t('campus_booking.session_details.session_past')}
                            </span>
                          ) : session.is_full ? (
                            <span className="text-sm text-red-600">
                              {t('campus_booking.session_details.session_full')}
                            </span>
                          ) : (
                            <span className="text-sm text-green-600">
                              {session.available_spots} {session.available_spots === 1 ? t('campus_booking.session_details.spot_available') : t('campus_booking.session_details.spots_available')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t('campus_booking.booking_form.title')}
                  </h2>
                  <button
                    onClick={() => {
                      setShowBookingForm(false);
                      setSelectedSession(null);
                      setError(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    ✕
                  </button>
                </div>

                {/* Session Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedSession.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{selectedSession.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>{formatDateTime(selectedSession.start_date).date}</span>
                    <span>{formatDateTime(selectedSession.start_date).time} - {formatDateTime(selectedSession.end_date).time}</span>
                    <span>{selectedSession.location}</span>
                    <span className="font-medium">
                      {selectedSession.price === 0 ? t('campus_booking.booking_form.free_session') : `€${selectedSession.price}`}
                    </span>
                  </div>
                </div>

                {/* Authentication Status Indicator */}
                {(isAuthenticated || session?.user) && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <FaCircleCheck className="text-green-600 mt-0.5" />
                      <div>
                        <p className="text-green-800 font-medium">
                          {t('campus_booking.booking_form.logged_in_as')} {
                            isAuthenticated && user 
                              ? `${user.first_name} ${user.last_name}`.trim()
                              : session?.user?.name
                          }
                        </p>
                        <p className="text-green-700 text-sm">
                          {t('campus_booking.booking_form.details_prefilled')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Participant Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('campus_booking.booking_form.participant_info')}
                    </h3>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('campus_booking.booking_form.participant_name')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.participant_name}
                          onChange={(e) => setFormData({...formData, participant_name: e.target.value})}
                          placeholder={t('campus_booking.booking_form.participant_name_placeholder')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('campus_booking.booking_form.participant_age')} *
                        </label>
                        <input
                          type="number"
                          required
                          min="8"
                          max="50"
                          value={formData.participant_age}
                          onChange={(e) => setFormData({...formData, participant_age: e.target.value ? Number(e.target.value) : ''})}
                          placeholder={t('campus_booking.booking_form.participant_age_placeholder')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('campus_booking.booking_form.participant_email')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.participant_email}
                          onChange={(e) => setFormData({...formData, participant_email: e.target.value})}
                          placeholder={t('campus_booking.booking_form.participant_email_placeholder')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('campus_booking.booking_form.participant_phone')}
                        </label>
                        <input
                          type="tel"
                          value={formData.participant_phone}
                          onChange={(e) => setFormData({...formData, participant_phone: e.target.value})}
                          placeholder={t('campus_booking.booking_form.participant_phone_placeholder')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guardian Information (if under 18) */}
                  {formData.participant_age !== '' && formData.participant_age < 18 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {t('campus_booking.booking_form.guardian_info')}
                      </h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('campus_booking.booking_form.guardian_name')} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.guardian_name}
                            onChange={(e) => setFormData({...formData, guardian_name: e.target.value})}
                            placeholder={t('campus_booking.booking_form.guardian_name_placeholder')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('campus_booking.booking_form.guardian_phone')}
                          </label>
                          <input
                            type="tel"
                            value={formData.guardian_phone}
                            onChange={(e) => setFormData({...formData, guardian_phone: e.target.value})}
                            placeholder={t('campus_booking.booking_form.guardian_phone_placeholder')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('campus_booking.booking_form.guardian_email')} *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.guardian_email}
                            onChange={(e) => setFormData({...formData, guardian_email: e.target.value})}
                            placeholder={t('campus_booking.booking_form.guardian_email_placeholder')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('campus_booking.booking_form.additional_info')}
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('campus_booking.booking_form.notes')}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder={t('campus_booking.booking_form.notes_placeholder')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowBookingForm(false);
                        setSelectedSession(null);
                        setError(null);
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {submitting ? t('campus_booking.booking_form.booking') : t('campus_booking.booking_form.book_session')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
