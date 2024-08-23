import { CharactersModel } from '@/models/CharactersModel';
import Image from 'next/image';

import CharacterDescription from '@/components/CharacterDescription';
import ElementalBackground from '@/components/ElementalBackground';
import CharacterGallery from '@/components/CharacterGallery';
import AttributesTable from '@/components/AttributesTable';
import Constellations from '@/components/Constellations';
import AscensionTable from '@/components/AscensionTable';
import ModalButton from '@/components/ModalButton';
import StarsRarity from '@/components/StarsRarity';
import Talents from '@/components/Talents';
import Button from '@/components/Button';
import styles from './styles.module.scss';

export default async function Character({ params }) {
	const {
		basicInfo,
		attributesData,
		ascensionData,
		galleryData,
		talentsData,
		constellationsData,
		descriptionData
	} = await CharactersModel.getDataById(params.id);

	const vision = basicInfo.vision || attributesData.Vision;

	return (
		<div className={styles.page_container}>
			<main className={`${styles.main} ${styles[vision.toLowerCase()] || styles.default}`}>
				<div className={styles.content}>
					<section className={styles.info_section}>
						<div className={styles.character_info}>
							<div className={styles.character_details}>
								<div
									className={`${styles.character_icon} ${!basicInfo.header_img_url ? styles.icon_full : ''}`}
								>
									{basicInfo.header_img_url ? (
										<Image
											className={`bg_${basicInfo.rarity}`}
											src={basicInfo.icon_url}
											alt={'character_icon'}
											height={64}
											width={64}
										/>
									) : (
										<Image
											className={`bg_${basicInfo.rarity}`}
											src={basicInfo.icon_url}
											alt={'character_icon'}
											height={200}
											width={200}
										/>
									)}
								</div>
								<div className={styles.character_name}>
									<span>{basicInfo.name}</span>
									<StarsRarity rarity={Number(basicInfo.rarity?.substr(0, 1))} />
								</div>
								{vision !== '-' && (
									<div className={styles.character_vision}>
										<Image
											src={`/${vision.toLowerCase()}_vision.png`}
											alt={'character_vision'}
											width={30}
											height={30}
										/>
									</div>
								)}
							</div>
							<div className={styles.character_description}>
								<p>{basicInfo.desc}</p>
								{!attributesData['Version Released'] && <span>Comming Soon</span>}
							</div>
							{descriptionData && (
								<div className={styles.info_buttons}>
									<ModalButton title={`${basicInfo.name} - History`} buttonLabel={'History'}>
										<CharacterDescription description={descriptionData} />
									</ModalButton>
									<Button active text={'Voice'} />
								</div>
							)}
						</div>
						{basicInfo.header_img_url && (
							<div className={styles.character_splash}>
								{vision !== '-' && (
									<Image
										className={styles.character_bg}
										src={`/${vision.toLowerCase()}_mv_bg.png`}
										alt={`character_bg`}
										height={450}
										width={600}
										quality={80}
									/>
								)}
								<Image
									className={styles.splash_img}
									src={basicInfo.header_img_url}
									alt={`character_picture`}
									height={450}
									width={600}
									quality={80}
								/>
							</div>
						)}
					</section>
					<div className={styles.info_tables}>
						{attributesData && <AttributesTable vision={vision} attributes={attributesData} />}
						{ascensionData && <AscensionTable vision={vision} data={ascensionData} />}
						{galleryData && <CharacterGallery vision={vision} data={galleryData} />}
						{talentsData && <Talents vision={vision} data={talentsData} />}
						{constellationsData && <Constellations vision={vision} data={constellationsData} />}
					</div>
				</div>
			</main>

			<ElementalBackground bg={vision.toLowerCase()} />
		</div>
	);
}
