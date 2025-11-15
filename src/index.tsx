import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useMemo, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form';
import type { FC } from 'react';
import {
	defaultArticleState,
	type ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appliedArticleState, setAppliedArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const initialArticleState = useMemo<ArticleStateType>(
		() => defaultArticleState,
		[]
	);

	const TypedArticleParamsForm = ArticleParamsForm as unknown as FC<{
		initialState: ArticleStateType;
		appliedState: ArticleStateType;
		onApply: (next: ArticleStateType) => void;
	}>;

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedArticleState.fontFamilyOption.value,
					'--font-size': appliedArticleState.fontSizeOption.value,
					'--font-color': appliedArticleState.fontColor.value,
					'--container-width': appliedArticleState.contentWidth.value,
					'--bg-color': appliedArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<TypedArticleParamsForm
				initialState={initialArticleState}
				appliedState={appliedArticleState}
				onApply={setAppliedArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
