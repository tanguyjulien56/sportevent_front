import AddressForm from "../components/AddEventForm";
import LatestEvents from "../components/LatestEvents";

function HomePage() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col mt-16 ">
          <AddressForm />
          <LatestEvents />
        </div>
      </div>
    </>
  );
}

export default HomePage;
