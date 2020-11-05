import React, { useState, useEffect } from 'react';
// import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';
// import useStyles from './styles';

const alanKey =
	'';

const App = () => {
	const [activeArticle, setActiveArticle] = useState(0);
	const [newsArticles, setNewsArticles] = useState([]);

	// const classes = useStyles();

	useEffect(() => {
		alanBtn({
			key: alanKey,
			onCommand: ({ command, articles, number }) => {
				if (command === 'newsHeadlines') {
					setNewsArticles(articles);
					setActiveArticle(-1);
				} else if (command === 'highlight') {
					setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
				} else if (command === 'open') {
					const parsedNumber =
						number.length > 2
							? wordsToNumbers(number, { fuzzy: true })
							: number;
					const article = articles[parsedNumber - 1];

					if (parsedNumber > 20) {
						alanBtn().playText('Please try again');
					} else if (article) {
						window.open(article.url, '_blank');
						alanBtn().playText('Opening...');
					}
				}
			},
		});
	}, []);

	return (
		<div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle} />
		</div>
	);
};

export default App;
