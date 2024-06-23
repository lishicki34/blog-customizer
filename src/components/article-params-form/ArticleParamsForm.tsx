import { useState, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	currentSettings: ArticleStateType;
	onApplySettings: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentSettings,
	onApplySettings,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentSettings);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	});

	const handleOptionChange =
		(optionType: keyof ArticleStateType) => (selected: OptionType) => {
			setFormState((prevState) => ({
				...prevState,
				[optionType]: selected,
			}));
		};

	const toggleForm = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApplySettings(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApplySettings(formState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleForm} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} align='left' uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleOptionChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleOptionChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleOptionChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleOptionChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleOptionChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
