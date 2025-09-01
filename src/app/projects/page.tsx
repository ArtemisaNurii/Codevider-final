import { Footer } from "../components/CTA";
import Header from "../components/navbar";
import AllProject from "./allProject";

export default function ProjectsPage() {
    return (
        <div className=" font-sans">
            <Header />
            <AllProject />
            <Footer />
        </div>
    )
}