import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

// =====================================================
// BOOKING ID GENERATOR
// Example: RM260810123
// =====================================================

function generateBookingId(appointmentTime: string) {
    const now = new Date();

    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // appointmentTime = "19:30:00"
    const timePart = appointmentTime
        .replace(/:/g, "")
        .slice(0, 4);

    return `RM${year}${month}${day}${timePart}`;
}

// =====================================================
// GET INDIA DATE
// YYYY-MM-DD
// =====================================================

function getIndiaDate() {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    return formatter.format(new Date());
}

// =====================================================
// GET INDIA CURRENT TIME
// HH:mm:ss
// =====================================================

function getIndiaTime() {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    return formatter.format(new Date());
}

// =====================================================
// ADD DAYS TO DATE
// =====================================================

function addDays(dateString: string, days: number) {
    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    const date = new Date(
        Date.UTC(year, month - 1, day)
    );

    date.setUTCDate(date.getUTCDate() + days);

    return date.toISOString().split("T")[0];
}

// =====================================================
// GET DAY OF WEEK
//
// 0 = Sunday
// 1 = Monday
// 2 = Tuesday
// 3 = Wednesday
// 4 = Thursday
// 5 = Friday
// 6 = Saturday
// =====================================================

function getDayOfWeek(dateString: string) {
    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    const date = new Date(
        Date.UTC(year, month - 1, day)
    );

    return date.getUTCDay();
}

// =====================================================
// TIME → MINUTES
//
// "17:30:00" → 1050
// =====================================================

function timeToMinutes(time: string) {
    const [hours, minutes] = time
        .split(":")
        .map(Number);

    return hours * 60 + minutes;
}

// =====================================================
// MINUTES → TIME
//
// 1050 → "17:30:00"
// =====================================================

