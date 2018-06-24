import React, { Component, createContext } from 'react';

export const GlobalContext = createContext();

export class GlobalProvider extends Component {

	state = {
		a: '123',
		b: '456',
		c: '789'
	}

	render() {
		return (
			<GlobalContext.Provider
				value={{
					a: this.state.a,
					b: this.state.b,
					c: this.state.c
				}}>
				{this.props.children}
			</GlobalContext.Provider>
		);

	}
}