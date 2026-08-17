import { MapPin, Phone, Mail } from "lucide-react";
import { SITE } from "@/constants/site";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A2E73] text-white">

      <div className="container mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">


          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold">
              R.M OPTICAL
            </h2>

            <p className="mt-4 text-blue-100 leading-relaxed">
              Your trusted destination for premium eyewear,
              computerized eye testing and complete eye care solutions.
            </p>

          </div>



          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-blue-100">

              <li>
                Home
              </li>

              <li>
                About Us
              </li>

              <li>
                Services
              </li>

              <li>
                Contact
              </li>

            </ul>

          </div>



          {/* Services */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Services
            </h3>

            <ul className="space-y-3 text-blue-100">

              <li>
                Eye Testing
              </li>

              <li>
                Spectacles
              </li>

              <li>
                Contact Lens
              </li>

              <li>
                Frame Collection
              </li>

            </ul>

            <p>+91 62964 5668</p>

            <p>rmoptical2026@gmail.com</p>

            <p>Ukilnara, Choumatha, Jagpur Road, Payradanga, Nadia, 741247</p>

          </div>



          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>


            <div className="space-y-4 text-blue-100">


              <p className="flex gap-3 items-center">
                <MapPin size={20} />
                Store Address
              </p>


              <p className="flex gap-3 items-center">
                <Phone size={20} />
                +91 62964 57668
              </p>


              <p className="flex gap-3 items-center">
                <Mail size={20} />
                rmoptical2026@gmail.com
              </p>


            </div>

          </div>


        </div>


      </div>



      {/* Bottom */}

      <div className="border-t border-blue-400/30">

        <div className="container mx-auto px-6 py-5 text-center text-blue-100 text-sm">

          © R.M OPTICAL.  All Rights Reserved.
          | {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          })} | 
            <Link
              href="/login"
              className="text-sm text-gray-500 transition hover:text-[#0A2E73]"
            >
            &nbsp; Admin Panel
            </Link>


        </div>

      </div>




    </footer>
  );
}