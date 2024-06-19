import Logo from "./logo.svg";

function Nav() {
  return (
    <header className="sticky top-0 bg-white shadow-lg">
      <nav className="rounded  px-4 py-2.5 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-start">
          <a href="/" className="flex items-center p-2">
            <img src={Logo} className="sm:9 mr-3" alt="Fetch Logo" width={120} />
          </a>
        </div>
       
      </nav>
    </header>
  );
}

export default Nav;