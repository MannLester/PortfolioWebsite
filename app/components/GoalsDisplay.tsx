"use client";

import { useEffect, useState } from "react";

interface Goal {
	_id: string;
	goal_name: string;
	goal_desc: string;
	goal_reason: string;
	progress: number;
	is_completed: boolean;
}

const GoalsDisplay = () => {
	const [goals, setGoals] = useState<Goal[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGoals = async () => {
			try {
				const res = await fetch('/api/goals');
				const data = await res.json();
				if (data.success) setGoals(data.data);
			} catch (err) {
				console.error('Error fetching goals:', err);
			} finally {
				setLoading(false);
			}
		};
		fetchGoals();
	}, []);

	const ProgressBar = ({ value }: { value: number }) => (
		<div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
			<div 
				className="bg-gradient-to-r from-blue-500 to-green-500 h-3 transition-all duration-300" 
				style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} 
			/>
		</div>
	);

	const GoalCard = ({ goal }: { goal: Goal }) => (
		<div className={`p-6 rounded-lg border ${
			goal.is_completed 
				? 'bg-green-500/10 border-green-500/30' 
				: 'bg-white/5 border-white/10'
		} space-y-4 transition-all hover:border-white/20`}>
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-2">
						<h3 className="text-xl font-bold text-white">{goal.goal_name}</h3>
						{goal.is_completed && (
							<span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
								✓ Completed
							</span>
						)}
					</div>
					<p className="text-white/70 text-sm mb-3">{goal.goal_desc}</p>
				</div>
				<div className="text-right">
					<div className="text-2xl font-bold text-white">{goal.progress}%</div>
					<div className="text-white/50 text-xs">Progress</div>
				</div>
			</div>

			<ProgressBar value={goal.progress} />

			<div className="pt-3 border-t border-white/10">
				<div className="text-white/50 text-xs mb-1">Why this matters:</div>
				<p className="text-white/80 text-sm italic">{goal.goal_reason}</p>
			</div>
		</div>
	);

	if (loading) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<div className="text-white/60">Loading goals...</div>
			</div>
		);
	}

	const activeGoals = goals?.filter(g => !g.is_completed) ?? [];
	const completedGoals = goals?.filter(g => g.is_completed) ?? [];

	return (
		<div className="flex-1 overflow-auto">
			<div className="max-w-5xl mx-auto p-6 space-y-8">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">My Goals</h1>
					<p className="text-white/60">Tracking my journey and aspirations</p>
				</div>

				{/* Active Goals */}
				{activeGoals.length > 0 && (
					<section>
						<h2 className="text-2xl font-bold text-white mb-4">🎯 Active Goals</h2>
						<div className="grid gap-4">
							{activeGoals.map((goal) => (
								<GoalCard key={goal._id} goal={goal} />
							))}
						</div>
					</section>
				)}

				{/* Completed Goals */}
				{completedGoals.length > 0 && (
					<section>
						<h2 className="text-2xl font-bold text-white mb-4">✅ Completed Goals</h2>
						<div className="grid gap-4">
							{completedGoals.map((goal) => (
								<GoalCard key={goal._id} goal={goal} />
							))}
						</div>
					</section>
				)}

				{goals && goals.length === 0 && (
					<div className="text-center py-12 text-white/50">
						No goals yet. Time to set some!
					</div>
				)}
			</div>
		</div>
	);
};

export default GoalsDisplay;
