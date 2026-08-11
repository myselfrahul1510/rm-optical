"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function BookEyeTestPage() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        age: "",
        gender: "",
        doctor: "",
        address: "",
        problem: "",
    });

    const [detectingLocation, setDetectingLocation] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // =====================================================
    // 4 DOCTOR OPTIONS
    // =====================================================
    const doctors = [
        "Dr. Susmita Mukhopadhyay",
        "Sneha Debnath",
        "Abhijit Pramanick",
        "Sujan Biswas",
    ];

    // =====================================================
    // HANDLERS
    // =====================================================
    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // =====================================================
    // AUTO LOCATION DETECTION
    // =====================================================
    async function detectLocation() {
        if (!navigator.geolocation) {
            alert(
                "Location detection is not supported by your browser."
            );
            return;
        }

        setDetectingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } =
                        position.coords;

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                        {
                            headers: {
                                "Accept-Language":
                                    "en-US,en",
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error(
                            "Unable to find address"
                        );
                    }

                    const data = await response.json();

                    if (data.address) {
                        const {
                            house_number,
                            road,
                            neighbourhood,
                            suburb,
                            village,
                            town,
                            city,
                            county,
                            state_district,
                            state,
                            postcode,
                            country,
                        } = data.address;

                        const locationParts = [
                            house_number,
                            road,
                            neighbourhood,
                            suburb,
                            village,
                            town,
                            city,
                            county,
                            state_district,
                            state,
                            postcode,
                            country,
                        ].filter(Boolean);

                        const cleanAddress =
                            locationParts.length > 0
                                ? locationParts.join(", ")
                                : data.display_name || "";

                        setForm((prev) => ({
                            ...prev,
                            address: cleanAddress,
                        }));
                    } else if (data.display_name) {
                        setForm((prev) => ({
                            ...prev,
                            address: data.display_name,
                        }));
                    } else {
                        alert(
                            "Could not find a readable address."
                        );
                    }
                } catch (error) {
                    console.error(
                        "Address detection error:",
                        error
                    );

                    alert(
                        "Unable to detect your address automatically. Please enter it manually."
                    );
                } finally {
                    setDetectingLocation(false);
                }
            },
            (error) => {
                console.error(
                    "Location error:",
                    error
                );

                setDetectingLocation(false);

                if (
                    error.code ===
                    error.PERMISSION_DENIED
                ) {
                    alert(
                        "Location permission was denied. Please allow location access."
                    );
                } else {
                    alert(
                        "Unable to detect your location. Please try again."
                    );
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );
    }

    // =====================================================
    // GENERATE APPOINTMENT PDF
    // =====================================================

