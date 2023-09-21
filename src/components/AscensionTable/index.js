'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import TableComponent from '../TableComponent';
import ButtonsList from '../ButtonsList';

import styles from './styles.module.scss';

export default function AscensionTable({ data, vision }) {
    const buttonsContainer = useRef(null);
    const [pageData, setPageData] = useState(data[1]);
    const [containerWidth, setContainerWidth] = useState(buttonsContainer.current?.clientWidth);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const { height, width } = entries[0].contentRect;
            setContainerWidth(width);
        });

        if (buttonsContainer.current) resizeObserver.observe(buttonsContainer.current);
        return () => { if (buttonsContainer.current) resizeObserver.unobserve(buttonsContainer.current) };
    }, []);

    return (
        <TableComponent title={'Ascension'} vision={vision}>
            <div ref={buttonsContainer} className={styles.button_list}>
                <ButtonsList items={data} activeItem={pageData} itemOnClick={setPageData} containerWidth={containerWidth} />
            </div>
            <div key={pageData.key} className={styles.data_table}>
                <table className={styles.table}>
                    <tbody className={styles.table_body}>
                        <tr className={styles.tr}>
                            <th className={styles.th}></th>
                            <th className={styles.th}>Before Ascension</th>
                            <th className={styles.th}>After Ascension</th>
                        </tr>
                        {pageData.combatList.map((row, index) => (
                            index > 0 && (
                                <tr className={styles.tr} key={index}>
                                    <th className={styles.th}>{row.key}</th>
                                    <td>{row.values[0]}</td>
                                    <td>{row.values[1]}</td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
                <div className={`${styles.table} ${styles.mats_table}`}>
                    <div className={styles.tr}>
                        <span className={styles.th}>Ascension Materials</span>
                    </div>
                    <div className={styles.table_body}>
                        <div className={`${styles.materials}`}>
                            {pageData.materials?.map((mat, index) => (
                                <div key={index} className={styles.mat}>
                                    <Image src={mat.icon_url} height={20} width={20} alt='Material_Pic' />
                                    <span>{mat.name}</span>
                                    <span>x {mat.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </TableComponent>
    );
};