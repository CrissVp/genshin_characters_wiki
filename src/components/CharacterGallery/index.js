'use client'

import { useRef, useState } from 'react';
import Image from 'next/image';

import TableComponent from '../TableComponent';
import Button from '../Button';

import styles from './styles.module.scss';

export default function CharacterGallery({ data, vision }) {
    const galleryPics = useRef(null);
    const [activePage, setActivePage] = useState(data.list[0].key);

    const scrollToItem = (index, key) => {
        galleryPics.current.style = `transform: translate3d(${-800 * index}px, 0px, 0px);`
        setActivePage(key);
    };

    return (
        <TableComponent title={'Gallery'} vision={vision}>
            <div className={styles.gallery_container}>
                <div className={styles.gallery}>
                    <div className={styles.gallery_buttons}>
                        {data.list.map((item, index) => (
                            <Button active={activePage === item.key} handleClick={() => scrollToItem(index, item.key)} text={item.key} key={index} />
                        ))}
                    </div>
                    <div ref={galleryPics} className={styles.character_pics}>
                        {data.list.map((item) => (
                            <div key={item.key} className={styles.gallery_item}>
                                <div className={styles.gallery_pic}>
                                    <Image src={item.img} width={450} height={450} alt='Gallery_Pic' />
                                </div>
                                <div className={styles.gallery_desc}>
                                    <div dangerouslySetInnerHTML={{ __html: item.imgDesc }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.character_card}>
                    <h4>{'Card'}</h4>
                    <Image src={data.pic} width={225} height={450} alt='Character_Card' />
                </div>
            </div>
        </TableComponent>
    );
};