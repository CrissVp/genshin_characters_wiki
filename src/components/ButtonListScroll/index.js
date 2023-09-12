import styles from './styles.module.scss';

export default function ButtonListScroll({ children }) {
    return (
        <div className={styles.buttons_list}>
            {children}
        </div>
    );
};