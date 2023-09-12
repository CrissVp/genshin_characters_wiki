'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import TableComponent from '../TableComponent';
import ArrowButton from '../ArrowButton';
import Button from '../Button';

import styles from './styles.module.scss';

export default function CharacterGallery({ data, vision }) {
    const buttonList = useRef(null);
    const galleryPics = useRef(null);
    const galleryContainer = useRef(null);

    const [itemWidth, setItemWidth] = useState(undefined);
    const [characterPics, setCharacterPics] = useState([]);
    const [scrollButtonsVisible, setScrollButtonsVisible] = useState(false);
    const [activePage, setActivePage] = useState({ key: data.list[0].key, index: 0 });

    const scrollToItem = ({ element, index }) => {
        element.current.style = `transform: translate3d(${-itemWidth * index}px, 0px, 0px);`
    };

    const scrollGallery = (index, key) => {
        scrollToItem({ element: galleryPics, index });
        setActivePage({ key, index });
    };

    const scrollButtonsPrev = () => {
        buttonList.current.firstChild.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    };

    const scrollButtonsNext = () => {
        buttonList.current.lastChild.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const { height, width } = entries[0].contentRect;
            setItemWidth(width);
        });

        if (galleryContainer?.current) resizeObserver.observe(galleryContainer.current);
        return () => { if (galleryContainer?.current) resizeObserver.unobserve(galleryContainer.current) };
    }, [galleryContainer?.current]);

    useEffect(() => {
        if (window.innerWidth < 1200 && data.pic) {
            return setCharacterPics([
                { key: 'Card', img: data.pic, imgDesc: '' },
                ...data.list
            ]);
        }

        setCharacterPics([...data.list]);
    }, [itemWidth]);

    useEffect(() => {
        if (characterPics.length > 0) {
            if (activePage.key === 'Card' && characterPics[0].key !== 'Card') {
                return scrollGallery(0, characterPics[0].key);
            }

            const activeItemIndex = characterPics.findIndex((item) => item.key === activePage.key);
            scrollGallery(activeItemIndex, activePage.key);
        }
    }, [characterPics]);

    useEffect(() => {
        if (buttonList?.current && galleryContainer.current)
            setScrollButtonsVisible(buttonList.current.scrollWidth > itemWidth);
    }, [buttonList?.current]);

    return (
        <TableComponent title={'Gallery'} vision={vision}>
            <div className={styles.gallery_container}>
                <div className={styles.gallery} ref={galleryContainer}>
                    <div className={styles.gallery_buttons}>
                        {scrollButtonsVisible && (
                            <div className={`${styles.button_prev} ${styles.scroll_btn}`}>
                                <ArrowButton handleClick={scrollButtonsPrev} />
                            </div>
                        )}
                        <div className={styles.list_container}>
                            <div ref={buttonList} className={styles.buttons_list}>
                                {characterPics.map((item, index) => (
                                    <Button active={activePage.key === item.key} handleClick={() => scrollGallery(index, item.key)} text={item.key} key={index} />
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
                        {characterPics.map((item) => (
                            <div key={item.key} className={`${styles.gallery_item}`}
                                style={itemWidth && { minWidth: itemWidth }}>
                                {item.key === activePage.key && (
                                    <>
                                        <div className={`${styles.gallery_pic} ${item.key === 'Card' ? styles.card : ''}`}>
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