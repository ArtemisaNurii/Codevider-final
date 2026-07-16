"use client";

import type { CSSProperties } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("yaml", yaml);

type CodeHighlighterProps = {
	language: string;
	style?: { [key: string]: CSSProperties };
	wrapLongLines?: boolean;
	customStyle?: CSSProperties;
	children: string;
};

/**
 * Prism highlighter with only the languages used on the site.
 * Avoids shipping the full ~1MB language pack.
 */
export default function CodeHighlighter({
	language,
	style,
	wrapLongLines,
	customStyle,
	children,
}: CodeHighlighterProps) {
	return (
		<SyntaxHighlighter
			language={language}
			style={style}
			wrapLongLines={wrapLongLines}
			customStyle={customStyle}
		>
			{children}
		</SyntaxHighlighter>
	);
}
