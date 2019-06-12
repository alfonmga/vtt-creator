import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import VideoControls from './video-controls.component';
import { usePlay } from './play.context';
import { useVideoDom } from './video-dom.context';
import { useOverlay } from './overlay.context';

const useStyles = makeStyles({
	root: {
		color: 'white',
		height: '100%',
		width: '100%',
		position: 'relative',
		backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1) 0px, rgba(0,0,0,0) 100px)',
	},
	topGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 100,
		backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0px, rgba(0,0,0,0) 100px)',
	},
	topElement: {
		display: 'flex',
		justifyContent: 'flex-end',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	bottomElement: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
});

VideoOverlay.propTypes = {
	className: PropTypes.string,
	topElement: PropTypes.node,
};

export default function VideoOverlay({ className, topElement }) {
	const { showOverlay, onStartOverlayTimeout } = useOverlay();
	const { onPlayPause } = usePlay();
	const { videoContainerRef } = useVideoDom();
	const classes = useStyles();

	React.useEffect(() => {
		if (videoContainerRef) {
			videoContainerRef.addEventListener('mousemove', onStartOverlayTimeout);
		}

		return () => {
			if (videoContainerRef) {
				videoContainerRef.removeEventListener('mousemove', onStartOverlayTimeout);
			}
		};
	}, [onStartOverlayTimeout, videoContainerRef]);

	if (!showOverlay) return null;

	return (
		<div className={className}>
			<div className={classes.root} onClick={onPlayPause}>
				<div className={classes.topGradient} />
				<div onClick={e => e.stopPropagation()} className={classes.topElement}>
					{topElement}
				</div>
				<div className={classes.bottomElement}>
					<VideoControls onClick={e => e.stopPropagation()} />
				</div>
			</div>
		</div>
	);
}
