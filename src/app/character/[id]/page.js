import { CharactersModel } from "@/models/CharactersModel";

const getCharacterData = async (id) => await CharactersModel.getData(id);

export default async function Character({ params }) {
    const characterData = await getCharacterData(params.id);
    console.log(characterData);

    return (
        <div>
            <img src={characterData.images.card} alt="" />
            <h1>{characterData.data.name}</h1>
            <h2>{characterData.data.title}</h2>
            <h4>{characterData.data.vision}</h4>
            <h4>{characterData.data.weapon}</h4>
            <h4>{characterData.data.nation}</h4>
            <h4>{characterData.data.affiliation}</h4>
            <h4>{characterData.data.rarity}</h4>
            <h4>{characterData.data.constellation}</h4>
            <h4>{characterData.data.birthday}</h4>
            <h4>{characterData.data.description}</h4>
        </div>
    )
};