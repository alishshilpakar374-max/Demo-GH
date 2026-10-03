import { Footer, Header } from "./layout";

import { BookingModal, Lightbox, Toast } from "./components";

import { Hero, Rooms, Dining, Amenities, Gallery, Contact } from "./pages";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <Rooms />
        <Dining />
        <Amenities />
        <Gallery />
        <Contact />
      </main>

      <Footer />

      <BookingModal />
      <Lightbox />
      <Toast />
    </div>
  );
}

export default App;
