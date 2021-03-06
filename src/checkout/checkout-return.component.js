import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Loader } from '../common';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		alignItems: 'center',
	},
});

export default function CheckoutReturn() {
	const classes = useStyles();

	React.useEffect(() => {
		window.close();
	}, []);

	return (
		<div className={classes.root}>
			<Loader />
		</div>
	);
}