function downloadAppointmentPDF(appointment: any, form: any = {}) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // =====================================================
  // COLOR PALETTE
  // =====================================================
  const navy = "#0A2E73";
  const dark = "#0F172A";
  const gray = "#475569";
  const lightBg = "#F8FAFC";
  const cardBg = "#F1F5F9";
  const border = "#CBD5E1";
  const green = "#15803D";
  const lightGreen = "#DCFCE7";

  // =====================================================
  // DATA EXTRACTION
  // =====================================================
  const bookingId = appointment.booking_id || appointment.id || "N/A";
  const patientName = appointment.name || form.name || "N/A";
  const phone = appointment.phone || form.phone || "N/A";
  const age = appointment.age || form.age || "N/A";
  const gender = appointment.gender || form.gender || "N/A";
  const doctor = appointment.doctor || form.doctor || "N/A";
  const appointmentDate = appointment.appointment_date || "N/A";
  const appointmentTime = appointment.appointment_time || "N/A";
  const patientAddress = appointment.address || form.address || "N/A";
  const problem = appointment.problem || form.problem || "No specific problem mentioned";

  // =====================================================
  // PAGE BACKGROUND
  // =====================================================
  pdf.setFillColor(lightBg);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  // MAIN WHITE CONTAINER CARD
  pdf.setFillColor("#FFFFFF");
  pdf.roundedRect(6, 6, pageWidth - 12, pageHeight - 12, 4, 4, "F");

  // =====================================================
  // HEADER SECTION
  // =====================================================
  pdf.setFillColor(navy);
  pdf.roundedRect(6, 6, pageWidth - 12, 42, 4, 4, "F");
  pdf.rect(6, 38, pageWidth - 12, 10, "F");

  // BRAND LOGO TEXT
  pdf.setTextColor("#FFFFFF");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text("R.M OPTICAL", 14, 22);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor("#93C5FD");
  pdf.text("COMPUTERISED EYE TESTING & CARE", 14, 30);

  // HEADER RIGHT
  pdf.setTextColor("#FFFFFF");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("APPOINTMENT SLIP", pageWidth - 14, 22, { align: "right" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor("#DBEAFE");
  pdf.text("Ph: 6296457668 | 6297398818", pageWidth - 14, 30, { align: "right" });

  // =====================================================
  // CONFIRMATION STATUS & TITLE SECTION (FULLY FIXED)
  // =====================================================
  let currentY = 56;

  // TITLE
  pdf.setTextColor(navy);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Appointment Confirmation", 14, currentY + 7);

  // CONFIRMED BADGE - Margin Safely Set at 22mm from Right Edge
  const badgeWidth = 36;
  const badgeHeight = 9;
  const badgeX = pageWidth - 22 - badgeWidth; // ডানদিকের সেফ মার্জিন রাখা হয়েছে
  
  pdf.setFillColor(lightGreen);
  pdf.setDrawColor("#86EFAC");
  pdf.setLineWidth(0.3);
  pdf.roundedRect(badgeX, currentY + 1, badgeWidth, badgeHeight, 4, 4, "FD");

  pdf.setTextColor(green);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8.5);
  pdf.text("CONFIRMED", badgeX + (badgeWidth / 2), currentY + 7, { align: "center" });

  // SUBTITLE
  pdf.setTextColor(gray);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.text("Your eye test appointment has been successfully scheduled.", 14, currentY + 16);

  currentY += 23;

  // BOOKING ID BOX
  pdf.setFillColor("#EFF6FF");
  pdf.setDrawColor("#BFDBFE");
  pdf.setLineWidth(0.4);
  pdf.roundedRect(14, currentY, pageWidth - 28, 20, 4, 4, "FD");

  pdf.setTextColor(gray);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text("BOOKING ID", 20, currentY + 7);

  pdf.setTextColor(navy);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(15);
  pdf.text(String(bookingId), 20, currentY + 15);

  currentY += 28;

  // =====================================================
  // GRID DETAILS (2 COLUMNS)
  // =====================================================
  pdf.setTextColor(navy);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("PATIENT & APPOINTMENT DETAILS", 14, currentY);

  currentY += 5;

  const colWidth = (pageWidth - 34) / 2;
  const col1X = 14;
  const col2X = 14 + colWidth + 6;

  function drawDataCard(x: number, y: number, label: string, value: string, highlight = false) {
    pdf.setFillColor(cardBg);
    pdf.setDrawColor(border);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(x, y, colWidth, 18, 3, 3, "FD");

    pdf.setTextColor(gray);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text(label.toUpperCase(), x + 5, y + 6);

    pdf.setTextColor(highlight ? navy : dark);
    pdf.setFont("helvetica", highlight ? "bold" : "normal");
    pdf.setFontSize(11);

    const safeValue = pdf.splitTextToSize(String(value || "N/A"), colWidth - 10);
    pdf.text(safeValue[0] || "N/A", x + 5, y + 13.5);
  }

  // Row 1
  drawDataCard(col1X, currentY, "Patient Name", patientName, true);
  drawDataCard(col2X, currentY, "Consulting Doctor", doctor, true);
  currentY += 22;

  // Row 2
  drawDataCard(col1X, currentY, "Mobile Number", phone);
  drawDataCard(col2X, currentY, "Appointment Date", appointmentDate, true);
  currentY += 22;

  // Row 3
  drawDataCard(col1X, currentY, "Age / Gender", `${age} Yrs / ${gender}`);
  drawDataCard(col2X, currentY, "Appointment Time", appointmentTime, true);
  currentY += 25;

  // =====================================================
  // FULL WIDTH BOXES
  // =====================================================
  function drawFullWidthCard(y: number, label: string, value: string) {
    const boxWidth = pageWidth - 28;
    pdf.setFillColor("#F8FAFC");
    pdf.setDrawColor(border);
    pdf.setLineWidth(0.3);

    pdf.setFontSize(10.5);
    const lines = pdf.splitTextToSize(String(value || "N/A"), boxWidth - 10);
    const boxHeight = Math.max(20, 10 + lines.length * 5.5);

    pdf.roundedRect(14, y, boxWidth, boxHeight, 3, 3, "FD");

    pdf.setTextColor(gray);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text(label.toUpperCase(), 19, y + 6.5);

    pdf.setTextColor(dark);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10.5);
    pdf.text(lines, 19, y + 14);

    return boxHeight;
  }

  // Patient Address
  const addrHeight = drawFullWidthCard(currentY, "Patient Address", patientAddress);
  currentY += addrHeight + 5;

  // Reported Problem
  const probHeight = drawFullWidthCard(currentY, "Reported Problem", problem);
  currentY += probHeight + 10;

  // =====================================================
  // SHOP FOOTER CARD
  // =====================================================
  const storeY = pageHeight - 52;

  pdf.setFillColor(navy);
  pdf.roundedRect(14, storeY, pageWidth - 28, 28, 4, 4, "F");

  pdf.setTextColor("#FFFFFF");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("R.M OPTICAL", 20, storeY + 8);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.setTextColor("#DBEAFE");
  pdf.text("Address: Ukilnara, Choumatha, Jogpur Road, Payradanga, Nadia, 741247", 20, storeY + 15);
  pdf.text("Contact Numbers: +91 6296457668 / +91 6297398818", 20, storeY + 22);

  // BOTTOM NOTE
  pdf.setTextColor(gray);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.text("Please arrive 10 minutes before your scheduled appointment time.", pageWidth / 2, pageHeight - 16, { align: "center" });

  pdf.setTextColor(navy);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text("Thank you for choosing R.M OPTICAL — Your Eyes, Our Care", pageWidth / 2, pageHeight - 10, { align: "center" });

  // SAVE FILE
  pdf.save(`RM-Optical-Appointment-${bookingId}.pdf`);
}
    // =====================================================
    // SUBMIT APPOINTMENT
    // =====================================================
    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        // Prevent double submission
        if (submitting) {
            return;
        }

        // Doctor validation
        if (!form.doctor) {
            alert(
                "Please select a doctor to proceed."
            );
            return;
        }

        // Basic client-side phone validation
        if (
            !/^[6-9]\d{9}$/.test(
                form.phone
            )
        ) {
            alert(
                "Please enter a valid 10-digit mobile number."
            );
            return;
        }

        // Age validation
        const numericAge =
            Number(form.age);

        if (
            !Number.isInteger(
                numericAge
            ) ||
            numericAge < 1 ||
            numericAge > 120
        ) {
            alert(
                "Please enter a valid age between 1 and 120."
            );
            return;
        }

        try {
            setSubmitting(true);

            console.log(
                "================================"
            );

            console.log(
                "SENDING APPOINTMENT"
            );

            console.log(
                "================================"
            );

            console.log(
                "Patient:",
                form.name
            );

            console.log(
                "Doctor:",
                form.doctor
            );

            console.log(
                "Phone:",
                form.phone
            );

            // =================================================
            // SEND DATA TO NEXT.JS API
            // =================================================

            const response =
                await fetch(
                    "/api/appointments",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            name: form.name.trim(),
                            phone: form.phone.trim(),
                            age: form.age,
                            gender: form.gender,
                            doctor: form.doctor,
                            address: form.address.trim(),
                            problem:
                                form.problem.trim(),
                        }),
                    }
                );

            // Try to read JSON response
            const result =
                await response.json();

            console.log(
                "API RESPONSE:",
                result
            );

            // =================================================
            // API ERROR
            // =================================================

            if (
                !response.ok ||
                !result.success
            ) {
                alert(
                    result.message ||
                        "Unable to book appointment. Please try again."
                );

                return;
            }

            // =================================================
            // SUCCESS
            // =================================================

            console.log(
                "================================"
            );

            console.log(
                "APPOINTMENT BOOKED SUCCESSFULLY"
            );

            console.log(
                "================================"
            );

            console.log(
                "Appointment:",
                result.appointment
            );

            const appointment =
                result.appointment;

            // =================================================
            // DOWNLOAD APPOINTMENT PDF
            // =================================================

            downloadAppointmentPDF(
                appointment
            );

            // =================================================
            // SUCCESS MESSAGE
            // =================================================

            alert(
                `Appointment booked successfully!\n\n` +
                    `Doctor: ${appointment.doctor}\n` +
                    `Date: ${appointment.appointment_date}\n` +
                    `Time: ${appointment.appointment_time}\n\n` +
                    `Your appointment confirmation PDF has been downloaded.\n\n` +
                    `Thank you for choosing R.M OPTICAL.`
            );

            // =================================================
            // RESET FORM
            // =================================================

            setForm({
                name: "",
                phone: "",
                age: "",
                gender: "",
                doctor: "",
                address: "",
                problem: "",
            });
        } catch (error) {
            console.error(
                "Booking error:",
                error
            );

            alert(
                "Something went wrong while booking your appointment. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    }

    // =====================================================
    // COMMON STYLES
    // =====================================================

    const inputClass = `
w-full 
h-[52px] 
rounded-xl 
border-2 
border-gray-100 
bg-gray-50/50 
px-4 
text-sm 
font-medium 
text-gray-900 
outline-none 
transition-all 
focus:border-[#0A2E73] 
focus:bg-white 
focus:ring-4 
focus:ring-[#0A2E73]/10
`;

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[#f0f4f8] py-12 px-4 sm:px-8">

            {/* Decorative Glowing Orbs in Background */}

            <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-20 blur-[100px]" />

            <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-20 blur-[100px]" />

            {/* Main Form Container */}

            <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50 ring-1 ring-gray-100 sm:p-12">

                {/* Header Section */}

                <div className="mb-12 text-center">

                    <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-2 ring-1 ring-indigo-100">

                        <span className="bg-gradient-to-r from-[#0A2E73] to-indigo-600 bg-clip-text text-xs font-extrabold tracking-widest text-transparent">
                            ✨ R.M OPTICAL
                        </span>

                    </div>

                    <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">

                        Book Your{" "}

                        <span className="bg-gradient-to-r from-[#0A2E73] to-purple-600 bg-clip-text text-transparent">
                            Eye Test
                        </span>

                    </h1>

                    <p className="mt-3 text-sm font-medium text-gray-500">
                        Experience world-class eye care. Fill in your details below.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-10"
                >

                    {/* =========================================
                        PERSONAL INFO GRID
                    ========================================= */}

                    <div
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2"
                        style={{
                            marginTop: "1rem",
                        }}
                    >

                        {/* Name */}

                        <div className="w-full">

                            <label
                                className="mb-3 block text-sm font-bold text-gray-700 pl-1"
                                style={{
                                    margin: "5px 15px",
                                }}
                            >
                                Patient Name
                            </label>

                            <input
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. Rahul Biswas"
                                style={{
                                    margin: "5px",
                                    padding: "10px",
                                    width: "calc(100% - 10px)",
                                }}
                                className={
                                    inputClass
                                }
                            />

                        </div>

                        {/* Phone */}

                        <div className="w-full">

                            <label
                                className="mb-3 block text-sm font-bold text-gray-700 pl-1"
                                style={{
                                    margin: "5px 15px",
                                }}
                            >
                                Mobile Number
                            </label>

                            <input
                                name="phone"
                                type="tel"
                                required
                                value={form.phone}
                                onChange={(e) => {
                                    const value =
                                        e.target.value
                                            .replace(
                                                /\D/g,
                                                ""
                                            )
                                            .slice(
                                                0,
                                                10
                                            );

                                    handleChange({
                                        target: {
                                            name: "phone",
                                            value,
                                        },
                                    } as React.ChangeEvent<HTMLInputElement>);
                                }}
                                maxLength={10}
                                pattern="[0-9]{10}"
                                inputMode="numeric"
                                placeholder="10-digit mobile number"
                                style={{
                                    margin: "5px",
                                    padding: "10px",
                                    width: "calc(100% - 10px)",
                                }}
                                className={
                                    inputClass
                                }
                            />

                        </div>

                        {/* Age */}

                        <div className="w-full">

                            <label
                                className="mb-3 block text-sm font-bold text-gray-700 pl-1"
                                style={{
                                    margin: "5px 15px",
                                }}
                            >
                                Age
                            </label>

                            <input
                                name="age"
                                type="number"
                                min="1"
                                max="120"
                                required
                                value={form.age}
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. 25"
                                style={{
                                    margin: "5px",
                                    padding: "10px",
                                    width: "calc(100% - 10px)",
                                }}
                                className={
                                    inputClass
                                }
                            />

                        </div>

                        {/* Gender */}

                        <div className="w-full">

                            <label
                                className="mb-3 block text-sm font-bold text-gray-700 pl-1"
                                style={{
                                    margin: "5px 15px",
                                }}
                            >
                                Gender
                            </label>

                            <select
                                name="gender"
                                required
                                value={form.gender}
                                onChange={
                                    handleChange
                                }
                                style={{
                                    margin: "5px",
                                    padding: "10px",
                                    width: "calc(100% - 10px)",
                                }}
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >

                                <option
                                    value=""
                                    disabled
                                >
                                    Select Gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* =========================================
                        BLUE THEME DOCTOR SELECTION SECTION
                    ========================================= */}

                    <div
                        className="w-full rounded-2xl bg-[#0A2E73]/5 p-6 sm:p-8 border border-[#0A2E73]/10 shadow-sm"
                        style={{
                            margin: "5px 0",
                            width: "100%",
                        }}
                    >

                        <label
                            className="mb-5 block text-sm font-extrabold text-[#0A2E73] pl-1 flex items-center gap-2"
                            style={{
                                margin: "5px 15px",
                            }}
                        >

                            <span>🩺</span>

                            Select Your Specialist

                            <span className="text-red-500">
                                *
                            </span>

                        </label>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 px-2">

                            {doctors.map(
                                (doctor) => {
                                    const isSelected =
                                        form.doctor ===
                                        doctor;

                                    return (
                                        <button
                                            key={doctor}
                                            type="button"
                                            onClick={() =>
                                                setForm({
                                                    ...form,
                                                    doctor,
                                                })
                                            }
                                            className={`
              relative flex flex-col items-center justify-center gap-2.5 rounded-2xl border-2 py-5 px-4 text-center transition-all duration-300 w-full shadow-sm cursor-pointer
              ${
                  isSelected
                      ? "border-[#0A2E73] bg-[#0A2E73] text-white shadow-md shadow-blue-900/30 scale-[1.02]"
                      : "border-blue-100 bg-white hover:bg-blue-50/80 hover:border-blue-300 text-gray-800"
              }
            `}
                                        >

                                            {/* Select Checkmark */}

                                            {isSelected && (
                                                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#0A2E73] shadow-sm">
                                                    ✓
                                                </span>
                                            )}

                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-inner ${
                                                    isSelected
                                                        ? "bg-white/20 text-white"
                                                        : "bg-blue-50 text-[#0A2E73]"
                                                }`}
                                            >
                                                👨‍⚕️
                                            </div>

                                            <div>

                                                <p
                                                    className={`text-sm font-extrabold ${
                                                        isSelected
                                                            ? "text-black"
                                                            : "text-gray-800"
                                                    }`}
                                                >
                                                    {doctor}
                                                </p>

                                                <p
                                                    className={`mt-1 text-[10px] font-bold uppercase tracking-wider ${
                                                        isSelected
                                                            ? "text-blue-200"
                                                            : "text-blue-600/70"
                                                    }`}
                                                >
                                                    Eye Specialist
                                                </p>

                                            </div>

                                        </button>
                                    );
                                }
                            )}

                        </div>

                    </div>

                    {/* =========================================
                        ADDRESS SECTION
                    ========================================= */}

                    <div className="w-full rounded-2xl bg-gray-50/80 p-6 sm:p-8 border border-gray-100">

                        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">

                            <label
                                className="text-sm font-bold text-gray-800 pl-1"
                                style={{
                                    margin: "5px",
                                    padding: "5px",
                                }}
                            >
                                Patient Address
                            </label>

                            <button
                                style={{
                                    margin: "5px",
                                    padding: "10px",
                                }}
                                type="button"
                                onClick={
                                    detectLocation
                                }
                                disabled={
                                    detectingLocation
                                }
                                className="group flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#0A2E73] shadow-sm ring-1 ring-gray-200 transition-all hover:bg-[#0A2E73] hover:text-black disabled:opacity-50"
                            >

                                {detectingLocation ? (
                                    <span className="animate-pulse">
                                        Detecting...
                                    </span>
                                ) : (
                                    <>
                                        <span className="transition-transform group-hover:scale-110">
                                            📍
                                        </span>

                                        Auto Detect
                                    </>
                                )}

                            </button>

                        </div>

                        <textarea
                            name="address"
                            required
                            value={form.address}
                            onChange={
                                handleChange
                            }
                            rows={3}
                            style={{
                                margin: "5px",
                                padding: "10px",
                                width: "calc(100% - 10px)",
                            }}
                            placeholder="Enter your complete address..."
                            className="w-full resize-none rounded-xl border-2 border-transparent bg-white p-5 text-sm font-medium shadow-sm outline-none transition-all focus:border-[#0A2E73] focus:ring-4 focus:ring-[#0A2E73]/10"
                        />

                    </div>

                    {/* =========================================
                        PROBLEM / MESSAGE
                    ========================================= */}

                    <div className="w-full">

                        <label
                            className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-700 pl-1"
                            style={{
                                margin: "5px 15px",
                            }}
                        >

                            Any Specific Problem?

                            <span className="rounded bg-gray-200 px-2 py-0.5 text-[10px] text-gray-600">
                                Optional
                            </span>

                        </label>

                        <textarea
                            name="problem"
                            value={form.problem}
                            onChange={
                                handleChange
                            }
                            rows={3}
                            style={{
                                margin: "5px",
                                padding: "10px",
                                width: "calc(100% - 10px)",
                            }}
                            placeholder="Briefly describe your eye issue..."
                            className="w-full resize-none rounded-xl border-2 border-gray-100 bg-gray-50/50 p-5 text-sm font-medium outline-none transition-all focus:border-[#0A2E73] focus:bg-white focus:ring-4 focus:ring-[#0A2E73]/10"
                        />

                    </div>

                    {/* =========================================
                        SUBMIT BUTTON
                    ========================================= */}

                    <div className="pt-6 pb-2 w-full">

                        <button
                            type="submit"
                            disabled={
                                submitting
                            }
                            className="
        group
        relative
        flex
        h-[60px]
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        px-6
        text-base
        font-bold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-[0_12px_40px_-4px_rgba(10,46,115,0.6)]
        active:scale-[0.98]
      "
                            style={{
                                backgroundColor:
                                    "#14aaeb",
                            }}
                        >

                            {/* Hover Gradient Background */}

                            <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E73] via-[#1E4B9C] to-[#0A2E73] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* Shine Sweep Animation */}

                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

                            {/* Button Content */}

                            <div className="relative z-10 flex items-center gap-3 tracking-wide">

                                {/* Calendar Icon */}

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">

                                    <svg
                                        className="h-4 w-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />

                                    </svg>

                                </div>

                                <span>
                                    {submitting
                                        ? "Booking Appointment..."
                                        : "Confirm Appointment"}
                                </span>

                                {!submitting && (
                                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1.5">
                                        →
                                    </span>
                                )}

                            </div>

                        </button>

                    </div>

                </form>

            </div>

        </main>
    );
}
