"use client";

import { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Filter,
    Phone,
    RefreshCw,
    Search,
    UserRound,
    XCircle,
    Check,
    X,
} from "lucide-react";
import { supabase } from "@/lib/supabase-browser";

type Appointment = {
    id: string;
    booking_id: string;
    name: string;
    phone: string;
    age: number;
    gender: string;
    doctor: string;
    address: string;
    problem: string | null;
    appointment_date: string;
    appointment_time: string;
    status: string;
    created_at: string;
};

export default function AdminAppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [doctorFilter, setDoctorFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("");

    useEffect(() => {
        fetchAppointments();
    }, []);

    // =====================================================
    // FETCH APPOINTMENTS
    // =====================================================

    async function fetchAppointments() {
        setLoading(true);

        const { data, error } = await supabase
            .from("appointments")
            .select("*")
            .order("appointment_date", {
                ascending: true,
            })
            .order("appointment_time", {
                ascending: true,
            });

        if (error) {
            console.error(
                "Error fetching appointments:",
                error.message
            );
            setLoading(false);
            return;
        }

        setAppointments(data || []);
        setLoading(false);
    }

    // =====================================================
    // UPDATE STATUS WITH DB PERSISTENCE
    // =====================================================

    async function updateStatus(
        id: string,
        newStatus: "completed" | "cancelled" | "confirmed" | "pending"
    ) {
        if (updatingId) return;

        const appointment = appointments.find((item) => item.id === id);
        if (!appointment) return;

        const actionText =
            newStatus === "completed"
                ? "complete"
                : newStatus === "cancelled"
                ? "cancel"
                : `mark as ${newStatus}`;

        const confirmed = window.confirm(
            `Are you sure you want to ${actionText} this appointment?\n\n` +
                `Patient: ${appointment.name}\n` +
                `Doctor: ${appointment.doctor}\n` +
                `Date: ${formatDate(appointment.appointment_date)}\n` +
                `Time: ${formatTime(appointment.appointment_time)}`
        );

        if (!confirmed) return;

        try {
            setUpdatingId(id);

            // Supabase DB Sync Update and Return updated Row
            const { data, error } = await supabase
                .from("appointments")
                .update({ status: newStatus })
                .eq("id", id)
                .select(); // Essential to ensure write confirmation

            if (error) {
                console.error("Database Update Error:", error.message);
                alert(`Database Update Failed: ${error.message}\n\nCheck Row Level Security (RLS) policies in Supabase.`);
                return;
            }

            if (!data || data.length === 0) {
                alert("Update failed: Row not found or restricted by Supabase RLS policy.");
                return;
            }

            // Update UI State with response data from Supabase DB
            const updatedRow = data[0];
            setAppointments((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, status: updatedRow.status } : item
                )
            );

            alert(`Appointment marked as ${newStatus} in Database successfully.`);
        } catch (err: any) {
            console.error("Unexpected error:", err);
            alert("Something went wrong while updating.");
        } finally {
            setUpdatingId(null);
        }
    }

    // =====================================================
    // FORMATTERS
    // =====================================================

    function formatDate(date: string) {
        const d = new Date(`${date}T00:00:00`);
        return d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    function formatDay(date: string) {
        const d = new Date(`${date}T00:00:00`);
        return d.toLocaleDateString("en-IN", {
            weekday: "long",
        });
    }

    function formatTime(time: string) {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(Number(hours), Number(minutes), 0);

        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    const doctors = [
        "Dr. Susmita Mukhopadhyay",
        "Sneha Debnath",
        "Abhijit Pramanick",
        "Sujan Biswas",
    ];

    // =====================================================
    // FILTERED APPOINTMENTS
    // =====================================================

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            const searchText = search.toLowerCase().trim();

            const matchesSearch =
                !searchText ||
                appointment.name.toLowerCase().includes(searchText) ||
                appointment.phone.toLowerCase().includes(searchText) ||
                appointment.booking_id.toLowerCase().includes(searchText);

            const matchesDoctor =
                doctorFilter === "All" || appointment.doctor === doctorFilter;

            let matchesStatus = true;
            if (statusFilter === "Pending") {
                matchesStatus = appointment.status === "pending" || appointment.status === "confirmed";
            } else if (statusFilter === "Completed") {
                matchesStatus = appointment.status === "completed";
            } else if (statusFilter === "Cancelled") {
                matchesStatus = appointment.status === "cancelled";
            }

            const matchesDate =
                !dateFilter || appointment.appointment_date === dateFilter;

            return matchesSearch && matchesDoctor && matchesStatus && matchesDate;
        });
    }, [appointments, search, doctorFilter, statusFilter, dateFilter]);

    // Summary Counts
    const pendingCount = appointments.filter(
        (app) => app.status === "pending" || app.status === "confirmed"
    ).length;
    const completedCount = appointments.filter(
        (app) => app.status === "completed"
    ).length;
    const cancelledCount = appointments.filter(
        (app) => app.status === "cancelled"
    ).length;

    function clearFilters() {
        setSearch("");
        setDoctorFilter("All");
        setStatusFilter("All");
        setDateFilter("");
    }

    const hasActiveFilters =
        search.trim() !== "" ||
        doctorFilter !== "All" ||
        statusFilter !== "All" ||
        dateFilter !== "";

    function getStatusConfig(status: string) {
        switch (status) {
            case "completed":
                return {
                    label: "Completed",
                    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
                    icon: CheckCircle2,
                };
            case "cancelled":
                return {
                    label: "Cancelled",
                    badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
                    icon: XCircle,
                };
            case "confirmed":
            case "pending":
            default:
                return {
                    label: "Pending",
                    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
                    icon: Clock3,
                };
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="mx-auto max-w-7xl">
                {/* PAGE HEADER */}
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
                style={{padding:"5px 1px"}}>
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                            <CalendarDays size={26} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Appointments
                            </h1>
                            <p className="mt-1 text-sm font-medium text-slate-500">
                                Manage patient eye test appointments & schedules
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={fetchAppointments}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-black shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow disabled:cursor-not-allowed disabled:bg-blue-300 disabled:text-white/80"
                        style={{padding:"5px 15px", margin:"0rem 2rem"}}>
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                        {loading ? "Refreshing..." : "Refresh List"}
                    </button>
                </div>

                {/* SUMMARY STATS CARDS */}
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3"
                >
                    {/* Pending Stat */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-amber-200"
                    >
                        <div style={{padding:"5px 10px"}}>
                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500" 
                            >
                                Pending
                            </p>
                            <p className="mt-2 text-4xl font-black text-amber-600">
                                {pendingCount}
                            </p>
                        </div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                            <Clock3 size={28} />
                        </div>
                    </div>

                    {/* Completed Stat */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200">
                        <div style={{padding:"5px 10px"}}>
                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Completed
                            </p>
                            <p className="mt-2 text-4xl font-black text-emerald-600">
                                {completedCount}
                            </p>
                        </div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <CheckCircle2 size={28} />
                        </div>
                    </div>

                    {/* Cancelled Stat */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-rose-200">
                        <div style={{padding:"5px 10px"}}>
                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Cancelled
                            </p>
                            <p className="mt-2 text-4xl font-black text-rose-600">
                                {cancelledCount}
                            </p>
                        </div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                            <XCircle size={28} />
                        </div>
                    </div>
                </div>

                {/* FILTER PANEL */}
                <div className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <Filter size={18} />
                            </div>
                            <h2 className="text-base font-bold text-slate-800" style={{margin:"1rem"}}>
                                Filter Appointments
                            </h2>
                        </div>

                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                            style={{margin:"1rem"}}
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    <div className="grid gap-5 p-6 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="relative" style={{margin:"1rem "}}>
                            <input
                                type="text"
                                style={{padding:"10px"}}
                                placeholder="Search by name, phone..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>

                        <select
                            style={{margin:"1rem 0rem"}}
                            value={doctorFilter}
                            onChange={(e) => setDoctorFilter(e.target.value)}
                            className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        >
                            <option value="All">All Doctors</option>
                            {doctors.map((doc) => (
                                <option key={doc} value={doc}>
                                    {doc}
                                </option>
                            ))}
                        </select>

                        <select
                            style={{margin:"1rem 0rem"}}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <div className="relative">
                            <input
                            style={{marginTop:"1rem", padding:"10px", marginRight:"1rem"}}
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>
                    </div>
                </div>

                {/* APPOINTMENT COUNT & LIST */}
                <div className="mb-5 flex items-center justify-between px-2">
                    <p className="text-base font-medium text-slate-600">
                        Showing{" "}
                        <span className="rounded-md bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-800">
                            {filteredAppointments.length}
                        </span>{" "}
                        appointment{filteredAppointments.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
                        <p className="mt-5 text-lg font-medium text-slate-600">Loading appointments...</p>
                    </div>
                ) : filteredAppointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">
                        <CalendarDays className="h-16 w-16 text-slate-300" />
                        <h2 className="mt-5 text-xl font-bold text-slate-800">No appointments found</h2>
                        <p className="mt-2 text-base text-slate-500">
                            Try adjusting your filters or search criteria.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredAppointments.map((appointment) => {
                            const statusConfig = getStatusConfig(appointment.status);
                            const StatusIcon = statusConfig.icon;
                            const isPending = appointment.status === "pending" || appointment.status === "confirmed";

                            return (
                                <div
                                    key={appointment.id}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
                                    style={{margin:"1rem", padding:"10px"}}
                                >
                                    {/* CARD HEADER */}
                                    <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 p-6 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                                <UserRound size={24} />
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <h2 className="text-xl font-bold text-slate-900">
                                                        {appointment.name}
                                                    </h2>
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusConfig.badgeClass}`}>
                                                        <StatusIcon size={14} />
                                                        {statusConfig.label}
                                                    </span>
                                                </div>
                                                <p className="mt-1.5 text-sm font-medium text-slate-500"
                                                >
                                                    Booking ID:{" "}
                                                    <span className="font-mono font-bold text-blue-700">
                                                        {appointment.booking_id}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* ACTION BUTTONS */}
                                        {isPending && (
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    disabled={updatingId === appointment.id}
                                                    onClick={() => updateStatus(appointment.id, "cancelled")}
                                                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 hover:border-red-300 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200"
                                                >
                                                    <X size={16} strokeWidth={2.5} />
                                                    Cancel
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={updatingId === appointment.id}
                                                    onClick={() => updateStatus(appointment.id, "completed")}
                                                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-all hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-emerald-300 disabled:text-white"
                                                >
                                                    <Check size={16} strokeWidth={3} />
                                                    {updatingId === appointment.id ? "Updating..." : "Complete"}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* CARD DETAILS */}
                                    <div className="p-6"
                                    >
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                                        >
                                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                                            >
                                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500"
                                                style={{padding:"5px 10px"}}>
                                                    Contact Number
                                                </p>
                                                <div className="mt-1.5 flex items-center justify-between" style={{padding:"0px 10px"}}>
                                                    <p className="flex items-center gap-2 text-base font-semibold text-slate-900">
                                                        <Phone size={16} className="text-slate-400" />
                                                        {appointment.phone}
                                                    </p>
                                                    <a
                                                        href={`tel:${appointment.phone}`}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-blue-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                        title="Call Patient"
                                                    >
                                                        <Phone size={14} />
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500"
                                                style={{padding:"5px 10px"}}>
                                                    Age & Gender
                                                </p>
                                                <p className="mt-1.5 text-base font-semibold text-slate-900"
                                                style={{padding:"0px 10px"}}>
                                                    {appointment.age} yrs / <span className="capitalize">{appointment.gender}</span>
                                                </p>
                                            </div>

                                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500"
                                                style={{padding:"5px 10px"}}>
                                                    Assigned Doctor
                                                </p>
                                                <p className="mt-1.5 text-base font-semibold text-blue-700"
                                                style={{padding:"0px 10px"}}>
                                                    {appointment.doctor}
                                                </p>
                                            </div>

                                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                                <p className="text-xs font-bold uppercase tracking-wider text-blue-800/70"
                                                style={{padding:"5px 10px"}}>
                                                    Date & Time
                                                </p>
                                                <p className="mt-1.5 text-base font-bold text-slate-900"
                                                style={{padding:"0px 10px"}}>
                                                    {formatDate(appointment.appointment_date)}
                                                </p>
                                                <p className="mt-0.5 text-sm font-semibold text-blue-700"
                                                style={{padding:"0px 10px"}}>
                                                    {formatTime(appointment.appointment_time)} ({formatDay(appointment.appointment_date)})
                                                </p>
                                            </div>
                                        </div>

                                        {/* ADDRESS */}
                                        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500"
                                            style={{padding:"5px 10px"}}>
                                                Patient Address
                                            </p>
                                            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700"
                                            style={{padding:"0px 10px"}}>
                                                {appointment.address}
                                            </p>
                                        </div>

                                        {/* PROBLEM */}
                                        {appointment.problem && (
                                            <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 p-4">
                                                <p className="text-xs font-bold uppercase tracking-wider text-rose-800/70"
                                                style={{padding:"5px 10px"}}>
                                                    Reported Problem
                                                </p>
                                                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800"
                                                style={{padding:"0px 10px"}}>
                                                    {appointment.problem}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}