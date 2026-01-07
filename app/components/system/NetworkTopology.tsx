'use client';
import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

// Community group data - represents actual UBIT Hub structure
// Using single character abbreviations for canvas rendering (cleaner than emojis)
const COMMUNITY_GROUPS = [
    { id: 'announcements', name: 'Announcements', members: 372, abbr: 'A' },
    { id: 'central', name: 'UBIT Central Hub', members: 372, abbr: 'H' },
    { id: 'lounge', name: 'Student Lounge', members: 280, abbr: 'L' },
    { id: 'dsa', name: 'Data Structures', members: 185, abbr: 'D' },
    { id: 'webdev', name: 'Web Dev', members: 210, abbr: 'W' },
    { id: 'projects', name: 'Tech Projects', members: 165, abbr: 'P' },
    { id: 'math', name: 'Mathematics', members: 145, abbr: 'M' },
    { id: 'ai', name: 'AI & ML', members: 120, abbr: 'AI' },
    { id: 'mobile', name: 'Mobile Dev', members: 95, abbr: 'Mo' },
    { id: 'cyber', name: 'Cybersecurity', members: 88, abbr: 'Cy' },
    { id: 'cloud', name: 'Cloud & DevOps', members: 75, abbr: 'Cl' },
    { id: 'gamedev', name: 'Game Dev', members: 68, abbr: 'G' },
    { id: 'opensource', name: 'Open Source', members: 55, abbr: 'OS' },
    { id: 'career', name: 'Career', members: 198, abbr: 'Ca' },
    { id: 'resources', name: 'Resources', members: 245, abbr: 'R' },
    { id: 'seniors', name: 'Senior Guidance', members: 112, abbr: 'Sr' },
    { id: 'events', name: 'Events', members: 156, abbr: 'E' },
    { id: 'freelance', name: 'Freelancing', members: 89, abbr: 'Fr' },
    { id: 'research', name: 'Research', members: 67, abbr: 'Rs' },
];

interface GraphNode {
    id: string;
    name: string;
    val: number;
    color: string;
    members?: number;
    abbr?: string;
    isHub?: boolean;
    x?: number;
    y?: number;
}

const NetworkTopology: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const graphRef = useRef<any>(null);
    const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Responsive dimensions
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                // Smaller height on mobile for better UX
                const height = window.innerWidth < 768 ? 300 : 400;
                setDimensions({ width, height });
            }
        };
        
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Optimize physics - runs once after mount
    useEffect(() => {
        if (graphRef.current) {
            const fg = graphRef.current;
            // Gentler forces for smoother animation
            fg.d3Force('charge').strength(-80);
            fg.d3Force('link').distance(dimensions.width < 500 ? 50 : 80);
            fg.d3Force('center').strength(0.1);
            
            // Stop simulation after 3 seconds for performance
            setTimeout(() => {
                if (fg) {
                    fg.pauseAnimation();
                }
            }, 3000);
        }
    }, [dimensions.width]);

    // Memoize graph data to prevent regeneration
    const graphData = useMemo(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const nodeSize = isMobile ? 0.6 : 1;
        
        const nodes: GraphNode[] = [
            { 
                id: 'hub', 
                name: 'The UBIT Hub', 
                val: 25 * nodeSize, 
                color: '#6DB33F',
                members: 372,
                isHub: true,
                emoji: '🏠'
            }
        ];
        const links: { source: string; target: string }[] = [];

        COMMUNITY_GROUPS.forEach((group) => {
            const size = Math.max(6, Math.min(14, 6 + (group.members / 60))) * nodeSize;
            
            nodes.push({
                id: group.id,
                name: group.name,
                val: size,
                color: 'rgba(109, 179, 63, 0.7)',
                members: group.members,
                abbr: group.abbr
            });
            links.push({ source: 'hub', target: group.id });
        });

        return { nodes, links };
    }, []);

    // Optimized node painting - no shadows on mobile
    const paintNode = useCallback((node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const isMobile = dimensions.width < 500;
        const nodeSize = node.val || 10;
        
        // Simple circle - no expensive operations
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, nodeSize, 0, 2 * Math.PI);
        ctx.fillStyle = node.isHub ? '#6DB33F' : 'rgba(109, 179, 63, 0.5)';
        ctx.fill();
        
        // Border
        ctx.strokeStyle = node.isHub ? '#fff' : 'rgba(255,255,255,0.2)';
        ctx.lineWidth = node.isHub ? 2 / globalScale : 0.5 / globalScale;
        ctx.stroke();
        
        // Only draw abbreviation on larger screens or for hub
        if (!isMobile || node.isHub) {
            const fontSize = (node.isHub ? 12 : 8) / globalScale;
            ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = node.isHub ? '#ffffff' : 'rgba(255,255,255,0.9)';
            ctx.fillText(node.abbr || '', node.x!, node.y!);
        }
    }, [dimensions.width]);

    return (
        <div 
            ref={containerRef}
            className="h-[300px] md:h-[400px] rounded-2xl bg-surface border border-white/10 relative overflow-hidden"
        >
            <ForceGraph2D
                ref={graphRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                nodeLabel={() => ''}
                nodeVal="val"
                nodeCanvasObject={paintNode}
                linkColor={() => 'rgba(109, 179, 63, 0.2)'}
                linkWidth={1}
                backgroundColor="transparent"
                enableZoomInteraction={false}
                enablePanInteraction={false}
                onNodeHover={(node) => setHoveredNode(node as GraphNode | null)}
                cooldownTicks={100}
                warmupTicks={50}
            />
            
            {/* Tooltip - only on desktop */}
            {hoveredNode && dimensions.width >= 768 && (
                <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/90 border border-primary/30 pointer-events-none z-10">
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{hoveredNode.abbr}</span>
                        <div>
                            <h4 className="font-bold text-white text-xs">{hoveredNode.name}</h4>
                            {hoveredNode.members && (
                                <p className="text-[10px] text-primary">{hoveredNode.members} members</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Compact Legend */}
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 px-2 py-1.5 md:p-3 rounded-lg bg-black/70 border border-white/10">
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>19 Groups</span>
                    <span className="text-gray-600">•</span>
                    <span>372+</span>
                </div>
            </div>
        </div>
    );
};

export default NetworkTopology;

