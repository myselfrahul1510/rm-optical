import { MapPin, Phone } from "lucide-react";

export default function MapSection() {
    return (
        <section className="bg-white py-20">

            <div className="container mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-10 items-center">


                    {/* Left - Map */}

                    <div className="h-[400px] overflow-hidden rounded-3xl shadow-xl">

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3669.1598695309117!2d88.53606599999999!3d23.127831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDA3JzQwLjIiTiA4OMKwMzInMDkuOCJF!5e0!3m2!1sen!2sin!4v1785440363610!5m2!1sen!2sin"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="w-full h-full"
                        ></iframe>
                    </div>



                    {/* Right Content */}

                    <div>


                        <p className="text-[#0A2E73] font-semibold uppercase tracking-wide">
                            Find Us
                        </p>


                        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                            Visit R.M OPTICAL Store
                        </h2>


                        <p className="mt-5 text-gray-600 leading-relaxed">
                            Experience premium eyewear collection and professional
                            eye care services at our store.
                        </p>



                        <div className="mt-8 space-y-5">


                            <div className="flex gap-4 items-center">

                                <div className="bg-[#0A2E73]/10 p-3 rounded-full">
                                    <MapPin
                                        className="text-[#0A2E73]"
                                    />
                                </div>


                                <p className="font-medium text-gray-800">
                                    R.M OPTICAL, Your Store Address
                                </p>

                            </div>



                            <div className="flex gap-4 items-center">

                                <div className="bg-[#0A2E73]/10 p-3 rounded-full">
                                    <Phone
                                        className="text-[#0A2E73]"
                                    />
                                </div>


                                <p className="font-medium text-gray-800">
                                    +91 62973 98818
                                </p>

                            </div>


                        </div>



                        <button
                            className="mt-8 bg-[#0A2E73] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-900 transition"
                        >
                            Get Direction
                        </button>


                    </div>


                </div>

            </div>

        </section>
    );
}