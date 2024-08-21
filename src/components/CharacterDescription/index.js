import styles from './styles.module.scss';

export default function CharacterDescription({ description }) {
	const descriptionData = JSON.parse(description);

	return (
		<>
			{descriptionData.list.map((section) => (
				<>
					<div className={styles.divisor}></div>
					<div key={`desc_${section.title}`} className={styles.description}>
						<h2>{section.title}</h2>
						<div dangerouslySetInnerHTML={{ __html: section.desc }}></div>
					</div>
				</>
			))}
		</>
	);
}