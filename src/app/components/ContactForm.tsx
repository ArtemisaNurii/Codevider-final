"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Turnstile } from "@marsidev/react-turnstile";

const contactSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Full name must be at least 2 characters." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	details: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

async function saveLeadToNotion(name: string, email: string, details: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/leads/landing/contact`,
		{
			method: "POST",
			body: JSON.stringify({
				name,
				email,
				details,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	const result = await response.json();
	console.log(result);

	if (![201, 200].includes(response.status)) {
		throw new Error(result.message || "Failed to submit form");
	}

	return result;
}

const ContactForm = () => {
	const [isPending, setIsPending] = useState(false);
	const [isVerified, setIsVerified] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		defaultValues: {
			name: "",
			email: "",
			details: "",
		},
	});

	const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
		setIsPending(true);

		try {
			// Validate the data using Zod
			const validationResult = contactSchema.safeParse(data);

			if (!validationResult.success) {
				const firstError = validationResult.error.errors[0].message;
				toast.error(firstError);
				setIsPending(false);
				return;
			}

			// Save the lead to Notion database via API route
			await saveLeadToNotion(
				validationResult.data.name,
				validationResult.data.email,
				validationResult.data.details || "",
			);

			// If the submission was successful
			toast.success("Thank you for your message! We'll be in touch soon.");
			reset();
		} catch (error) {
			console.error("Form submission error:", error);
			const errorMessage =
				error instanceof Error
					? error.message
					: "Something went wrong. Please check your connection and try again.";
			toast.error(errorMessage);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div className="space-y-2">
					<Label htmlFor="name" className="text-gray-200">
						Full Name
					</Label>
					<Input
						id="name"
						type="text"
						placeholder="John Doe"
						className="bg-transparent border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-sky-400"
						{...register("name", {
							required: "Full name is required",
							minLength: {
								value: 2,
								message: "Full name must be at least 2 characters.",
							},
						})}
					/>
					{errors.name && (
						<p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="email" className="text-gray-200">
						Email Address
					</Label>
					<Input
						id="email"
						type="email"
						placeholder="john.doe@example.com"
						className="bg-transparent border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-sky-400"
						{...register("email", {
							required: "Email address is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Please enter a valid email address.",
							},
						})}
					/>
					{errors.email && (
						<p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
					)}
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="details" className="text-gray-300">
					Tell us about your project
				</Label>
				<Textarea
					id="details"
					placeholder="I'm looking to build a new web application that..."
					className="bg-transparent border-gray-400 min-h-[120px] focus-visible:ring-offset-0 focus-visible:ring-sky-400"
					{...register("details")}
				/>
				{errors.details && (
					<p className="text-sm text-red-400 mt-1">{errors.details.message}</p>
				)}
			</div>

			<Turnstile
				onSuccess={() => {
					setIsVerified(true);
				}}
				onExpire={() => {
					window.location.reload();
				}}
				onUnsupported={() => {
					toast.error(
						"Your browser is not supported for CAPTCHA verification.",
					);
				}}
				options={{
					theme: "light",
					size: "flexible",
				}}
				siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
			/>
			<Button
				type="submit"
				variant="secondary"
				className="w-full text-base font-semibold py-6 hover:gap-4 transition-all duration-300"
				disabled={isPending || !isVerified}
			>
				{isPending ? (
					<>
						<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
						Sending...
					</>
				) : (
					<>
						Send Your Message
						<SendHorizonal className="ml-2 h-5 w-5" />
					</>
				)}
			</Button>
		</form>
	);
};

export default ContactForm;
