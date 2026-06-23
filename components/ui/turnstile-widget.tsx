"use client";

import Script from "next/script";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { getTurnstileSiteKey } from "@/lib/turnstile";

type TurnstileWindow = Window & {
	turnstileContactOnSuccess?: (token: string) => void;
	turnstileContactOnExpired?: () => void;
	turnstileContactOnError?: () => void;
	turnstile?: {
		reset: (widgetId?: string) => void;
	};
};

export type TurnstileWidgetHandle = {
	reset: () => void;
};

type TurnstileWidgetProps = {
	onTokenChange: (token: string | null) => void;
};

export const TurnstileWidget = forwardRef<
	TurnstileWidgetHandle,
	TurnstileWidgetProps
>(function TurnstileWidget({ onTokenChange }, ref) {
	const widgetIdRef = useRef<string | null>(null);

	useEffect(() => {
		const win = window as TurnstileWindow;

		win.turnstileContactOnSuccess = (token: string) => {
			onTokenChange(token);
		};
		win.turnstileContactOnExpired = () => {
			onTokenChange(null);
		};
		win.turnstileContactOnError = () => {
			onTokenChange(null);
		};

		return () => {
			delete win.turnstileContactOnSuccess;
			delete win.turnstileContactOnExpired;
			delete win.turnstileContactOnError;
		};
	}, [onTokenChange]);

	useImperativeHandle(ref, () => ({
		reset: () => {
			const win = window as TurnstileWindow;
			if (win.turnstile) {
				win.turnstile.reset(widgetIdRef.current ?? undefined);
			}
			onTokenChange(null);
		},
	}));

	return (
		<>
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js"
				strategy="afterInteractive"
			/>
			<div className="w-full min-w-0">
				<div
					className="cf-turnstile w-full"
					data-sitekey={getTurnstileSiteKey()}
					data-size="flexible"
					data-appearance="interaction-only"
					data-callback="turnstileContactOnSuccess"
					data-expired-callback="turnstileContactOnExpired"
					data-error-callback="turnstileContactOnError"
					ref={(node) => {
						widgetIdRef.current = node?.getAttribute("data-widget-id") ?? null;
					}}
				/>
			</div>
		</>
	);
});
