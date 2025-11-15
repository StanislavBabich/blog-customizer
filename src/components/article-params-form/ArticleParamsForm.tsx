import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	type ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	appliedState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	appliedState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(appliedState);
	const sidebarRef = useRef<HTMLElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			setFormState(appliedState);
		}
	}, [isOpen, appliedState]);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!sidebarRef.current?.contains(target) &&
				!arrowButtonRef.current?.contains(target)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleFontFamilyChange = (
		option: (typeof fontFamilyOptions)[number]
	) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontColorChange = (option: (typeof fontColors)[number]) => {
		setFormState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[number]
	) => {
		setFormState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (
		option: (typeof contentWidthArr)[number]
	) => {
		setFormState((prev) => ({ ...prev, contentWidth: option }));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<div ref={arrowButtonRef}>
				<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			</div>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						placeholder='Выберите шрифт'
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						placeholder='Выберите цвет шрифта'
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						placeholder='Выберите цвет фона'
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						placeholder='Выберите ширину контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
