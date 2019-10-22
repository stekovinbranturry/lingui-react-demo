import React, { useState } from 'react';
import { I18nProvider } from '@lingui/react';
import { Trans, Plural } from '@lingui/macro';
import logo from './logo.svg';
import './App.css';

import catalogZh from './locales/zh/messages';
import catalogEn from './locales/en/messages';
const catalogsZh = { zh: catalogZh };
const catalogsEn = { en: catalogEn };

function App() {
	const [lang, setLang] = useState('en');
	const [messagesCount, setMessagesCount] = useState(0);
	const changeLang = () => {
		if (lang === 'en') {
			setLang('zh');
		} else {
			setLang('en');
		}
	};

	const test = 'test';
	return (
		<I18nProvider language={lang} catalogs={lang === 'en' ? catalogsEn : catalogsZh}>
			<div className='App'>
				<div className='App-header'>
					<button style={{ height: '30px', fontSize: '20px' }} onClick={changeLang}>
						{lang === 'en' ? '切换到中文' : 'Switch to English'}
					</button>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						<Trans>
							Edit <code>src/App.js</code> and save to reload.
						</Trans>
					</p>
					<a
						className='App-link'
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Trans>Learn React</Trans>
					</a>
					<div>
						<Trans>This is footer</Trans>
					</div>
					<div>
						<Trans>This is {test}</Trans>
					</div>
					<div>
						<Plural
							value={messagesCount}
							_0="There's # message in your inbox"
							_1="There's # message in your inbox"
							other="There're # messages in your inbox"
						/>
					</div>
					<button onClick={() => setMessagesCount(prevMessagesCount => prevMessagesCount + 1)}>
						<Trans>Add</Trans>
					</button>
					<button onClick={() => setMessagesCount(prevMessagesCount => prevMessagesCount - 1)}>
						<Trans>Minus</Trans>
					</button>
				</div>
			</div>
		</I18nProvider>
	);
}

export default App;
