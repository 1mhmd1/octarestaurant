import OctaDine from '../assets/OctaDine.png';

function NavBar() {
  return (
    <>
    <nav className="sticky z-50 flex items-center top-0 left-0 h-16 w-full bg-white border-solid border-b-2">
        <ul className="absolute flex items-center space-x-4 left-16">
            <li><img src={OctaDine} alt="Logo" className=" h-14 "/></li>
            <li><h1 className="text-lg font-bold" >OctaDine</h1></li>
        </ul>
        
        
        <div className="absolute right-20 text-muted-foreground hover:text-black hover:cursor-pointer ">Admin Panel</div>
    </nav>
    </>
  );
}

export default NavBar;
