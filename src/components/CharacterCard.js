'use client'

import { blobToBase64 } from "@/app/lib/utils";
import { useEffect, useState } from "react"

export default function CharacterCard({ data }) {
    const [image, setImage] = useState();

    useEffect(() => {
        const getImage = async () => {
            const reader = new FileReader();
            const base64Img = await blobToBase64(data.image, reader);
            setImage(base64Img);
        };

        if (data) getImage();
    }, [data]);

    return (
        <div>
            {image && <img src={image} alt="" />}
            <h4>{data.name}</h4>
        </div>
    )
}