import { Footer } from "../components/CTA"
import Header from "../components/navbar"
import JobsListing from "./jobsListing"

export default function CareerPage() {
  return (
    <main>
      <Header/>
      <section className="pt-16 px-4 bg-white">
        <div className="text-center mt-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals to join our growing team. 
            Explore opportunities to work on cutting-edge projects and make a meaningful impact.
          </p>
        </div>
        
        <JobsListing />
      </section>
      <Footer/>
    </main>
  )
}