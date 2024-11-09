'use client';

import { useState } from 'react';
import Image from 'next/image';

import IconButton from '../IconButton';
import StarsRarity from '../StarsRarity';
import styles from './styles.module.scss';

const elements = ['pyro', 'cryo', 'electro', 'geo', 'hydro', 'anemo', 'dendro'];
const wepons = ['sword', 'claymore', 'bow', 'catalyst', 'polearm'];
const rarities = ['5-star', '4-star'];

export default function Filters({ filters, setFilters }) {
	const [visible, setVisible] = useState(false);

	return (
		<aside
			className={`${styles.container} ${visible ? styles.container_bg : ''}`}
			onClick={() => setVisible(false)}
		>
			<div
				className={`${styles.filters_container} ${visible ? styles.expanded : ''}`}
				onClick={(e) => e.stopPropagation()}
			>
				<button className={styles.filter_button} onClick={() => setVisible(!visible)}>
					<Image src={'/filter.svg'} height={40} width={40} />
				</button>
				<div className={`${styles.filters} ${visible ? styles.visible : styles.hidden}`}>
					<div className={styles.search_input}>
						<Image height={15} width={15} src={'/magnifing_glass.svg'} />
						<input
							type='text'
							onChange={(e) =>
								setFilters((current) => ({
									...current,
									name: e.target.value
								}))
							}
						/>
					</div>
					<div className={styles.filter}>
						<span>Elemental Type</span>
						<ul>
							{elements.map((element) => (
								<li key={`filter_${element}`}>
									<button
										title={element}
										onClick={() =>
											setFilters((current) => ({
												...current,
												element: filters.element !== element ? element : undefined
											}))
										}
									>
										<IconButton active={filters.element === element} icon={`${element}_vision`} />
									</button>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.filter}>
						<span>Weapon</span>
						<ul>
							{wepons.map((weapon) => (
								<li key={`filter_${weapon}`}>
									<button
										title={weapon}
										onClick={() =>
											setFilters((current) => ({
												...current,
												weapon: filters.weapon !== weapon ? weapon : undefined
											}))
										}
									>
										<IconButton active={filters.weapon === weapon} icon={weapon} />
									</button>
								</li>
							))}
						</ul>
					</div>
					<div className={`${styles.filter} ${styles.rarity_filter}`}>
						<span>Rarity</span>
						<ul>
							{rarities.map((rarity) => (
								<li
									className={`${filters.rarity === rarity ? styles.filter_active : ''}`}
									key={`filter_${rarity}`}
								>
									<button
										title={rarity}
										onClick={() =>
											setFilters((current) => ({
												...current,
												rarity: filters.rarity !== rarity ? rarity : undefined
											}))
										}
										className={styles.rarity_button}
									>
										<StarsRarity rarity={Number(rarity[0])} />
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</aside>
	);
}
