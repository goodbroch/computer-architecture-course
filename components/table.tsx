// Example from https://beta.reactjs.org/learn

import { ReactNode } from 'react'
import styles from './table.module.css'

export default function MyTable({
	children
}: {
	children: ReactNode
})
{
	return (
	<table className={styles.table__with_border} >
		{children}
	</table>
	);
	}
