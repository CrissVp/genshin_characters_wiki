'use client';

import { basePath } from '../../../next.config';
import { useState } from 'react';
import Image from 'next/image';

import Button from '../Button';
import styles from './styles.module.scss';

export default function ModalButton({ title, buttonLabel, children }) {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Button active text={buttonLabel} handleClick={() => setVisible(!visible)} />
			{visible && (
				<article className={styles.modal_container} onClick={() => setVisible(false)}>
					<section className={styles.modal} onClick={(e) => e.stopPropagation()}>
						<div className={styles.content}>
							<div className={styles.modal_head}>
								<h2>{title}</h2>
								<button onClick={() => setVisible(false)}>
									<Image src={`${basePath}/close_icon.svg`} height={20} width={20} />
								</button>
							</div>
							{children}
						</div>
					</section>
				</article>
			)}
		</>
	);
}
