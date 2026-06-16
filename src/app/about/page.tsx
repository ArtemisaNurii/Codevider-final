import { Footer } from "../components/CTA"
import SiteNavbar from "../components/navbar"
import AboutSection3 from "./aboutUs"
import AboutTeamCulture from "./team"

export default function AboutPage() {
  return (
    <main>

        <SiteNavbar/>
        <AboutSection3 />
        <AboutTeamCulture />
        <Footer/>
    </main>
  )
}
