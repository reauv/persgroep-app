import styles from './style';
import { observer } from 'mobx-react';
import React, { PropTypes } from 'react';
import StoryExcerpt from 'Components/StoryExcerpt/Component';

const Category = (props) => {
	const category = props.category;

	if (!category) {
		return <div></div>
	}

	return (
		<section className={styles.wrapper}>
			<h1 className={styles.title}>
				{category.name}
			</h1>
			<div className={styles.list}>
				{category.topStories.map(story =>
					<StoryExcerpt
						key={story.id}
						story={story}
						onClick={props.onClick}
					/>
				)}
			</div>
		</section>
	);
};

Category.propTypes = {
	onClick: PropTypes.func,
	category: PropTypes.object.isRequired,
};

export default observer(Category);
