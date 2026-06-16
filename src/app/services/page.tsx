// pages/index.js

import { Footer } from "../components/CTA";
import SiteNavbar from "../components/navbar";
import ProcessStepper from "./process";
import ServicesPage from "./services";
import TechStack from "./tech";


export default function Technologies() {
  return (
    <main>
      <SiteNavbar />
      <ServicesPage/>
      <ProcessStepper />
      <TechStack />

      <Footer />
    </main>
  );
}
