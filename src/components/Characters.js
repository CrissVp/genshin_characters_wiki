import { CharactersModel } from "@/app/models/CharactersModel";
import CharacterCard from "./CharacterCard";

const getCharactersData = async () => await CharactersModel.getAll();

export default async function Characters() {
    const characters = await getCharactersData();
    // console.log(characters)

    return (
        <div>
            {characters.map((character) => (
                <CharacterCard data={character} key={character.name} />
            ))}
        </div>
    )
}