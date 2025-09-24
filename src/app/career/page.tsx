import { Footer } from "../components/CTA"
import Header from "../components/navbar"
import JobsListing from "./jobsListing"

export default function CareerPage() {
  return (
    <main>
      <Header/>
      <section className="">

        
        <JobsListing page={1} limit={10} />
      </section>
      <Footer/>
    </main>
  )
}