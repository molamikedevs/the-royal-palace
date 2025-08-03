// File: app/_components/TextExpander.tsx
// This file defines the TextExpander component which allows text to be expanded or collapsed
'use client';


import { useState } from 'react';
import { ChildrenProps } from '../_types';


function TextExpander({ children }: ChildrenProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	const displayText = isExpanded
		? children
		: typeof children === 'string'
		? children.split(' ').slice(0, 40).join(' ') + '...'
		: ''

	return (
		<span>
			{displayText}{' '}
			<button
				className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
				onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? 'Show less' : 'Show more'}
			</button>
		</span>
	)
}

export default TextExpander;
