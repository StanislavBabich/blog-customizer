// src/components/article-params-form/ArtcleParamsForm.tsx
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type FC,
} from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	type ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	appliedState: ArticleStateType;
	onApply: (next: ArticleStateType) => void;
};

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	initialState,
	appliedState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(appliedState);
	const asideRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		setFormState(appliedState);
	}, [appliedState]);

	const handleOutsideClick = useCallback((e: MouseEvent) => {
		const target = e.target as Node;
		if (asideRef.current && !asideRef.current.contains(target)) {
			setIsOpen(false);
		}
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		document.addEventListener('mousedown', handleOutsideClick, true);
		return () =>
			document.removeEventListener('mousedown', handleOutsideClick, true);
	}, [isOpen, handleOutsideClick]);

	const handleApply = useCallback(() => {
		onApply(formState);
		setIsOpen(false);
	}, [formState, onApply]);

	const handleReset = useCallback(() => {
		setFormState(initialState);
		onApply(initialState);
		setIsOpen(false);
	}, [initialState, onApply]);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		handleApply();
	};

	const handleToggle = () => setIsOpen((v) => !v);

	const fontSizeName = useMemo(() => 'fontSize', []);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={(el) => (asideRef.current = el)}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={(opt) =>
							setFormState((s) => ({ ...s, fontFamilyOption: opt }))
						}
						onClose={() => void 0}
					/>
					<RadioGroup
						title='Размер шрифта'
						name={fontSizeName}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(opt) =>
							setFormState((s) => ({ ...s, fontSizeOption: opt }))
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={(opt) => setFormState((s) => ({ ...s, fontColor: opt }))}
						onClose={() => void 0}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={(opt) =>
							setFormState((s) => ({ ...s, backgroundColor: opt }))
						}
						onClose={() => void 0}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={(opt) =>
							setFormState((s) => ({ ...s, contentWidth: opt }))
						}
						onClose={() => void 0}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
