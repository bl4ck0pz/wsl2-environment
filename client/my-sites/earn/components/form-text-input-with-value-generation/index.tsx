import { Button } from '@wordpress/components';
import classNames from 'classnames';
import { useState, useCallback, ChangeEvent, FocusEvent, MouseEvent } from 'react';
import FormTextInput from 'calypso/components/forms/form-text-input';

import './style.scss';

const noop = () => {};

type FormTextInputWithValueGenerationProps = {
	className?: string;
	action?: string;
	value?: string;
	onAction?: ( event: MouseEvent< HTMLButtonElement > ) => void;
	onFocus?: ( event: FocusEvent< HTMLInputElement > ) => void;
	onBlur?: ( event: FocusEvent< HTMLInputElement > ) => void;
	onChange?: ( event: ChangeEvent< HTMLInputElement > ) => void;
	disabled?: boolean;
	isError?: boolean;
	isValid?: boolean;
	maxLength?: string;
};

const FormTextInputWithValueGeneration = ( {
	className,
	action,
	value,
	onAction = noop,
	onChange = noop,
	onFocus = noop,
	onBlur = noop,
	disabled = false,
	isError = false,
	isValid = false,
	maxLength = '10',
	...props
}: FormTextInputWithValueGenerationProps ) => {
	const [ focused, setFocused ] = useState( false );

	const handleFocus = useCallback(
		( event: FocusEvent< HTMLInputElement > ) => {
			setFocused( true );
			onFocus( event );
		},
		[ onFocus ]
	);

	const handleBlur = useCallback(
		( event: FocusEvent< HTMLInputElement > ) => {
			setFocused( false );
			onBlur( event );
		},
		[ onBlur ]
	);

	return (
		<div
			className={ classNames( 'form-text-input-with-value-generation', className, {
				'is-focused': focused,
				'is-disabled': disabled,
				'is-error': isError,
				'is-valid': isValid,
			} ) }
			role="group"
		>
			<FormTextInput
				{ ...props }
				className="form-text-input-with-value-generation__input"
				disabled={ disabled }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
				onChange={ onChange }
				value={ value }
				maxLength={ maxLength }
			/>
			<Button
				size="compact"
				className="form-text-input-with-value-generation__button"
				disabled={ disabled }
				onClick={ onAction }
			>
				{ action }
			</Button>
		</div>
	);
};

export default FormTextInputWithValueGeneration;
