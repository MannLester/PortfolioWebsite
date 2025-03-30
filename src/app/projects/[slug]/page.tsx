"use client";

import { useParams } from 'next/navigation';
import DetailedPage from '@/components/sections/DetailedPage';
import { projects } from '@/components/sections/ProjectPage';
import Link from 'next/link';

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    
    // Find the project by matching the slug with the URL-friendly project title
    const project = projects.find(p => 
        p.title.toLowerCase().replace(/\s+/g, '-') === slug
    );

    if (!project) {
        return (
            <div className="min-h-screen bg-black pt-28 text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl mb-4">Project Not Found</h1>
                    <p className="mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
                    <Link 
                        href="/#projects" 
                        className="text-[#00FF00] hover:underline"
                    >
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return <DetailedPage project={project} />;
}
