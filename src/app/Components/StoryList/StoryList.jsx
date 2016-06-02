import Swiper from 'react-swipe';
import Store from 'Stores/MainStore';
import { mapProps } from 'recompose';
import styles from './story_list.css';
import { observer } from 'mobx-react';
import Story from 'Components/Story/Story';
import React, { Component } from 'react';

export class StoryList extends Component {

	/**
	 * State of the component.
	 *
	 * @type {Object}
	 */
	state = {
		active: 0,
	}

	componentDidMount() {
		fetch(`${process.env.API_ENDPOINT}/api/stories`)
			.then(response => response.json())
			.then(response => Store.story.addStories(response.data));
	}

	/**
	 * Invoked when the slide transition ends.
	 *
	 * @param  {Integer} newIndex
	 * @return {void}
	 */
	onTransitionEnd = (newIndex) => {
		if (newIndex !== this.state.active) {
			window.scrollTo(0, 0);
		}

		this.setState({ active: newIndex });
	}

	/**
	 * Options for the swiper.
	 *
	 * @type {Object}
	 */
	swipeOptions = {
		continuous: false,
		transitionEnd: this.onTransitionEnd,
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const stories = this.props.story.stories;

		return (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<Swiper
						className={styles.swiper}
						swipeOptions={this.swipeOptions}
						key={stories.length}
					>
						{stories.map((story, index) =>
							<Story key={story.id} story={story} active={index === this.state.active} />
						)}
					</Swiper>
				</div>
			</div>
		);
	}
}

export default mapProps(
	() => ({ story: Store.story })
)(observer(StoryList));
