import TableComponent from '../TableComponent';
import styles from './styles.module.scss';

export default function AttributesTable({ attributes, vision }) {
  return (
    <TableComponent title={'Attributes'} vision={vision}>
      <div className={styles.table_row}>
        <div className={styles.table_column}>
          <span>Name</span>
          <p>{attributes['Name']}</p>
        </div>
        <div className={styles.table_column}>
          <span>Birthday</span>
          <p>{attributes['Birthday']}</p>
        </div>
      </div>
      <div className={styles.table_row}>
        <div className={styles.table_column}>
          <span>Constellation</span>
          <p>{attributes['Constellation']}</p>
        </div>
        <div className={styles.table_column}>
          <span>Title</span>
          <p>{attributes['Title']}</p>
        </div>
      </div>
      <div className={styles.table_row}>
        <div className={styles.table_column}>
          <span>{attributes['Vision'] ? 'Vision' : 'Gnosis'}</span>
          <p>{attributes['Vision'] || attributes['Gnosis']}</p>
        </div>
        <div className={styles.table_column}>
          <span>Affiliation</span>
          <p>{attributes['Affiliation']}</p>
        </div>
      </div>
      <div className={styles.table_row}>
        <div className={styles.table_column}>
          <span>Chinese VA</span>
          <p>{attributes['Chinese VA']}</p>
        </div>
        <div className={styles.table_column}>
          <span>English VA</span>
          <p>{attributes['English VA']}</p>
        </div>
      </div>
      <div className={styles.table_row}>
        <div className={styles.table_column}>
          <span>Korean VA</span>
          <p>{attributes['Korean VA']}</p>
        </div>
        <div className={styles.table_column}>
          <span>Japanese VA</span>
          <p>{attributes['Japanese VA']}</p>
        </div>
      </div>
      <div className={styles.table_row}>
        <div className={styles.table_column}>
          <span>Version Released</span>
          <p>{attributes['Version Released']}</p>
        </div>
      </div>
    </TableComponent>
  );
}