function minutesToTime(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}:00`;
}

// =====================================================
// GENERATE 10-MINUTE SLOTS
//
// Example:
// 10:30 → 12:30
//
// Returns:
// 10:30
// 10:40
// 10:50
// ...
// 12:20
//
// 12:30 itself is NOT a booking slot.
// It is the END TIME.
// =====================================================

function generate10MinuteSlots(
    startTime: string,
    endTime: string
) {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    const slots: string[] = [];

    for (
        let current = startMinutes;
        current < endMinutes;
        current += 10
    ) {
        slots.push(minutesToTime(current));
    }

    return slots;
}

// =====================================================
// POST
// =====================================================

export async function POST(req: Request) {
    try {
        // =================================================
        // SUPABASE
        // =================================================

        const supabase = supabaseServer;

        // =================================================
        // GET FORM DATA
        // =================================================

        const body = await req.json();

        const {
            name,
            phone,
            age,
            gender,
            doctor,
            address,
            problem,
        } = body;

        // =================================================
        // REQUIRED FIELD VALIDATION
        // =================================================

        if (
            !name ||
            !phone ||
            !age ||
            !gender ||
            !doctor ||
            !address
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Please fill all required fields.",
                },
                { status: 400 }
            );
        }

        // =================================================
        // MOBILE VALIDATION
        // =================================================

        if (!/^[6-9]\d{9}$/.test(String(phone))) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Please enter a valid 10-digit mobile number.",
                },
                { status: 400 }
            );
        }

        // =================================================
        // AGE VALIDATION
        // =================================================

        const numericAge = Number(age);

        if (
            !Number.isInteger(numericAge) ||
            numericAge < 1 ||
            numericAge > 120
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Please enter a valid age between 1 and 120.",
                },
                { status: 400 }
            );
        }

        // =================================================
        // CLEAN VALUES
        // =================================================

        const cleanName = String(name).trim();
        const cleanPhone = String(phone).trim();
        const cleanDoctor = String(doctor).trim();
        const cleanAddress = String(address).trim();

        const cleanProblem =
            problem &&
            String(problem).trim()
                ? String(problem).trim()
                : null;

        // =================================================
        // INDIA DATE + TIME
        // =================================================

        const today = getIndiaDate();
        const currentTime = getIndiaTime();

        console.log("================================");
        console.log("NEW APPOINTMENT REQUEST");
        console.log("================================");

        console.log("Patient:", cleanName);
        console.log("Phone:", cleanPhone);
        console.log("Doctor:", cleanDoctor);
        console.log("India Date:", today);
        console.log("India Time:", currentTime);

        // =================================================
        // MAXIMUM 3 ACTIVE BOOKINGS PER PHONE
        // =================================================

        const {
            data: phoneBookings,
            error: phoneBookingError,
        } = await supabase
            .from("appointments")
            .select(
                "id, booking_id, appointment_date, appointment_time, status"
            )
            .eq("phone", cleanPhone)
            .not("status", "eq", "cancelled");

        // =================================================
        // PHONE BOOKING QUERY ERROR
        // =================================================

        if (phoneBookingError) {
            console.error(
                "Phone booking check error:",
                phoneBookingError
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Unable to check your existing bookings.",
                },
                { status: 500 }
            );
        }

        const totalBookings =
            phoneBookings?.length || 0;

        console.log(
            "Existing active bookings:",
            totalBookings
        );

        // =================================================
        // MAXIMUM 3 BOOKINGS
        // =================================================

        if (totalBookings >= 3) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "You’ve reached the maximum limit of 3 bookings using this mobile number. Please use another mobile number to make a new appointment. Thank you for choosing R.M. OPTICAL.",
                    bookingLimitReached: true,
                    totalBookings,
                },
                { status: 400 }
            );
        }

        // =================================================
        // FIND DOCTOR ACTIVE SCHEDULE
        // =================================================

        const {
            data: schedules,
            error: scheduleError,
        } = await supabase
            .from("doctor_schedules")
            .select(
                "id, doctor_name, day_of_week, appointment_time, end_time, is_active"
            )
            .eq("doctor_name", cleanDoctor)
            .eq("is_active", true);

        // =================================================
        // SCHEDULE ERROR
        // =================================================

        if (scheduleError) {
            console.error(
                "Schedule error:",
                scheduleError
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Unable to check doctor schedule.",
                },
                { status: 500 }
            );
        }

        // =================================================
        // NO SCHEDULE
        // =================================================

        if (
            !schedules ||
            schedules.length === 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        `No active schedule found for ${cleanDoctor}.`,
                },
                { status: 400 }
            );
        }

        console.log(
            "Doctor schedules found:",
            schedules
        );

        // =================================================
        // VALIDATE SCHEDULE
        // =================================================

        const invalidSchedule =
            schedules.find(
                (schedule) =>
                    !schedule.appointment_time ||
                    !schedule.end_time
            );

        if (invalidSchedule) {
            console.error(
                "Invalid doctor schedule:",
                invalidSchedule
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        `Doctor schedule for ${cleanDoctor} is missing start or end time.`,
                },
                { status: 500 }
            );
        }

        // =================================================
        // GET FUTURE BOOKINGS FOR THIS DOCTOR
        // =================================================

        const {
            data: doctorBookings,
            error: doctorBookingError,
        } = await supabase
            .from("appointments")
            .select(
                "id, appointment_date, appointment_time, status"
            )
            .eq("doctor", cleanDoctor)
            .gte("appointment_date", today)
            .not("status", "eq", "cancelled");

        // =================================================
        // DOCTOR BOOKING ERROR
        // =================================================

        if (doctorBookingError) {
            console.error(
                "Doctor booking query error:",
                doctorBookingError
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Unable to check doctor availability.",
                },
                { status: 500 }
            );
        }

        console.log(
            "Future doctor bookings:",
            doctorBookings
        );

        // =================================================
        // FIND NEXT AVAILABLE SLOT
        //
        // Search maximum 60 days.
        // =================================================

        let selectedDate = "";
        let selectedTime = "";
        let selectedSchedule: any = null;

        for (
            let dayOffset = 0;
            dayOffset < 60;
            dayOffset++
        ) {
            const checkingDate =
                addDays(today, dayOffset);

            const checkingDay =
                getDayOfWeek(checkingDate);

            // =================================================
            // GET SCHEDULES FOR THIS DAY
            // =================================================

            const daySchedules =
                schedules
                    .filter(
                        (schedule) =>
                            Number(
                                schedule.day_of_week
                            ) === checkingDay
                    )
                    .sort(
                        (a, b) =>
                            timeToMinutes(
                                a.appointment_time
                            ) -
                            timeToMinutes(
                                b.appointment_time
                            )
                    );

            // No schedule on this weekday
            if (
                daySchedules.length === 0
            ) {
                continue;
            }

            // =================================================
            // CHECK EACH WORKING PERIOD
            // =================================================

            for (const schedule of daySchedules) {
                const startTime =
                    schedule.appointment_time;

                const endTime =
                    schedule.end_time;

                const endMinutes =
                    timeToMinutes(endTime);

                // =================================================
                // GENERATE ALL 10-MINUTE SLOTS
                // =================================================

                const slots =
                    generate10MinuteSlots(
                        startTime,
                        endTime
                    );

                if (slots.length === 0) {
                    continue;
                }

                // =================================================
                // FILTER SLOTS
                // =================================================

                let availableSlots = slots;

                // =================================================
                // TODAY
                // =================================================

                if (checkingDate === today) {
                    const currentMinutes =
                        timeToMinutes(
                            currentTime
                        );

                    // Schedule already completely finished
                    if (
                        currentMinutes >=
                        endMinutes
                    ) {
                        continue;
                    }

                    // Ignore slots that have already started
                    availableSlots =
                        slots.filter(
                            (slot) =>
                                timeToMinutes(
                                    slot
                                ) >
                                currentMinutes
                        );
                }

                // =================================================
                // CHECK EACH SLOT
                // =================================================

                for (const slot of availableSlots) {
                    const alreadyBooked =
                        (
                            doctorBookings ||
                            []
                        ).some(
                            (booking) =>
                                booking.appointment_date ===
                                    checkingDate &&
                                booking.appointment_time ===
                                    slot
                        );

                    // =================================================
                    // FREE SLOT FOUND
                    // =================================================

                    if (!alreadyBooked) {
                        selectedDate =
                            checkingDate;

                        selectedTime =
                            slot;

                        selectedSchedule =
                            schedule;

                        break;
                    }
                }

                // =================================================
                // STOP IF SLOT FOUND
                // =================================================

                if (selectedSchedule) {
                    break;
                }

                // =================================================
                // IMPORTANT
                //
                // If all slots for this schedule are booked,
                // DO NOT reuse the last slot.
                //
                // Continue searching next schedule/day.
                // =================================================
            }

            // =================================================
            // STOP SEARCH
            // =================================================

            if (selectedSchedule) {
                break;
            }
        }

        // =================================================
        // NO SLOT FOUND
        // =================================================

        if (!selectedSchedule) {
            console.log(
                "NO AVAILABLE APPOINTMENT FOUND"
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        `No appointment availability was found for ${cleanDoctor} in the next 60 days.`,
                },
                { status: 400 }
            );
        }

        // =================================================
        // FINAL SLOT
        // =================================================

        console.log(
            "================================"
        );

        console.log(
            "FINAL APPOINTMENT SLOT"
        );

        console.log(
            "Doctor:",
            cleanDoctor
        );

        console.log(
            "Date:",
            selectedDate
        );

        console.log(
            "Time:",
            selectedTime
        );

        console.log(
            "Schedule:",
            selectedSchedule
        );

        console.log(
            "================================"
        );

        // =================================================
        // GENERATE BOOKING ID
        // =================================================

        const bookingId =
            generateBookingId(selectedTime);

        console.log(
            "Booking ID:",
            bookingId
        );

        // =================================================
        // INSERT APPOINTMENT
        // =================================================

        const {
            data: appointment,
            error: appointmentError,
        } = await supabase
            .from("appointments")
            .insert([
                {
                    booking_id:
                        bookingId,

                    name:
                        cleanName,

                    phone:
                        cleanPhone,

                    age:
                        numericAge,

                    gender,

                    doctor:
                        cleanDoctor,

                    address:
                        cleanAddress,

                    problem:
                        cleanProblem,

                    appointment_date:
                        selectedDate,

                    appointment_time:
                        selectedTime,

                    status: "confirmed",
                },
            ])
            .select()
            .single();

        // =================================================
        // INSERT ERROR
        // =================================================

        if (appointmentError) {
            console.error(
                "Appointment insert error:",
                appointmentError
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Failed to create appointment.",
                    error:
                        appointmentError.message,
                },
                { status: 500 }
            );
        }

        // =================================================
        // SUCCESS
        // =================================================

        console.log(
            "================================"
        );

        console.log(
            "APPOINTMENT CREATED SUCCESSFULLY"
        );

        console.log(
            "Booking ID:",
            appointment.booking_id
        );

        console.log(
            "Appointment ID:",
            appointment.id
        );

        console.log(
            "Patient:",
            appointment.name
        );

        console.log(
            "Doctor:",
            appointment.doctor
        );

        console.log(
            "Date:",
            appointment.appointment_date
        );

        console.log(
            "Time:",
            appointment.appointment_time
        );

        console.log(
            "================================"
        );

        // =================================================
        // RETURN SUCCESS
        // =================================================

        return NextResponse.json(
            {
                success: true,

                message:
                    "Appointment booked successfully.",

                appointment,

                bookingLimit: {
                    used:
                        totalBookings + 1,

                    maximum: 3,

                    remaining:
                        3 -
                        (totalBookings + 1),
                },
            },
            { status: 201 }
        );
    } catch (error) {
        // =================================================
        // GENERAL ERROR
        // =================================================

        console.error(
            "Appointment API error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}