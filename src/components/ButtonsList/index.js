import { useEffect, useRef, useState } from 'react';

import Button from '../Button';
import ArrowButton from '../ArrowButton';
import styles from './styles.module.scss';

export default function ButtonsList({ items, activeItem, itemOnClick, containerWidth }) {
    const buttonList = useRef(null);
    const [scrollButtonsVisible, setScrollButtonsVisible] = useState(false);

    const scrollButtonsPrev = () => {
        buttonList.current.firstChild.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    };

    const scrollButtonsNext = () => {
        buttonList.current.lastChild.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    };

    useEffect(() => {
        if (buttonList?.current && containerWidth) {
            setScrollButtonsVisible(buttonList.current.scrollWidth > containerWidth);
        }
    }, [buttonList?.current, containerWidth]);

    return (
        <div className={styles.gallery_buttons}>
            {scrollButtonsVisible && (
                <div className={`${styles.button_prev} ${styles.scroll_btn}`}>
                    <ArrowButton handleClick={scrollButtonsPrev} />
                </div>
            )}
            <div className={styles.list_container}>
                <div ref={buttonList} className={styles.buttons_list}>
                    {items.map((item, index) => (
                        <Button active={activeItem.key === item.key} handleClick={() => itemOnClick(item, index)} text={item.key} key={index} />
                    ))}
                </div>
            </div>
            {scrollButtonsVisible && (
                <div className={`${styles.button_next} ${styles.scroll_btn}`}>
                    <ArrowButton handleClick={scrollButtonsNext} />
                </div>
            )}
        </div>
    );
};