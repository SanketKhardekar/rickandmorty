import { Fragment } from "react";
import CharacterList from "../components/CharacterList";
import { useSelector} from "react-redux";
const CharacterScreen=(props)=>{
    const characters=useSelector(state => state.favroite.favorites);
    return(
        <Fragment>
            <CharacterList characters={characters}/>
        </Fragment>
    )
}
export default CharacterScreen;