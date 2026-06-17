// pages/index.js

import ProcessStepper from "./process";
import ServicesPage from "./services";
import TechStack from "./tech";


export default function Technologies() {
  return (
    <main>
      <ServicesPage/>
      <ProcessStepper />
      <TechStack />
    </main>
  );
}
