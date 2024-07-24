import styles from "./styles.module.scss";

export default function TableComponent({ children, vision, title }) {
  return (
    <section className={`${styles.details_table} bg_${vision.toLowerCase()}`}>
      <div className={styles.table_header}>
        <h4>{title}</h4>
      </div>
      {children}
    </section>
  );
}
