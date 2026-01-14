import { useParams } from "react-router-dom";
import { useContext } from "react";
import { RestsContext } from "./rest";
function RestMenu() {
  const { id } = useParams();
  const { rests , loadingRests } = useContext(RestsContext);
  const rest = rests.find(r => r.rest_id == id);
  return (
    <>
    {loadingRests  ? <div className="relative flex justify-center text-6xl top-16"> loading...</div> :
          <div className="relative top-6 w-11/12 mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent to-primary/5 p-12">
        <h1 className="font-bold text-4xl">{rest.name}</h1>
        <p className="relative text-lg text-muted-foreground top-2">{rest.location}</p>
      </div> }

        
    </>
  );
}

export default RestMenu;
