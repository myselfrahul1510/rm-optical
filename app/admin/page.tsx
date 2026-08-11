"use client";

import { useEffect, useState } from "react";
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

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        categories: 0,
        totalStock: 0,
        featured: 0,
        totalAppointments: 0,
        todayAppointments: 0,
    });

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [appointmentLoading, setAppointmentLoading] = useState(true);

    // =====================================================
    // FETCH DASHBOARD DATA
    // =====================================================

    useEffect(() => {
        fetchDashboardStats();
        fetchAppointments();
    }, []);

    // =====================================================
    // FETCH PRODUCT STATS
    // =====================================================

    async function fetchDashboardStats() {
        const { data, error } = await supabase
            .from("products")
            .select("category, stock, featured");

        if (error) {
            console.error(
                "Error fetching product stats:",
                error.message
            );

            setLoading(false);
            return;
        }

        if (data) {
            // Total Products
            const totalProducts = data.length;

            // Unique Categories
            const uniqueCategories = new Set(
                data.map((item) => item.category)
            ).size;

            // Total Stock
            const totalStock = data.reduce(
                (total, item) =>
                    total + (item.stock || 0),
                0
            );

            // Featured Products
            const featuredProducts = data.filter(
                (item) => item.featured === true
            ).length;

            setStats((prev) => ({
                ...prev,
                totalProducts,
                categories: uniqueCategories,
                totalStock,
                featured: featuredProducts,
            }));
        }

        setLoading(false);
    }

    // =====================================================
    // FETCH APPOINTMENTS
    // =====================================================

    async function fetchAppointments() {
        setAppointmentLoading(true);

        const { data, error } = await supabase
            .from("appointments")
            .select(`
                id,
                booking_id,
                name,
                phone,
                age,
                gender,
                doctor,
                address,
                problem,
                appointment_date,
                appointment_time,
                status,
                created_at
            `)
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

            setAppointmentLoading(false);
            return;
        }

        if (data) {
            const appointmentData =
                data as Appointment[];

            setAppointments(appointmentData);

            // =================================================
            // TODAY'S DATE
            // =================================================

            const today =
                new Intl.DateTimeFormat("en-CA", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).format(new Date());

            const todayCount =
                appointmentData.filter(
                    (appointment) =>
                        appointment.appointment_date ===
                        today
                ).length;

            setStats((prev) => ({
                ...prev,
                totalAppointments:
                    appointmentData.length,
                todayAppointments: todayCount,
            }));
        }

        setAppointmentLoading(false);
    }

    // =====================================================
    // FORMAT DATE
    // =====================================================

    function formatDate(date: string) {
        const dateObject = new Date(
            `${date}T00:00:00+05:30`
        );

        return dateObject.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                timeZone: "Asia/Kolkata",
            }
        );
    }

    // =====================================================
    // FORMAT TIME
    // =====================================================

    function formatTime(time: string) {
        const [hour, minute] =
            time.split(":");

        const date = new Date();

        date.setHours(
            Number(hour),
            Number(minute),
            0,
            0
        );

        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }
        );
    }

    // =====================================================
    // DASHBOARD CARDS
    // =====================================================

    const cards = [
        {
            title: "Total Products",
            value:
                stats.totalProducts.toString(),
        },
        {
            title: "Categories",
            value:
                stats.categories.toString(),
        },
        {
            title: "Total Stock",
            value:
                stats.totalStock.toString(),
        },
        {
            title: "Total Appointments",
            value:
                stats.totalAppointments.toString(),
        },
    ];

    // =====================================================
    // RETURN
    // =====================================================

    return (
        <div className="space-y-8 pb-10 font-sans">

            {/* =================================================
                PRODUCT DASHBOARD CARDS
            ================================================= */}

            {loading ? (
                <div className="flex h-32 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 text-base font-semibold text-slate-500">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-[#0A2E73]"></div>
                        Loading stats...
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
                 style={{margin:"7px"}}>
                    {cards.map((card) => (
                        <div 
                         style={{ padding:"10px"}}
                            key={card.title}
                            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                        >
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {card.title}
                            </h3>
                            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 transition-colors group-hover:text-[#0A2E73]">
                                {card.value}
                            </h2>
                        </div>
                    ))}
                </div>
            )}

            {/* =================================================
                TODAY'S APPOINTMENT SUMMARY
            ================================================= */}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-7 shadow-sm transition-all hover:shadow-md"
                 style={{margin:"7px"}}>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600/80"
                    style={{padding:"0px 10px"}}>
                        Today's Appointments
                    </h3>
                    <h2 className="mt-3 text-4xl font-black text-[#0A2E73]"style={{padding:"0px 10px"}}
                    >
                        {stats.todayAppointments}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-slate-500"
                    style={{padding:"0px 10px"}}>
                        Appointments scheduled for today
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-7 shadow-sm transition-all hover:shadow-md"
                style={{margin:"7px"}}>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600/80"
                    style={{padding:"0px 10px"}}>
                        Upcoming Appointments
                    </h3>
                    <h2 className="mt-3 text-4xl font-black text-emerald-700"
                    style={{padding:"0px 10px"}}>
                        {
                            appointments.filter(
                                (appointment) =>
                                    appointment.appointment_date >=
                                    new Intl.DateTimeFormat(
                                        "en-CA",
                                        {
                                            timeZone: "Asia/Kolkata",
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        }
                                    ).format(new Date())
                            ).length
                        }
                    </h2>
                    <p className="mt-2 text-sm font-medium text-slate-500"
                    style={{padding:"0px 10px"}}>
                        Future scheduled appointments
                    </p>
                </div>
            </div>

            {/* =================================================
                APPOINTMENT LIST
            ================================================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                
                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div style={{margin:"7px"}}>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900">
                            Recent Appointments
                        </h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                            View patient bookings and appointment schedules
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            fetchDashboardStats();
                            fetchAppointments();
                        }}
                        className="inline-flex items-center justify-center rounded-xl bg-[#0A2E73] px-6 py-2.5 text-sm font-bold text-black shadow-sm transition-all hover:bg-[#08245A] hover:shadow active:scale-95"
                    style={{padding:"7px 10px", margin:"1rem 2rem", backgroundColor:"rgb(169, 225, 248)"}}>
                        Refresh List
                    </button>
                </div>

                {/* Appointment Content */}
                {appointmentLoading ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#0A2E73]"></div>
                        <p className="text-sm font-medium">Loading appointments...</p>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-16 text-center text-slate-500">
                        <span className="mb-4 text-4xl">📅</span>
                        <p className="text-lg font-semibold text-slate-700">No appointments found.</p>
                        <p className="mt-1 text-sm">There are currently no bookings available.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto"
                    style={{margin:"7px"}}>
                        <table className="w-full min-w-[1000px] border-collapse text-left">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Booking ID
                                    </th>
                                    <th className="whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Patient Details
                                    </th>
                                    <th className="whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Contact
                                    </th>
                                    <th className="whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Doctor
                                    </th>
                                    <th className="whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Date & Time
                                    </th>
                                    <th className="whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-slate-100">
                                {appointments.map((appointment) => (
                                    <tr
                                        key={appointment.id}
                                        className="transition-colors hover:bg-slate-50/80"
                                    >
                                        {/* Booking ID */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 font-mono text-sm font-bold text-[#0A2E73]">
                                                {appointment.booking_id}
                                            </span>
                                        </td>

                                        {/* Patient */}
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">
                                                    {appointment.name}
                                                </p>
                                                <p className="mt-0.5 text-xs font-medium text-slate-500">
                                                    {appointment.age} yrs • <span className="capitalize">{appointment.gender}</span>
                                                </p>
                                            </div>
                                        </td>

                                        {/* Phone */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="text-sm font-semibold text-slate-700">
                                                {appointment.phone}
                                            </span>
                                        </td>

                                        {/* Doctor */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="text-sm font-bold text-slate-800">
                                                Dr. {appointment.doctor}
                                            </span>
                                        </td>

                                        {/* Date & Time combined for cleaner look */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <p className="text-sm font-bold text-slate-800">
                                                {formatDate(appointment.appointment_date)}
                                            </p>
                                            <p className="mt-0.5 text-xs font-bold text-[#0A2E73]">
                                                {formatTime(appointment.appointment_time)}
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                                                    appointment.status === "confirmed"
                                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                        : appointment.status === "cancelled"
                                                        ? "border-rose-200 bg-rose-50 text-rose-700"
                                                        : "border-amber-200 bg-amber-50 text-amber-700"
                                                }`}
                                            >
                                                {appointment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}