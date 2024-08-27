import styles from '../ModalButton/styles.module.scss';

export default function CharacterDescription({ description }) {
	return (
		<>
			{description.list.map((section) => (
				<>
					<div className={styles.divisor}></div>
					<div key={`desc_${section.title}`} className={styles.modal_data}>
						<h2>{section.title}</h2>
						<div dangerouslySetInnerHTML={{ __html: section.desc }}></div>
					</div>
				</>
			))}
		</>
	);
}
