"use client";

import { useEffect, useMemo, useState } from "react";

interface Skill {
	_id: string;
	category: "technical" | "soft";
	skill_name: string;
	skill_desc: string;
	rating_number: number; // 0-100
	rating_letter: string; // e.g., 'A'
}

const SkillsDisplay = () => {
	const [skills, setSkills] = useState<Skill[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const res = await fetch('/api/skills');
				const data = await res.json();
				if (data.success) setSkills(data.data);
			} catch (err) {
				console.error('Error fetching skills:', err);
			} finally {
				setLoading(false);
			}
		};
		fetchSkills();
	}, []);

	// Categorize strictly via explicit DB `category` field
	const { technical, soft } = useMemo(() => {
		const list = skills ?? [];
		return {
			technical: list.filter((s) => s.category === "technical"),
			soft: list.filter((s) => s.category === "soft"),
		};
	}, [skills]);

	const Meter = ({ value }: { value: number }) => (
		<div className="w-full bg-white/10 rounded h-2 overflow-hidden">
			<div className="bg-blue-500 h-2" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
		</div>
	);

	const SkillItem = ({ s }: { s: Skill }) => (
		<div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-2">
			<div className="flex items-center justify-between">
				<h4 className="text-white font-semibold">{s.skill_name}</h4>
				<span className="text-white/80">{s.rating_number}/100 ({s.rating_letter})</span>
			</div>
			<Meter value={s.rating_number} />
			<p className="text-white/70 text-sm">{s.skill_desc}</p>
		</div>
	);

	if (loading) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<div className="text-white/60">Loading skills...</div>
			</div>
		);
	}

	return (
		<div className="flex-1 overflow-auto">
			<div className="max-w-4xl mx-auto p-6 space-y-8">
				{/* Technical Skills */}
				<section>
					<h2 className="text-2xl font-bold text-white mb-2">Technical Skills</h2>
					<div className="text-white/60 mb-4">Core technologies and tools I use.</div>
					{technical.length === 0 ? (
						<div className="text-white/50">No technical skills yet.</div>
					) : (
						<div className="grid md:grid-cols-2 gap-4">
							{technical.map((s) => (<SkillItem key={s._id} s={s} />))}
						</div>
					)}
				</section>

				{/* Soft Skills */}
				<section>
					<h2 className="text-2xl font-bold text-white mb-2">Soft Skills</h2>
					<div className="text-white/60 mb-4">Traits and behaviors that strengthen my work.</div>
					{soft.length === 0 ? (
						<div className="text-white/50">No soft skills yet.</div>
					) : (
						<div className="grid md:grid-cols-2 gap-4">
							{soft.map((s) => (<SkillItem key={s._id} s={s} />))}
						</div>
					)}
				</section>
			</div>
		</div>
	);
};

export default SkillsDisplay;

