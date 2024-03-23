import SideNavLG from "./layout/SideNavLG";
import SideNavSM from "./layout/SideNavSM";
import Router from "./routes/Router";



const App = () => {

  return (
    <main className="flex font-poppins w-screen ">
      <SideNavSM />
      <SideNavLG />
      <Router />
    </main>
  );
};

export default App;
