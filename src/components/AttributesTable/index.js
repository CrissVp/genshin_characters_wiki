import TableComponent from '../TableComponent';
import styles from './styles.module.scss';

export default function AttributesTable({ attributes, vision }) {
	return (
		<TableComponent title={'Attributes'} vision={vision}>
			<div className={styles.attributes_table}>
				{Object.entries(attributes).map(
					([key, value]) =>
						value && (
							<div className={styles.attribute_row} key={`${key}_row`}>
								<span>{key}</span>
								<p>{value}</p>
							</div>
						)
				)}
			</div>
		</TableComponent>
	);
}
