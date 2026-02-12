'use client';

import React from 'react';
import Link from 'next/link';
import api from '@/app/shared/services/axios';

type Slot = {
  _id?: string;
  id?: number;
  date: string; // YYYY-MM-DD
  start: string; // HH:MM
  end: string; // HH:MM
};

const STORAGE_KEY = 'doctor_availability';

function getDoctorId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed._id || parsed.id || 'doctor-1';
    }
  } catch (e) {
    console.warn('Could not retrieve doctor ID from localStorage');
  }
  return 'doctor-1';
}

function getNextDays(n: number) {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDateLabel(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function AvailabilityCalendar() {
  const [slots, setSlots] = React.useState<Slot[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState(() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
  });
  const [startTime, setStartTime] = React.useState('09:00');
  const [endTime, setEndTime] = React.useState('10:00');
  const [timeRows, setTimeRows] = React.useState<{ start: string; end: string }[]>([{ start: '09:00', end: '10:00' }]);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSlots(JSON.parse(raw));
    } catch {}
    setHydrated(true);
    
    // Fetch from API
    fetchSlots();
  }, []);

  async function fetchSlots() {
    try {
      const doctorId = getDoctorId();
      const res = await fetch(`${API_BASE}?doctorId=${doctorId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSlots(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch availability:', err);
    }
  }

  React.useEffect(() => {
    if (!hydrated) return;
    // Remove localStorage saving; API will persist
  }, [slots, hydrated]);

  function clearForm() {
    setStartTime('09:00');
    setEndTime('10:00');
    setEditingId(null);
    setTimeRows([{ start: '09:00', end: '10:00' }]);
  }

  async function handleAddOrUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate) return alert('Please select a date');

    if (editingId != null) {
      // update single slot from first time row
      const tr = timeRows[0];
      if (!tr || !tr.start || !tr.end) return alert('Start and end time required');
      if (tr.start >= tr.end) return alert('Start must be before end');
      
      try {
        const res = await api.put(`/availability/${editingId}`, { date: selectedDate, start: tr.start, end: tr.end });
        const updatedSlot = res.data.data;
        setSlots((prev) => prev.map((s) => (String(s._id) === String(editingId) || String(s.id) === String(editingId) ? updatedSlot : s)));
        clearForm();
      } catch (err) {
        alert('Failed to update slot: ' + (err as Error).message);
      }
      return;
    }

    // adding mode: create one slot per time row
    if (!timeRows || timeRows.length === 0) return alert('Add at least one time row');
    for (const tr of timeRows) {
      if (!tr.start || !tr.end) return alert('Start and end time required for all rows');
      if (tr.start >= tr.end) return alert('Every start must be before its end');
    }

    // check for conflicts
    if (hasConflicts(selectedDate, timeRows)) {
      return alert('Time slot conflicts with existing availability. Please adjust the times.');
    }

    try {
      const doctorId = getDoctorId();
      const res = await api.post('/availability', { date: selectedDate, slots: timeRows, doctorId });
      const newData = res.data.data;
      setSlots((prev) => [...prev, ...newData].sort((a, b) => ((a.date || '') + (a.start || '') > (b.date || '') + (b.start || '') ? 1 : -1)));
      clearForm();
    } catch (err) {
      alert('Failed to create slots: ' + (err as Error).message);
    }
  }

  function handleEdit(s: Slot) {
    setSelectedDate(s.date);
    setStartTime(s.start);
    setEndTime(s.end);
    setTimeRows([{ start: s.start, end: s.end }]);
    setEditingId(s.id ?? null);
    setShowModal(true);
  }

  function handleDelete(id: number | string) {
    if (!confirm('Delete this availability slot?')) return;
    
    const deleteId = typeof id === 'string' ? id : id.toString();
    
    (async () => {
      try {
        await api.delete(`/availability/${deleteId}`);
        setSlots((prev) => prev.filter((s) => s._id !== deleteId && s.id !== id));
      } catch (err) {
        alert('Failed to delete: ' + (err as Error).message);
      }
    })();
  }

  function openAddModal() {
    clearForm();
    setSelectedDate((d) => d);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleSubmitModal(e: React.FormEvent) {
    e.preventDefault();
    handleAddOrUpdate(e);
    closeModal();
  }

  // month grid helpers
  const [viewMonth, setViewMonth] = React.useState(() => {
    const t = new Date();
    return { year: t.getFullYear(), month: t.getMonth() };
  });

  function startOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
  }

  function getMonthMatrix(year: number, month: number) {
    const first = startOfMonth(year, month);
    const startWeekDay = first.getDay(); // 0=Sun
    // start from Monday per reference; adjust so 0=Mon
    const startOffset = (startWeekDay + 6) % 7;
    const startDate = new Date(first.getFullYear(), first.getMonth(), first.getDate() - startOffset);
    const weeks: Date[][] = [];
    let cur = new Date(startDate);
    for (let wk = 0; wk < 6; wk++) {
      const week: Date[] = [];
      for (let d = 0; d < 7; d++) {
        week.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }

  const monthMatrix = getMonthMatrix(viewMonth.year, viewMonth.month);

  function prevMonth() {
    setViewMonth((m) => {
      const mm = m.month - 1;
      if (mm < 0) return { year: m.year - 1, month: 11 };
      return { year: m.year, month: mm };
    });
  }
  function nextMonth() {
    setViewMonth((m) => {
      const mm = m.month + 1;
      if (mm > 11) return { year: m.year + 1, month: 0 };
      return { year: m.year, month: mm };
    });
  }

  function countSlotsForDate(dateStr: string) {
    return slots.filter((s) => s.date === dateStr).length;
  }

  function timeOverlaps(start1: string, end1: string, start2: string, end2: string): boolean {
    // Returns true if [start1, end1) overlaps with [start2, end2)
    return start1 < end2 && start2 < end1;
  }

  function hasConflicts(date: string, newRows: { start: string; end: string }[], excludeId?: number): boolean {
    // Check if any newRows overlap with existing slots on the same date
    const existingSlots = slots.filter((s) => s.date === date && (!excludeId || s.id !== excludeId));
    for (const newRow of newRows) {
      for (const existing of existingSlots) {
        if (timeOverlaps(newRow.start, newRow.end, existing.start, existing.end)) {
          return true;
        }
      }
    }
    return false;
  }

  const selected = new Date(selectedDate + 'T00:00:00');
  const daySlots = hydrated ? slots.filter((s) => s.date === selectedDate) : [];

  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-600">Plan and edit your available time slots. Click a day to view details.</p>
        </div>

        <div className="bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-11">
            {/* Left detail pane - smaller */}
            <div className="lg:col-span-3 bg-gray-100">
              <div className="flex items-center justify-between px-5 py-4 bg-white">
                <Link href="/adminstration/doctor/calendar" className="flex items-center gap-3 hover:opacity-70 transition">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-teal-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                    </svg>
                    <span>Calendar</span>
                  </div>
                </Link>
                <button onClick={openAddModal} className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-lg hover:bg-teal-600">+</button>
              </div>
              <div className="p-5">
              <div className="mb-4">
                <div className="text-3xl font-extrabold text-gray-900 leading-tight">{selected.toLocaleDateString(undefined, { weekday: 'long' })}</div>
                <div className="text-sm text-gray-500 mt-1">{selected.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</div>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="text-xs text-gray-400 uppercase mb-2">Schedule</div>
                <div className="space-y-2">
                  {daySlots.length === 0 ? (
                    <div className="text-xs text-gray-400">No events for this day</div>
                  ) : (
                    daySlots
                      .sort((a, b) => (a.start > b.start ? 1 : -1))
                      .map((s) => (
                        <div key={s._id || s.id} className="flex items-start gap-2 text-xs">
                          <div className="text-gray-500 w-16">{s.start}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">Available</div>
                            <div className="text-gray-500">{s.start} — {s.end}</div>
                          </div>
                          <button onClick={() => handleEdit(s)} className="text-xs px-1 py-1 bg-white border rounded">Edit</button>
                        </div>
                      ))
                  )}
                </div>
              </div>
              </div>
            </div>

            {/* Right month grid - smaller */}
            <div className="lg:col-span-8 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100 text-lg">◀</button>
                  <div className="text-lg font-bold">{new Date(viewMonth.year, viewMonth.month).toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                  <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100 text-lg">▶</button>
                </div>
                <div className="text-xs text-gray-500">Month</div>
              </div>

              <div className="mt-3 grid grid-cols-7 gap-1 text-center">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <div key={d} className="text-[10px] text-gray-500 py-1">{d}</div>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-2">
                {monthMatrix.map((week, wi) => (
                  <React.Fragment key={wi}>
                    {week.map((day) => {
                      const key = toYMD(day);
                      const inMonth = day.getMonth() === viewMonth.month;
                      const count = countSlotsForDate(key);
                      const isSelected = key === selectedDate;
                      return (
                          <div key={key} onClick={() => setSelectedDate(key)} onDoubleClick={() => {
                            const daySlots = slots.filter((s) => s.date === key);
                            if (daySlots.length > 0) {
                              // open modal prefilled with first slot for quick edit
                              const s = daySlots[0];
                              setSelectedDate(key);
                              setStartTime(s.start);
                              setEndTime(s.end);
                              setTimeRows([{ start: s.start, end: s.end }]);
                              setEditingId(s.id ?? null);
                            } else {
                              // open empty modal to add
                              setSelectedDate(key);
                              clearForm();
                            }
                            setShowModal(true);
                          }} className={`p-1 rounded-md cursor-pointer h-20 flex flex-col justify-between hover:bg-gray-50 ${isSelected ? 'bg-teal-50 border border-teal-200' : 'bg-transparent'} `}>
                          <div>
                            <div className={`text-xl font-extrabold ${isSelected ? 'text-teal-600' : inMonth ? 'text-gray-900' : 'text-gray-300'}`}>{day.getDate()}</div>
                          </div>
                          <div className="text-[9px] text-gray-500">{hydrated && count > 0 ? `${count} item${count>1?'s':''}` : ''}</div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for adding availability */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Add Availability</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <form onSubmit={handleSubmitModal} className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Date</label>
                  <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border px-3 py-2 rounded text-sm" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-gray-600">Time Slots</div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setTimeRows((r) => [...r, { start: '09:00', end: '10:00' }])} className="text-xs px-2 py-1 border rounded">Add row</button>
                      <button type="button" onClick={() => {
                        // auto-fill hourly from first row
                        const first = timeRows[0];
                        if (!first) return;
                        const [h1, m1] = first.start.split(':').map(Number);
                        const [h2, m2] = first.end.split(':').map(Number);
                        const startHour = h1 + (m1 > 0 ? 1 : 0);
                        const endHour = h2;
                        const rows: { start: string; end: string }[] = [];
                        for (let h = startHour; h < endHour; h++) {
                          const s = String(h).padStart(2, '0') + ':00';
                          const e = String(h + 1).padStart(2, '0') + ':00';
                          rows.push({ start: s, end: e });
                        }
                        if (rows.length) setTimeRows(rows);
                      }} className="text-xs px-2 py-1 border rounded">Fill hourly</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {timeRows.map((tr, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input type="time" value={tr.start} onChange={(e) => setTimeRows((rows) => rows.map((r, i) => i === idx ? { ...r, start: e.target.value } : r))} className="w-32 border px-2 py-1 rounded text-sm" />
                        <span className="text-sm">—</span>
                        <input type="time" value={tr.end} onChange={(e) => setTimeRows((rows) => rows.map((r, i) => i === idx ? { ...r, end: e.target.value } : r))} className="w-32 border px-2 py-1 rounded text-sm" />
                        <button type="button" onClick={() => setTimeRows((rows) => rows.filter((_, i) => i !== idx))} className="text-xs px-2 py-1 border rounded">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button type="submit" className="px-4 py-2 text-sm bg-teal-600 text-white rounded hover:bg-teal-700">Add</button>
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
