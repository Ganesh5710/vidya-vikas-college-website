import { useEffect } from 'react';
export const useSEO = ({ title, description, noindex = false }) => {
    useEffect(() => {
        // Update Page Title
        document.title = title;
        // Update Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);
        // Update Meta Robots
        let metaRobots = document.querySelector('meta[name="robots"]');
        if (!metaRobots) {
            metaRobots = document.createElement('meta');
            metaRobots.setAttribute('name', 'robots');
            document.head.appendChild(metaRobots);
        }
        metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
        return () => {
            // Cleanup default
            metaRobots?.setAttribute('content', 'index, follow');
        };
    }, [title, description, noindex]);
};
