// pages/index.js

import { Footer } from "../components/CTA";
import Header from "../components/navbar";
import ProcessStepper from "./process";
import ServicesPage from "./services";
import TechStack from "./tech";


export default function Technologies() {
  return (
    <main>
      <Header />
      <ServicesPage/>
      <ProcessStepper />
      <TechStack />

      <Footer />
    </main>
  );
}