'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import TableComponent from '../TableComponent';
import ArrowButton from '../ArrowButton';
import Button from '../Button';

import styles from './styles.module.scss';

export default function CharacterGallery({ data, vision }) {
    const PIC_CONTAINER_WIDTH = data.pic ? 800 : 1052;

    const buttonList = useRef(null);
    const galleryPics = useRef(null);

    const [activePage, setActivePage] = useState(data.list[0].key);
    const [scrollButtonsVisible, setScrollButtonsVisible] = useState(false);

    const scrollToItem = ({ element, x }) => {
        element.current.style = `transform: translate3d(${x}px, 0px, 0px);`
    };

    const scrollGallery = (index, key) => {
        scrollToItem({ element: galleryPics, x: -PIC_CONTAINER_WIDTH * index });
        setActivePage(key);
    };

    const scrollButtonsPrev = () => {
        buttonList.current.firstChild.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }

    const scrollButtonsNext = () => {
        buttonList.current.lastChild.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    };

    useEffect(() => {
        if (buttonList?.current) setScrollButtonsVisible(buttonList.current.scrollWidth > PIC_CONTAINER_WIDTH)
    }, [buttonList?.current])

    return (
        <TableComponent title={'Gallery'} vision={vision}>
            <div className={styles.gallery_container}>
                <div className={styles.gallery}>
                    <div className={styles.gallery_buttons}>
                        {scrollButtonsVisible && (
                            <div className={`${styles.button_prev} ${styles.scroll_btn}`}>
                                <ArrowButton handleClick={scrollButtonsPrev} />
                            </div>
                        )}
                        <div className={styles.list_container}>
                            <div ref={buttonList} className={styles.buttons_list}>
                                {data.list.map((item, index) => (
                                    <Button active={activePage === item.key} handleClick={() => scrollGallery(index, item.key)} text={item.key} key={index} />
                                ))}
                            </div>
                        </div>
                        {scrollButtonsVisible && (
                            <div className={`${styles.button_next} ${styles.scroll_btn}`}>
                                <ArrowButton handleClick={scrollButtonsNext} />
                            </div>
                        )}
                    </div>
                    <div ref={galleryPics} className={styles.character_pics}>
                        {data.list.map((item) => (
                            <div key={item.key} className={`${styles.gallery_item} ${data.pic ? '' : styles.no_pic}`}>
                                {item.key === activePage && (
                                    <>
                                        <div className={`${styles.gallery_pic} ${data.pic ? '' : styles.no_pic}`}>
                                            <Image src={item.img} width={450} height={450} alt='Gallery_Pic' placeholder="blur" blurDataURL="/load_img.png" />
                                        </div>
                                        <div className={styles.gallery_desc}>
                                            <div dangerouslySetInnerHTML={{ __html: item.imgDesc }}></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {data.pic && (
                    <div className={styles.character_card}>
                        <h4>{'Card'}</h4>
                        <Image src={data.pic} width={225} height={450} alt='Character_Card' />
                    </div>
                )}
            </div>
        </TableComponent>
    );
};