import './Modal.css';

import React, { Component, Fragment } from 'react';
import { Transition, animated } from 'react-spring';

import { Portal } from '../../Containers';
import { Icon } from '../../Elements';

function ModalWrapper(props) {
	const { children } = props;
	return (
		<div styleName='modal-wrapper'>{children}</div>
	);
}

function ModalWindow(props) {
	const { children, style } = props;
	return (
		<animated.div styleName='modal-window' style={style}>{children}</animated.div>
	);
}

function CloseButton(props) {
	const { children, toggle } = props;
	return (
		<button styleName='close-button' onClick={toggle}>{children}</button>
	);
}

function Background(props) {
	const { toggle, style } = props;
	return (
		<animated.div styleName='modal-background' style={style} onClick={toggle}></animated.div>
	);
}

export default class Modal extends Component {
	render() {
		const { children, toggle, on } = this.props;
		return (
			<Fragment>
				<Portal>
					<Transition
						native
						config={{
							tension: 280,
							friction: 60
						}}
						from={{ opacity: 0, bgOpacity: 0, y: '-10px' }}
						enter={{ opacity: 1, bgOpacity: 0.5, y: '0px' }}
						leave={{ opacity: 0, bgOpacity: 0, y: '10px' }}
					>
						{on &&
							((styles) => (
								<ModalWrapper>
									<ModalWindow style={{
										opacity: styles.opacity.interpolate(opacity => opacity),
										transform: styles.y.interpolate(y => `translate3d(0, ${y}, 0)`)
									}}>
										<CloseButton toggle={toggle}>
											<Icon name='close'></Icon>
										</CloseButton>
										<div>{children}</div>
									</ModalWindow>
									<Background
										toggle={toggle}
										style={{ opacity: styles.bgOpacity.interpolate(bgOpacity => bgOpacity) }}
									/>
								</ModalWrapper>
							))}
					</Transition>
				</Portal>
			</Fragment>
		);
	}
}