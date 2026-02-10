'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../../shared/services/axios';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const SUFFIXES = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V'];

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    suffix: '',
    preferredName: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    sex: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    textNotifications: false,
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.birthMonth || !formData.birthDay || !formData.birthYear) {
      newErrors.birthDate = 'Complete date of birth is required';
    }
    if (!formData.sex) newErrors.sex = 'Sex assigned at birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zip.trim()) newErrors.zip = 'Zip code is required';
    if (!formData.phone.trim()) newErrors.phone = 'Callback phone is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      (async () => {
        try {
          const name = `${formData.firstName} ${formData.lastName}`.trim();
          const payload: any = { name, phone: formData.phone };
          if (!formData.email || !formData.password) {
            setServerError('Email and password are required');
            setLoading(false);
            return;
          }
          payload.email = formData.email;
          payload.password = formData.password;

          const res = await api.post('/auth/signup', payload);
          console.log('Signup response', res.data);
          // store JWT token
          if (res.data.token) {
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('user_role', 'patient');
            localStorage.setItem('user_data', JSON.stringify(res.data.data));
            console.log('Signup successful, token stored');
            
            // Redirect to specified URL or dashboard
            if (redirectUrl) {
              router.push(redirectUrl);
            } else {
              router.push('/get-started');
            }
          }
        } catch (err: any) {
          console.error('Signup failed', err);
          // surface server error message when available
          const msg = err?.response?.data?.error || err?.message || 'Network or server error';
          setServerError(String(msg));
        } finally {
          setLoading(false);
        }
      })();
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-(--color-gray-light) py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-(--color-text-primary) mb-2">
              Sign up
            </h1>
            <p className="text-(--color-purple-primary) text-sm">
              <span className="text-(--color-purple-primary)">*</span> Required Fields
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Account credentials */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                  required
                />
              </div>
            </div>
            {/* Profile Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-(--color-text-primary)">
                Profile
              </h2>

              {/* First Name and MI */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-9">
                  <label htmlFor="firstName" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                    <span className="text-(--color-purple-primary)">*</span> Legal first name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                    required
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="middleInitial" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                    MI
                  </label>
                  <input
                    type="text"
                    id="middleInitial"
                    maxLength={2}
                    value={formData.middleInitial}
                    onChange={(e) => updateField('middleInitial', e.target.value.toUpperCase())}
                    className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                  />
                </div>
              </div>

              {/* Last Name and Suffix */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-9">
                  <label htmlFor="lastName" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                    <span className="text-(--color-purple-primary)">*</span> Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                    required
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="suffix" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                    Suffix
                  </label>
                  <select
                    id="suffix"
                    value={formData.suffix}
                    onChange={(e) => updateField('suffix', e.target.value)}
                    className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent appearance-none cursor-pointer"
                  >
                    <option value=""></option>
                    {SUFFIXES.map((suffix) => (
                      <option key={suffix} value={suffix}>
                        {suffix}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Name */}
              <div>
                <label htmlFor="preferredName" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                  Preferred name
                </label>
                <input
                  type="text"
                  id="preferredName"
                  value={formData.preferredName}
                  onChange={(e) => updateField('preferredName', e.target.value)}
                  className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                <span className="text-(--color-purple-primary)">*</span> Date of birth
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="mm"
                  maxLength={2}
                  value={formData.birthMonth}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
                      updateField('birthMonth', value);
                    }
                  }}
                  className="w-20 px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent text-center"
                  required
                />
                <span className="text-(--color-gray-text)">/</span>
                <input
                  type="text"
                  placeholder="dd"
                  maxLength={2}
                  value={formData.birthDay}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 31)) {
                      updateField('birthDay', value);
                    }
                  }}
                  className="w-20 px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent text-center"
                  required
                />
                <span className="text-(--color-gray-text)">/</span>
                <input
                  type="text"
                  placeholder="yyyy"
                  maxLength={4}
                  value={formData.birthYear}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    updateField('birthYear', value);
                  }}
                  className="w-24 px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent text-center"
                  required
                />
              </div>
              {errors.birthDate && (
                <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
              )}
            </div>

            {/* Sex Assigned at Birth */}
            <div>
              <label className="block text-sm font-medium text-(--color-text-secondary) mb-4">
                <span className="text-(--color-purple-primary)">*</span> Sex assigned at birth
              </label>
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={formData.sex === 'male'}
                    onChange={(e) => updateField('sex', e.target.value)}
                    className="w-5 h-5 text-(--color-purple-primary) focus:ring-2 focus:ring-(--color-purple-primary)"
                    required
                  />
                  <span className="text-(--color-text-secondary)">Male</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={formData.sex === 'female'}
                    onChange={(e) => updateField('sex', e.target.value)}
                    className="w-5 h-5 text-(--color-purple-primary) focus:ring-2 focus:ring-(--color-purple-primary)"
                    required
                  />
                  <span className="text-(--color-text-secondary)">Female</span>
                </label>
                <button
                  type="button"
                  className="text-(--color-purple-primary) hover:text-(--color-purple-hover)"
                  aria-label="Help with sex assigned at birth"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              {errors.sex && (
                <p className="mt-1 text-sm text-red-600">{errors.sex}</p>
              )}
            </div>

            {/* Address Section */}
            <div className="space-y-6">
              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                  <span className="text-(--color-purple-primary)">*</span> Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                  required
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                  <span className="text-(--color-purple-primary)">*</span> City
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                  required
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                  <span className="text-(--color-purple-primary)">*</span> State
                </label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select state</option>
                  {US_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              {/* Zip */}
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                  <span className="text-(--color-purple-primary)">*</span> Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  maxLength={10}
                  value={formData.zip}
                  onChange={(e) => updateField('zip', e.target.value)}
                  className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                  required
                />
                {errors.zip && (
                  <p className="mt-1 text-sm text-red-600">{errors.zip}</p>
                )}
              </div>
            </div>

            {/* Phone and Notifications */}
            <div className="space-y-6">
              {/* Callback Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-(--color-text-secondary) mb-2">
                  <span className="text-(--color-purple-primary)">*</span> Callback phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-0 py-2 border-0 border-b-2 border-(--color-gray-border) focus:outline-none focus:border-(--color-purple-primary) transition-colors bg-transparent"
                  required
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Text Notifications */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.textNotifications}
                    onChange={(e) => updateField('textNotifications', e.target.checked)}
                    className="w-5 h-5 text-(--color-purple-primary) border-2 border-(--color-gray-border) rounded focus:ring-2 focus:ring-(--color-purple-primary)"
                  />
                  <span className="text-(--color-text-secondary)">
                    Text me notifications about my visits
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center gap-6 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full max-w-sm bg-(--color-gray-disabled) hover:bg-(--color-purple-primary) text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Continue'}
              </button>
              {serverError && (
                <p className="mt-4 text-red-600 text-center">{serverError}</p>
              )}

              {/* Sign In Link */}
              <p className="text-(--color-text-secondary)">
                Already have an account?{' '}
                <Link
                  href="/registration/signin"
                  className="text-(--color-purple-primary) hover:text-(--color-purple-hover) font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lg text-gray-600">Loading...</div></div>}>
      <SignUpContent />
    </Suspense>
  );
}
