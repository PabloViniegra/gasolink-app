import MainLayout from "../layouts/MainLayout";
import Header from "../components/shared/Header";
import Maps from "../components/maps/Maps";

export default function CloseToMePage() {
  return (
    <MainLayout>
      <Header />
      <section className="mt-20 w-full h-[100vh]">
        <Maps />
      </section>
    </MainLayout>
  );
}
