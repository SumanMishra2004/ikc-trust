import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CollaboratorsPage from "@/components/pages/CollaboratorsPage";
import { fetchCollaborators } from "@/sanity/queries/collaborators";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Collaborators — IKC Trust",
  description:
    "Organisations and community bodies collaborating with IKC Trust to deliver ground-level impact across West Bengal.",
};

export default async function Page() {
  const collaborators = await fetchCollaborators();

  return (
    <main className="min-h-screen bg-[#FFFDF8]">
      <Header />
      <CollaboratorsPage collaborators={collaborators} />
      <Footer />
    </main>
  );
}
