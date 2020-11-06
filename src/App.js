import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';

const alanKey =
	'';

const App = () => {
	const [activeArticle, setActiveArticle] = useState(0);
	const [newsArticles, setNewsArticles] = useState([]);

	const classes = useStyles();

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
			<div className={classes.logoContainer}>
				{newsArticles.length ? (
					<div className={classes.infoContainer}>
						<div className={classes.card}>
							<Typography variant="h5" component="h4">
								Try saying: <br />
								<br />
								Open article number [4]
							</Typography>
						</div>
						<div className={classes.card}>
							<Typography variant="h5" component="h4">
								Try saying: <br />
								<br />
								Go back
							</Typography>
						</div>
					</div>
				) : null}
				<img
					src="https://alan.app/voice/images/previews/preview.jpg"
					className={classes.alanLogo}
					alt="logo"
				/>
			</div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle} />
		</div>
	);
};

export default App;
