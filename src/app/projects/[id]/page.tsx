import Header from "@/app/components/navbar";
import ProjectProfile from "./profile"
import { Footer } from "@/app/components/CTA";

export default function ProjectDetailPage() {
  return (
    <main>
      <Header/>
      <ProjectProfile />
      <Footer/>
    </main>
  );
}