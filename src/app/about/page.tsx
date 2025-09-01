import { Footer } from "../components/CTA"
import Header from "../components/navbar"
import AboutSection3 from "./aboutUs"
import AboutTeamCulture from "./team"

export default function AboutPage() {
  return (
    <main>

        <Header/>
        <AboutSection3 />
        <AboutTeamCulture />
        <Footer/>
    </main>
  )
}
