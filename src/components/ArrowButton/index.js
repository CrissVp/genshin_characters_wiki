import styles from "./styles.module.scss";

export default function ArrowButton({ handleClick }) {
  return (
    <button onClick={handleClick} className={styles.button}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="entry-tab-arrow pre genshin disable"
      >
        <circle
          r="16"
          transform="matrix(-1 0 0 1 16 16)"
          fill="#000"
          fillOpacity=".16"
        ></circle>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.798 11.24V7c-2.163 3.721-7.01 7.789-8.913 9 1.904 1.212 6.75 5.279 8.913 9v-4.24c-.577-1.01-3.721-4.24-4.76-4.76 1.039-.52 4.183-3.75 4.76-4.76zM21.714 16l-.24.208a23.513 23.513 0 00-2.617 2.65c-.8-.952-1.675-1.838-2.616-2.65L16 16a12.953 12.953 0 002.856-2.857A12.952 12.952 0 0021.714 16z"
          fill="#D3BC8E"
        ></path>
      </svg>
    </button>
  );
}
