import styles from '../ModalButton/styles.module.scss';
import playerStyles from './styles.module.scss';

export default function VoiceOver({ voiceData }) {
	return voiceData.list.map((voice) => (
		<>
			<div className={styles.divisor}></div>
			<div className={styles.modal_data}>
				<h2>{voice.title}</h2>
				<div dangerouslySetInnerHTML={{ __html: voice.desc }}></div>
				<div className={playerStyles.container}>
					{voice.audios.map((audio) => (
						<div key={audio.id} className={playerStyles.audio}>
							<span>{audio.name}</span>
							<audio preload='none' controls src={audio.url}></audio>
						</div>
					))}
				</div>
			</div>
		</>
	));
}
