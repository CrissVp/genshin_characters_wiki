import styles from "./styles.module.scss";

const BG_PATHS = {
  anemo: "/bg_anemo.webm",
  cryo: "/bg_cryo.webm",
  dendro: "/bg_dendro.webm",
  electro: "/bg_electro.webm",
  geo: "/bg_geo.webm",
  hydro: "/bg_hydro.webm",
  pyro: "/bg_pyro.webm",
};

export default function ElementalBackground({ bg }) {
  return (
    <div className={styles.background}>
      <video autoPlay loop muted playsInline>
        <source src={BG_PATHS[bg]} type="video/webm" />
      </video>
    </div>
  );
}
