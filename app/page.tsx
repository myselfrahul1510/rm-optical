"use client";

import { useEffect, useState } from "react";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import BrandSlider from "@/components/BrandSlider";
import WhyChoose from "@/components/WhyChoose";
import About from "@/components/About";
import Services from "@/components/Services";
import FeaturedCollection from "@/components/FeaturedCollection";
import Gallery from "@/components/Gallery";
import Doctors from "@/components/Doctors";
import Testimonials from "@/components/Testimonials";
import Appointment from "@/components/Appointment";
import EyeCareTips from "@/components/EyeCareTips";
import MapSection from "@/components/Map";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
  <Navbar />
  <Hero />
  <Stats />
  <BrandSlider />
  <WhyChoose />
  <About />
  <Services />
  <FeaturedCollection />
  <Gallery />
  <Doctors />
  <Testimonials />
  <Appointment />
  <EyeCareTips />
  <MapSection />
  <Footer />
</>
  );
}